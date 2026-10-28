import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Code2,
} from "lucide-react";
import {
  useHeadingReveal,
  useParagraphHighlight,
  scrambleText,
} from "../hooks/useAdvancedAnimations";

gsap.registerPlugin(ScrollTrigger);

/**
 * Flagship Products Data
 */
const PRODUCTS_DATA = [
  {
    id: "01",
    name: "Jagnath LIMS",
    tagline: "Laboratory Information & Environmental Audit ERP",
    category: "Web App · LIMS & ERP",
    badge: "NABL & GPCB Ready",
    status: "Live",
    logo: "/products/jagnath-logo.png",
    banners: [
      {
        id: "jagnath-b1",
        src: "/products/jagnath-banner-1.png",
        title: "Executive Analytical Dashboard",
        caption: "Real-time sample lifecycle & chain of custody monitoring",
        tag: "01 Dashboard",
      },
      {
        id: "jagnath-b2",
        src: "/products/jagnath-banner-2.png",
        title: "Clients Master & CoA Reports",
        caption: "NABL digital CoA & GPCB Schedule-II audit engine",
        tag: "02 Workflows",
      },
    ],
    shortDescription:
      "Compliance-ready LIMS for testing laboratories & environmental auditors. Streamlines sample tracking, quotations, result entry, and NABL-grade CoA generation.",
    keyMetrics: [
      { value: "80%", label: "Time Saved" },
      { value: "0", label: "Manual Errors" },
      { value: "100%", label: "NABL / GPCB" },
      { value: "Full", label: "Audit Trail" },
    ],
    features: [
      "Multi-Company & Role-Based Access Control (RBAC)",
      "3 Quotation Engines (Regular, Provisional, Audit)",
      "Automated PDF CoA with Digital Signatures",
    ],
    technologies: ["React.js", "Node.js", "PostgreSQL", "Sequelize", "JWT"],
    targetUsers: "Environmental & NABL accredited testing labs",
    links: {
      demo: "https://github.com/SarvaiyaPrashant2242005/Jagnath_Labs",
      contact: "#contact",
      github: "https://github.com/SarvaiyaPrashant2242005/Jagnath_Labs",
      labelDemo: "Live Demo",
      labelContact: "Contact Us",
    },
  },
  {
    id: "02",
    name: "Destination Alert",
    tagline: "Never Miss Your Destination Again.",
    category: "Mobile App · GPS Utility",
    badge: "Smart GPS Wakeup",
    status: "Live",
    logo: "/products/destination-alert-logo.png",
    banners: [
      {
        id: "destination-b1",
        src: "/products/destination-alert-banner-1.png",
        title: "Intelligent GPS Proximity Alarm",
        caption: "Distance-based wakeup alarms for commuters & travelers",
        tag: "01 Mobile Hero",
      },
      {
        id: "destination-b2",
        src: "/products/destination-alert-banner-2.png",
        title: "Interactive Radius Map & Saved Places",
        caption: "Dual-stage alert (200m–5km) with silent/DND override",
        tag: "02 Geofence",
      },
    ],
    shortDescription:
      "Intelligent location-based alarm for commuters and travelers. Wakes you based on real-time GPS distance rather than unpredictable time alarms.",
    keyMetrics: [
      { value: "Offline", label: "GPS Direct" },
      { value: "Locked", label: "Screen Alarm" },
      { value: "45+", label: "Auto Tests" },
      { value: "100%", label: "On-Device" },
    ],
    features: [
      "Precise Geofencing (200m to 5km radius)",
      "Dual-Stage Alert (warning + final arrival alarm)",
      "Silent / DND Mode Override & Low Battery Sleep",
    ],
    technologies: ["Flutter 3.x", "Dart 3", "Clean Arch", "Geolocation", "Material 3"],
    targetUsers: "Daily commuters, students, train & bus travelers",
    links: {
      demo: "https://github.com/xpediraai/Location-Base-alarm-system",
      contact: "#contact",
      github: "https://github.com/xpediraai/Location-Base-alarm-system",
      labelDemo: "Download App",
      labelContact: "View Live Demo",
    },
  },
];

const CATEGORIES = [
  "All Products",
  "Web App · LIMS & ERP",
  "Mobile App · GPS Utility",
];

