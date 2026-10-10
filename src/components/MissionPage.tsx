import { useState, useRef } from 'react';

interface Mission {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  completed: boolean;
}

interface MissionPageProps {
  missionId: number;
  mission: Mission;
  onComplete: (missionId: number) => void;
  onClose: () => void;
  onOpenSettings: () => void;
}

export default function MissionPage({ missionId, mission, onComplete, onClose, onOpenSettings }: MissionPageProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'interactive'>('content');
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedMode, setEmbedMode] = useState<'url' | 'code'>('url');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onComplete(missionId);
    }, 2500);
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 2000);
  };

  const getEmbedContent = () => {
    if (embedMode === 'url' && embedUrl) {
      return (
        <iframe
          src={embedUrl}
          className="w-full h-full border-0 rounded-lg"
          title="Embedded Content"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      );
    }
    if (embedMode === 'code' && embedCode) {
      return (
        <div
          className="w-full h-full overflow-auto rounded-lg bg-white"
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      );
    }
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <p className="text-5xl mb-4">📎</p>
          <p className="text-lg">Ingresa una URL o código HTML para incrustar contenido</p>
          <p className="text-sm mt-2 text-gray-300">Ejemplo: Videos de Edpuzzle, páginas web, actividades interactivas</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-center animate-bounce-in shadow-2xl">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-white mb-2">¡Misión Completada!</h2>
            <p className="text-white/90 text-lg">+200 XP ganados</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-4xl animate-float" style={{ animationDelay: '0s' }}>⭐</span>
              <span className="text-4xl animate-float" style={{ animationDelay: '0.2s' }}>🌟</span>
              <span className="text-4xl animate-float" style={{ animationDelay: '0.4s' }}>⭐</span>
            </div>
          </div>
        </div>
      )}

      {/* Save Message */}
      {showSaveMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce-in flex items-center gap-2">
          <span className="text-xl">💾</span>
          <span className="font-bold">¡Contenido guardado exitosamente!</span>
        </div>
      )}

      {/* Top Navigation */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20"
          >
            <span>←</span>
            <span className="hidden sm:inline">Volver al Mapa</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-2xl">{mission.icon}</span>
            <div>
              <p className="text-xs text-white/60">Misión {missionId}</p>
              <p className="text-sm font-bold text-white">{mission.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-3 py-2 rounded-lg hover:opacity-90 transition-all shadow-lg flex items-center gap-1 text-sm"
            >
              <span>💾</span>
              <span className="hidden md:inline">Guardar</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                border-2 border-yellow-300/50 rounded-full w-10 h-10 flex items-center justify-center 
                transition-all group hover:scale-110 shadow-lg shadow-orange-500/30"
              title="⚙️ Ajustes"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform duration-500">⚙️</span>
            </button>
            <button
              onClick={handleComplete}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-3 py-2 rounded-lg hover:opacity-90 transition-all shadow-lg flex items-center gap-1 text-sm"
            >
              <span>✅</span>
              <span className="hidden md:inline">Completar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-3 px-4 rounded-t-xl font-bold text-sm transition-all flex items-center justify-center gap-2
              ${activeTab === 'content' 
                ? 'bg-white text-indigo-700 shadow-lg' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
          >
            <span>📝</span>
            <span>Contenido (Texto/Imagen)</span>
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex-1 py-3 px-4 rounded-t-xl font-bold text-sm transition-all flex items-center justify-center gap-2
              ${activeTab === 'interactive' 
                ? 'bg-white text-indigo-700 shadow-lg' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
          >
            <span>💻</span>
            <span>Contenido Interactivo</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-2xl min-h-[70vh]">
          {activeTab === 'content' ? (
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <span className="text-2xl">📝</span>
                  Espacio de Contenido - Misión {missionId}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {mission.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Text Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span>✏️</span> Área de Texto
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Escribe aquí el contenido de la misión...&#10;&#10;Puedes agregar instrucciones, preguntas, reflexiones o cualquier texto relacionado con la actividad."
                    className="w-full h-64 p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none text-gray-700"
                  />
                  <p className="text-xs text-gray-400">{textContent.length} caracteres</p>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span>🖼️</span> Imagen de la Misión
                  </label>
                  <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 h-64 flex flex-col items-center justify-center bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          onClick={() => { setImagePreview(null); setImageUrl(''); }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-5xl mb-3">📷</div>
                        <p className="text-sm text-gray-500 mb-3">Arrastra una imagen o haz clic para subir</p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all"
                        >
                          Seleccionar Imagen
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <label className="text-xs text-gray-500">O pega una URL de imagen:</label>
                    <input
                      type="text"
                      value={imageUrl && !imageUrl.startsWith('data:') ? imageUrl : ''}
                      onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                    />
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              {(textContent || imagePreview) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span>👁️</span> Vista Previa del Contenido
                  </h4>
                  <div className="prose max-w-none">
                    {imagePreview && (
                      <img src={imagePreview} alt="Content" className="max-w-full h-auto rounded-lg mb-4 max-h-64 object-contain" />
                    )}
                    {textContent && (
                      <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                        {textContent}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <span className="text-2xl">💻</span>
                  Contenido Interactivo - Misión {missionId}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Incrusta contenido interactivo: videos de Edpuzzle, páginas web, actividades HTML o scripts.
                </p>
              </div>

              {/* Embed Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setEmbedMode('url')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    embedMode === 'url' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🌐 URL / Iframe
                </button>
                <button
                  onClick={() => setEmbedMode('code')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    embedMode === 'code' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📋 Código HTML/Script
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="space-y-3">
                  {embedMode === 'url' ? (
                    <>
                      <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                        <span>🔗</span> URL del Contenido
                      </label>
                      <input
                        type="url"
                        value={embedUrl}
                        onChange={(e) => setEmbedUrl(e.target.value)}
                        placeholder="https://edpuzzle.com/media/... o cualquier URL"
                        className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                      />
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-blue-700 font-medium">💡 Sugerencias:</p>
                        <ul className="text-xs text-blue-600 mt-1 space-y-1">
                          <li>• Videos de Edpuzzle: copia la URL del video</li>
                          <li>• Google Forms para actividades</li>
                          <li>• Páginas web educativas</li>
                          <li>• Presentaciones de Google Slides</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                        <span>📝</span> Código HTML / Script
                      </label>
                      <textarea
                        value={embedCode}
                        onChange={(e) => setEmbedCode(e.target.value)}
                        placeholder={`<iframe src="https://edpuzzle.com/embed/..." width="100%" height="400px"></iframe>\n\nO pega tu código HTML aquí:\n\n<div style="padding: 20px; background: #f0f0f0;">\n  <h2>Mi contenido</h2>\n  <p>Texto interactivo...</p>\n</div>`}
                        className="w-full h-64 p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none text-sm font-mono"
                      />
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-green-700 font-medium">💡 Puedes incluir:</p>
                        <ul className="text-xs text-green-600 mt-1 space-y-1">
                          <li>• Iframes de Edpuzzle</li>
                          <li>• Código HTML personalizado</li>
                          <li>• Widgets interactivos</li>
                          <li>• Scripts embebidos</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                {/* Preview Area */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span>👁️</span> Vista Previa Interactiva
                  </label>
                  <div className="w-full h-64 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    {getEmbedContent()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10 py-3 px-4 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{mission.icon}</span>
            <span className="text-white/80 text-sm font-medium">Misión {missionId} de 5</span>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={onClose}
              className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all"
            >
              ← Mapa
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
            >
              💾 Guardar
            </button>
            <button
              onClick={onOpenSettings}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                border-2 border-yellow-300/50 rounded-full w-10 h-10 flex items-center justify-center 
                transition-all group hover:scale-110 shadow-lg shadow-orange-500/30"
              title="⚙️ Ajustes"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform duration-500">⚙️</span>
            </button>
            <button
              onClick={handleComplete}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-lg"
            >
              ✅ Completar (+200 XP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
