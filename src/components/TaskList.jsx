import TaskItem from './TaskItem'

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
    const active = tasks.filter(t => !t.done)
    const completed = tasks.filter(t => t.done)

    return (
        <div className="space-y-6">
            {/* Active tasks */}
            {active.length > 0 && (
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                        Active · {active.length}
                    </h2>
                    <div className="space-y-2">
                        {active.map(t => (
                            <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </div>
                </section>
            )}

            {/* Completed tasks */}
            {completed.length > 0 && (
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                        Completed · {completed.length}
                    </h2>
                    <div className="space-y-2">
                        {completed.map(t => (
                            <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default TaskList
