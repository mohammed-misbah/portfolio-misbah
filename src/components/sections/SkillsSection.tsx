import { useEffect, useState } from 'react';
import { skillIcons } from './SkillIcons';

const skills = [
  { name: 'Python', bg: 'linear-gradient(145deg, hsl(214 38% 62%), hsl(214 34% 54%))', text: 'hsl(0 0% 98%)' },
  { name: 'FastAPI', bg: 'linear-gradient(145deg, hsl(172 38% 52%), hsl(172 34% 44%))', text: 'hsl(0 0% 98%)' },
  { name: 'Django', bg: 'linear-gradient(145deg, hsl(145 30% 42%), hsl(145 26% 35%))', text: 'hsl(0 0% 98%)' },
  { name: 'Flask', bg: 'linear-gradient(145deg, hsl(220 8% 40%), hsl(220 8% 33%))', text: 'hsl(0 0% 98%)' },
  { name: 'React', bg: 'linear-gradient(145deg, hsl(193 45% 58%), hsl(193 40% 50%))', text: 'hsl(0 0% 98%)' },
  { name: 'PostgreSQL', bg: 'linear-gradient(145deg, hsl(215 36% 56%), hsl(215 32% 48%))', text: 'hsl(0 0% 98%)' },
  { name: 'Redis', bg: 'linear-gradient(145deg, hsl(4 42% 58%), hsl(4 38% 50%))', text: 'hsl(0 0% 98%)' },
  { name: 'Docker', bg: 'linear-gradient(145deg, hsl(207 38% 58%), hsl(207 34% 48%))', text: 'hsl(0 0% 98%)' },
  { name: 'AWS', bg: 'linear-gradient(145deg, hsl(30 55% 60%), hsl(30 50% 52%))', text: 'hsl(0 0% 98%)' },
  { name: 'Azure', bg: 'linear-gradient(145deg, hsl(210 38% 56%), hsl(210 34% 46%))', text: 'hsl(0 0% 98%)' },
  { name: 'Celery', bg: 'linear-gradient(145deg, hsl(135 32% 50%), hsl(135 28% 42%))', text: 'hsl(0 0% 98%)' },
];

const POP_DURATION_MS = 420;

const SkillsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let popTimer: number | undefined;
    let nextTimer: number | undefined;
    let isMounted = true;

    const runLoop = () => {
      if (!isMounted) return;

      const randomIndex = Math.floor(Math.random() * skills.length);
      setActiveIndex(randomIndex);

      popTimer = window.setTimeout(() => {
        if (!isMounted) return;

        setActiveIndex(null);

        const nextDelay = 1000 + Math.random() * 1000;
        nextTimer = window.setTimeout(runLoop, nextDelay);
      }, POP_DURATION_MS);
    };

    nextTimer = window.setTimeout(runLoop, 700);

    return () => {
      isMounted = false;
      if (popTimer) window.clearTimeout(popTimer);
      if (nextTimer) window.clearTimeout(nextTimer);
    };
  }, []);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden pastel-gradient">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary rounded-full bg-primary/10 border border-primary/15">
            Tech Stack
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Keyboard Skills Panel
          </h2>
        </div>

        <div
          className="mx-auto max-w-4xl rounded-[2rem] p-6 md:p-10"
          style={{
            background: 'linear-gradient(145deg, hsl(var(--warm-beige) / 0.6), hsl(var(--soft-cream) / 0.5))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow:
              '0 8px 32px hsl(30 15% 50% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.5)',
            border: '1px solid hsl(30 20% 88% / 0.4)',
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {skills.map((skill, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={skill.name}
                  className="relative"
                  style={{
                    transform: isActive ? 'translateY(-10px) scale(1.04)' : 'translateY(0) scale(1)',
                    transition: 'transform 260ms ease',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      transform: isActive ? 'translateY(3px)' : 'translateY(5px)',
                      background: 'hsl(30 18% 72% / 0.35)',
                      filter: isActive ? 'blur(1px)' : 'blur(0.5px)',
                      transition: 'all 260ms ease',
                    }}
                  />

                  <button
                    type="button"
                    aria-label={skill.name}
                    className="relative w-full rounded-2xl px-4 py-4 text-sm md:text-base font-display font-semibold flex items-center justify-center gap-2"
                    style={{
                      background: skill.bg,
                      color: skill.text,
                      opacity: 0.92,
                      boxShadow: isActive
                        ? 'inset -2px -2px 4px hsl(0 0% 100% / 0.2), inset 2px 2px 4px hsl(0 0% 0% / 0.15), 0 12px 20px hsl(30 15% 40% / 0.2)'
                        : 'inset -2px -2px 4px hsl(0 0% 100% / 0.2), inset 2px 2px 4px hsl(0 0% 0% / 0.1), 0 6px 10px hsl(30 15% 50% / 0.1)',
                      transition: 'box-shadow 260ms ease',
                    }}
                  >
                    {(() => { const Icon = skillIcons[skill.name]; return Icon ? <Icon /> : null; })()}
                    {skill.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
