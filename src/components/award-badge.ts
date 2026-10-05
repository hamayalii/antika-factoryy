export function initAwardBadge(el: HTMLElement) {
  const s = { rx: 0, ry: 0, bx: 50, fx: 0, hue: 0, lift: 0 };   // current (smoothed)
  const t = { rx: 0, ry: 0, bx: 50, fx: 0, hue: 0, lift: 0 };   // target
  let raf = 0, last: number | null = null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;   // -0.5 … 0.5
    const py = (e.clientY - r.top)  / r.height - 0.5;
    t.ry =  px * 22;           // tilt toward the pointer
    t.rx = -py * 26;
    t.bx = 100 - (px + 0.5) * 100;   // shine travels with the pointer
    t.fx = Math.max(0, Math.min(100, 100 - (px + 0.5) * 100)) * 0.9 + 4;
    t.hue = px * 28 + py * 16;       // iridescent colour shift
    t.lift = 1;
    kick();
  };
  const onLeave = () => { t.rx = t.ry = 0; t.bx = 50; t.fx = 0; t.hue = 0; t.lift = 0; kick(); };

  const kick = () => { if (!raf && !reduce) raf = requestAnimationFrame(tick); };
  const tick = (now: number) => {
    const dt = Math.min(32, now - (last ?? now)); last = now;
    const k = 1 - Math.exp(-dt / 70);            // smoothing (spring-like)
    let moving = false;
    for (const key in s) { s[key as keyof typeof s] += (t[key as keyof typeof t] - s[key as keyof typeof s]) * k; if (Math.abs(t[key as keyof typeof t] - s[key as keyof typeof s]) > 0.01) moving = true; }
    el.style.setProperty('--rx', s.rx.toFixed(2) + 'deg');
    el.style.setProperty('--ry', s.ry.toFixed(2) + 'deg');
    el.style.setProperty('--bx', s.bx.toFixed(2) + '%');
    el.style.setProperty('--fx', s.fx.toFixed(2) + '%');
    el.style.setProperty('--hue', s.hue.toFixed(1) + 'deg');
    el.style.setProperty('--lift', s.lift.toFixed(3));
    if (moving) raf = requestAnimationFrame(tick); else { raf = 0; last = null; }
  };
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);
  return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf); };
}
