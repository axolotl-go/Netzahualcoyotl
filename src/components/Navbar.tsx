import React, { useState, useEffect, useRef } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import navigation from "../data/navigation.json";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus trap: return focus to toggle button when drawer closes
  const toggleRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current && !open) toggleRef.current?.focus();
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white/80 backdrop-blur-sm"
        } border-b border-slate-100`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-16 h-18">
          {/* ── LOGO ── */}
          <a
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            aria-label="Secundaria General No. 10 – Inicio"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:text-white transition-all duration-200 shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] sm:text-sm font-extrabold tracking-tight text-slate-900 uppercase">
                Secundaria Gral. No. 10
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-primary/80 uppercase mt-0.5">
                Netzahualcóyotl
              </span>
            </div>
          </a>

          {/* ── NAV DESKTOP ── */}
          <nav
            aria-label="Menú principal"
            className="hidden lg:flex items-center gap-1"
          >
            {navigation.data.map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="relative px-3 py-2 text-[13px] font-semibold tracking-wide text-slate-600 hover:text-primary rounded-md hover:bg-primary/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* ── CTA DESKTOP ── */}
          <div className="hidden lg:block">
            <a
              href="#comentario"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 active:scale-[0.97] text-white text-[13px] font-bold tracking-wider px-5 py-2.5 rounded-lg transition-all duration-150 shadow-sm shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Contactanos
            </a>
          </div>

          {/* ── TOGGLE MOBILE ── */}
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              className={`absolute transition-all duration-200 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
            >
              <X size={18} strokeWidth={2.5} />
            </span>
            <span
              className={`absolute transition-all duration-200 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
            >
              <Menu size={18} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </header>

      {/* ── OVERLAY ── */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── DRAWER MOBILE ── */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed top-0 right-0 h-full w-[78%] max-w-xs bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-18 border-b border-slate-100 shrink-0">
          <span className="text-xs font-bold tracking-[0.25em] text-primary/80 uppercase">
            Menú
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav
          aria-label="Menú móvil"
          className="flex flex-col px-4 pt-4 pb-6 gap-1 overflow-y-auto flex-1"
        >
          {navigation.data.map((item, i) => (
            <a
              key={item.title}
              href={item.link}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`flex items-center px-4 py-3 rounded-lg text-[15px] font-semibold text-slate-700 hover:text-primary hover:bg-primary/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-8 shrink-0">
          <a
            href="#comentario"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white text-sm font-bold tracking-wider px-5 py-3 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contactanos
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
