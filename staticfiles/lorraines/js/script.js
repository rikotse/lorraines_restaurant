// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // ===== GLOBAL VARIABLES =====
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Menu items data
  const menuItems = [
    {
      id: 1,
      title: "Springbok Carpaccio",
      price: "R195",
      category: "starters",
      description:
        "Thinly sliced springbok with truffle oil, wild rocket and parmesan shavings",
      image: "sprinbok.jpg",
    },
    {
      id: 2,
      title: "Cape Malay Curry",
      price: "R245",
      category: "mains",
      description:
        "Traditional Cape Malay curry with linefish, served with sambals and roti",
      image: "0cd3cce4989dc9c9421304b768c4a034.jpg",
    },
    {
      id: 3,
      title: "Malva Pudding",
      price: "R120",
      category: "desserts",
      description: "Classic South African dessert with amarula custard",
      image: "Malva-Pudding.jpg",
    },
    {
      id: 4,
      title: "Karoo Lamb Rack",
      price: "R285",
      category: "mains",
      description:
        "Herb-crusted Karoo lamb with roasted vegetables and mint jus",
      image: "karoo-lamb-rack.jpg",
    },
    {
      id: 5,
      title: "Ostrich Tataki",
      price: "R175",
      category: "starters",
      description: "Seared ostrich with ginger, soy and sesame dressing",
      image: "ostrich-tataki.jpg",
    },
    {
      id: 6,
      title: "Pinotage Wine",
      price: "R95/glass",
      category: "drinks",
      description: "Premium South African Pinotage from Stellenbosch",
      image: "Pinotage-Wine.jpg",
    },
    {
      id: 7,
      title: "Chocolate Fondant",
      price: "R130",
      category: "desserts",
      description: "Warm chocolate fondant with rooibos ice cream",
      image: "chocolate-fondant.jpg",
    },
    {
      id: 8,
      title: "Craft Gin & Tonic",
      price: "R110/glass",
      category: "drinks",
      description: "Local craft gin with premium tonic and botanicals",
      image: "gin-and-tonic.jpg",
    },
    {
      id: 9,
      title: "Biltong Salad",
      price: "R145",
      category: "starters",
      description:
        "Mixed greens with biltong, feta, avocado and a balsamic dressing",
      image: "Biltong-Salad.jpg",
    },
    {
      id: 10,
      title: "Bobotie Pie",
      price: "R220",
      category: "mains",
      description:
        "Traditional bobotie with a flaky pastry crust, served with yellow rice",
      image: "Bobotie-Pie.jpg",
    },
    {
      id: 11,
      title: "Cheese Platter",
      price: "R180",
      category: "starters",
      description: "Selection of local cheeses with preserves and crackers",
      image: "Cheese-Platter.jpg",
    },
    {
      id: 12,
      title: "Rooibos Iced Tea",
      price: "R50/glass",
      category: "drinks",
      description: "Refreshing iced tea made with local rooibos",
      image: "Rooibos-Iced-Tea.jpg",
    },
    {
      id: 13,
      title: "Trimasu Brownie",
      price: "R160",
      category: "desserts",
      description:
        "Decadent brownie layered with tiramisu cream and coffee sauce",
      image: "trimasu-brownies.jpg",
    },
    {
      id: 14,
      title: "Grilled Kingklip",
      price: "R260",
      category: "mains",
      description:
        "Freshly grilled kingklip with lemon butter sauce and seasonal vegetables",
      image: "Grilled-Kingklip.jpg",
    },
    {
      id: 15,
      title: "Blackberry Mousse Tart",
      price: "R140",
      category: "desserts",
      description:
        "Light and creamy blackberry mousse tart with a biscuit base",
      image: "blackberry-mousse-tart.jpg",
    },
    {
      id: 16,
      title: "Craft Beer Selection",
      price: "R70/glass",
      category: "drinks",
      description: "Local craft beers from top South African breweries",
      image: "Craft-Beer-Selection.jpg",
    },
    {
      id: 17,
      title: "Butternut Soup",
      price: "R150",
      category: "starters",
      description: "Roasted butternut, cream, herbs",
      image: "butternut-soup.jpg",
    },
    {
      id: 18,
      title: "Grilled Lamb Chops",
      price: "R270",
      category: "mains",
      description: "Served with pap & chakalaka",
      image: "grilled-lamb-chops.jpg",
    },
    {
      id: 19,
      title: "Amarula Cheesecake",
      price: "R140",
      category: "desserts",
      description: "Velvety cheesecake with a South African twist",
      image: "amarula-cheesecake.jpg",
    },
    {
      id: 20,
      title: "Cocktails",
      price: "R85/glass",
      category: "drinks",
      description: "A selection of handcrafted cocktails using local spirits",
      image: "cocktails.jpg",
    },
  ];

  // ===== DOM ELEMENTS =====
  // Navigation
  const elements = {
    hamburger: document.querySelector(".hamburger"),
    navLinks: document.querySelector(".nav-links"),
    categoryFilters: document.querySelector(".filter-buttons"),

    // Forms
    reservationForm: document.getElementById("bookingForm"),
    reviewForm: document.getElementById("reviewForm"),
    addReviewBtn: document.querySelector(".add-review-btn"),
    reviewFormContainer: document.querySelector(".review-form-container"),
  };

  // ===== INITIALIZATION =====
  function initialize() {
    setupRevealAnimations();
    setupBackToTopButton();
    setupMobileNavigation();
    if (document.querySelector(".testimonial-slide")) {
      setupTestimonialSlider();
    }
    initMenuFilters();
    setupForms();
  }

  // ===== CORE FUNCTIONALITY =====

  // 1. Menu Filtering
  function initMenuFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        const filterValue = button.dataset.category;

        menuItems.forEach((item) => {
          if (filterValue === "all" || item.dataset.category === filterValue) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 2. Mobile Navigation

  function setupMobileNavigation() {
    if (!elements.hamburger || !elements.navLinks) return;

    elements.hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      elements.hamburger.classList.toggle("active");
      elements.navLinks.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });

    // Close when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        elements.hamburger.classList.remove("active");
        elements.navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !elements.navLinks.contains(e.target) &&
        !elements.hamburger.contains(e.target)
      ) {
        elements.hamburger.classList.remove("active");
        elements.navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    });
  }

  // 3. Scroll Animations
  function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    const reveal = () => {
      const windowHeight = window.innerHeight;

      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
    };

    // Initial check
    reveal();

    // Add scroll event listener
    window.addEventListener("scroll", reveal);
  }

  // 4. Testimonial Slider
  function setupTestimonialSlider() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.querySelector(".testimonial-dots");
    let current = 0;
    let interval;

    if (!slides.length || !dotsContainer) return;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      // Update dots
      const dots = dotsContainer.querySelectorAll(".testimonial-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      current = index;
    }

    function createDots() {
      slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("testimonial-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          clearInterval(interval);
          showSlide(i);
          startSlider();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function startSlider() {
      interval = setInterval(() => {
        const next = (current + 1) % slides.length;
        showSlide(next);
      }, 5000);
    }

    // Swipe support for touch devices
    const slider = document.querySelector(".testimonial-slider");
    if (slider) {
      let startX = 0;

      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        clearInterval(interval);
      });

      slider.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
          showSlide((current + 1) % slides.length);
        } else if (endX - startX > 50) {
          showSlide((current - 1 + slides.length) % slides.length);
        }
        startSlider();
      });
    }

    // Initialize
    createDots();
    showSlide(0);
    startSlider();
  }

  // 5. Back to Top Button
  function setupBackToTopButton() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        backToTopBtn.classList.toggle("show", window.scrollY > 300);
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  //6. Form Handling
  function setupForms() {
    const addReviewBtn = document.querySelector(
      "#testimonials .add-review-btn"
    );
    const reviewFormContainer = document.querySelector(
      "#testimonials .review-form-container"
    );

    console.log("Review button:", addReviewBtn);
    console.log("Form container:", reviewFormContainer);

    if (addReviewBtn && reviewFormContainer) {
      reviewFormContainer.style.display = "none";

      addReviewBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Button clicked");
        reviewFormContainer.style.display =
          reviewFormContainer.style.display === "block" ? "none" : "block";
      });
    }

    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
      reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you for your review!");
        reviewForm.reset();
        if (reviewFormContainer) {
          reviewFormContainer.style.display = "none";
        }
      });
    }
  }

  fetch("/api/menu-items/")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("menu-items-container");
      container.innerHTML = ""; // clear first

      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "menu-item";
        card.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>R${item.price}</span>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
        container.appendChild(card);
      });
    });

  // Initialize the application
  initialize();
});
