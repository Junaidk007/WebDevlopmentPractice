import { useCallback, useEffect, useMemo, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask } from '../../Services/api';
import { useMyContext } from '../../Context/context';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import './taskDisplay.css';

// Keep UI column metadata in one place to avoid repeating strings.
const COLUMN_CONFIG = [
    { title: 'In Progress', tone: 'status-progress', apiStatus: 'in-progress' },
    { title: 'Pending', tone: 'status-pending', apiStatus: 'pending' },
    { title: 'Completed', tone: 'status-completed', apiStatus: 'completed' }
];

const API_TO_UI_STATUS = {
    'in-progress': 'In Progress',
    pending: 'Pending',
    completed: 'Completed'
};

const UI_TO_API_STATUS = {
    'In Progress': 'in-progress',
    Pending: 'pending',
    Completed: 'completed'
};

const PRIORITY_TO_TONE = {
    low: 'completed',
    medium: 'progress',
    high: 'pending'
};

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

const createEmptyColumns = () => COLUMN_CONFIG.map((column) => ({ ...column, tasks: [] }));

const getTomorrowDate = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toISOString().split('T')[0];
};

const getInitialCreateDraft = () => ({
    title: '',
    description: '',
    dueDate: getTomorrowDate(),
    priority: 'medium',
    columnTitle: 'Pending'
});