/**
 * Compact Animated Banner Switcher with Uncut Image Viewport
 */
function CardBannerSwitcher({ banners, productName, onOpenLightbox }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  const durationMs = 4500;
  const tickInterval = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    setProgress(0);
  }, []);

  const selectSlide = useCallback((index) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isHovered) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (tickInterval / durationMs) * 100;
        if (next >= 100) {
          nextSlide();
          return 0;
        }
        return next;
      });
    }, tickInterval);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovered, nextSlide]);

  const currentBanner = banners[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        marginBottom: "16px",
      }}
    >
      {/* 1. Visual Banner Display (Uncut, Full Screenshot Container) */}
      <div
        onClick={() => onOpenLightbox(currentIndex)}
        title="Click to view in 4K full screen"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "2.05 / 1",
          borderRadius: "14px",
          overflow: "hidden",
          backgroundColor: "#070B12",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 10px 28px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at center, #131A27 0%, #06090F 100%)",
        }}
      >
        {/* 2 Animated Banners with objectFit: contain - 100% Uncut */}
        {banners.map((banner, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={banner.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.02)",
                filter: isActive ? "none" : "blur(3px)",
                transition:
                  "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease",
                pointerEvents: isActive ? "auto" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
              }}
            >
              <img
                src={banner.src}
                alt={`${productName} - ${banner.title}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center center",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>
          );
        })}

        {/* Floating 4K Badge on Top-Right */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 6,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(17, 24, 39, 0.88)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "#FFE7B3",
              border: "1px solid rgba(214, 168, 79, 0.45)",
              borderRadius: "var(--radius-pill)",
              padding: "3px 8px",
              fontSize: "0.66rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Maximize2 size={10} />
            <span>4K Preview</span>
          </span>
        </div>

        {/* Slim Auto-Cycle Progress Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #D6A84F, #FFE7B3)",
            transition: "width 0.05s linear",
            zIndex: 10,
          }}
        />
      </div>

      {/* 2. Dedicated Switcher Control & Caption Bar (Below Image - NEVER covers photo content!) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          marginTop: "9px",
          padding: "0 2px",
        }}
      >
        {/* Slide Tag & Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            minWidth: 0,
            flex: 1,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(214, 168, 79, 0.12)",
              border: "1px solid rgba(214, 168, 79, 0.35)",
              color: "var(--gold)",
              padding: "2px 7px",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.65rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--gold)",
              }}
            />
            {currentBanner?.tag}
          </span>

          <span
            style={{
              fontSize: "0.76rem",
              fontWeight: 600,
              color: "#EDEDED",
              fontFamily: "var(--font-heading)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={currentBanner?.title}
          >
            {currentBanner?.title}
          </span>
        </div>

        {/* Switcher Controls: < 01 02 > */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "rgba(17, 24, 39, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            padding: "2px 5px",
            borderRadius: "var(--radius-pill)",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous banner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "none",
              color: "#EDEDED",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.transform = "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#EDEDED";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={13} />
          </button>

          <button
            type="button"
            onClick={() => selectSlide(0)}
            style={{
              padding: "2px 7px",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.66rem",
              fontFamily: "var(--font-heading)",
              fontWeight: currentIndex === 0 ? 700 : 500,
              cursor: "pointer",
              border:
                currentIndex === 0
                  ? "1px solid #FFE7B3"
                  : "1px solid transparent",
              background:
                currentIndex === 0
                  ? "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)"
                  : "transparent",
              color: currentIndex === 0 ? "#111827" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            01
          </button>

          <button
            type="button"
            onClick={() => selectSlide(1)}
            style={{
              padding: "2px 7px",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.66rem",
              fontFamily: "var(--font-heading)",
              fontWeight: currentIndex === 1 ? 700 : 500,
              cursor: "pointer",
              border:
                currentIndex === 1
                  ? "1px solid #FFE7B3"
                  : "1px solid transparent",
              background:
                currentIndex === 1
                  ? "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)"
                  : "transparent",
              color: currentIndex === 1 ? "#111827" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            02
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "none",
              color: "#EDEDED",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.transform = "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#EDEDED";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
/**
 * Standard-Sized Product Card matching Services Card Dimensions
 */
function ProductCard({ product, onOpenLightbox }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    if (glow) {
      glow.style.opacity = "1";
      glow.style.transform = `translate(${x - 130}px, ${y - 130}px)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    if (glow) {
      glow.style.opacity = "0";
    }
  };



  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card product-card"
      style={{
        width: "100%",
        maxWidth: "620px",
        padding: "26px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        position: "relative",
        borderRadius: "var(--radius-xl)",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow:
          "0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3)",
        transition:
          "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Cursor Spotlight Glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(214, 168, 79, 0.20) 0%, rgba(214, 168, 79, 0.04) 45%, transparent 70%)",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Top Header: Logo + Badges + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                border: "1px solid rgba(214, 168, 79, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                flexShrink: 0,
              }}
            >
              <img
                src={product.logo}
                alt={`${product.name} Logo`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "var(--font-heading)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--gold)",
                  fontWeight: 700,
                }}
              >
                {product.category}
              </div>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: 0,
                  lineHeight: 1.2,
                  fontFamily: "var(--font-heading)",
                }}
              >
                {product.name}
              </h3>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.65rem",
                fontFamily: "SFMono-Regular, monospace",
                color: "#4ADE80",
                background: "rgba(34, 197, 94, 0.10)",
                padding: "2px 7px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#4ADE80",
                  boxShadow: "0 0 5px #4ADE80",
                }}
              />
              {product.status}
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "0.80rem",
            fontWeight: 500,
            color: "var(--gold-soft)",
            marginBottom: "14px",
            lineHeight: 1.35,
          }}
        >
          {product.tagline}
        </p>

        {/* Animated 2-Banner Switcher (Sleek 16:9 viewport) */}
        <CardBannerSwitcher
          banners={product.banners}
          productName={product.name}
          onOpenLightbox={(idx) => onOpenLightbox(product, idx)}
        />

        {/* Short Description */}
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            lineHeight: 1.5,
            marginBottom: "14px",
          }}
        >
          {product.shortDescription}
        </p>

        {/* Compact Key Metrics Bar */}
        <div
          className="product-metrics-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "4px",
            padding: "8px 6px",
            borderRadius: "10px",
            background: "rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "14px",
            textAlign: "center",
          }}
        >
          {product.keyMetrics.map((metric, i) => (
            <div
              key={i}
              style={{
                borderRight:
                  i < product.keyMetrics.length - 1 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                padding: "0 2px",
              }}
            >
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                  fontFamily: "var(--font-heading)",
                  lineHeight: 1.1,
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: "0.60rem",
                  color: "#EDEDED",
                  marginTop: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Key Features (Clean 3 bullets) */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: 0,
            margin: "0 0 14px 0",
          }}
        >
          {product.features.map((feat, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.78rem",
                color: "#E5E7EB",
                lineHeight: 1.3,
              }}
            >
              <CheckCircle2
                size={13}
                style={{
                  color: "var(--gold)",
                  flexShrink: 0,
                }}
              />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer: Tech Stack & CTAs */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Tech Stack Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            marginBottom: "14px",
          }}
        >
          {product.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "0.66rem",
                fontFamily: "SFMono-Regular, monospace",
                padding: "2px 7px",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "var(--text-muted)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Repository & Architecture Footer Link */}
        {product.links.github && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <a
              href={product.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.74rem",
                fontFamily: "var(--font-heading)",
                color: "var(--text-dim)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <Code2 size={13} />
              <span>Architecture & Source Code</span>
            </a>

            <span
              style={{
                fontFamily: "SFMono-Regular, monospace",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
              }}
            >
              #{product.id}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Fullscreen 4K Lightbox Modal with Prominent Gold Navigation Arrows & Restored Cursor
 */
function LightboxModal({ activeLightbox, onClose }) {
  const [slideIdx, setSlideIdx] = useState(activeLightbox?.bannerIndex || 0);



  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setSlideIdx((prev) => (prev === 0 ? 1 : 0));
      if (e.key === "ArrowRight") setSlideIdx((prev) => (prev === 0 ? 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!activeLightbox) return null;

  const currentBanner = activeLightbox.product.banners[slideIdx];
  const banners = activeLightbox.product.banners;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(6, 9, 15, 0.96)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 24px",
      }}
      onClick={onClose}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 30,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.84rem",
              fontWeight: 700,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {activeLightbox.product.name}
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
          <span style={{ color: "#EDEDED", fontSize: "0.90rem", fontWeight: 600 }}>
            {currentBanner.title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span
            style={{
              fontFamily: "SFMono-Regular, monospace",
              fontSize: "0.78rem",
              color: "var(--gold)",
              background: "rgba(214, 168, 79, 0.12)",
              padding: "4px 12px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid rgba(214, 168, 79, 0.35)",
            }}
          >
            Slide {slideIdx + 1} of {banners.length}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close full view (Esc)"
            title="Close preview (Esc)"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              color: "#FFFFFF",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(214, 168, 79, 0.25)";
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Display with Ultra-Prominent Gold Navigation Arrows */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 0",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* PROMINENT LEFT ARROW BUTTON */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-prev-btn"
          onClick={() => setSlideIdx((prev) => (prev === 0 ? 1 : 0))}
          aria-label="Previous slide (Left Arrow)"
          title="Previous slide (Left Arrow)"
          style={{
            position: "absolute",
            left: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "linear-gradient(135deg, rgba(26, 32, 46, 0.95) 0%, rgba(15, 20, 30, 0.95) 100%)",
            border: "2px solid rgba(214, 168, 79, 0.75)",
            color: "#FFE7B3",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            zIndex: 35,
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.75), 0 0 25px rgba(214, 168, 79, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.15)";
            e.currentTarget.style.background = "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)";
            e.currentTarget.style.color = "#111827";
            e.currentTarget.style.boxShadow = "0 10px 35px rgba(214, 168, 79, 0.7), 0 0 40px rgba(214, 168, 79, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(26, 32, 46, 0.95) 0%, rgba(15, 20, 30, 0.95) 100%)";
            e.currentTarget.style.color = "#FFE7B3";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.75), 0 0 25px rgba(214, 168, 79, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)";
          }}
        >
          <ChevronLeft size={30} strokeWidth={2.6} />
        </button>

        {/* 100% Uncut Full Screen Image */}
        <img
          className="lightbox-modal-img"
          src={currentBanner.src}
          alt={currentBanner.title}
          style={{
            maxWidth: "86vw",
            maxHeight: "72vh",
            objectFit: "contain",
            borderRadius: "16px",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* PROMINENT RIGHT ARROW BUTTON */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-next-btn"
          onClick={() => setSlideIdx((prev) => (prev === 0 ? 1 : 0))}
          aria-label="Next slide (Right Arrow)"
          title="Next slide (Right Arrow)"
          style={{
            position: "absolute",
            right: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "linear-gradient(135deg, rgba(26, 32, 46, 0.95) 0%, rgba(15, 20, 30, 0.95) 100%)",
            border: "2px solid rgba(214, 168, 79, 0.75)",
            color: "#FFE7B3",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            zIndex: 35,
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.75), 0 0 25px rgba(214, 168, 79, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.15)";
            e.currentTarget.style.background = "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)";
            e.currentTarget.style.color = "#111827";
            e.currentTarget.style.boxShadow = "0 10px 35px rgba(214, 168, 79, 0.7), 0 0 40px rgba(214, 168, 79, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(26, 32, 46, 0.95) 0%, rgba(15, 20, 30, 0.95) 100%)";
            e.currentTarget.style.color = "#FFE7B3";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.75), 0 0 25px rgba(214, 168, 79, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)";
          }}
        >
          <ChevronRight size={30} strokeWidth={2.6} />
        </button>
      </div>

      {/* Bottom Caption & Interactive Switcher Pills */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 30,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "0.86rem", textAlign: "center" }}>
          {currentBanner.caption}
        </span>

        {/* Bottom Interactive Slide Switcher */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(17, 24, 39, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
          }}
        >
          <button
            type="button"
            onClick={() => setSlideIdx((prev) => (prev === 0 ? 1 : 0))}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--gold)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.74rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              cursor: "pointer",
              padding: "2px 6px",
            }}
          >
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          {banners.map((b, idx) => {
            const isActive = idx === slideIdx;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSlideIdx(idx)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-heading)",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid #FFE7B3"
                    : "1px solid transparent",
                  background: isActive
                    ? "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)"
                    : "rgba(255, 255, 255, 0.05)",
                  color: isActive ? "#111827" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                {b.tag}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSlideIdx((prev) => (prev === 0 ? 1 : 0))}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--gold)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.74rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              cursor: "pointer",
              padding: "2px 6px",
            }}
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
/**
 * Main Products Section
 */
