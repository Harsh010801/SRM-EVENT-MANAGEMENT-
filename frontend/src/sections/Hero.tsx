import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Calendar, value: '8+', label: 'Events' },
    { icon: Users, value: '4000+', label: 'Participants' },
    { icon: Sparkles, value: '₹13L+', label: 'Prizes' },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/images/srm-campus.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#5B9AFF] rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        style={{
          transform: 'translate(calc(var(--mouse-x, 0px) * -0.5), calc(var(--mouse-y, 0px) * -0.5))',
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#FF6B35]" />
          <span className="text-sm text-white/90">SRM University Presents</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight">
          <span className="block">SRM</span>
          <span className="block text-gradient">EVENTS 2K26</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-white/80 mb-4 font-light">
          Where Innovation Meets Celebration
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Join the biggest technical and cultural fest of the year. Showcase your talents, 
          compete with the best, and create memories that last a lifetime.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-full px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#2B71F8]/30 group"
            asChild
          >
            <a href="#events">
              Explore Events
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
            asChild
          >
            <a href="#register">Register Now</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="flex items-center gap-2 text-[#2B71F8]">
                <stat.icon className="w-5 h-5" />
                <span className="text-3xl sm:text-4xl font-bold text-white group-hover:text-[#5B9AFF] transition-colors">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
