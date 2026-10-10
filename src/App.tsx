import { useState, useRef, useEffect } from 'react';

// ============ TIPOS ============
interface Mission {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
}

interface MissionData {
  text: string;
  imageUrl: string;
  embedUrl: string;
  embedCode: string;
}

// ============ DATOS ============
const CORRECT_PASSWORD = 'SANTAROSA2026';

const MISSIONS: Mission[] = [
  { id: 1, title: "Miremos, pensemos y comprendamos", description: "Explora textos e imágenes para desarrollar tu capacidad de observación y comprensión.", icon: "👁️", color: "linear-gradient(to right, #a855f7, #4f46e5)", bg: "linear-gradient(to bottom right, #f3e8ff, #e0e7ff)" },
  { id: 2, title: "Viaje interactivo por la lectura", description: "Embárcate en un viaje interactivo donde la lectura cobra vida con tecnología.", icon: "🚀", color: "linear-gradient(to right, #3b82f6, #06b6d4)", bg: "linear-gradient(to bottom right, #dbeafe, #cffafe)" },
  { id: 3, title: "Reto lector: ¡Atrévete a responder!", description: "Pon a prueba tu comprensión lectora con desafíos interactivos y preguntas dinámicas.", icon: "🏆", color: "linear-gradient(to right, #f97316, #ef4444)", bg: "linear-gradient(to bottom right, #ffedd5, #fee2e2)" },
  { id: 4, title: "Palabras que construyen significado", description: "Descubre cómo las palabras se conectan para crear significados profundos en español e inglés.", icon: "📚", color: "linear-gradient(to right, #22c55e, #10b981)", bg: "linear-gradient(to bottom right, #dcfce7, #d1fae5)" },
  { id: 5, title: "Creamos para demostrar lo que comprendimos", description: "Demuestra todo lo aprendido creando tu propio contenido digital interactivo.", icon: "🎨", color: "linear-gradient(to right, #ec4899, #f43f5e)", bg: "linear-gradient(to bottom right, #fce7f3, #ffe4e6)" }
];

