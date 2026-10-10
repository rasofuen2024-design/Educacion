interface BadgeProps {
  icon: string;
  title: string;
  earned: boolean;
  color: string;
}

export default function Badge({ icon, title, earned, color }: BadgeProps) {
  return (
    <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${earned ? 'badge-earned' : 'opacity-40 grayscale'}`}>
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg
          ${earned 
            ? `bg-gradient-to-br ${color} border-4 border-yellow-400 animate-pulse-glow` 
            : 'bg-gray-600 border-4 border-gray-500'
          }`}
      >
        {earned ? icon : '🔒'}
      </div>
      <span className={`text-[10px] text-center font-medium max-w-[80px] leading-tight ${earned ? 'text-white' : 'text-gray-500'}`}>
        {title.split(' ').slice(0, 3).join(' ')}
      </span>
      {earned && (
        <span className="text-[9px] text-yellow-300 font-bold">+200 XP</span>
      )}
    </div>
  );
}
