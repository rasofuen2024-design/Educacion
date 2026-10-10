import { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function SettingsModal({ onClose, onLogout }: SettingsModalProps) {
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const CORRECT_PASSWORD = 'SANTAROSA2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsVerified(true);
      setError('');
    } else {
      setError('❌ Contraseña incorrecta. Intente nuevamente.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <div>
              <h2 className="text-xl font-bold text-white">Ajustes</h2>
              <p className="text-xs text-white/70">Panel de configuración</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isVerified ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔐</span>
                  <h3 className="text-lg font-bold text-gray-800">Verificación de Seguridad</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Ingresa la clave de administrador para acceder a los ajustes.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la clave..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                  autoFocus
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg"
              >
                🔓 Verificar
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✅</span>
                <h3 className="text-lg font-bold text-gray-800">Acceso Concedido</h3>
              </div>

              {/* Settings Options */}
              <div className="space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🚪</span>
                  <div className="text-left">
                    <p className="font-bold text-red-700">Cerrar Sesión</p>
                    <p className="text-xs text-red-500">Salir del módulo didáctico</p>
                  </div>
                  <span className="ml-auto text-red-400 group-hover:text-red-600">→</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">↩️</span>
                  <div className="text-left">
                    <p className="font-bold text-gray-700">Volver</p>
                    <p className="text-xs text-gray-500">Regresar al módulo</p>
                  </div>
                  <span className="ml-auto text-gray-400 group-hover:text-gray-600">→</span>
                </button>
              </div>

              <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-xs text-indigo-600 text-center">
                  🏫 I.E. Santa Rosa | Módulo de Comprensión Lectora
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
