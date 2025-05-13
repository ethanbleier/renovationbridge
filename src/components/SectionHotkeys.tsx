"use client";

import { useEffect } from "react";

export default function SectionHotkeys() {
  useEffect(() => {
    const sectionIds = [
      "hero",
      "platform-section",
      "what-we-offer-section",
      "testimonials-section",
      "service-area-map-section",
      "how-it-works-section",
      "free-guide-section",
      "as-seen-on-tv-section",
      "cta-section",
    ];
    
    function handleKeyDown(e: KeyboardEvent) {
      // Only trigger for number keys 1-9, not if typing in input/textarea
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          (document.activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }
      
      // Only desktop: skip if window width < 768px
      if (window.innerWidth < 768) return;
      
      // Key 1-9
      if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        const sectionId = sectionIds[idx];
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  // This component doesn't render anything
  return null;
} 