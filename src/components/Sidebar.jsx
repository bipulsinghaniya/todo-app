const LIST_COLORS = {
    Personal: 'bg-violet-500',
    Work: 'bg-cyan-500',
    Study: 'bg-amber-500',
    Shopping: 'bg-emerald-500',
}

export default function Sidebar({ lists, activeList, onListChange, counts, open }) {
    return (
        <aside className={`
      fixed top-0 left-0 h-full w-60 z-30
      bg-[#13131f] border-r border-white/5
      flex flex-col
      transition-transform duration-300 ease-in-out
      ${open ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:flex
    `}>
            {/* Brand */}
            <div className="px-5 py-5 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                    <span className="text-2xl">📋</span>
                    <span className="font-['Syne'] text-xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        TaskFlow
                    </span>
                </div>
                <p className="text-slate-600 text-xs mt-1">Stay organised. Stay productive.</p>
            </div>

            {/* Stats */}
            <div className="px-4 py-3 border-b border-white/5 grid grid-cols-2 gap-2">
                <div className="bg-violet-900/20 border border-violet-500/20 rounded-xl p-2.5 text-center">
                    <p className="text-violet-400 text-lg font-black">{counts.active}</p>
                    <p className="text-slate-600 text-[10px] uppercase tracking-wider">Active</p>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-2.5 text-center">
                    <p className="text-emerald-400 text-lg font-black">{counts.completed}</p>
                    <p className="text-slate-600 text-[10px] uppercase tracking-wider">Done</p>
                </div>
            </div>

            {/* Lists */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <p className="text-slate-600 text-[10px] uppercase tracking-widest font-semibold px-2 mb-2">Lists</p>
                {lists.map(l => (
                    <button
                        key={l}
                        onClick={() => onListChange(l)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${activeList === l
                                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${l === 'All' ? 'bg-slate-500' : LIST_COLORS[l] || 'bg-slate-500'
                            }`} />
                        <span className="flex-1 text-left">{l}</span>
                        {l === 'All' && counts.active > 0 && (
                            <span className="bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {counts.active}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/5 text-slate-600 text-xs">
                <p>TaskFlow · 2026</p>
            </div>
        </aside>
    )
}
