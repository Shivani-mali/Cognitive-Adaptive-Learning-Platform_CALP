import React from 'react';

export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className = "",
  style = {},
  children,
  ...props
}) {
  const colors = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'inherit',
        ...style
      }}
      className={className}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          padding: `${borderWidth}px`,
          backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          willChange: 'background-position',
          animation: `shine ${duration}s linear infinite`,
          zIndex: -1
        }}
      />
      {children}
      <style>{`
        @keyframes shine {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}</style>
    </div>
  );
}
