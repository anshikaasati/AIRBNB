"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { FADE_TRANSITION } from "../../lib/motion";

interface OverlayShellProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  darkBackdrop?: boolean;
}

export function OverlayShell({
  isOpen,
  onClose,
  children,
  darkBackdrop = false,
}: OverlayShellProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and trap keyboard focus when active
  useScrollLock(isOpen);
  useFocusTrap(containerRef, isOpen);

  if (!mounted) return null;

  const backdropBg = darkBackdrop ? "bg-black" : "bg-white";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={FADE_TRANSITION}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${backdropBg}`}
        >
          {/* Inner Dialog Container */}
          <div ref={containerRef} className="w-full h-full relative focus:outline-none">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
