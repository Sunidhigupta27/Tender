"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

// Splits heading text into words that slide up one after another when the
// heading scrolls into view. Nested elements (e.g. <span className="accent">)
// are kept and their text is split too.
function split(children, counter) {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      const parts = String(child).split(/(\s+)/);
      return parts.map((p, k) => {
        if (!p) return null;
        if (/^\s+$/.test(p)) return " ";
        const i = counter.n++;
        return (
          <span className="w" key={`${i}-${k}`}>
            <span className="wi" style={{ "--i": i }}>{p}</span>
          </span>
        );
      });
    }
    if (isValidElement(child)) {
      return cloneElement(child, {}, split(child.props.children, counter));
    }
    return child;
  });
}

export default function SplitWords({ as: Tag = "h2", className = "", children, delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.disconnect(); }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const counter = { n: 0 };
  return (
    <Tag
      ref={ref}
      className={`sw ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      {split(children, counter)}
    </Tag>
  );
}
