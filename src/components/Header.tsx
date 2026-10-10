interface HeaderProps {
  level: { name: string; icon: string };
  totalXP: number;
  completedMissions: number;
  onOpenSettings: () => void;
}

export default function Header({ level, totalXP, completedMissions, onOpenSettings }: HeaderProps) {
  return (
    <header className="relative sticky top-0 z-50">
      <div className="bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-lg border-b border-white/10 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Top Row: Logo + Settings Button */}
          <div className="flex items-center justify-between mb-3">
            {/* School Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏫</span>
              </div>
              <div>
                <h1 className="text-base md:text-lg font-bold text-white">
                  I.E. Santa Rosa
                </h1>
                <p className="text-[10px] md:text-xs text-purple-200">Módulo de Comprensión Lectora</p>
              </div>
            </div>

            {/* Settings Button - PROMINENT */}
            <button
              onClick={onOpenSettings}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                border-2 border-yellow-300/50 rounded-full w-12 h-12 flex items-center justify-center 
                transition-all group hover:scale-110 shadow-lg shadow-orange-500/30
                animate-pulse-glow"
              title="⚙️ Ajustes"
            >
              <span className="text-2xl group-hover:rotate-90 transition-transform duration-500">⚙️</span>
            </button>
          </div>

          {/* Bottom Row: Stats */}
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {/* Level */}
            <div className="bg-white/10 rounded-lg px-3 py-1.5 border border-white/20">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{level.icon}</span>
                <div>
                  <p className="text-[8px] text-white/60 uppercase tracking-wider leading-none">Nivel</p>
                  <p className="text-xs font-bold text-yellow-300 leading-tight">{level.name}</p>
                </div>
              </div>
            </div>

            {/* XP */}
            <div className="bg-white/10 rounded-lg px-3 py-1.5 border border-white/20">
              <div className="flex items-center gap-1.5">
                <span className="text-base">⚡</span>
                <div>
                  <p className="text-[8px] text-white/60 uppercase tracking-wider leading-none">XP</p>
                  <p className="text-xs font-bold text-cyan-300 leading-tight">{totalXP}</p>
                </div>
              </div>
            </div>

            {/* Missions */}
            <div className="bg-white/10 rounded-lg px-3 py-1.5 border border-white/20">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🎯</span>
                <div>
                  <p className="text-[8px] text-white/60 uppercase tracking-wider leading-none">Misiones</p>
                  <p className="text-xs font-bold text-green-300 leading-tight">{completedMissions}/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
