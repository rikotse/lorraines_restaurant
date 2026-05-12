document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. DATA (Restored from Backup)
  // =========================================
  const menuItems = [
    {
      id: 1,
      title: "Springbok Carpaccio",
      price: 195,
      category: "starters",
      description:
        "Thinly sliced springbok with truffle oil, wild rocket and parmesan shavings",
      image: "sprinbok.jpg",
    },
    {
      id: 2,
      title: "Cape Malay Curry",
      price: 245,
      category: "mains",
      description:
        "Traditional Cape Malay curry with linefish, served with sambals and roti",
      image: "0cd3cce4989dc9c9421304b768c4a034.jpg",
    },
    {
      id: 3,
      title: "Malva Pudding",
      price: 120,
      category: "desserts",
      description: "Classic South African dessert with amarula custard",
      image: "Malva-Pudding.jpg",
    },
    {
      id: 4,
      title: "Karoo Lamb Rack",
      price: 285,
      category: "mains",
      description:
        "Herb-crusted Karoo lamb with roasted vegetables and mint jus",
      image: "karoo-lamb-rack.jpg",
    },
    {
      id: 5,
      title: "Ostrich Tataki",
      price: 175,
      category: "starters",
      description: "Seared ostrich with ginger, soy and sesame dressing",
      image: "ostrich-tataki.jpg",
    },
    {
      id: 6,
      title: "Pinotage Wine",
      price: 95,
      category: "drinks",
      description:
        "Premium South African Pinotage from Stellenbosch (per glass)",
      image: "Pinotage-Wine.jpg",
    },
    {
      id: 7,
      title: "Chocolate Fondant",
      price: 130,
      category: "desserts",
      description: "Warm chocolate fondant with rooibos ice cream",
      image: "chocolate-fondant.jpg",
    },
    {
      id: 8,
      title: "Craft Gin & Tonic",
      price: 110,
      category: "drinks",
      description: "Local craft gin with premium tonic and botanicals",
      image: "gin-and-tonic.jpg",
    },
    {
      id: 9,
      title: "Biltong Salad",
      price: 145,
      category: "starters",
      description:
        "Mixed greens with biltong, feta, avocado and a balsamic dressing",
      image: "Biltong-Salad.jpg",
    },
    {
      id: 10,
      title: "Bobotie Pie",
      price: 220,
      category: "mains",
      description:
        "Traditional bobotie with a flaky pastry crust, served with yellow rice",
      image: "Bobotie-Pie.jpg",
    },
    {
      id: 11,
      title: "Cheese Platter",
      price: 180,
      category: "starters",
      description: "Selection of local cheeses with preserves and crackers",
      image: "Cheese-Platter.jpg",
    },
    {
      id: 12,
      title: "Rooibos Iced Tea",
      price: 50,
      category: "drinks",
      description: "Refreshing iced tea made with local rooibos",
      image: "Rooibos-Iced-Tea.jpg",
    },
    {
      id: 13,
      title: "Trimasu Brownie",
      price: 160,
      category: "desserts",
      description:
        "Decadent brownie layered with tiramisu cream and coffee sauce",
      image: "trimasu-brownies.jpg",
    },
    {
      id: 14,
      title: "Grilled Kingklip",
      price: 260,
      category: "mains",
      description:
        "Freshly grilled kingklip with lemon butter sauce and seasonal vegetables",
      image: "Grilled-Kingklip.jpg",
    },
    {
      id: 15,
      title: "Blackberry Mousse Tart",
      price: 140,
      category: "desserts",
      description:
        "Light and creamy blackberry mousse tart with a biscuit base",
      image: "blackberry-mousse-tart.jpg",
    },
    {
      id: 16,
      title: "Craft Beer Selection",
      price: 70,
      category: "drinks",
      description:
        "Local craft beers from top South African breweries (per glass)",
      image: "Craft-Beer-Selection.jpg",
    },
    {
      id: 17,
      title: "Butternut Soup",
      price: 150,
      category: "starters",
      description: "Roasted butternut, cream, herbs",
      image: "butternut-soup.jpg",
    },
    {
      id: 18,
      title: "Grilled Lamb Chops",
      price: 270,
      category: "mains",
      description: "Served with pap & chakalaka",
      image: "grilled-lamb-chops.jpg",
    },
    {
      id: 19,
      title: "Amarula Cheesecake",
      price: 140,
      category: "desserts",
      description: "Velvety cheesecake with a South African twist",
      image: "amarula-cheesecake.jpg",
    },
    {
      id: 20,
      title: "Cocktails",
      price: 85,
      category: "drinks",
      description: "A selection of handcrafted cocktails using local spirits",
      image: "cocktails.jpg",
    },
  ];

  // =========================================
  // 2. STATE & CONFIG
  // =========================================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentSelection = null;
  const DELIVERY_FEE = 50.0;

  // DOM Elements
  const menuContainer = document.getElementById("appMenuContainer");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountBadge = document.getElementById("cartCountBadge");
  const mobileCartCount = document.getElementById("mobileCartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Modal Elements
  const itemModal = document.getElementById("itemModal");
  const modalImg = document.getElementById("modalItemImage");
  const modalTitle = document.getElementById("modalItemName");
  const modalDesc = document.getElementById("modalItemDesc");
  const modalPrice = document.getElementById("modalItemPrice");
  const itemQtyInput = document.getElementById("itemQuantity");

  // =========================================
  // 3. INITIALIZATION
  // =========================================
  function init() {
    renderMenu("all");
    updateCartUI();
    setupFilters();
    setupModals();
    setupCheckout();
    setupDateInputs();
  }

  // =========================================
  // 4. MENU RENDERING
  // =========================================
  function renderMenu(category) {
    menuContainer.innerHTML = "";

    const filteredItems =
      category === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === category);

    filteredItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "app-menu-card reveal-text";
      const imgPath = (typeof DJANGO_STATIC_URL !== 'undefined') 
                ? DJANGO_STATIC_URL + item.image 
                : 'Images/' + item.image;
      card.innerHTML = `
      <div class="card-img" style="background-image: url('/static/Images/${item.image}')"></div>
            <div class="card-details">
                <div class="card-header">
                    <h4>${item.title}</h4>
                    <span class="price">R${item.price}</span>
                </div>
                <p>${item.description}</p>
                <button class="btn-add" onclick="openItemModal(${item.id})">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
        `;
      menuContainer.appendChild(card);
    });
  }

  function setupFilters() {
    const buttons = document.querySelectorAll(".app-filter");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderMenu(btn.dataset.category);
      });
    });
  }

  // =========================================
  // 5. CART LOGIC
  // =========================================
  window.openItemModal = (id) => {
    currentSelection = menuItems.find((i) => i.id === id);
    if (!currentSelection) return;

    modalImg.src = `Images/${currentSelection.image}`;
    modalTitle.textContent = currentSelection.title;
    modalDesc.textContent = currentSelection.description;
    modalPrice.textContent = `R${currentSelection.price}`;
    itemQtyInput.value = 1;
    document.getElementById("itemNotes").value = "";

    itemModal.classList.add("active");
  };

  document.getElementById("confirmAddToCart").addEventListener("click", () => {
    const qty = parseInt(itemQtyInput.value);
    const notes = document.getElementById("itemNotes").value;

    const existingItem = cart.find(
      (i) => i.id === currentSelection.id && i.notes === notes,
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({
        ...currentSelection,
        qty: qty,
        notes: notes,
      });
    }

    saveCart();
    closeAllModals();
  });

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-basket-shopping" style="font-size: 2rem; color: #333; margin-bottom: 1rem;"></i>
                <p>Your basket is empty.</p>
            </div>`;
      checkoutBtn.disabled = true;
    } else {
      checkoutBtn.disabled = false;
      cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        count += item.qty;

        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
                  <div class="cart-row-info">
                      <div class="row-title">${item.title}</div>
                      ${item.notes ? `<small class="row-notes">"${item.notes}"</small>` : ""}
                      <div class="row-price">R${item.price * item.qty}</div>
                  </div>
                  <div class="cart-row-controls">
                      <button onclick="updateQty(${index}, -1)">-</button>
                      <span>${item.qty}</span>
                      <button onclick="updateQty(${index}, 1)">+</button>
                  </div>
              `;
        cartItemsContainer.appendChild(row);
      });
    }

    cartSubtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    cartTotalEl.textContent = `R${(subtotal + DELIVERY_FEE).toFixed(2)}`;
    cartCountBadge.textContent = count;
    mobileCartCount.textContent = count;
  }

  window.updateQty = (index, change) => {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  };

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  // =========================================
  // 6. UTILS & CHECKOUT
  // =========================================
  function closeAllModals() {
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((m) => m.classList.remove("active"));
  }

  function setupModals() {
    document.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", closeAllModals);
    });

    // Quantity Logic inside Modal
    document.getElementById("increaseQty").addEventListener("click", () => {
      itemQtyInput.value = parseInt(itemQtyInput.value) + 1;
    });
    document.getElementById("decreaseQty").addEventListener("click", () => {
      if (parseInt(itemQtyInput.value) > 1) {
        itemQtyInput.value = parseInt(itemQtyInput.value) - 1;
      }
    });

    // Mobile Cart Toggle
    document.getElementById("mobileCartBtn").addEventListener("click", () => {
      document.querySelector(".cart-column").classList.toggle("active-mobile");
    });
  }

  function setupCheckout() {
    checkoutBtn.addEventListener("click", () => {
      document.getElementById("checkoutModal").classList.add("active");
    });

    document.getElementById("checkoutForm").addEventListener("submit", (e) => {
      e.preventDefault();

      // 1. Close the checkout form modal
      document.getElementById("checkoutModal").classList.remove("active");

      // 2. Open the custom success modal
      const successModal = document.getElementById("orderSuccessModal");
      successModal.classList.add("active");

      // 3. Clear cart logic
      cart = [];
      saveCart();
    });

    window.closeOrderSuccess = () => {
      document.getElementById("orderSuccessModal").classList.remove("active");
      closeAllModals();
    };

    // Toggle Delivery Fields
    const radios = document.getElementsByName("deliveryType");
    const addressFields = document.getElementById("deliveryFields");
    const deliveryFeeDisplay = document.getElementById("deliveryFee");

    radios.forEach((r) => {
      r.addEventListener("change", (e) => {
        if (e.target.value === "pickup") {
          addressFields.style.display = "none";
          addressFields
            .querySelectorAll("input")
            .forEach((i) => (i.required = false));
          deliveryFeeDisplay.textContent = "R0.00";
        } else {
          addressFields.style.display = "block";
          document.getElementById("address1").required = true;
          deliveryFeeDisplay.textContent = `R${DELIVERY_FEE.toFixed(2)}`;
        }
      });
    });
  }

  function setupDateInputs() {
    const dateInput = document.getElementById("deliveryDate");
    const timeSelect = document.getElementById("deliveryTime");

    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;

    // Populate times (simplified 12:00 - 22:00)
    for (let i = 12; i <= 21; i++) {
      const opt = document.createElement("option");
      opt.value = `${i}:00`;
      opt.textContent = `${i}:00`;
      timeSelect.appendChild(opt);

      const optHalf = document.createElement("option");
      optHalf.value = `${i}:30`;
      optHalf.textContent = `${i}:30`;
      timeSelect.appendChild(optHalf);
    }
  }

  // Run Init
  init();
});
