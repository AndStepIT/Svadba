(function () {
  "use strict";

  const FONTS = [
    '"Rubik Mono One", monospace',
    '"Kelly Slab", serif',
    '"Comfortaa", sans-serif',
    '"Montserrat Alternates", sans-serif',
    '"Rubik Wet Paint", cursive',
  ];

  const COLORS = [
    "#00ffff",
    "#00ff00",
    "#ff00ff",
    "#ffff00",
    "#ff1493",
    "#ffffff",
    "#ff2255",
  ];

  function seededRandom(seed) {
    let s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function initRansomTitles() {
    document
      .querySelectorAll("[data-ransom]")
      .forEach((heading, headingIndex) => {
        const text = heading.textContent.trim();
        heading.textContent = "";
        heading.setAttribute("aria-label", text);

        const rand = seededRandom(headingIndex * 997 + 42);

        [...text].forEach((char, i) => {
          if (char === " ") {
            const space = document.createElement("span");
            space.className = "letter letter--space";
            space.setAttribute("aria-hidden", "true");
            heading.appendChild(space);
            return;
          }

          const span = document.createElement("span");
          span.className = "letter";
          span.textContent = char;
          span.setAttribute("aria-hidden", "true");
          span.style.setProperty(
            "--rot",
            `${(rand() * 24 - 12).toFixed(1)}deg`,
          );
          span.style.fontFamily = FONTS[Math.floor(rand() * FONTS.length)];
          span.style.background = COLORS[Math.floor(rand() * COLORS.length)];
          span.style.transitionDelay = `${i * 40}ms`;
          heading.appendChild(span);
        });
      });
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal, .ransom-title");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
  }

  function initHeroReveal() {
    const hero = document.querySelector(".hero");
    if (hero) {
      requestAnimationFrame(() => hero.classList.add("is-visible"));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initRansomTitles();
    initScrollReveal();
    initHeroReveal();
  });
})();
