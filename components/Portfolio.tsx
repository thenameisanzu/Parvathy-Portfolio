"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronsRight,
  Clock,
  Copy,
  ExternalLink,
  Github,
  Home,
  LayoutGrid,
  Mail,
  Moon,
  Send,
  Sparkles,
  Sun,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { c, type ProjectCategory, type ProjectItem } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* Official High Quality Vector WhatsApp Icon */
function WhatsAppIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const navIcons: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  skills: Sparkles,
  works: LayoutGrid,
  contact: Mail,
};

/* ---------------- Magnetic Micro-Interaction Wrapper ---------------- */
function Magnetic({
  children,
  pull = 0.32,
  className = "",
}: {
  children: React.ReactNode;
  pull?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18 });
  const sy = useSpring(y, { stiffness: 280, damping: 18 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - (rect.left + rect.width / 2);
    const cy = e.clientY - (rect.top + rect.height / 2);
    x.set(cx * pull);
    y.set(cy * pull);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Theme Manager Hook ---------------- */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("pv_theme");
      if (!stored) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          setTheme("dark");
        } else {
          document.documentElement.classList.remove("dark");
          setTheme("light");
        }
      }
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("pv_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("pv_theme", "light");
    }
  };

  return { theme, toggleTheme, mounted };
}

/* ---------------- A11y & Animated Helpers ---------------- */
function Split({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease, delay: delay + i * 0.05 }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`gpu-layer ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.55, ease, delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-center px-4 pt-10 pb-24 sm:px-6 sm:pt-14 sm:pb-28 md:px-10 md:pt-16 md:pb-28 lg:px-14"
    >
      <div className="w-full">
        <Reveal className="mb-3.5 sm:mb-5 flex items-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-ink-muted dark:text-ink-muted-dark">
          <span className="h-px w-8 sm:w-12 bg-ink/30 dark:bg-ink-dark/30" /> {label}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* Specular Spotlight Liquid Glass 3D Card */
function SpotlightCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const rx = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 220, damping: 24 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 220, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    mouseX.set(cx);
    mouseY.set(cy);
    x.set(cx / rect.width - 0.5);
    y.set(cy / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      className={`liquid-glass group relative overflow-hidden gpu-layer ${className}`}
      style={reduceMotion || isTouch ? {} : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular Radial Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([cx, cy]) =>
              `radial-gradient(400px circle at ${cx}px ${cy}px, rgba(190, 160, 255, 0.22), transparent 75%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/* Active Section Scroll Spy */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] || "home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActive(ids[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids]);

  return active;
}

/* ---------------- Ambient Background with GPU-Accelerated CSS Aurora ---------------- */
function Background() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Primary Lavender Blob */}
      <div
        className="animate-blob-1 absolute -left-[15vmax] -top-[15vmax] h-[65vmax] w-[65vmax] rounded-full blur-[80px] sm:blur-[100px] gpu-layer opacity-80 dark:opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(201,184,245,0.7) 0%, rgba(201,184,245,0) 70%)",
        }}
      />
      {/* Secondary Blush Pink Blob */}
      <div
        className="animate-blob-2 absolute -right-[10vmax] top-[25vh] h-[55vmax] w-[55vmax] rounded-full blur-[80px] sm:blur-[100px] gpu-layer opacity-75 dark:opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(249,198,212,0.65) 0%, rgba(249,198,212,0) 70%)",
        }}
      />
      {/* Soft Bottom Fill Blob */}
      <div
        className="absolute left-[15vw] -bottom-[15vmax] h-[45vmax] w-[45vmax] rounded-full blur-[90px] gpu-layer opacity-60 dark:opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(217,228,255,0.7) 0%, rgba(217,228,255,0) 70%)",
        }}
      />
    </div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 140, damping: 20 });
  const sy = useSpring(y, { stiffness: 140, damping: 20 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;

    const m = (e: MouseEvent) => {
      x.set(e.clientX - 160);
      y.set(e.clientY - 160);
    };
    window.addEventListener("mousemove", m, { passive: true });
    return () => window.removeEventListener("mousemove", m);
  }, [x, y, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[5] h-[320px] w-[320px] rounded-full opacity-60 blur-3xl dark:opacity-30"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgba(249,198,212,0.85) 0%, rgba(159,131,255,0.4) 45%, transparent 75%)",
      }}
    />
  );
}

