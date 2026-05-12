document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. GLOBAL: Navigation & Scroll
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Glassmorphism Navbar Scroll Effect
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(15, 16, 17, 0.95)";
        navbar.style.padding = "0.5rem 0";
      } else {
        navbar.style.background = "rgba(15, 16, 17, 0.85)";
        navbar.style.padding = "1rem 0";
      }
    }
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "all";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
      }
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // 2. GLOBAL: Scroll Reveal Animation
  // ==========================================
  const observerOptions = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-text",
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

  // ==========================================
  // 3. HOME PAGE: Testimonials
  // ==========================================
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.querySelector(".testimonial-dots");

  if (slides.length > 0 && dotsContainer) {
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("testimonial-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".testimonial-dot");

    function goToSlide(n) {
      slides[currentSlide].classList.remove("active");
      dots[currentSlide].classList.remove("active");
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    }

    // Auto rotate
    setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  // ==========================================
  // 4. MENU PAGE: Filtering Logic
  // ==========================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // 1. Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // 2. Add active to clicked
        button.classList.add("active");

        // 3. Filter items
        const category = button.dataset.category;

        menuItems.forEach((item) => {
          // Reset animation for re-trigger
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";

          if (category === "all" || item.dataset.category === category) {
            item.style.display = "flex";
            // Small timeout to allow display:flex to apply before animating opacity
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 50);
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});
