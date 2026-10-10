import { useState } from 'react';
import MissionPage from './components/MissionPage';
import Badge from './components/Badge';
import SettingsModal from './components/SettingsModal';

interface Mission {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  completed: boolean;
}

function App() {
  const [activeMission, setActiveMission] = useState<number | null>(null);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const missions: Mission[] = [
    {
      id: 1,
      title: "Miremos, pensemos y comprendamos",
      description: "Explora textos e imágenes para desarrollar tu capacidad de observación y comprensión.",
      icon: "👁️",
      color: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-100 to-indigo-100",
      completed: completedMissions.includes(1)
    },
    {
      id: 2,
      title: "Viaje interactivo por la lectura",
      description: "Embárcate en un viaje interactivo donde la lectura cobra vida con tecnología.",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-100 to-cyan-100",
      completed: completedMissions.includes(2)
    },
    {
      id: 3,
      title: "Reto lector: ¡Atrévete a responder!",
      description: "Pon a prueba tu comprensión lectora con desafíos interactivos y preguntas dinámicas.",
      icon: "🏆",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-100 to-red-100",
      completed: completedMissions.includes(3)
    },
    {
      id: 4,
      title: "Palabras que construyen significado",
      description: "Descubre cómo las palabras se conectan para crear significados profundos en español e inglés.",
      icon: "📚",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-100 to-emerald-100",
      completed: completedMissions.includes(4)
    },
    {
      id: 5,
      title: "Creamos para demostrar lo que comprendimos",
      description: "Demuestra todo lo aprendido creando tu propio contenido digital interactivo.",
      icon: "🎨",
      color: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-100 to-rose-100",
      completed: completedMissions.includes(5)
    }
  ];

  const handleStartMission = (missionId: number) => {
    setActiveMission(missionId);
  };

  const handleCompleteMission = (missionId: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId]);
      setTotalXP(totalXP + 200);
    }
    setActiveMission(null);
  };

  const handleCloseMission = () => {
    setActiveMission(null);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowSettings(false);
    setActiveMission(null);
    setCompletedMissions([]);
    setTotalXP(0);
  };

  const getLevel = () => {
    if (completedMissions.length === 0) return { name: "Explorador", icon: "🌱" };
    if (completedMissions.length <= 2) return { name: "Aprendiz", icon: "📖" };
    if (completedMissions.length <= 4) return { name: "Lector Avanzado", icon: "⭐" };
    return { name: "Maestro Lector", icon: "👑" };
  };

  const level = getLevel();

  // Login screen after logout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Sesión Cerrada</h2>
          <p className="text-white/70 mb-6">Has cerrado sesión exitosamente</p>
          <button
            onClick={() => setIsAuthenticated(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Mission page
  if (activeMission !== null) {
    return (
      <>
        <MissionPage
          missionId={activeMission}
          mission={missions[activeMission - 1]}
          onComplete={handleCompleteMission}
          onClose={handleCloseMission}
          onOpenSettings={handleOpenSettings}
        />
        {showSettings && (
          <SettingsModal
            onClose={handleCloseSettings}
            onLogout={handleLogout}
          />
        )}
      </>
    );
  }

  // Main screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      
      {/* ========== BOTÓN DE AJUSTES FIJO - ESQUINA SUPERIOR DERECHA ========== */}
      <button
        onClick={handleOpenSettings}
        className="fixed top-4 right-4 z-[9999] bg-gradient-to-br from-amber-400 to-orange-600 
          hover:from-amber-500 hover:to-orange-700
          w-14 h-14 rounded-full flex items-center justify-center 
          shadow-[0_0_20px_rgba(255,165,0,0.6)] hover:shadow-[0_0_30px_rgba(255,165,0,0.9)]
          border-3 border-yellow-300
          transition-all duration-300 hover:scale-110 active:scale-95
          group"
        title="⚙️ Ajustes"
        style={{ border: '3px solid #fde047' }}
      >
        <span className="text-3xl group-hover:rotate-90 transition-transform duration-500">⚙️</span>
        {/* Etiqueta "AJUSTES" */}
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AJUSTES
        </span>
      </button>

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg border-b border-white/10">
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
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{level.icon}</span>
                    <div>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider">Nivel</p>
                      <p className="text-sm font-bold text-yellow-300">{level.name}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider">XP</p>
                      <p className="text-sm font-bold text-cyan-300">{totalXP}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <div>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider">Misiones</p>
                      <p className="text-sm font-bold text-green-300">{completedMissions.length}/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Objective Section */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="text-4xl animate-float">🎯</div>
              <div>
                <h2 className="text-xl font-bold text-yellow-300 mb-2">Objetivo del Módulo</h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Fortalecer la comprensión lectora en español e inglés mediante el diseño e implementación de 
                  estrategias didácticas digitales interactivas apoyadas en Edpuzzle y otras herramientas 
                  tecnológicas, con el fin de favorecer la interpretación, la ampliación del vocabulario y la 
                  evaluación formativa de los estudiantes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🏅</span> Insignias Ganadas
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {missions.map((mission) => (
                <Badge
                  key={mission.id}
                  icon={mission.icon}
                  title={mission.title}
                  earned={completedMissions.includes(mission.id)}
                  color={mission.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            <span className="text-3xl">🗺️</span> Mapa de Misiones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, index) => (
              <div
                key={mission.id}
                className={`mission-card bg-gradient-to-br ${mission.bgGradient} rounded-2xl p-6 shadow-xl border-2 ${
                  mission.completed ? 'border-yellow-400 animate-pulse-glow' : 'border-white/30'
                } relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {mission.completed && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                    ✓
                  </div>
                )}
                
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                  {mission.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Misión {mission.id}
                </h3>
                <h4 className="text-base font-semibold text-gray-700 mb-3">
                  {mission.title}
                </h4>
                <p className="text-sm text-gray-600 mb-5">
                  {mission.description}
                </p>

                <button
                  onClick={() => handleStartMission(mission.id)}
                  className={`w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r ${mission.color} 
                    hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg
                    flex items-center justify-center gap-2 text-lg`}
                >
                  <span>🚀</span>
                  <span>{mission.completed ? 'Revisar' : 'Iniciar'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-bold">Progreso General</span>
              <span className="text-yellow-300 font-bold">{completedMissions.length}/5 Misiones</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(completedMissions.length / 5) * 100}%` }}
              ></div>
            </div>
            {completedMissions.length === 5 && (
              <div className="mt-4 text-center">
                <span className="text-2xl">🎉🏆🎉</span>
                <p className="text-yellow-300 font-bold text-lg">¡Felicidades! ¡Has completado todas las misiones!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Institución Educativa Santa Rosa | Módulo de Comprensión Lectora
          </p>
          <p className="text-white/40 text-xs mt-2">
            Diseñado con ❤️ para fortalecer la lectura en español e inglés
          </p>
        </footer>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={handleCloseSettings}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
