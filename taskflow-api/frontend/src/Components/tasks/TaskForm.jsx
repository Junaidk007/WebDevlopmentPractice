function TaskForm({
    values,
    onChange,
    onSubmit,
    onCancel,
    statusOptions,
    isSubmitting,
    submitLabel,
    error
}) {
    return (
        <form onSubmit={onSubmit}>
            <label className="task-modal-label" htmlFor="createTitle">Title</label>
            <input
                id="createTitle"
                className="task-modal-input"
                name="title"
                value={values.title}
                onChange={onChange}
                placeholder="Enter task title"
                required
                minLength={5}
            />

            <label className="task-modal-label" htmlFor="createDescription">Description</label>
            <textarea
                id="createDescription"
                className="task-modal-input task-modal-textarea"
                name="description"
                value={values.description}
                onChange={onChange}
                placeholder="Add task details"
            />

            <div className="task-modal-grid">
                <div>
                    <label className="task-modal-label" htmlFor="createDue">Due Date</label>
                    <input
                        id="createDue"
                        type="date"
                        className="task-modal-input"
                        name="dueDate"
                        value={values.dueDate}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label className="task-modal-label" htmlFor="createPriority">Priority</label>
                    <select
                        id="createPriority"
                        className="task-modal-input"
                        name="priority"
                        value={values.priority}
                        onChange={onChange}
                    >
                        <option value="low">LOW</option>
                        <option value="medium">MEDIUM</option>
                        <option value="high">HIGH</option>
                    </select>
                </div>
            </div>

            <label className="task-modal-label" htmlFor="createStatus">Progress</label>
            <select
                id="createStatus"
                className="task-modal-input"
                name="columnTitle"
                value={values.columnTitle}
                onChange={onChange}
            >
                {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>

            {error && <p className="task-error-banner form-error">{error}</p>}

            <div className="task-modal-actions">
                <button type="button" className="task-modal-btn task-modal-btn-secondary" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </button>
                <button type="submit" className="task-modal-btn task-modal-btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