const formatDueDate = (dateValue) => {
    if (!dateValue) {
        return 'No due date';
    }

    return new Date(dateValue).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const toInputDate = (dateValue) => {
    if (!dateValue) {
        return '';
    }

    return new Date(dateValue).toISOString().split('T')[0];
};

const normalizeTask = (task) => {
    const priority = task.priority || 'medium';

    return {
        id: task._id,
        title: task.title,
        description: task.description || '',
        dueDate: toInputDate(task.dueDate),
        due: formatDueDate(task.dueDate),
        label: priority.toUpperCase(),
        labelTone: PRIORITY_TO_TONE[priority] || 'progress',
        priority,
        columnTitle: API_TO_UI_STATUS[task.status] || 'Pending'
    };
};

const mapTasksToColumns = (taskList) => {
    const nextColumns = createEmptyColumns();

    taskList.forEach((task) => {
        const normalizedTask = normalizeTask(task);
        const column = nextColumns.find((item) => item.title === normalizedTask.columnTitle);

        if (column) {
            column.tasks.push(normalizedTask);
        }
    });

    return nextColumns;
};

function TaskDisplay() {
    const { logout } = useMyContext();

    const [columns, setColumns] = useState(createEmptyColumns);
    const [activeTask, setActiveTask] = useState(null);
    const [draftTask, setDraftTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Create-task modal state.
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createDraft, setCreateDraft] = useState(getInitialCreateDraft);
    const [createError, setCreateError] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const statusOptions = useMemo(() => COLUMN_CONFIG.map((item) => item.title), []);

    const fetchAndSetTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getTasks({ page: 1, limit: 100 });
            setColumns(mapTasksToColumns(response.data || []));
            setError('');
        } catch (apiError) {
            const message = apiError.message || 'Unable to load tasks.';

            // If token is invalid/expired, clear session and redirect through route guard.
            if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('invalid token')) {
                logout();
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        fetchAndSetTasks();
    }, [fetchAndSetTasks]);

    const openTaskModal = (task) => {
        setActiveTask(task);
        setDraftTask(task);
        setIsEditing(false);
    };

    const closeTaskModal = () => {
        setActiveTask(null);
        setDraftTask(null);
        setIsEditing(false);
    };

    const openCreateModal = () => {
        setCreateDraft(getInitialCreateDraft());
        setCreateError('');
        setIsCreateOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateOpen(false);
        setCreateError('');
    };

    const handleDraftChange = (event) => {
        const { name, value } = event.target;
        setDraftTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateChange = (event) => {
        const { name, value } = event.target;
        setCreateDraft((prev) => ({ ...prev, [name]: value }));

        if (createError) {
            setCreateError('');
        }
    };

    const buildUpdatePayload = (taskState) => ({
        title: taskState.title,
        description: taskState.description,
        priority: taskState.priority,
        status: UI_TO_API_STATUS[taskState.columnTitle],
        // Send ISO date to backend Date field.
        dueDate: taskState.dueDate
    });

    const handleCreateTask = async (event) => {
        event.preventDefault();
        setIsSaving(true);

        try {
            await createTask({
                title: createDraft.title,
                description: createDraft.description,
                priority: createDraft.priority,
                dueDate: createDraft.dueDate
            });

            await fetchAndSetTasks();
            closeCreateModal();
        } catch (apiError) {
            setCreateError(apiError.message || 'Unable to create task.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSave = async () => {
        if (!draftTask) {
            return;
        }

        setIsSaving(true);

        try {
            await updateTask(draftTask.id, buildUpdatePayload(draftTask));
            await fetchAndSetTasks();

            const refreshedTask = {
                ...draftTask,
                due: formatDueDate(draftTask.dueDate),
                label: draftTask.priority.toUpperCase(),
                labelTone: PRIORITY_TO_TONE[draftTask.priority] || 'progress'
            };

            setActiveTask(refreshedTask);
            setDraftTask(refreshedTask);
            setIsEditing(false);
        } catch (apiError) {
            setError(apiError.message || 'Unable to update task.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleProgressChange = async (nextStatus) => {
        if (!activeTask || nextStatus === activeTask.columnTitle) {
            return;
        }

        const nextTaskState = {
            ...activeTask,
            columnTitle: nextStatus
        };

        setIsSaving(true);

        try {
            await updateTask(activeTask.id, buildUpdatePayload(nextTaskState));
            await fetchAndSetTasks();
            setActiveTask(nextTaskState);
            setDraftTask(nextTaskState);
            setIsEditing(false);
        } catch (apiError) {
            setError(apiError.message || 'Unable to change task progress.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        setIsSaving(true);

        try {
            await deleteTask(taskId);
            await fetchAndSetTasks();

            if (activeTask?.id === taskId) {
                closeTaskModal();
            }
        } catch (apiError) {
            setError(apiError.message || 'Unable to delete task.');
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (!activeTask && !isCreateOpen) {
            return undefined;
        }

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeTaskModal();
                closeCreateModal();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeTask, isCreateOpen]);

    return (
        <>
            <div className="task-toolbar">
                <button type="button" className="task-create-btn" onClick={openCreateModal}>
                    <i className="fa-solid fa-plus"></i>
                    Add Task
                </button>
            </div>

            {error && <p className="task-error-banner">{error}</p>}

            {loading ? (
                <div className="task-loading">Loading tasks...</div>
            ) : (
                <section className="mainContent" aria-label="Task Board">
                    {/* Each cardBox is one Kanban column */}
                    {columns.map((column) => (
                        <section className="cardBox" key={column.title}>
                            <div className={`statusBox ${column.tone}`}>
                                <h5 className="m-0">{column.title}</h5>
                            </div>

                            <div className="displayBox">
                                {column.tasks.length === 0 ? (
                                    <p className="empty-column-text">No tasks yet</p>
                                ) : (
                                    column.tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onOpen={() => openTaskModal(task)}
                                            onDelete={() => handleDeleteTask(task.id)}
                                        />
                                    ))
                                )}
                            </div>
                        </section>
                    ))}
                </section>
            )}

            {isCreateOpen && (
                <div className="task-modal-backdrop" onClick={closeCreateModal} role="presentation">
                    <section
                        className="task-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Create task"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="task-modal-header">
                            <div>
                                <p className="task-modal-kicker">New Task</p>
                                <h3>Create Task</h3>
                            </div>
                            <button type="button" className="task-modal-close" onClick={closeCreateModal} aria-label="Close create task form">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="task-modal-body">
                            <TaskForm
                                values={createDraft}
                                onChange={handleCreateChange}
                                onSubmit={handleCreateTask}
                                onCancel={closeCreateModal}
                                statusOptions={statusOptions}
                                isSubmitting={isSaving}
                                submitLabel="Create Task"
                                error={createError}
                            />
                        </div>
                    </section>
                </div>
            )}

            {activeTask && (
                <div className="task-modal-backdrop" onClick={closeTaskModal} role="presentation">
                    <section
                        className="task-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Task details"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="task-modal-header">
                            <div>
                                <p className="task-modal-kicker">{activeTask.columnTitle}</p>
                                <h3>{isEditing ? 'Edit Task' : 'Task Details'}</h3>
                            </div>
                            <button type="button" className="task-modal-close" onClick={closeTaskModal} aria-label="Close task details">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="task-modal-body">
                            <label className="task-modal-label" htmlFor="taskTitle">Title</label>
                            {isEditing ? (
                                <input
                                    id="taskTitle"
                                    className="task-modal-input"
                                    name="title"
                                    value={draftTask.title}
                                    onChange={handleDraftChange}
                                />
                            ) : (
                                <p className="task-modal-value task-modal-title-value">{activeTask.title}</p>
                            )}

                            <label className="task-modal-label" htmlFor="taskDescription">Description</label>
                            {isEditing ? (
                                <textarea
                                    id="taskDescription"
                                    className="task-modal-input task-modal-textarea"
                                    name="description"
                                    value={draftTask.description}
                                    onChange={handleDraftChange}
                                />
                            ) : (
                                <p className="task-modal-value task-modal-description-value">{activeTask.description || 'No description added yet.'}</p>
                            )}

                            <div className="task-modal-grid">
                                <div>
                                    <label className="task-modal-label" htmlFor="taskDue">Due</label>
                                    {isEditing ? (
                                        <input
                                            id="taskDue"
                                            type="date"
                                            className="task-modal-input"
                                            name="dueDate"
                                            value={draftTask.dueDate}
                                            onChange={handleDraftChange}
                                        />
                                    ) : (
                                        <span className="task-meta-pill task-meta-due">{activeTask.due}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="task-modal-label" htmlFor="taskPriority">Priority</label>
                                    {isEditing ? (
                                        <select
                                            id="taskPriority"
                                            className="task-modal-input"
                                            name="priority"
                                            value={draftTask.priority}
                                            onChange={handleDraftChange}
                                        >
                                            {PRIORITY_OPTIONS.map((priority) => (
                                                <option key={priority} value={priority}>
                                                    {priority.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="task-meta-pill task-meta-tag">{activeTask.label}</span>
                                    )}
                                </div>
                            </div>

                            <label className="task-modal-label" htmlFor="taskStatus">Progress</label>
                            {isEditing ? (
                                <select
                                    id="taskStatus"
                                    className="task-modal-input"
                                    name="columnTitle"
                                    value={draftTask.columnTitle}
                                    onChange={handleDraftChange}
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="progress-actions-wrap">
                                    <span className="task-meta-pill task-meta-progress">{activeTask.columnTitle}</span>
                                    <div className="progress-actions">
                                        {statusOptions
                                            .filter((status) => status !== activeTask.columnTitle)
                                            .map((status) => (
                                                <button
                                                    key={status}
                                                    type="button"
                                                    className="progress-change-btn"
                                                    onClick={() => handleProgressChange(status)}
                                                    disabled={isSaving}
                                                >
                                                    Move to {status}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="task-modal-actions">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        className="task-modal-btn task-modal-btn-secondary"
                                        onClick={() => {
                                            setDraftTask(activeTask);
                                            setIsEditing(false);
                                        }}
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="task-modal-btn task-modal-btn-primary"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button type="button" className="task-modal-btn task-modal-btn-primary" onClick={() => setIsEditing(true)}>
                                    Edit Task
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}

export default TaskDisplay;
