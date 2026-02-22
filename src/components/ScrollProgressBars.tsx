import { useRef, useEffect } from 'react';

export function ScrollProgressBars() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;
      const pct = Math.min(scrollTop / scrollHeight, 1);
      const h = `${pct * 100}%`;
      const opacity = pct > 0.005 ? '1' : '0';
      if (leftRef.current) {
        leftRef.current.style.opacity = opacity;
        leftRef.current.children[1] && ((leftRef.current.children[1] as HTMLElement).style.height = h);
      }
      if (rightRef.current) {
        rightRef.current.style.opacity = opacity;
        rightRef.current.children[1] && ((rightRef.current.children[1] as HTMLElement).style.height = h);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const containerClass = 'fixed top-0 z-[60] h-screen pointer-events-none transition-opacity duration-300';
  const trackClass = 'absolute top-0 h-full w-full rounded-full bg-zinc-200/40 dark:bg-zinc-700/30';
  const thumbClass = 'absolute top-0 w-full rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 dark:from-amber-500 dark:via-amber-400 dark:to-orange-400 shadow-[0_0_6px_rgba(251,191,36,0.35)]';
  const thumbStyle = { height: '0%', transition: 'height 0.08s linear' };

  return (
    <>
      <div ref={leftRef} className={`${containerClass} left-0 w-[3px]`} style={{ opacity: 0 }}>
        <div className={trackClass} />
        <div className={thumbClass} style={thumbStyle} />
      </div>
      <div ref={rightRef} className={`${containerClass} right-0 w-[3px]`} style={{ opacity: 0 }}>
        <div className={trackClass} />
        <div className={thumbClass} style={thumbStyle} />
      </div>
    </>
  );
}
