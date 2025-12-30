/**
 * PortfolioPage Component
 * 
 * A high-end, award-winning developer portfolio with a heavily stylized, avant-garde graphic design aesthetic.
 * Features:
 * - GSAP-powered complex timeline animations
 * - "Mixed Media" aesthetic with CSS-generated textures (noise, grain)
 * - Kinetic typography and brutalist layout principles
 * - Interactive WebGL-like distortion effects using SVG filters
 * - Magazine-style layouts with sophisticated scroll interactions
 */

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Globe, Github, Twitter, Mail, Star, MoveUpRight, Hexagon, Trophy, Quote, ArrowDownCircle, Linkedin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Register GSAP plugins immediately
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Visual Assets & Decorative Components ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-[90] mix-blend-overlay opacity-40 overflow-hidden">
    <svg className="absolute inset-0 w-full h-full opacity-40">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const GlobalStyles = () => (
  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 20s linear infinite;
    }
    .animate-spin-slow {
      animation: spin 10s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .text-stroke-1 {
      -webkit-text-stroke: 1px currentColor;
    }
    .text-stroke-2 {
      -webkit-text-stroke: 2px currentColor;
    }
    .clip-text-image {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    
    /* Ensure no horizontal scroll on body */
    body {
      overflow-x: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #F2F0E9; 
    }
    ::-webkit-scrollbar-thumb {
        background: #1A1A1A; 
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
);

const GradientOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/20 blur-[100px] rounded-full mix-blend-multiply opacity-50 animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/20 blur-[100px] rounded-full mix-blend-multiply opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-[60vw] h-[60vw] bg-pink-500/20 blur-[100px] rounded-full mix-blend-multiply opacity-50 animate-blob animation-delay-4000" />
    </div>
  );
};

const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '80px 80px'
    }}
  />
);

const SVGDistortionFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="distort">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="5" seed="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[99999] bg-[#1A1A1A] flex items-center justify-center text-[#F2F0E9]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tighter"
      >
        Portfolio ©2025
      </motion.div>
    </motion.div>
  );
};

const MagneticButton = ({ children, className, hoverEffect = true, onClick }: { children: React.ReactNode, className?: string, hoverEffect?: boolean, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || !hoverEffect) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, { scope: ref });

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn("hover-trigger relative z-10 cursor-none inline-block", className)}
    >
      {children}
    </button>
  );
};

// --- Custom Cursor ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

    // Initial fade in
    gsap.to([cursor, follower], { scale: 1, duration: 0.5, delay: 0.5 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.5; // Increased speed for snappier feel

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const fXSet = gsap.quickSetter(follower, "x", "px");
    const fYSet = gsap.quickSetter(follower, "y", "px");

    const moveCursor = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSet(mouse.x);
      ySet(mouse.y);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, .hover-trigger') !== null;

      if (isInteractive) {
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        gsap.to(follower, {
          scale: 3,
          backgroundColor: "#fff",
          mixBlendMode: "difference",
          opacity: 0.8,
          duration: 0.3
        });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          mixBlendMode: "normal",
          opacity: 1,
          duration: 0.3
        });
      }
    };

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      fXSet(pos.x);
      fYSet(pos.y);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-12 h-12 border border-black rounded-full pointer-events-none z-[9998] transition-all duration-300 hidden md:block" />
    </>
  );
};

