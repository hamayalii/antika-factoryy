import { useState, useEffect } from "react";

interface TeamMemberCardProps {
  name: string;
  description: string;
  cta?: string;
  imageSrc: string;
  style?: React.CSSProperties;
}

export function TeamMemberCard({
  name,
  description,
  cta = "ڕاوێژکاری پیشەگەرانە | Professional Consultation",
  imageSrc,
  style,
}: TeamMemberCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleClick = () => {
    if (!supportsHover) {
      setIsActive(!isActive);
    }
  };

  return (
    <article
      className="member-card"
      tabIndex={0}
      onClick={handleClick}
      style={{
        position: 'relative',
        direction: 'ltr',
        width: '100%',
        maxWidth: 'clamp(280px, 90vw, 380px)',
        aspectRatio: '530 / 548',
        overflow: 'hidden',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '0',
        fontFamily: '"Work Sans", sans-serif',
        background: '#fff',
        containerType: 'inline-size',
        ...style,
      }}
    >
      <img
        className="member-card__photo"
        src={imageSrc}
        alt={name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        loading="lazy"
        decoding="async"
      />
      <div
        className="member-card__strip"
        style={{
          position: 'absolute',
          inset: 0,
          width: '200%',
          display: 'flex',
          zIndex: 1,
          transition: 'transform 0.25s cubic-bezier(0.22, 0.8, 0.3, 1)',
          willChange: 'transform',
          transform: isActive ? 'translateX(-50%)' : 'translateX(0)',
        }}
      >
        <div
          className="mc-panel mc-panel--default"
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 8%',
            boxSizing: 'border-box',
            justifyContent: 'flex-end',
            paddingBottom: '9%',
            color: '#fff',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '3.5cqw',
              fontWeight: 600,
              lineHeight: 1.7,
            }}
          >
            {name}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: '3.5cqw',
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: '85%',
            }}
          >
            {description}
          </p>
        </div>
        <div
          className="mc-panel mc-panel--hover"
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 8%',
            boxSizing: 'border-box',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.74)',
            color: '#444',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '3.5cqw',
              fontWeight: 600,
              lineHeight: 1.7,
              color: '#111',
            }}
          >
            {name}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: '3.5cqw',
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: '85%',
            }}
          >
            {description}
          </p>
          <span
            className="mc-cta"
            style={{
              marginTop: '1.5em',
              fontSize: '3.5cqw',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {cta}
          </span>
        </div>
      </div>
      <style>{`
        @media (hover: hover) {
          .member-card:hover .member-card__strip {
            transform: translateX(-50%) !important;
          }
        }
        .member-card:focus-visible .member-card__strip,
        .member-card.is-active .member-card__strip {
          transform: translateX(-50%) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .member-card__strip {
            transition: none !important;
          }
        }
      `}</style>
    </article>
  );
}
