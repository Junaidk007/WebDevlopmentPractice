import './taskDisplay.css';

function TaskCard({ task, onOpen, onDelete }) {
    return (
        <article
            className="task-card task-card-interactive"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => event.key === 'Enter' && onOpen()}
        >
            {/* task-badge-* classes change color by status/priority */}
            <span className={`task-badge task-badge-${task.labelTone}`}>{task.label}</span>
            <h6 className="task-title">{task.title}</h6>
            <p className="task-description">{task.description || 'No description added yet.'}</p>

            <div className="task-card-footer">
                <span className="task-meta-pill task-meta-due">{task.due}</span>
                <button
                    type="button"
                    className="task-delete"
                    aria-label="Delete task"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete();
                    }}
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </article>
    );
}

export default TaskCard;
