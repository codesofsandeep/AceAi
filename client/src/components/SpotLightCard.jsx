import { useRef, useState } from "react";

const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(255,255,255,0.2)",
}) => {
    const cardRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(0.5)}
            onMouseLeave={() => setOpacity(0)}
            className={`
        relative overflow-hidden rounded-2xl
        border border-white/10 bg-neutral-900
        shadow-sm hover:shadow-xl
        transition-all duration-300
        ${className}
      `}
        >
            {/* Spotlight Glow */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(
            circle at ${pos.x}px ${pos.y}px,
            ${spotlightColor},
            transparent 70%
          )`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default SpotlightCard;
