import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import AddEditModal from './components/AddEditModal'
import Sidebar from './components/Sidebar'

const LISTS = ['All', 'Personal', 'Work', 'Study', 'Shopping']
const FILTERS = ['All', 'Active', 'Completed', 'Today']

function App() {
    const [tasks, setTasks] = useState(() => {
        try { return JSON.parse(localStorage.getItem('tf_tasks')) || [] } catch { return [] }
    })
    const [list, setList] = useState('All')
    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(null) // null | 'add' | task-obj
    const [sideOpen, setSideOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem('tf_tasks', JSON.stringify(tasks))
    }, [tasks])

    // ── CRUD ──
    const addTask = (data) => {
        setTasks(prev => [...prev, { id: Date.now(), ...data, done: false, createdAt: new Date().toISOString() }])
        setModal(null)
    }

    const editTask = (data) => {
        setTasks(prev => prev.map(t => t.id === data.id ? { ...t, ...data } : t))
        setModal(null)
    }

    const toggleDone = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }

    // ── FILTER LOGIC ──
    const today = new Date().toISOString().slice(0, 10)

    const visible = tasks.filter(t => {
        const inList = list === 'All' || t.list === list
        const inFilter = filter === 'All'
            ? true
            : filter === 'Active' ? !t.done
                : filter === 'Completed' ? t.done
                    : filter === 'Today' ? t.dueDate === today
                        : true
        const inSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
        return inList && inFilter && inSearch
    })

    const counts = {
        active: tasks.filter(t => !t.done).length,
        completed: tasks.filter(t => t.done).length,
        today: tasks.filter(t => t.dueDate === today).length,
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-slate-100 flex">
            {/* Overlay for mobile sidebar */}
            {sideOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={() => setSideOpen(false)}
                />
            )}

            {/* ── SIDEBAR ── */}
            <Sidebar
                lists={LISTS}
                activeList={list}
                onListChange={(l) => { setList(l); setSideOpen(false) }}
                counts={counts}
                open={sideOpen}
            />

            {/* ── MAIN ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* TOPBAR */}
                <header className="sticky top-0 z-10 bg-[#13131f]/90 backdrop-blur-lg border-b border-white/5 px-4 sm:px-6 py-3 flex items-center gap-3">
                    <button
                        onClick={() => setSideOpen(s => !s)}
                        className="lg:hidden text-slate-400 hover:text-white text-2xl leading-none"
                    >☰</button>

                    <div className="flex-1 flex items-center gap-2 bg-[#1c1c2e] border border-white/6 rounded-xl px-3 py-2">
                        <span className="text-slate-500">🔍</span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search tasks…"
                            className="bg-transparent outline-none text-sm flex-1 text-slate-200 placeholder-slate-500"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="text-slate-500 hover:text-white text-xs">✕</button>
                        )}
                    </div>

                    <button
                        onClick={() => setModal('add')}
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
                    >
                        <span className="text-lg leading-none">+</span>
                        <span className="hidden sm:inline">New Task</span>
                    </button>
                </header>

                {/* CONTENT */}
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    {/* Page heading */}
                    <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                        <div>
                            <h1 className="font-['Syne'] text-2xl font-extrabold">{list} Tasks</h1>
                            <p className="text-slate-500 text-sm mt-0.5">{visible.length} task{visible.length !== 1 ? 's' : ''}</p>
                        </div>
                        {/* Filter Pills */}
                        <div className="flex gap-2 flex-wrap">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filter === f
                                            ? 'bg-violet-600 border-violet-600 text-white'
                                            : 'border-white/10 text-slate-400 hover:border-violet-500 hover:text-white'
                                        }`}
                                >
                                    {f}
                                    {f === 'Today' && counts.today > 0 && (
                                        <span className="ml-1 bg-violet-500 text-white rounded-full px-1.5 py-0.5 text-[10px]">{counts.today}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Progress bar */}
                    {tasks.length > 0 && (
                        <div className="mb-5">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Progress</span>
                                <span>{counts.completed}/{tasks.length} completed</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transition-all duration-500"
                                    style={{ width: tasks.length ? `${(counts.completed / tasks.length) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Task list */}
                    <TaskList
                        tasks={visible}
                        onToggle={toggleDone}
                        onEdit={(t) => setModal(t)}
                        onDelete={deleteTask}
                    />

                    {/* Empty state */}
                    {visible.length === 0 && (
                        <div className="text-center py-20 text-slate-600">
                            <div className="text-5xl mb-3">📋</div>
                            <p className="text-lg font-semibold">No tasks here</p>
                            <p className="text-sm mt-1">Add a new task to get started</p>
                        </div>
                    )}
                </main>
            </div>

            {/* ── MODAL ── */}
            {modal && (
                <AddEditModal
                    task={modal === 'add' ? null : modal}
                    lists={LISTS.filter(l => l !== 'All')}
                    onSave={modal === 'add' ? addTask : editTask}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    )
}

export default App
