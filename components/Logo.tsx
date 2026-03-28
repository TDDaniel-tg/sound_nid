export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo image */}
      <img
        src="/telegram_assets/logo.jpg"
        alt="Sound NID"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Text mark */}
      <div className="flex flex-col">
        <span className="font-bebas text-2xl leading-none tracking-wider text-white">
          SOUND <span className="text-accent">NID</span>
        </span>
      </div>
    </div>
  );
}
