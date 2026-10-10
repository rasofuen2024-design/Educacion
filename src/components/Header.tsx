interface HeaderProps {
  level: { name: string; icon: string };
  totalXP: number;
  completedMissions: number;
  onOpenSettings: () => void;
}

export default function Header({ level, totalXP, completedMissions, onOpenSettings }: HeaderProps) {
  return (
    <header className="relative">
      <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* School Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🏫</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-white">
                  I.E. Santa Rosa
                </h1>
                <p className="text-xs text-purple-200">Módulo de Comprensión Lectora</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              {/* Level */}
              <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{level.icon}</span>
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Nivel</p>
                    <p className="text-sm font-bold text-yellow-300">{level.name}</p>
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">XP</p>
                    <p className="text-sm font-bold text-cyan-300">{totalXP}</p>
                  </div>
                </div>
              </div>

              {/* Missions */}
              <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Misiones</p>
                    <p className="text-sm font-bold text-green-300">{completedMissions}/5</p>
                  </div>
                </div>
              </div>

              {/* Settings Button */}
              <button
                onClick={onOpenSettings}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 transition-all group hover:scale-105"
                title="Ajustes"
              >
                <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">⚙️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
