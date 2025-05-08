import { GiHamburgerMenu } from "react-icons/gi";
import { FiChevronUp } from "react-icons/fi";
import React from "react";

export default function MenuButton({ size = 24, open = false }) {
  return (
    <span className="inline-block transition-transform duration-300 ease-in-out">
      {open ? (
        <FiChevronUp size={size} className="transform transition-transform duration-300 rotate-0" />
      ) : (
        <GiHamburgerMenu size={size} className="transform transition-transform duration-300 rotate-0" />
      )}
    </span>
  );
} 