export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric 'Wire' Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-accent"
      >
        {/* Outer hexagon */}
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        {/* Inner wire routing */}
        <path
          d="M 50 5 L 50 35 M 5 27.5 L 35 50 M 95 27.5 L 65 50 M 5 72.5 L 35 50 M 95 72.5 L 65 50 M 50 95 L 50 65"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        {/* Central shape representing 'N' and 'ID' combined geometrically */}
        <path
          d="M 35 35 L 35 65 L 65 35 L 65 65"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="bevel"
        />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>

      {/* Text mark */}
      <div className="flex flex-col">
        <span className="font-bebas text-2xl leading-none tracking-wider text-white">
          SOUND <span className="text-accent">NID</span>
        </span>
      </div>
    </div>
  );
}