export default function Products({ lenisRef: _lenisRef } = {}) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeTextRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeLightbox, setActiveLightbox] = useState(null);

  useHeadingReveal(headingRef, { blur: 12, stagger: 0.02, start: "top 82%" });
  useParagraphHighlight(subtitleRef, { start: "top 85%", end: "bottom 65%" });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([".section-badge", ".product-card", ".category-pill-btn"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      if (badgeTextRef.current) {
        scrambleText(badgeTextRef.current, "Flagship Products", 0.8);
      }

      gsap.fromTo(
        ".products-badge",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".product-card",
        { y: 55, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [selectedCategory] }
  );

  const filteredProducts =
    selectedCategory === "All Products"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  const handleOpenLightbox = (product, bannerIndex) => {
    setActiveLightbox({ product, bannerIndex });
  };

  const handleCloseLightbox = () => {
    setActiveLightbox(null);
  };

  return (
    <section id="products" ref={containerRef} className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ maxWidth: "720px", marginBottom: "40px" }}>
          <div
            className="section-badge products-badge"
            onMouseEnter={() => {
              if (badgeTextRef.current) {
                scrambleText(badgeTextRef.current, "Flagship Products", 0.5);
              }
            }}
          >
            <span className="section-badge-dot" />
            <span ref={badgeTextRef}>Flagship Products</span>
          </div>

          <h2 ref={headingRef} className="section-title">
            Enterprise Software &{" "}
            <span className="text-gradient-green">Flagship Platforms</span>
          </h2>

          <p ref={subtitleRef} className="section-subtitle">
            Engineered for high-compliance testing laboratories and smart mobility systems.
            Production-ready solutions built with modern web and native mobile architectures.
          </p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "36px",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="category-pill-btn"
                style={{
                  cursor: "pointer",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.825rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#111827" : "var(--text-muted)",
                  background: isActive
                    ? "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)"
                    : "rgba(255, 255, 255, 0.05)",
                  border: isActive
                    ? "1px solid #FFE7B3"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-pill)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(214, 168, 79, 0.4), inset 0 1px 1px #fff"
                    : "none",
                  transition: "all 0.25s ease",
                  outline: "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Fixed 2-Column Responsive Grid: Cards Stay Exact Same Size in Single or All View */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

        {/* Custom Architecture Enterprise Banner */}
        <div
          className="glass-card products-enterprise-banner"
          style={{
            padding: "32px 36px",
            borderRadius: "var(--radius-xl)",
            background:
              "linear-gradient(135deg, rgba(214, 168, 79, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
            border: "1px solid rgba(214, 168, 79, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(214, 168, 79, 0.3)",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.78rem",
                fontFamily: "var(--font-heading)",
                color: "var(--gold)",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              <Sparkles size={14} />
              <span>Tailored Enterprise Solutions</span>
            </div>

            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#EDEDED",
                marginBottom: "6px",
                fontFamily: "var(--font-heading)",
              }}
            >
              Need private on-premise installation or custom ERP / mobile integration?
            </h4>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Our engineering team collaborates directly with your technical leadership to package
              custom integrations, private hosting, and high-performance workflows.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              borderRadius: "var(--radius-pill)",
              background: "linear-gradient(135deg, #FFE7B3 0%, #D6A84F 100%)",
              color: "#111827",
              fontFamily: "var(--font-heading)",
              fontSize: "0.88rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow:
                "0 8px 24px rgba(214, 168, 79, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(214, 168, 79, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(214, 168, 79, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.9)";
            }}
          >
            <span>Consult Solution Engineers</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        key={activeLightbox ? `${activeLightbox.product.id}-${activeLightbox.bannerIndex}` : "closed"}
        activeLightbox={activeLightbox}
        onClose={handleCloseLightbox}
      />
    </section>
  );
}