// --- Sections ---

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    // Set initial states to avoid FOUC
    gsap.set(".hero-line", { y: 100, opacity: 0, rotateX: -10 });
    gsap.set(".hero-meta", { x: -20, opacity: 0 });
    gsap.set(".hero-img-revealer", { scaleY: 0 });
    gsap.set(".hero-img", { scale: 1.4 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Intro Animation
    tl.to(".hero-line", {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "power4.out"
    })
      .to(".hero-meta", {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      }, "-=1")
      .to(".hero-img-revealer", {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 1.2,
        ease: "expo.inOut"
      }, "-=1.2")
      .to(".hero-img-revealer", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        ease: "expo.inOut"
      })
      .to(".hero-img", {
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.2");

    // Scroll Effects
    if (!isMobile) {
      // Parallax Image
      gsap.to(".hero-img-container", {
        yPercent: 30,
        rotation: -5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Text Blur/Fade out
      gsap.to(".hero-text-content", {
        yPercent: -20,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // SVG Distortion Effect
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        filter: "url(#distort)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-container relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-accent/5 rounded-bl-[10rem] -z-10" />

      {/* Top Meta Data */}
      <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-black/10 pb-4 mb-12">
        <div className="hero-meta flex flex-col gap-1">
          <span>Based in Mumbai, IN</span>
          <span>Preparing for Life</span>
        </div>
        <div className="hero-meta flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Status: Coding</span>
        </div>
        <div className="hero-meta text-right hidden md:block">
          <span>Local Time</span>
          <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 relative hero-text-content">
          <h1 ref={titleRef} className="font-serif text-[12vw] leading-[0.8] tracking-tighter mix-blend-difference text-primary font-black uppercase pointer-events-none">
            <div className="hero-line">Aspiring</div>
            <div className="hero-line ml-[10vw] italic text-stroke-1 text-transparent hover:text-accent transition-colors duration-500">Python</div>
            <div className="hero-line">Dev</div>
          </h1>

          <div className="mt-12 max-w-xl hero-meta">
            <p className="font-mono text-lg md:text-xl leading-relaxed text-balance">
              16 y/o Aspiring Computer Scientist & <span className="bg-accent text-white px-1">JEE Aspirant</span>. Passionate about AI, Robotics, and building immersive digital experiences.
            </p>
          </div>

          {/* Call To Action */}
          <div className="mt-12 flex gap-6 hero-meta">
            <MagneticButton
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 bg-primary text-background px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-accent transition-colors border-2 border-primary hover:border-accent"
            >
              View Works
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* Abstract Hero Image */}
        <div className="md:col-span-4 relative h-[60vh] md:h-[80vh] flex items-center justify-center hero-img-container perspective-1000">
          <div className="hero-img-revealer absolute inset-0 bg-black z-30 pointer-events-none" />
          <div className="hero-img relative w-full h-full rotate-6 hover:rotate-0 transition-transform duration-700 ease-out origin-center">
            <div className="absolute inset-0 border-2 border-primary bg-white z-10 translate-x-4 translate-y-4" />
            <img
              src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 z-20 mix-blend-multiply opacity-90"
              alt="Artistic Portrait"
            />
            {/* Graphic Overlays */}
            <div className="absolute -top-10 -right-10 z-30 animate-spin-slow">
              <Star className="w-32 h-32 text-accent fill-current" />
            </div>
            <div className="absolute -bottom-5 -left-10 z-30 bg-accent text-white font-mono text-xs p-2 uppercase rotate-[-5deg] border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Since 2025 ©
            </div>
          </div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t border-black bg-white py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block font-mono text-xs uppercase tracking-widest">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4">• Python • React • Flutter • Kotlin • Web Dev</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    { id: "01", name: "App Development", desc: "Building cross-platform apps with Flutter & Kotlin." },
    { id: "02", name: "Web Development", desc: "Modern, responsive websites using React & Vite." },
    { id: "03", name: "AI & ML", desc: "Visualizing complex concepts using Python & Data." },
    { id: "04", name: "Robotics & IoT", desc: "Engineering hardware solutions like AlertDrive." }
  ];

  useGSAP(() => {
    gsap.from(".service-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="py-32 px-6 md:px-12 bg-[#F2F0E9] text-black border-t border-black">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-6xl font-serif font-black uppercase tracking-tighter sticky top-32 clip-text-image bg-gradient-to-r from-black to-gray-600">
            Capabilities
          </h2>
        </div>
        <div className="md:col-span-8 flex flex-col">
          {services.map((s) => (
            <div key={s.id} className="service-item group border-t border-black py-12 flex flex-col md:flex-row gap-8 hover:bg-transparent hover:text-[#F2F0E9] transition-colors duration-500 px-4 -mx-4 hover-trigger cursor-none relative overflow-hidden">
              <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-10" />
              <span className="font-mono text-xl opacity-50">({s.id})</span>
              <div className="flex-1">
                <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">{s.name}</h3>
                <p className="font-mono text-sm md:w-2/3 opacity-70 group-hover:opacity-100 transition-opacity">{s.desc}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                <MoveUpRight className="w-12 h-12" />
              </div>
            </div>
          ))}
          <div className="border-t border-black" />
        </div>
      </div>
    </section>
  );
};

const NarrativeTicker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Enabled for all widths now

    const getScrollAmount = () => {
      if (!containerRef.current || !sectionRef.current) return 0;
      const race = 50;
      return -(containerRef.current.scrollWidth - sectionRef.current.offsetWidth + race);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate skew based on velocity
          const velocity = self.getVelocity();
          const skewAmount = gsap.utils.clamp(-5, 5, velocity / -300);

          // Smoothly animate the skew
          gsap.to(containerRef.current, {
            skewX: skewAmount,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      }
    });

    tl.to(containerRef.current, {
      x: getScrollAmount,
      ease: "none",
    });

    // Bounced Reveal Animation
    gsap.utils.toArray<HTMLElement>('.ticker-item').forEach((item) => {
      gsap.from(item, {
        y: 100,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: item,
          containerAnimation: tl,
          start: "left 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Auto-reveal INNOVATIVE text
    gsap.to('.reveal-innovative', {
      color: '#EB5939', // accent color
      duration: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.reveal-innovative',
        containerAnimation: tl,
        start: "left 60%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#F2F0E9] text-[#1A1A1A] flex items-center overflow-hidden border-y-[20px] border-double border-black/10">
      {/* Decorative background elements that stay fixed relative to section */}
      <div className="absolute top-12 left-12 font-mono text-xs uppercase tracking-widest opacity-50 z-20">
        [ The Philosophy ]
      </div>

      <div ref={containerRef} className="flex items-center gap-x-8 md:gap-x-16 px-6 md:px-12 h-full w-max will-change-transform perspective-1000">

        {/* Sentence Start */}
        <span className="ticker-item font-serif text-[8vw] md:text-[10vw] leading-none font-black tracking-tighter">
          I don't just build
        </span>

        {/* Inline Graphic 1 - Abstract Shape */}
        <div className="ticker-item w-[8vw] h-[8vw] rounded-full border-2 border-accent flex items-center justify-center animate-spin-slow flex-shrink-0 mx-4">
          <Star className="w-[4vw] h-[4vw] text-accent fill-current" />
        </div>

        <span className="ticker-item font-mono text-[4vw] md:text-[5vw] italic text-muted-foreground">
          (software)
        </span>

        <span className="ticker-item font-serif text-[8vw] md:text-[10vw] leading-none font-black tracking-tighter ml-8">
          I craft
        </span>

        {/* Inline Graphic 2 - Image Badge */}
        <div className="ticker-item relative w-[15vw] h-[10vw] rounded-full overflow-hidden border-2 border-black rotate-[-5deg] mx-4 hover:scale-110 transition-transform duration-300 flex-shrink-0 hover-trigger cursor-none">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover" alt="Art" />
          <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
        </div>

        <span className="ticker-item reveal-innovative font-serif text-[8vw] md:text-[10vw] leading-none font-black tracking-tighter text-transparent text-stroke-2 transition-colors duration-300">
          INNOVATIVE
        </span>

        <ArrowRight className="ticker-item w-[8vw] h-[8vw] text-accent stroke-[3px] -rotate-45 mx-4 flex-shrink-0" />

        <span className="ticker-item font-serif text-[8vw] md:text-[10vw] leading-none font-black tracking-tighter">
          SOLUTIONS
        </span>

        {/* Inline Graphic 3 - Code Block */}
        <div className="ticker-item mx-8 bg-black text-white p-6 rounded-lg font-mono text-xl md:text-2xl rotate-3 flex-shrink-0 shadow-[8px_8px_0px_0px_rgba(232,201,40,1)] hover-trigger cursor-none">
          {`if (boring) break;`}
        </div>

        <span className="ticker-item font-mono text-[4vw] md:text-[5vw] uppercase tracking-widest border-b-4 border-accent pb-2">
          that solve
        </span>

        <div className="ticker-item w-[1px] h-[15vw] bg-black/20 mx-8 flex-shrink-0" />

        <span className="ticker-item font-serif text-[8vw] md:text-[10vw] leading-none font-black tracking-tighter italic">
          real-world
        </span>

        {/* Inline Graphic 4 - Interactive Button */}
        <button className="ticker-item mx-8 w-[12vw] h-[12vw] bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group flex-shrink-0 cursor-none hover-trigger">
          <MoveUpRight className="w-[6vw] h-[6vw] text-white group-hover:rotate-45 transition-transform duration-300" />
        </button>

        <span className="ticker-item font-serif text-[8vw] md:text-[10vw] leading-none font-black tracking-tighter">
          PROBLEMS.
        </span>
      </div>
    </section>
  );
};

const SelectedWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    { title: "ZON APP", category: "Focus", img: `${import.meta.env.BASE_URL}showcase.png`, tags: ["App", "Productivity"], link: "https://vrn7712.github.io/zon-website/" },
    { title: "ALERT DRIVE", category: "Robotics", img: `${import.meta.env.BASE_URL}AlertDrive_page.png`, tags: ["IoT", "Sensors"], link: "https://vrn7712.github.io/AlertDrive/" },
    { title: "SPEEDBUMP", category: "Engineering", img: `${import.meta.env.BASE_URL}Non-Newtonian_page.png`, tags: ["Innovation", "Physics"], link: "https://adaptive-speedbump.netlify.app/" },
    // { title: "PANDORA AI", category: "EdTech", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2668&auto=format&fit=crop", tags: ["AI", "Education"], link: "#" },
  ];

  useGSAP(() => {
    // Set initial state
    gsap.set(".project-row", { y: 100, opacity: 0 });

    const rows = gsap.utils.toArray('.project-row');
    rows.forEach((row: any) => {
      gsap.to(row, {
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      });
    });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="relative min-h-screen bg-[#121212] text-[#F2F0E9] py-32 px-6 md:px-12 overflow-hidden">
      <div className="mb-24 flex justify-between items-end border-b border-white/20 pb-8">
        <div>
          <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tighter clip-text-image bg-gradient-to-r from-white to-gray-500">SELECTED WORKS</h2>
          <p className="font-mono text-sm text-gray-400 mt-4">// A curation of recent digital experiments</p>
        </div>
        <Hexagon className="w-12 h-12 md:w-20 md:h-20 stroke-1 text-gray-500 animate-spin-slow" />
      </div>

      <div className="flex flex-col gap-y-32">
        {projects.map((work, idx) => (
          <div key={idx} className="project-row group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-1 font-mono text-xl text-muted-foreground hidden md:block">
              0{idx + 1}
            </div>

            <div className="md:col-span-6 relative overflow-hidden rounded-sm aspect-[4/3] hover-trigger cursor-none">
              <div className="absolute inset-0 bg-accent/20 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />

              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white text-black font-mono text-xs px-3 py-1 uppercase tracking-widest border border-black">
                  View Case
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6 relative">
              <div className="overflow-hidden">
                <h3 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight transform translate-y-0 transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  {work.title}
                </h3>
                <h3 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight absolute top-0 left-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-accent">
                  {work.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="font-mono text-xs border border-white/20 px-3 py-1 rounded-full bg-transparent group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-mono text-sm leading-relaxed text-gray-400 max-w-sm">
                A comprehensive digital experience designed to challenge conventional user interfaces through brutalist aesthetics and micro-interactions.
              </p>

              <div className="pt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <MagneticButton
                  onClick={() => window.open(work.link, '_blank')}
                  className="px-6 py-3 bg-accent text-white rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  <span>Live Demo</span> <MoveUpRight size={14} />
                </MagneticButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AwardsSection = () => {
  return (
    <section className="py-20 bg-[#F2F0E9] text-black border-t border-black overflow-hidden">
      <div className="px-6 md:px-12 mb-12 flex justify-between items-center">
        <h3 className="font-mono text-sm uppercase tracking-widest">Honors & Mentions</h3>
        <Trophy className="w-6 h-6" />
      </div>

      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex gap-12 items-center mx-6">
              <span className="text-6xl md:text-8xl font-serif font-black opacity-10 stroke-black text-stroke-1 hover:opacity-100 hover:text-accent transition-all duration-300 cursor-none hover-trigger">
                RBVP BHOPAL 2025
              </span>
              <Star className="w-12 h-12 text-black fill-current animate-spin-slow" />
              <span className="text-6xl md:text-8xl font-serif font-black opacity-10 stroke-black text-stroke-1 hover:opacity-100 hover:text-accent transition-all duration-300 cursor-none hover-trigger">
                SLEPC INSPIRE AWARDS
              </span>
              <Hexagon className="w-12 h-12 text-black fill-current animate-spin-slow" />
              <span className="text-6xl md:text-8xl font-serif font-black opacity-10 stroke-black text-stroke-1 hover:opacity-100 hover:text-accent transition-all duration-300 cursor-none hover-trigger">
                ZON FOCUS APP
              </span>
              <Star className="w-12 h-12 text-black fill-current animate-spin-slow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom Discord Icon since it's not in Lucide regular set
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    fill="currentColor"
    className={className}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c1.24-23.28-13.26-47.57-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const ContactFooter = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/vrn7712" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vrushal-modh-641a5627b/" },
    { icon: DiscordIcon, href: "#" },
    { icon: Mail, href: "mailto:vrushal.modh@gmail.com" }
  ];

  return (
    <footer id="contact" className="relative bg-[#1A1A1A] text-[#F2F0E9] pt-32 pb-12 overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="px-6 md:px-12 relative z-10">
        <div className="border-b border-gray-700 pb-20 mb-12">
          <div className="font-mono text-accent mb-8 animate-pulse">● OPEN FOR OPPORTUNITIES</div>
          <h2 className="text-[12vw] leading-[0.8] font-serif font-black uppercase tracking-tighter text-center md:text-left hover:text-accent transition-colors duration-500 cursor-none selection:bg-white selection:text-black">
            Let's Talk
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-end mt-12 gap-8">
            <a href="mailto:vrushal.modh@gmail.com" className="group flex items-center gap-4 text-3xl md:text-5xl font-mono border-b-2 border-white pb-2 hover:border-accent hover:text-accent transition-all hover-trigger cursor-none">
              vrushal.modh@gmail.com
              <MoveUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" />
            </a>

            <div className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-16 md:h-16 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 hover-trigger cursor-none">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-500 uppercase tracking-widest gap-4">
          <p>© 2025 Vrushal. All Rights Reserved.</p>
          <div className="flex gap-8">
            {/* Removed duplicate links */}
          </div>
          <p>Mumbai, IN</p>
        </div>
      </div>

      {/* Massive decorative text */}
      <div className="absolute -bottom-10 left-0 w-full text-center text-[20vw] font-black text-white/5 pointer-events-none select-none overflow-hidden leading-none">
        PORTFOLIO
      </div>
    </footer>
  );
};

// --- Main Layout & Export ---

export default function PortfolioPage() {
  const [loading, setLoading] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-[#F2F0E9] text-[#1A1A1A] font-sans selection:bg-accent selection:text-white w-full overflow-x-hidden relative" id="portfolio-root">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#1A1A1A] text-[#F2F0E9] flex flex-col items-center justify-center pointer-events-auto"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4"
            >
              <div className="relative w-8 h-8">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45 transform -translate-y-1/2" />
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45 transform -translate-y-1/2" />
              </div>
            </button>

            <nav className="flex flex-col gap-8 items-center">
              {[
                { name: 'Home', id: 'portfolio-root' },
                { name: 'Work', id: 'work' },
                { name: 'Process', id: 'process' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-4xl font-serif font-black uppercase tracking-tighter hover:text-accent transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-12 text-xs font-mono text-gray-500 uppercase tracking-widest">
              Menu
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalStyles />
      <GrainTexture />
      <GradientOrbs />
      <GridBackground />
      <SVGDistortionFilter />
      <CustomCursor />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto cursor-pointer group hover-trigger cursor-none">
          <span className="font-serif text-3xl font-black group-hover:text-accent transition-colors">Vrn.</span>
        </div>

        <nav className="pointer-events-auto hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-2 py-2 rounded-full border border-white/20">
          {[
            { name: 'Home', id: 'portfolio-root' },
            { name: 'Work', id: 'work' },
            { name: 'Process', id: 'process' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="hover-trigger cursor-none px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="pointer-events-auto md:hidden w-10 h-10 flex flex-col justify-center gap-2 items-end hover-trigger z-50"
        >
          <span className="w-8 h-0.5 bg-white" />
          <span className="w-5 h-0.5 bg-white" />
        </button>
      </header>

      <main>
        <HeroSection />
        <ServicesSection />
        <NarrativeTicker />
        <SelectedWorks />
        <AwardsSection />
        <ContactFooter />
      </main>
    </div>
  );
}