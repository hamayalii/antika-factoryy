import { useEffect, useRef } from "react";
import { initAwardBadge } from "./award-badge";
import "./AwardBadge.css";

type Props = { title: string; subtitle: string; href?: string };

export default function AwardBadge({ title, subtitle, href }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  useEffect(() => (ref.current ? initAwardBadge(ref.current) : undefined), []);

  const badgeContent = (
    <span className="award-badge__card">
      <span className="award-badge__shine" />
      <span className="award-badge__icon award-badge__foil" />
      <span className="award-badge__text">
        <span className="award-badge__title award-badge__foil">{title}</span>
        <span className="award-badge__subtitle award-badge__foil">{subtitle}</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} className="award-badge" href={href} target="_blank" rel="noopener noreferrer">
        {badgeContent}
      </a>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="award-badge">
      {badgeContent}
    </div>
  );
}