// ============ ESTILOS ============
const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%); color: white; overflow-x: hidden; }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes pulse-glow { 0%,100%{box-shadow:0 0 5px rgba(255,200,0,0.5)} 50%{box-shadow:0 0 25px rgba(255,200,0,0.9)} }
@keyframes bounce-in { 0%{transform:scale(0)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
@keyframes slideIn { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-bounce-in { animation: bounce-in 0.5s ease-out forwards; }

.btn-settings { position: fixed; top: 16px; right: 16px; z-index: 9999; background-color: #f97316; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #fde047; box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer; font-size: 28px; }
.btn-settings:hover { background-color: #ea580c; }

.header { background: linear-gradient(to right, rgba(49,46,129,0.8), rgba(88,28,135,0.8), rgba(157,23,77,0.8)); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 16px; }
.header-content { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
.school-info { display: flex; align-items: center; gap: 12px; }
.school-logo { width: 56px; height: 56px; background: linear-gradient(135deg, #facc15, #f97316); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.school-name h1 { font-size: 18px; font-weight: bold; }
.school-name p { font-size: 12px; color: #c4b5fd; }
.stats { display: flex; gap: 12px; flex-wrap: wrap; }
.stat-box { background: rgba(255,255,255,0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; gap: 8px; }
.stat-box .label { font-size: 10px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-box .value { font-size: 14px; font-weight: bold; }
.stat-box .value.yellow { color: #fde047; }
.stat-box .value.cyan { color: #67e8f9; }
.stat-box .value.green { color: #86efac; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
.section { padding: 24px 0; }
.card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.objective-card { display: flex; align-items: flex-start; gap: 16px; }
.objective-card .icon { font-size: 36px; animation: float 3s ease-in-out infinite; }
.objective-card h2 { font-size: 20px; font-weight: bold; color: #fde047; margin-bottom: 8px; }
.objective-card p { color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.6; }

.badges-section h3 { font-size: 18px; font-weight: bold; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.badges-grid { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
.badge-item { display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.5s; }
.badge-item.locked { opacity: 0.4; filter: grayscale(1); }
.badge-circle { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.badge-circle.earned { border: 4px solid #fde047; animation: pulse-glow 2s ease-in-out infinite; }
.badge-circle.locked { background: #4b5563; border: 4px solid #6b7280; }
.badge-label { font-size: 10px; text-align: center; max-width: 80px; line-height: 1.2; font-weight: 500; }
.badge-xp { font-size: 9px; color: #fde047; font-weight: bold; }

.missions-title { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 24px; }
.missions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.mission-card { border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.3); position: relative; overflow: hidden; transition: all 0.3s ease; }
.mission-card:hover { transform: translateY(-5px) scale(1.02); }
.mission-card.completed { border-color: #fde047; animation: pulse-glow 2s ease-in-out infinite; }
.mission-card .check-mark { position: absolute; top: 12px; right: 12px; background: #fde047; color: #713f12; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
.mission-icon { font-size: 48px; margin-bottom: 16px; animation: float 3s ease-in-out infinite; }
.mission-card h3 { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
.mission-card h4 { font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 12px; }
.mission-card p { font-size: 14px; color: #4b5563; margin-bottom: 20px; }
.btn-start { width: 100%; padding: 12px 24px; border-radius: 12px; font-weight: bold; color: white; border: none; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.btn-start:hover { opacity: 0.9; transform: scale(1.05); }

.progress-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.progress-section span { font-weight: bold; }
.progress-bar { width: 100%; background: #374151; border-radius: 8px; height: 16px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(to right, #facc15, #f97316, #ef4444); border-radius: 8px; transition: width 1s ease-out; }

.footer { text-align: center; padding: 32px 16px; }
.footer p { color: rgba(255,255,255,0.6); font-size: 14px; }
.footer .small { color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 8px; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 16px; }
.modal-box { background: white; border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); width: 100%; max-width: 420px; overflow: hidden; animation: bounce-in 0.4s ease-out; }
.modal-header { background: linear-gradient(to right, #4f46e5, #9333ea); padding: 20px; display: flex; align-items: center; justify-content: space-between; }
.modal-header .title-area { display: flex; align-items: center; gap: 12px; }
.modal-header .title-area span { font-size: 28px; }
.modal-header h2 { font-size: 20px; font-weight: bold; color: white; }
.modal-header .subtitle { font-size: 12px; color: rgba(255,255,255,0.7); }
.modal-close { background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
.modal-close:hover { background: rgba(255,255,255,0.2); }
.modal-body { padding: 24px; }
.modal-body h3 { font-size: 18px; font-weight: bold; color: #1f2937; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.modal-body .description { font-size: 14px; color: #6b7280; margin-bottom: 16px; }
.modal-body label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px; }
.modal-body input[type="password"] { width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; transition: all 0.3s; font-family: inherit; }
.modal-body input[type="password"]:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
.error-msg { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; font-size: 14px; color: #dc2626; margin-bottom: 16px; }
.btn-verify { width: 100%; padding: 12px; background: linear-gradient(to right, #6366f1, #9333ea); color: white; font-weight: bold; border: none; border-radius: 12px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.btn-verify:hover { opacity: 0.9; }
.settings-options { display: flex; flex-direction: column; gap: 8px; }
.settings-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 12px; border: 2px solid; cursor: pointer; text-align: left; transition: all 0.3s; background: none; font-family: inherit; }
.settings-btn.logout { background: #fef2f2; border-color: #fecaca; }
.settings-btn.logout:hover { background: #fee2e2; }
.settings-btn.back { background: #f9fafb; border-color: #e5e7eb; }
.settings-btn.back:hover { background: #f3f4f6; }

.mission-page { min-height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #312e81 50%, #581c87 100%); }
.mission-nav { background: rgba(0,0,0,0.3); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; position: sticky; top: 0; z-index: 40; }
.mission-nav-content { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.btn-back { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); border: none; border-radius: 8px; padding: 8px 16px; cursor: pointer; font-size: 14px; }
.btn-back:hover { background: rgba(255,255,255,0.2); color: white; }
.mission-info { display: flex; align-items: center; gap: 12px; }
.mission-info .icon { font-size: 24px; }
.mission-info .label { font-size: 12px; color: rgba(255,255,255,0.6); }
.mission-info .title { font-size: 14px; font-weight: bold; }
.nav-actions { display: flex; gap: 8px; align-items: center; }
.btn-save { background: linear-gradient(to right, #3b82f6, #06b6d4); color: white; font-weight: bold; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.btn-save:hover { opacity: 0.9; }
.btn-complete { background: linear-gradient(to right, #22c55e, #10b981); color: white; font-weight: bold; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.btn-complete:hover { opacity: 0.9; }

.tabs { display: flex; gap: 8px; max-width: 1200px; margin: 16px auto 0; padding: 0 16px; }
.tab-btn { flex: 1; padding: 12px 16px; border-radius: 12px 12px 0 0; font-weight: bold; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s; font-family: inherit; }
.tab-btn.active { background: white; color: #4338ca; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.tab-btn.inactive { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
.tab-btn.inactive:hover { background: rgba(255,255,255,0.2); }

.content-area { max-width: 1200px; margin: 0 auto; padding: 0 16px 100px; }
.content-box { background: white; border-radius: 0 16px 16px 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); min-height: 60vh; padding: 24px; color: #1f2937; }
.content-box h3 { font-size: 18px; font-weight: bold; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.content-box .description { font-size: 14px; color: #6b7280; margin-bottom: 16px; }
.content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 768px) { .content-grid { grid-template-columns: 1fr; } }
.form-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: bold; color: #374151; margin-bottom: 12px; }
.text-area { width: 100%; height: 250px; padding: 16px; border: 2px solid #c7d2fe; border-radius: 12px; font-size: 14px; resize: none; font-family: inherit; transition: all 0.3s; }
.text-area:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
.image-upload { border: 2px dashed #c7d2fe; border-radius: 12px; padding: 16px; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(238,242,255,0.5); }
.image-upload .upload-icon { font-size: 48px; margin-bottom: 12px; }
.image-upload .upload-text { font-size: 14px; color: #6b7280; margin-bottom: 12px; text-align: center; }
.btn-upload { background: linear-gradient(to right, #6366f1, #9333ea); color: white; padding: 8px 16px; border-radius: 8px; border: none; font-size: 14px; font-weight: bold; cursor: pointer; }
.btn-upload:hover { opacity: 0.9; }
.image-preview { width: 100%; height: 100%; position: relative; min-height: 200px; }
.image-preview img { width: 100%; height: 100%; object-fit: contain; border-radius: 8px; }
.image-preview .remove-btn { position: absolute; top: 8px; right: 8px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 12px; }
.url-input { width: 100%; padding: 12px; border: 2px solid #c7d2fe; border-radius: 12px; font-size: 14px; transition: all 0.3s; font-family: inherit; }
.url-input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
.embed-toggle { display: flex; gap: 8px; margin-bottom: 16px; }
.embed-toggle button { padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold; border: none; cursor: pointer; transition: all 0.3s; font-family: inherit; }
.embed-toggle button.active { background: #6366f1; color: white; }
.embed-toggle button.inactive { background: #f3f4f6; color: #4b5563; }
.preview-box { width: 100%; height: 250px; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #f9fafb; }
.preview-box iframe { width: 100%; height: 100%; border: none; }
.preview-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #9ca3af; text-align: center; padding: 20px; }
.hint-box { border-radius: 8px; padding: 12px; margin-top: 12px; }
.hint-box.blue { background: #eff6ff; border: 1px solid #bfdbfe; }
.hint-box.green { background: #f0fdf4; border: 1px solid #bbf7d0; }
.hint-box .hint-title { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
.hint-box ul { font-size: 12px; padding-left: 16px; }
.hint-box.blue .hint-title { color: #1d4ed8; }
.hint-box.blue ul { color: #2563eb; }
.hint-box.green .hint-title { color: #15803d; }
.hint-box.green ul { color: #16a34a; }

.save-message { position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: #22c55e; color: white; padding: 12px 24px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 8px; font-weight: bold; z-index: 9998; animation: slideIn 0.3s ease-out; }

.success-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 10001; }
.success-box { background: linear-gradient(135deg, #facc15, #f97316); border-radius: 24px; padding: 32px; text-align: center; animation: bounce-in 0.5s ease-out; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
.success-box .trophy { font-size: 64px; margin-bottom: 16px; }
.success-box h2 { font-size: 28px; font-weight: bold; color: white; margin-bottom: 8px; }
.success-box p { color: rgba(255,255,255,0.9); font-size: 18px; }
.success-stars { margin-top: 16px; display: flex; justify-content: center; gap: 8px; }
.success-stars span { font-size: 32px; animation: float 3s ease-in-out infinite; }

.bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; z-index: 30; }
.bottom-bar-content { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.bottom-bar .mission-label { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 500; }
.bottom-bar .actions { display: flex; gap: 8px; }

.login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%); }
.login-box { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 25px 50px rgba(0,0,0,0.5); text-align: center; max-width: 400px; }
.login-box .lock-icon { font-size: 64px; margin-bottom: 16px; }
.login-box h2 { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
.login-box p { color: rgba(255,255,255,0.7); margin-bottom: 24px; }
.btn-login { background: linear-gradient(to right, #6366f1, #9333ea); color: white; font-weight: bold; padding: 12px 24px; border-radius: 12px; border: none; font-size: 16px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
.btn-login:hover { opacity: 0.9; }

@media (max-width: 640px) {
  .missions-grid { grid-template-columns: 1fr; }
  .header-content { flex-direction: column; text-align: center; }
  .stats { justify-content: center; }
}
`;

// ============ COMPONENTE PRINCIPAL ============
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeMission, setActiveMission] = useState<number | null>(null);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsVerified, setSettingsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'interactive'>('content');
  const [embedMode, setEmbedMode] = useState<'url' | 'code'>('url');
  const [missionData, setMissionData] = useState<Record<number, MissionData>>({});
  const [showSaveMsg, setShowSaveMsg] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getLevel = () => {
    const c = completedMissions.length;
    if (c === 0) return { name: "Explorador", icon: "🌱" };
    if (c <= 2) return { name: "Aprendiz", icon: "📖" };
    if (c <= 4) return { name: "Lector Avanzado", icon: "⭐" };
    return { name: "Maestro Lector", icon: "👑" };
  };

  const getData = (id: number): MissionData => missionData[id] || { text: '', imageUrl: '', embedUrl: '', embedCode: '' };
  const updateData = (id: number, field: keyof MissionData, value: string) => {
    setMissionData(prev => ({ ...prev, [id]: { ...getData(id), [field]: value } }));
  };

  const handleSave = () => {
    setShowSaveMsg(true);
    setTimeout(() => setShowSaveMsg(false), 2000);
  };

  const handleComplete = () => {
    if (activeMission && !completedMissions.includes(activeMission)) {
      setCompletedMissions([...completedMissions, activeMission]);
      setTotalXP(totalXP + 200);
    }
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); setActiveMission(null); }, 2500);
  };

  const handleVerifyPassword = () => {
    if (password === CORRECT_PASSWORD) {
      setSettingsVerified(true);
      setPasswordError('');
    } else {
      setPasswordError('❌ Contraseña incorrecta. Intente nuevamente.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowSettings(false);
    setSettingsVerified(false);
    setActiveMission(null);
    setCompletedMissions([]);
    setTotalXP(0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeMission) {
      const reader = new FileReader();
      reader.onloadend = (ev) => {
        updateData(activeMission, 'imageUrl', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Inyectar estilos
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => { document.head.removeChild(styleEl); };
  }, []);

  // ===== LOGIN SCREEN =====
  if (!isAuthenticated) {
    return (
      <>
        <button className="btn-settings" onClick={() => { setShowSettings(true); setSettingsVerified(false); }}>⚙️</button>
        <div className="login-screen">
          <div className="login-box">
            <div className="lock-icon">🔒</div>
            <h2>Sesión Cerrada</h2>
            <p>Has cerrado sesión exitosamente</p>
            <button className="btn-login" onClick={() => setIsAuthenticated(true)}>Iniciar Sesión</button>
          </div>
        </div>
        {showSettings && <SettingsModal />}
      </>
    );
  }

  // ===== MISSION PAGE =====
  if (activeMission !== null) {
    const mission = MISSIONS[activeMission - 1];
    const data = getData(activeMission);

    return (
      <>
        <button className="btn-settings" onClick={() => { setShowSettings(true); setSettingsVerified(false); }}>⚙️</button>
        <div className="mission-page">
          <div className="mission-nav">
            <div className="mission-nav-content">
              <button className="btn-back" onClick={() => setActiveMission(null)}>
                <span>←</span><span>Volver al Mapa</span>
              </button>
              <div className="mission-info">
                <span className="icon">{mission.icon}</span>
                <div>
                  <p className="label">Misión {mission.id}</p>
                  <p className="title">{mission.title}</p>
                </div>
              </div>
              <div className="nav-actions">
                <button className="btn-save" onClick={handleSave}><span>💾</span><span>Guardar</span></button>
                <button className="btn-complete" onClick={handleComplete}><span>✅</span><span>Completar</span></button>
              </div>
            </div>
          </div>

          <div className="tabs">
            <button className={`tab-btn ${activeTab === 'content' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('content')}>
              <span>📝</span> Contenido (Texto/Imagen)
            </button>
            <button className={`tab-btn ${activeTab === 'interactive' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('interactive')}>
              <span>💻</span> Contenido Interactivo
            </button>
          </div>

          <div className="content-area">
            <div className="content-box">
              {activeTab === 'content' ? (
                <>
                  <h3><span style={{ fontSize: 24 }}>📝</span> Espacio de Contenido - Misión {mission.id}</h3>
                  <p className="description">{mission.description}</p>
                  <div className="content-grid">
                    <div>
                      <label className="form-label"><span>✏️</span> Área de Texto</label>
                      <textarea className="text-area" placeholder="Escribe aquí el contenido de la misión..." value={data.text} onChange={e => updateData(activeMission, 'text', e.target.value)} />
                      <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{data.text.length} caracteres</p>
                    </div>
                    <div>
                      <label className="form-label"><span>🖼️</span> Imagen de la Misión</label>
                      <div className="image-upload">
                        {data.imageUrl ? (
                          <div className="image-preview">
                            <img src={data.imageUrl} alt="Preview" />
                            <button className="remove-btn" onClick={() => updateData(activeMission, 'imageUrl', '')}>✕</button>
                          </div>
                        ) : (
                          <>
                            <div className="upload-icon">📷</div>
                            <p className="upload-text">Selecciona una imagen para la misión</p>
                            <button className="btn-upload" onClick={() => fileInputRef.current?.click()}>Seleccionar Imagen</button>
                            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                          </>
                        )}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <label style={{ fontSize: 12, color: '#6b7280' }}>O pega una URL de imagen:</label>
                        <input type="text" className="url-input" style={{ marginTop: 4 }} placeholder="https://ejemplo.com/imagen.jpg" value={data.imageUrl} onChange={e => updateData(activeMission, 'imageUrl', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3><span style={{ fontSize: 24 }}>💻</span> Contenido Interactivo - Misión {mission.id}</h3>
                  <p className="description">Incrusta contenido interactivo: videos de Edpuzzle, páginas web, actividades HTML o scripts.</p>
                  <div className="embed-toggle">
                    <button className={embedMode === 'url' ? 'active' : 'inactive'} onClick={() => setEmbedMode('url')}>🌐 URL / Iframe</button>
                    <button className={embedMode === 'code' ? 'active' : 'inactive'} onClick={() => setEmbedMode('code')}>📋 Código HTML/Script</button>
                  </div>
                  <div className="content-grid">
                    <div>
                      {embedMode === 'url' ? (
                        <>
                          <label className="form-label"><span>🔗</span> URL del Contenido</label>
                          <input type="url" className="url-input" placeholder="https://edpuzzle.com/media/... o cualquier URL" value={data.embedUrl} onChange={e => updateData(activeMission, 'embedUrl', e.target.value)} />
                          <div className="hint-box blue">
                            <p className="hint-title">💡 Sugerencias:</p>
                            <ul><li>Videos de Edpuzzle: copia la URL del video</li><li>Google Forms para actividades</li><li>Páginas web educativas</li><li>Presentaciones de Google Slides</li></ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="form-label"><span>📝</span> Código HTML / Script</label>
                          <textarea className="text-area" style={{ fontFamily: 'monospace', fontSize: 13 }} placeholder={'<iframe src="..." width="100%" height="400px"></iframe>'} value={data.embedCode} onChange={e => updateData(activeMission, 'embedCode', e.target.value)} />
                          <div className="hint-box green">
                            <p className="hint-title">💡 Puedes incluir:</p>
                            <ul><li>Iframes de Edpuzzle</li><li>Código HTML personalizado</li><li>Widgets interactivos</li><li>Scripts embebidos</li></ul>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <label className="form-label"><span>👁️</span> Vista Previa Interactiva</label>
                      <div className="preview-box">
                        {embedMode === 'url' && data.embedUrl ? (
                          <iframe src={data.embedUrl} sandbox="allow-scripts allow-same-origin allow-popups allow-forms" title="preview" />
                        ) : embedMode === 'code' && data.embedCode ? (
                          <div style={{ width: '100%', height: '100%', overflow: 'auto', background: 'white' }} dangerouslySetInnerHTML={{ __html: data.embedCode }} />
                        ) : (
                          <div className="preview-placeholder">
                            <div>
                              <p style={{ fontSize: 48, marginBottom: 16 }}>📎</p>
                              <p style={{ fontSize: 16 }}>Ingresa una URL o código HTML para incrustar contenido</p>
                              <p style={{ fontSize: 13, marginTop: 8, color: '#6b7280' }}>Ejemplo: Videos de Edpuzzle, páginas web, actividades interactivas</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bottom-bar">
            <div className="bottom-bar-content">
              <div className="mission-label">
                <span style={{ fontSize: 18 }}>{mission.icon}</span>
                <span>Misión {mission.id} de 5</span>
              </div>
              <div className="actions">
                <button className="btn-back" onClick={() => setActiveMission(null)}>← Mapa</button>
                <button className="btn-save" onClick={handleSave}>💾 Guardar</button>
                <button className="btn-complete" onClick={handleComplete}>✅ Completar (+200 XP)</button>
              </div>
            </div>
          </div>
        </div>

        {showSaveMsg && (
          <div className="save-message"><span style={{ fontSize: 20 }}>💾</span><span>¡Contenido guardado exitosamente!</span></div>
        )}
        {showSuccess && (
          <div className="success-modal">
            <div className="success-box">
              <div className="trophy">🏆</div>
              <h2>¡Misión Completada!</h2>
              <p>+200 XP ganados</p>
              <div className="success-stars">
                <span>⭐</span><span style={{ animationDelay: '0.2s' }}>🌟</span><span style={{ animationDelay: '0.4s' }}>⭐</span>
              </div>
            </div>
          </div>
        )}
        {showSettings && <SettingsModal />}
      </>
    );
  }

  // ===== MAIN SCREEN =====
  const level = getLevel();

  function SettingsModal() {
    return (
      <div className="modal-overlay" onClick={() => { setShowSettings(false); setSettingsVerified(false); setPassword(''); setPasswordError(''); }}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="title-area">
              <span>⚙️</span>
              <div><h2>Ajustes</h2><p className="subtitle">Panel de configuración</p></div>
            </div>
            <button className="modal-close" onClick={() => { setShowSettings(false); setSettingsVerified(false); setPassword(''); setPasswordError(''); }}>✕</button>
          </div>
          <div className="modal-body">
            {!settingsVerified ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>🔐</span>
                  <h3 style={{ margin: 0 }}>Verificación de Seguridad</h3>
                </div>
                <p className="description">Ingresa la clave de administrador para acceder a los ajustes.</p>
                <label>Contraseña:</label>
                <input type="password" placeholder="Ingresa la clave..." value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleVerifyPassword()} autoFocus />
                {passwordError && <div className="error-msg">{passwordError}</div>}
                <button className="btn-verify" style={{ marginTop: 12 }} onClick={handleVerifyPassword}>🔓 Verificar</button>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>✅</span>
                  <h3 style={{ margin: 0 }}>Acceso Concedido</h3>
                </div>
                <div className="settings-options">
                  <button className="settings-btn logout" onClick={handleLogout}>
                    <span style={{ fontSize: 24 }}>🚪</span>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <p style={{ fontWeight: 'bold', fontSize: 14, color: '#b91c1c' }}>Cerrar Sesión</p>
                      <p style={{ fontSize: 12, color: '#6b7280' }}>Salir del módulo didáctico</p>
                    </div>
                    <span style={{ fontSize: 18, color: '#f87171' }}>→</span>
                  </button>
                  <button className="settings-btn back" onClick={() => { setShowSettings(false); setSettingsVerified(false); setPassword(''); }}>
                    <span style={{ fontSize: 24 }}>↩️</span>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <p style={{ fontWeight: 'bold', fontSize: 14, color: '#374151' }}>Volver</p>
                      <p style={{ fontSize: 12, color: '#6b7280' }}>Regresar al módulo</p>
                    </div>
                    <span style={{ fontSize: 18, color: '#9ca3af' }}>→</span>
                  </button>
                </div>
                <div style={{ marginTop: 16, padding: 12, background: '#eef2ff', borderRadius: 8, border: '1px solid #c7d2fe', textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#4338ca' }}>🏫 I.E. Santa Rosa | Módulo de Comprensión Lectora</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* BOTÓN DE AJUSTES FIJO */}
      <button className="btn-settings" onClick={() => { setShowSettings(true); setSettingsVerified(false); }}>⚙️</button>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="school-info">
            <div className="school-logo">🏫</div>
            <div className="school-name"><h1>I.E. Santa Rosa</h1><p>Módulo de Comprensión Lectora</p></div>
          </div>
          <div className="stats">
            <div className="stat-box">
              <span style={{ fontSize: 20 }}>{level.icon}</span>
              <div><p className="label">Nivel</p><p className="value yellow">{level.name}</p></div>
            </div>
            <div className="stat-box">
              <span style={{ fontSize: 20 }}>⚡</span>
              <div><p className="label">XP</p><p className="value cyan">{totalXP}</p></div>
            </div>
            <div className="stat-box">
              <span style={{ fontSize: 20 }}>🎯</span>
              <div><p className="label">Misiones</p><p className="value green">{completedMissions.length}/5</p></div>
            </div>
          </div>
        </div>
      </header>

      {/* Objetivo */}
      <div className="container section">
        <div className="card">
          <div className="objective-card">
            <div className="icon">🎯</div>
            <div>
              <h2>Objetivo del Módulo</h2>
              <p>Fortalecer la comprensión lectora en español e inglés mediante el diseño e implementación de estrategias didácticas digitales interactivas apoyadas en Edpuzzle y otras herramientas tecnológicas, con el fin de favorecer la interpretación, la ampliación del vocabulario y la evaluación formativa de los estudiantes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insignias */}
      <div className="container section">
        <div className="card badges-section">
          <h3><span style={{ fontSize: 24 }}>🏅</span> Insignias Ganadas</h3>
          <div className="badges-grid">
            {MISSIONS.map(m => {
              const earned = completedMissions.includes(m.id);
              return (
                <div key={m.id} className={`badge-item ${earned ? '' : 'locked'}`}>
                  <div className={`badge-circle ${earned ? 'earned' : 'locked'}`} style={earned ? { background: m.color } : {}}>
                    {earned ? m.icon : '🔒'}
                  </div>
                  <span className="badge-label">{m.title.split(' ').slice(0, 3).join(' ')}</span>
                  {earned && <span className="badge-xp">+200 XP</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Misiones */}
      <div className="container section">
        <h2 className="missions-title"><span style={{ fontSize: 28 }}>🗺️</span> Mapa de Misiones</h2>
        <div className="missions-grid">
          {MISSIONS.map((m, i) => {
            const completed = completedMissions.includes(m.id);
            return (
              <div key={m.id} className={`mission-card ${completed ? 'completed' : ''}`} style={{ background: m.bg }}>
                {completed && <div className="check-mark">✓</div>}
                <div className="mission-icon" style={{ animationDelay: `${i * 0.3}s` }}>{m.icon}</div>
                <h3>Misión {m.id}</h3>
                <h4>{m.title}</h4>
                <p>{m.description}</p>
                <button className="btn-start" style={{ background: m.color }} onClick={() => { setActiveMission(m.id); setActiveTab('content'); }}>
                  <span>🚀</span>
                  <span>{completed ? 'Revisar' : 'Iniciar'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progreso */}
      <div className="container section">
        <div className="card">
          <div className="progress-section">
            <span>Progreso General</span>
            <span style={{ color: '#fde047' }}>{completedMissions.length}/5 Misiones</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(completedMissions.length / 5) * 100}%` }}></div>
          </div>
          {completedMissions.length === 5 && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span style={{ fontSize: 24 }}>🎉🏆🎉</span>
              <p style={{ color: '#fde047', fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>¡Felicidades! ¡Has completado todas las misiones!</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Institución Educativa Santa Rosa | Módulo de Comprensión Lectora</p>
        <p className="small">Diseñado con ❤️ para fortalecer la lectura en español e inglés</p>
      </footer>

      {/* Modal de Ajustes */}
      {showSettings && <SettingsModal />}
    </>
  );
}

export default App;