/* ========================================================
   Authentic Minimal Apple Dock Item
   (Zero-Reflow Distance Math + Touch Slide Support)
   ======================================================== */
function AppleDockItem({
  id,
  label,
  Icon,
  isActive,
  isTouchHovered,
  mouseX,
  itemCenter,
  onSelect,
}: {
  id: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
  isTouchHovered: boolean;
  mouseX: MotionValue<number>;
  itemCenter: number;
  onSelect: (id: string) => void;
}) {
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  // Instant O(1) distance calculation without layout reflow
  const distance = useTransform(mouseX, (val) => {
    if (reduceMotion || !itemCenter) return 1000;
    return val - itemCenter;
  });

  const scaleSync = useTransform(distance, [-70, 0, 70], [1, 1.28, 1]);
  const scale = useSpring(scaleSync, { mass: 0.08, stiffness: 320, damping: 20 });
  const ySync = useTransform(distance, [-70, 0, 70], [0, -7, 0]);
  const y = useSpring(ySync, { mass: 0.08, stiffness: 320, damping: 20 });

  return (
    <motion.a
      data-dock-id={id}
      href={`#${id}`}
      style={reduceMotion ? {} : { scale: isTouchHovered ? 1.25 : scale, y: isTouchHovered ? -7 : y }}
      whileTap={{ scale: 0.88 }}
      onMouseEnter={() => setIsMouseHovered(true)}
      onMouseLeave={() => setIsMouseHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        onSelect(id);
      }}
      className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-colors select-none gpu-layer"
      aria-label={label}
    >
      {/* Liquid active pill indicator */}
      {isActive && (
        <motion.span
          layoutId="activeAppleDockPill"
          className="absolute inset-1 rounded-full bg-white/95 shadow-md dark:bg-white/15"
          transition={{ type: "spring", stiffness: 450, damping: 32 }}
        />
      )}

      {/* Floating Apple-Style Tooltip */}
      <AnimatePresence>
        {(isMouseHovered || isTouchHovered) && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.88 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute -top-10 rounded-full border border-white/40 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-night-800/95 dark:text-ink-dark whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center justify-center text-ink dark:text-ink-dark">
        <Icon
          className={`h-4 w-4 sm:h-[18px] sm:w-[18px] transition-all duration-200 ${
            isActive || isTouchHovered
              ? "stroke-[2.4] text-ink dark:text-white"
              : "stroke-[1.8] opacity-70 group-hover:opacity-100"
          }`}
        />
      </span>

      {/* Apple-style active glowing status dot beneath active tab */}
      {isActive && (
        <motion.span
          layoutId="activeDockDot"
          className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#8A5FD1] shadow-[0_0_8px_#8A5FD1] dark:bg-lav-dark dark:shadow-[0_0_10px_#9F83FF]"
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

/* ========================================================
   Authentic Minimal Apple Liquid Glass Bottom Dock
   (Zero Lag, Touch Slide-to-Select, Instant 120Hz Response)
   ======================================================== */
function BottomNavbar({
  active,
  theme,
  toggleTheme,
  mounted,
}: {
  active: string;
  theme: "light" | "dark";
  toggleTheme: () => void;
  mounted: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);

  const [itemCenters, setItemCenters] = useState<Record<string, number>>({});
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);

  const measureItemCenters = () => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll<HTMLAnchorElement>("[data-dock-id]");
    const map: Record<string, number> = {};
    items.forEach((item) => {
      const id = item.dataset.dockId;
      if (id) {
        const rect = item.getBoundingClientRect();
        map[id] = rect.left + rect.width / 2;
      }
    });
    setItemCenters(map);
  };

  useEffect(() => {
    measureItemCenters();
    const timer = setTimeout(measureItemCenters, 100);
    window.addEventListener("resize", measureItemCenters);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureItemCenters);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const findClosestItem = (clientX: number) => {
    let closest: string | null = null;
    let minDist = 42;
    for (const [id, cx] of Object.entries(itemCenters)) {
      const d = Math.abs(clientX - cx);
      if (d < minDist) {
        minDist = d;
        closest = id;
      }
    }
    setHoveredNavId(closest);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    measureItemCenters();
    if (e.touches[0]) {
      const tx = e.touches[0].clientX;
      mouseX.set(tx);
      findClosestItem(tx);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      const tx = e.touches[0].clientX;
      mouseX.set(tx);
      findClosestItem(tx);
    }
  };

  const handleTouchEnd = () => {
    if (hoveredNavId) {
      scrollToSection(hoveredNavId);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(10);
        } catch {}
      }
    }
    mouseX.set(Infinity);
    setHoveredNavId(null);
  };

  return (
    <>
      {/* Top Frosted Liquid Glass Reading Progress Bar with Glowing Tip */}
      <div className="fixed inset-x-0 top-0 z-[120] pointer-events-none h-[2.5px] overflow-hidden bg-white/20 dark:bg-white/5 backdrop-blur-md">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-lav via-[#8a5fd1] to-blush-dark shadow-[0_0_10px_rgba(138,95,209,0.85)] gpu-layer"
          aria-hidden="true"
        />
      </div>

      {/* Minimal Apple Liquid Glass Dock - Strictly at the BOTTOM with Touch Slide */}
      <nav
        ref={dockRef}
        aria-label="Bottom primary navigation"
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="apple-dock-capsule fixed bottom-3 sm:bottom-6 md:bottom-7 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-0.5 sm:gap-1 rounded-full p-1 sm:p-1.5 shadow-2xl select-none max-w-[calc(100vw-16px)] sm:max-w-none transform-gpu"
        style={{
          marginBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {c.nav.map((n) => {
          const Icon = navIcons[n.id] || Home;
          const isActive = active === n.id;
          const isTouchHovered = hoveredNavId === n.id;
          return (
            <AppleDockItem
              key={n.id}
              id={n.id}
              label={n.label}
              Icon={Icon}
              isActive={isActive}
              isTouchHovered={isTouchHovered}
              mouseX={mouseX}
              itemCenter={itemCenters[n.id] || 0}
              onSelect={scrollToSection}
            />
          );
        })}

        {/* Vertical Apple Control Center Hairline Divider */}
        <div className="mx-0.5 h-4 w-px bg-ink/15 dark:bg-white/15" />

        {/* Theme Toggle Button inside Dock */}
        <button
          onClick={toggleTheme}
          onTouchEnd={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-ink transition hover:scale-110 hover:bg-white/40 dark:text-ink-dark dark:hover:bg-white/10"
        >
          {mounted && (
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-amber-300 stroke-[2.2]" />
              ) : (
                <Moon className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[2.2]" />
              )}
            </motion.div>
          )}
        </button>
      </nav>
    </>
  );
}

/* ========================================================
   iPhone "Slide to Chat" WhatsApp Slider Component
   ======================================================== */
function SlideToChat() {
  const [isSuccess, setIsSuccess] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(240);
  const thumbWidth = 52;

  // Real-time motion values for zero-latency 120Hz slider movement
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(dragProgress, [0, 0.6], [1, 0]);
  const trailWidth = useTransform(dragProgress, (p) => `${Math.max(14, p * 100)}%`);

  useEffect(() => {
    const updateBounds = () => {
      if (trackRef.current) {
        const trackW = trackRef.current.offsetWidth;
        setMaxDrag(Math.max(trackW - thumbWidth - 8, 50));
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const handleDrag = (_: unknown, info: { offset: { x: number } }) => {
    if (isSuccess) return;
    const current = Math.max(0, Math.min(info.offset.x, maxDrag));
    dragX.set(current);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (isSuccess) return;
    if (info.offset.x >= maxDrag * 0.7) {
      // Trigger iPhone Call Answer / Slide Action
      setIsSuccess(true);
      dragX.set(maxDrag);

      // Mobile physical haptic feedback
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([20, 40, 20]);
        } catch {}
      }

      const url = `https://wa.me/${c.whatsapp.phone}?text=${encodeURIComponent(
        c.whatsapp.defaultMessage
      )}`;
      window.open(url, "_blank");

      setTimeout(() => {
        setIsSuccess(false);
        dragX.set(0);
      }, 3000);
    } else {
      dragX.set(0);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2.5 flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-ink-muted dark:text-ink-muted-dark">
        <span className="flex items-center gap-1.5">
          <WhatsAppIcon className="h-4 w-4 text-emerald-500" /> Instant WhatsApp
        </span>
        <span>{c.whatsapp.displayPhone}</span>
      </div>

      {/* iPhone Slider Track */}
      <div
        ref={trackRef}
        className="iphone-slider-track relative flex h-[58px] w-full select-none items-center overflow-hidden rounded-full p-1.5"
      >
        {/* Animated Green Trail following the Knob */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500/25 to-emerald-500/50"
          style={{ width: trailWidth }}
        />

        {/* Shimmering "slide to chat" Text (Classic iPhone Shimmer) */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="iphone-shimmer-text pointer-events-none absolute inset-0 flex items-center justify-center gap-2 px-12 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm"
        >
          <span>slide to chat</span>
          <ChevronsRight size={18} className="animate-pulse" />
        </motion.div>

        {/* Draggable Circular Knob */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.06}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={{ x: isSuccess ? maxDrag : undefined }}
          style={{ x: dragX, touchAction: "none" }}
          whileDrag={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
          className="relative z-10 flex h-[46px] w-[46px] cursor-grab items-center justify-center rounded-full bg-gradient-to-tr from-[#25D366] via-[#20BA5A] to-[#128C7E] text-white shadow-[0_6px_20px_rgba(37,211,102,0.45)] ring-2 ring-white/70 active:cursor-grabbing gpu-layer"
        >
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check size={22} className="stroke-[3]" />
            </motion.div>
          ) : (
            <WhatsAppIcon className="h-6 w-6 drop-shadow" />
          )}
        </motion.div>
      </div>

      <p className="mt-2 text-center text-[10px] sm:text-[11px] font-medium text-ink-muted dark:text-ink-muted-dark">
        {isSuccess ? "Opening WhatsApp chat..." : "Drag slider right to start WhatsApp chat"}
      </p>
    </div>
  );
}

/* ---------------- Hero Section (Compact & Buttery Smooth) ---------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const yTagline = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Live Local Time in Kerala (Asia/Kolkata)
  const [localTime, setLocalTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime("10:30 PM IST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const marqueeSkills = [...c.skills.flatMap((s) => s.items), ...c.skills.flatMap((s) => s.items)];

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col justify-center px-4 pt-10 pb-24 sm:px-6 sm:pt-14 sm:pb-28 md:px-10 md:pt-16 md:pb-28 lg:px-14"
    >
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="mx-auto w-full max-w-[1400px] gpu-layer"
      >
        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-3.5 sm:mb-4.5 flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <span className="liquid-glass flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-ink dark:text-ink-dark">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects
          </span>

          <a
            href="https://www.aethrasolutions.in"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#6b4fb8] transition hover:scale-105 hover:bg-white/60 dark:text-lav-dark dark:hover:bg-white/10"
          >
            <span>Aethra Digital Solutions</span>
            <ExternalLink size={11} />
          </a>

          <span className="liquid-glass flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark">
            <Clock size={12} className="text-lav dark:text-lav-dark" />
            {localTime || "Kerala, India"} • IST
          </span>
        </motion.div>

        {/* Display Typography */}
        <motion.div style={{ y: yHeadline }}>
          <h1 className="text-[clamp(2.4rem,11.5vw,10.5rem)] font-black uppercase leading-[0.88] tracking-tighter text-ink dark:text-ink-dark">
            <motion.span
              className="block bg-gradient-to-r from-ink via-[#7a4ec7] to-blush-dark bg-clip-text text-transparent dark:from-white dark:via-lav-dark dark:to-blush"
              initial={{ y: "25%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease }}
            >
              {c.first}
            </motion.span>
            <motion.span
              className="stroke-text block sm:pl-[5vw] md:pl-[7vw]"
              initial={{ y: "25%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
            >
              {c.last}
            </motion.span>
          </h1>
        </motion.div>

        {/* Tagline & Call to Actions */}
        <motion.div
          style={{ y: yTagline }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-5 sm:mt-6 md:mt-8 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-lg text-sm sm:text-base font-medium leading-relaxed text-ink/80 dark:text-ink-dark/80 md:text-lg">
            <span className="font-bold text-ink dark:text-ink-dark">{c.role}.</span> {c.tagline}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Magnetic>
              <a
                href="#works"
                className="rounded-full bg-ink px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition hover:scale-105 hover:bg-ink/90 dark:bg-white dark:text-night-900 dark:hover:bg-white/90"
              >
                Explore works
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="liquid-glass rounded-full px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs font-bold uppercase tracking-widest text-ink transition hover:scale-105 dark:text-ink-dark"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Elevated Frosted Liquid Glass Skills Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-5 sm:mt-6 md:mt-8 w-full"
        >
          <div className="liquid-glass relative mx-auto overflow-hidden rounded-full py-2.5 sm:py-3 shadow-sm [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div className="flex w-max animate-marquee gap-6 sm:gap-8 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-ink/70 dark:text-ink-dark/70">
              {marqueeSkills.map((s, i) => (
                <span key={`${s}-${i}`} className="flex items-center gap-6 sm:gap-8">
                  <span>{s}</span>
                  <span className="text-lav dark:text-lav-dark text-[10px]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- About Section ---------------- */
function About() {
  return (
    <Section id="about" label="About Me">
      <h2 className="text-[clamp(1.85rem,5.2vw,4.25rem)] font-black leading-[1] tracking-tighter text-ink dark:text-ink-dark">
        <Split text={c.about.headline} />
      </h2>

      <div className="mt-5 sm:mt-7 grid gap-3.5 sm:gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="liquid-glass rounded-[1.75rem] p-5 sm:p-7 md:p-8">
          {c.about.body.map((paragraph, i) => (
            <p
              key={i}
              className="mb-3 sm:mb-3.5 text-sm sm:text-base font-medium leading-relaxed text-ink/80 last:mb-0 dark:text-ink-dark/80 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-1">
          {c.about.stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <SpotlightCard className="flex flex-col justify-center rounded-[1.75rem] p-3.5 sm:p-5 md:p-6 text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black tracking-tighter text-ink dark:text-ink-dark md:text-5xl">
                  {s.n}
                </div>
                <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-ink-muted dark:text-ink-muted-dark">
                  {s.l}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Skills Section ---------------- */
function Skills() {
  return (
    <Section id="skills" label="Technical Skills">
      <h2 className="mb-4 sm:mb-6 text-[clamp(2rem,6.5vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink dark:text-ink-dark">
        <Split text="Tools of" /> <Split text="the craft" className="stroke-text" delay={0.12} />
      </h2>

      <div className="grid gap-3.5 sm:gap-4.5 md:grid-cols-3">
        {c.skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <SpotlightCard className="h-full rounded-[1.75rem] p-5 sm:p-6 md:p-6 lg:p-7">
              <div className="mb-3 sm:mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lav dark:text-lav-dark">
                0{i + 1} //
              </div>
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-extrabold tracking-tight text-ink dark:text-ink-dark md:text-2xl">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-white/80 bg-white/60 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-lav hover:bg-white dark:border-night-600 dark:bg-night-800/80 dark:text-ink-dark dark:hover:border-lav-dark"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Selected Works Section ---------------- */
function Works() {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: "All Projects", value: "all" },
    { label: "Full Stack", value: "fullstack" },
    { label: "Frontend", value: "frontend" },
    { label: "Mobile Web", value: "mobile" },
  ];

  const filteredProjects = useMemo(() => {
    if (category === "all") return c.works;
    return c.works.filter((w) => w.category === category);
  }, [category]);

  return (
    <Section id="works" label="Selected Works">
      <div className="flex flex-col justify-between gap-4 sm:gap-5 md:flex-row md:items-end">
        <h2 className="text-[clamp(2rem,6.5vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink dark:text-ink-dark">
          <Split text="Featured" /> <Split text="projects" className="stroke-text" delay={0.12} />
        </h2>

        {/* Category Filters */}
        <div className="flex max-w-full gap-1.5 sm:gap-2 overflow-x-auto no-sb pb-1">
          {categories.map((cat) => {
            const isActive = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className="relative shrink-0 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink transition-colors dark:text-ink-dark"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-ink text-white dark:bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-white dark:text-night-900" : "text-ink/70 dark:text-ink-dark/70"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="mt-5 sm:mt-7 grid gap-3.5 sm:gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease }}
            >
              <SpotlightCard
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer rounded-[1.75rem] p-3 sm:p-4 transition-all hover:shadow-2xl"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]"
                  style={{ background: project.g }}
                >
                  <div
                    className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-white/40 blur-2xl"
                  />

                  {/* Watermark project number */}
                  <span className="absolute bottom-2 left-4 text-[clamp(3.5rem,8.5vw,7rem)] font-black leading-none tracking-tighter text-white/80 transition duration-300 group-hover:-translate-y-1 dark:text-white/40">
                    {project.n}
                  </span>

                  {/* Action Icon Pill */}
                  <span className="liquid-glass absolute right-3 top-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-ink shadow-md transition duration-300 group-hover:rotate-45 group-hover:scale-110 dark:text-ink-dark">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="px-2 pb-2 pt-4">
                  <div className="mb-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-ink-muted dark:text-ink-muted-dark">
                    <span>{project.tag}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-ink dark:text-ink-dark md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-ink/75 dark:text-ink-dark/75">
                    {project.desc}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-ink dark:bg-night-700 dark:text-ink-dark"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-night-900/60 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease }}
              className="liquid-glass relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] p-6 shadow-2xl dark:bg-night-800 md:p-9"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink shadow-sm transition hover:scale-110 dark:bg-night-700 dark:text-ink-dark"
              >
                <X size={18} />
              </button>

              <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-lav dark:text-lav-dark">
                {selectedProject.tag} · {selectedProject.year}
              </div>

              <h3
                id="modal-project-title"
                className="text-2xl font-black tracking-tight text-ink dark:text-ink-dark md:text-3xl"
              >
                {selectedProject.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base font-medium leading-relaxed text-ink/80 dark:text-ink-dark/80">
                {selectedProject.longDesc || selectedProject.desc}
              </p>

              <div className="mt-5">
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark">
                  Technologies Used
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-lav/40 bg-white/80 px-3.5 py-1 text-xs font-semibold text-ink dark:bg-night-700 dark:text-ink-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-ink/10 dark:border-ink-dark/10">
                {selectedProject.url && (
                  <Magnetic>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow transition hover:scale-105 dark:bg-white dark:text-night-900"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  </Magnetic>
                )}
                {selectedProject.github && (
                  <Magnetic>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition hover:scale-105 dark:text-ink-dark"
                    >
                      View Source <Github size={14} />
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------------- Experience / Journey Section ---------------- */
function Experience() {
  const expRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expProgress } = useScroll({
    target: expRef,
    offset: ["start 75%", "end 60%"],
  });
  const laserHeight = useTransform(expProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience" label="Career Journey">
      <h2 className="mb-4 sm:mb-6 text-[clamp(2rem,6.5vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink dark:text-ink-dark">
        <Split text="My" /> <Split text="journey" className="stroke-text" delay={0.12} />
      </h2>

      <div ref={expRef} className="relative ml-2 sm:ml-4 border-l border-ink/15 pl-6 sm:pl-10 dark:border-ink-dark/20 md:ml-6 md:pl-12">
        {/* Scroll-Linked Glowing Laser Beam with blur glow */}
        <motion.div
          className="absolute -left-[1px] top-0 w-[2.5px] origin-top bg-gradient-to-b from-lav via-[#8a5fd1] to-blush shadow-[0_0_12px_#8a5fd1] dark:shadow-[0_0_16px_#9F83FF] gpu-layer"
          style={{ height: laserHeight }}
        />

        {c.experience.map((item, i) => (
          <Reveal key={`${item.role}-${item.co}`} delay={i * 0.08} className="relative mb-3.5 sm:mb-4.5 last:mb-0">
            {/* Illuminated Milestone Node with blur glow */}
            <span
              className="absolute -left-[33px] sm:-left-[49px] top-6 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-lav shadow-[0_0_10px_rgba(138,95,209,0.7)] dark:border-night-900 dark:bg-lav-dark dark:shadow-[0_0_12px_rgba(159,131,255,0.85)] md:-left-[57px] gpu-layer"
              aria-hidden="true"
            />

            <SpotlightCard className="rounded-[1.75rem] p-4.5 sm:p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.25em] text-ink-muted dark:text-ink-muted-dark">
                <span>{item.period}</span>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-lav/20 px-3 py-1 text-[#6b4fb8] transition hover:scale-105 hover:bg-lav/30 hover:underline dark:bg-lav-dark/20 dark:text-lav-dark dark:hover:bg-lav-dark/30"
                  >
                    <span>{item.co}</span>
                    <ExternalLink size={10} />
                  </a>
                ) : (
                  <span className="rounded-full bg-lav/20 px-3 py-1 text-[#6b4fb8] dark:bg-lav-dark/20 dark:text-lav-dark">
                    {item.co}
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink dark:text-ink-dark md:text-2xl">
                {item.role}
              </h3>

              <p className="mt-2 text-sm font-medium leading-relaxed text-ink/75 dark:text-ink-dark/75">
                {item.desc}
              </p>

              {item.highlights && (
                <ul className="mt-3 space-y-1 text-xs sm:text-sm text-ink/70 dark:text-ink-dark/70">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 text-lav dark:text-lav-dark">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.skills && (
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-ink dark:bg-night-700 dark:text-ink-dark"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Contact Section ---------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(c.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Smooth feedback animation & fallback to native email client
    setTimeout(() => {
      setStatus("success");
      const mailtoUrl = `mailto:${c.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${form.name}`
      )}&body=${encodeURIComponent(`${form.msg}\n\nFrom: ${form.name} (${form.email})`)}`;
      window.open(mailtoUrl, "_blank");
    }, 800);
  };

  const fieldClasses =
    "w-full rounded-2xl border border-white/80 bg-white/60 px-4 py-3.5 text-sm font-medium text-ink outline-none transition placeholder:text-ink/40 focus:border-lav focus:bg-white focus:ring-2 focus:ring-lav/40 dark:border-night-600 dark:bg-night-800/80 dark:text-ink-dark dark:placeholder:text-ink-dark/40 dark:focus:border-lav-dark dark:focus:bg-night-800";

  return (
    <Section id="contact" label="Get In Touch">
      <h2 className="text-[clamp(2rem,7vw,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink dark:text-ink-dark">
        <Split text="Let's build" />
        <br />
        <Split text="something" className="stroke-text" delay={0.12} />
        <br />
        <Split text="lovely." delay={0.24} />
      </h2>

      <div className="mt-5 sm:mt-7 grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Contact Info & WhatsApp Slider Card */}
        <Reveal className="liquid-glass flex flex-col justify-between gap-5 sm:gap-6 rounded-[1.75rem] p-5 sm:p-7 md:p-8">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-ink-muted dark:text-ink-muted-dark">
              Direct Contact
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${c.email}`}
                className="break-all text-lg font-extrabold tracking-tight text-ink underline-offset-4 hover:underline dark:text-ink-dark sm:text-2xl"
              >
                {c.email}
              </a>
              <Magnetic pull={0.4}>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink shadow-sm transition hover:scale-110 dark:bg-night-700 dark:text-ink-dark"
                >
                  {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                </button>
              </Magnetic>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
              >
                Copied email address to clipboard!
              </motion.p>
            )}
          </div>

          {/* iPhone Slide to Chat WhatsApp Slider */}
          <div className="liquid-glass rounded-[1.5rem] p-4 sm:p-5 shadow-sm">
            <SlideToChat />
          </div>

          <div>
            <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.3em] text-ink-muted dark:text-ink-muted-dark">
              Connect Across the Web
            </div>
            <div className="flex flex-wrap gap-2">
              {c.socials.map((s) => (
                <Magnetic key={s.l} pull={0.35}>
                  <a
                    href={s.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel}
                    className="flex items-center gap-1 rounded-full border border-white/80 bg-white/60 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-ink shadow-sm transition hover:scale-105 hover:bg-white dark:border-night-600 dark:bg-night-800 dark:text-ink-dark dark:hover:bg-night-700"
                  >
                    {s.l} <ArrowUpRight size={13} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Interactive Form Card */}
        <Reveal delay={0.08}>
          <div className="liquid-glass rounded-[1.75rem] p-5 sm:p-7 md:p-8">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Check size={28} />
                </div>
                <h3 className="mt-4 text-xl font-black text-ink dark:text-ink-dark">
                  Message Prepared!
                </h3>
                <p className="mt-2 max-w-sm text-xs sm:text-sm font-medium text-ink/70 dark:text-ink-dark/70">
                  Thank you for reaching out. Your default email composer has been opened to finalize and send your message.
                </p>
                <Magnetic>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", msg: "" });
                    }}
                    className="mt-5 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:scale-105 dark:bg-white dark:text-night-900"
                  >
                    Send another message
                  </button>
                </Magnetic>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    className={fieldClasses}
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    className={fieldClasses}
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="contact-msg" className="sr-only">
                    Your Message
                  </label>
                  <textarea
                    id="contact-msg"
                    required
                    rows={4}
                    className={fieldClasses}
                    placeholder="Tell me about your project or inquiry..."
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  />
                </div>

                <Magnetic className="w-full">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition hover:scale-[1.01] hover:bg-ink/90 disabled:opacity-50 dark:bg-white dark:text-night-900 dark:hover:bg-white/90"
                  >
                    {status === "submitting" ? (
                      <span>Preparing message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Footer Info */}
      <footer className="mt-6 sm:mt-8 border-t border-ink/10 pt-4 pb-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-ink-muted dark:border-ink-dark/10 dark:text-ink-muted-dark">
        <p>
          © {new Date().getFullYear()} {c.first} {c.last} · Crafted with Next.js & Framer Motion
        </p>
      </footer>
    </Section>
  );
}

/* ---------------- Main Portfolio Application ---------------- */
export default function Portfolio() {
  const { theme, toggleTheme, mounted } = useTheme();
  const navIds = useMemo(() => c.nav.map((n) => n.id), []);
  const activeSection = useActiveSection(navIds);

  return (
    <main className="relative min-h-screen selection:bg-blush dark:selection:bg-lav-dark">
      <Background />
      <CursorGlow />
      <BottomNavbar active={activeSection} theme={theme} toggleTheme={toggleTheme} mounted={mounted} />
      <Hero />
      <About />
      <Skills />
      <Works />
      <Experience />
      <Contact />
    </main>
  );
}
