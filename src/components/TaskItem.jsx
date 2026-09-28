const PRIORITY_STYLES = {
    high: 'bg-red-500/20 text-red-400 border-red-500/40',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    low: 'bg-green-500/20 text-green-400 border-green-500/40',
}

const LIST_COLORS = {
    Personal: 'bg-violet-500',
    Work: 'bg-cyan-500',
    Study: 'bg-amber-500',
    Shopping: 'bg-emerald-500',
}

function formatDateTime(date, time) {
    if (!date) return null
    const d = new Date(`${date}T${time || '00:00'}`)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        + (time ? ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '')
}

function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const isOverdue = task.dueDate && !task.done
        && new Date(`${task.dueDate}T${task.dueTime || '23:59'}`) < new Date()

    return (
        <div
            className={`task-enter group flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200
        ${task.done
                    ? 'bg-white/2 border-white/4 opacity-60'
                    : 'bg-[#1a1a2e] border-white/7 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-900/20'
                }`}
        >
            {/* Checkbox */}
            <button
                onClick={() => onToggle(task.id)}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
          ${task.done ? 'bg-violet-600 border-violet-600' : 'border-slate-600 hover:border-violet-500'}`}
            >
                {task.done && <span className="text-white text-xs">✓</span>}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                    <p className={`font-medium leading-snug flex-1 ${task.done ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                        {task.title}
                    </p>
                    {/* Priority badge */}
                    {task.priority && (
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}>
                            {task.priority}
                        </span>
                    )}
                </div>

                {task.desc && (
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">{task.desc}</p>
                )}

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {/* List tag */}
                    {task.list && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className={`w-2 h-2 rounded-full ${LIST_COLORS[task.list] || 'bg-slate-500'}`} />
                            {task.list}
                        </span>
                    )}
                    {/* Due datetime */}
                    {task.dueDate && (
                        <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-slate-500'}`}>
                            🕐 {formatDateTime(task.dueDate, task.dueTime)}
                            {isOverdue && <span className="font-semibold"> (Overdue)</span>}
                        </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                    onClick={() => onEdit(task)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all text-sm"
                    title="Edit"
                >✏</button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
                    title="Delete"
                >🗑</button>
            </div>
        </div>
    )
}

export default TaskItem
