import { useState } from 'react'

const PRIORITIES = ['low', 'medium', 'high']

export default function AddEditModal({ task, lists, onSave, onClose }) {
    const isEdit = !!task
    const [form, setForm] = useState({
        title: task?.title || '',
        desc: task?.desc || '',
        list: task?.list || lists[0] || '',
        priority: task?.priority || 'medium',
        dueDate: task?.dueDate || '',
        dueTime: task?.dueTime || '',
    })
    const [error, setError] = useState('')

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    function handleSubmit(e) {
        e.preventDefault()
        if (!form.title.trim()) { setError('Task title is required.'); return }
        onSave(isEdit ? { ...task, ...form } : form)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-md bg-[#1a1a2e] border border-white/8 rounded-2xl shadow-2xl shadow-black/60 animate-[fadeSlideIn_0.25s_ease_both]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                    <h2 className="text-lg font-bold text-white">{isEdit ? '✏️ Edit Task' : '➕ New Task'}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/6 transition-all"
                    >✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Task Title *
                        </label>
                        <input
                            value={form.title}
                            onChange={e => { set('title', e.target.value); setError('') }}
                            placeholder="e.g. Buy groceries"
                            className="w-full bg-[#0f0f1a] border border-white/8 focus:border-violet-500 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                        />
                        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Description
                        </label>
                        <textarea
                            value={form.desc}
                            onChange={e => set('desc', e.target.value)}
                            placeholder="Optional details…"
                            rows={2}
                            className="w-full bg-[#0f0f1a] border border-white/8 focus:border-violet-500 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none resize-none transition-colors"
                        />
                    </div>

                    {/* List & Priority row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">List</label>
                            <select
                                value={form.list}
                                onChange={e => set('list', e.target.value)}
                                className="w-full bg-[#0f0f1a] border border-white/8 focus:border-violet-500 rounded-xl px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors cursor-pointer"
                            >
                                {lists.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Priority</label>
                            <div className="flex gap-1.5">
                                {PRIORITIES.map(p => (
                                    <button
                                        key={p} type="button"
                                        onClick={() => set('priority', p)}
                                        className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border transition-all ${form.priority === p
                                                ? p === 'high' ? 'bg-red-500/30 border-red-500 text-red-300'
                                                    : p === 'medium' ? 'bg-amber-500/30 border-amber-500 text-amber-300'
                                                        : 'bg-green-500/30 border-green-500 text-green-300'
                                                : 'bg-transparent border-white/8 text-slate-500 hover:border-white/20'
                                            }`}
                                    >{p}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Date & Time row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={e => set('dueDate', e.target.value)}
                                className="w-full bg-[#0f0f1a] border border-white/8 focus:border-violet-500 rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none transition-colors cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Due Time
                            </label>
                            <input
                                type="time"
                                value={form.dueTime}
                                onChange={e => set('dueTime', e.target.value)}
                                disabled={!form.dueDate}
                                className="w-full bg-[#0f0f1a] border border-white/8 focus:border-violet-500 rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none transition-colors disabled:opacity-40 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button" onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-white/8 text-slate-400 hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
                        >Cancel</button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
                        >{isEdit ? 'Save Changes' : 'Add Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
