// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // ===== GLOBAL VARIABLES =====
  const DELIVERY_FEE = 50;
  const SERVICE_FEE = 30;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentItem = null;

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
      price: "R110",
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
  const hamburger = document.querySelector(".hamburger");
  const navLinks =
    document.querySelector(".nav-links") ||
    console.error("Nav links element not found");

  // Menu elements
  const menuBtn = document.getElementById("menu-btn");
  const cartBtn = document.getElementById("cart-btn");
  const checkoutBtn = document.getElementById("checkout-btn");
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  const menuItemsContainer = document.getElementById("menuItemsContainer");

  // Cart elements
  const cartContainer = document.getElementById("cartItemsContainer");
  const cartTotal = document.getElementById("cartTotal");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const deliveryFeeElement = document.getElementById("deliveryFee");
  const cartCountElements = document.querySelectorAll(".cart-count");
  const checkoutButton = document.getElementById("checkoutBtn");

  // Modals
  const itemModal = document.getElementById("itemModal");
  const orderModal = document.getElementById("orderModal");
  const modalItemName = document.getElementById("modalItemName");
  const modalItemImage = document.getElementById("modalItemImage");
  const modalItemDesc = document.getElementById("modalItemDesc");
  const itemQuantity = document.getElementById("itemQuantity");
  const itemNotes = document.getElementById("itemNotes");
  const confirmAddToCart = document.getElementById("confirmAddToCart");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const decreaseQty = document.getElementById("decreaseQty");
  const increaseQty = document.getElementById("increaseQty");

  // Forms
  const checkoutForm = document.getElementById("checkoutForm");
  const confirmationBox = document.getElementById("orderConfirmation");
  const orderSummary = document.getElementById("orderSummary");
  const nameInput = document.getElementById("fullNameInput");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const address1Input = document.getElementById("address1");
  const address2Input = document.getElementById("address2");
  const address3Input = document.getElementById("address3");
  const address4Input = document.getElementById("address4");
  const deliveryDateInput = document.getElementById("deliveryDate");
  const deliveryTimeSelect = document.getElementById("deliveryTime");

  // ===== INITIALIZATION =====
  function initialize() {
    setupMobileNavigation();
    setupBackToTopButton();
    setupCartFunctionality();
    updateCartCount();
    renderCartItems();
    setupEventListeners();
    setupDeliveryOptions();
    setupDateAndTime();
  }

  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    // Navigation buttons
    if (menuBtn) menuBtn.addEventListener("click", scrollToMenu);
    if (cartBtn) cartBtn.addEventListener("click", scrollToCart);
    if (checkoutBtn) checkoutBtn.addEventListener("click", scrollToCheckout);

    // Add to cart buttons
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const menuItem = e.target.closest(".menu-item");
        const itemId = parseInt(menuItem.dataset.id);
        currentItem = menuItems.find((item) => item.id === itemId);
        openItemModal(currentItem);
      });
    });

    // Modal controls
    if (decreaseQty)
      decreaseQty.addEventListener("click", () => {
        if (parseInt(itemQuantity.value) > 1) {
          itemQuantity.value = parseInt(itemQuantity.value) - 1;
        }
      });

    if (increaseQty)
      increaseQty.addEventListener("click", () => {
        itemQuantity.value = parseInt(itemQuantity.value) + 1;
      });

    if (confirmAddToCart)
      confirmAddToCart.addEventListener("click", addToCartFromModal);

    // Close modals
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        itemModal.style.display = "none";
        orderModal.style.display = "none";
        itemModal.classList.remove("show");
        orderModal.classList.remove("show");
      });
    });

    // Checkout form
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", handleCheckout);
    }

    // Checkout button in cart
    if (checkoutButton) {
      checkoutButton.addEventListener("click", showOrderSummary);
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === itemModal) {
        itemModal.style.display = "none";
        itemModal.classList.remove("show");
      }
      if (e.target === orderModal) {
        orderModal.style.display = "none";
        orderModal.classList.remove("show");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        itemModal.style.display = "none";
        itemModal.classList.remove("show");
        orderModal.style.display = "none";
        orderModal.classList.remove("show");
      }
    });

    // Delivery type toggle
    document.querySelectorAll('input[name="deliveryType"]').forEach((radio) => {
      radio.addEventListener("change", toggleDeliveryFields);
    });
  }

  // ===== DELIVERY OPTIONS =====
  function setupDeliveryOptions() {
    toggleDeliveryFields(); // Initialize the view
  }

  function toggleDeliveryFields() {
    const deliveryType = document.querySelector(
      'input[name="deliveryType"]:checked'
    ).value;
    const deliveryFields = document.getElementById("deliveryFields");
    const feeLabel = document.getElementById("feeLabel");
    const orderFee = document.getElementById("orderFee");

    if (deliveryType === "pickup") {
      deliveryFields.style.display = "none";
      feeLabel.textContent = "Service Fee:";
      orderFee.textContent = `R${SERVICE_FEE.toFixed(2)}`;
    } else {
      deliveryFields.style.display = "block";
      feeLabel.textContent = "Delivery Fee:";
      orderFee.textContent = `R${DELIVERY_FEE.toFixed(2)}`;
    }
    updateCheckoutTotals();
  }

  // ===== DATE AND TIME SETUP =====
  function setupDateAndTime() {
    // Set minimum date to today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    deliveryDateInput.min = `${yyyy}-${mm}-${dd}`;

    // Set default date to today
    deliveryDateInput.value = `${yyyy}-${mm}-${dd}`;

    // Generate time options
    generateTimeOptions();
  }

  function generateTimeOptions() {
    // Clear existing options
    deliveryTimeSelect.innerHTML = "";

    // Create time slots starting from next 45 minutes
    const now = new Date();
    const currentMinutes = now.getMinutes();
    let startHour = now.getHours();
    let startMinute = Math.ceil(currentMinutes / 15) * 15;

    if (startMinute >= 60) {
      startHour++;
      startMinute = 0;
    }

    // Generate options from opening to closing time (12:00 - 22:00)
    for (let hour = 12; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Skip times that are in the past for today
        if (deliveryDateInput.value === deliveryDateInput.min) {
          if (
            hour < startHour ||
            (hour === startHour && minute < startMinute)
          ) {
            continue;
          }
        }

        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const option = document.createElement("option");
        option.value = timeString;
        option.textContent = timeString;
        deliveryTimeSelect.appendChild(option);
      }
    }
  }

  // Update time options when date changes
  deliveryDateInput.addEventListener("change", generateTimeOptions);

  // ===== CART FUNCTIONALITY =====
  function setupCartFunctionality() {
    updateCartCount();
    renderCartItems();
  }

  function openItemModal(item) {
    modalItemName.textContent = item.title;
    modalItemImage.src = `/static/lorraines/Images/${item.image}`;
    modalItemDesc.textContent = item.description;
    itemQuantity.value = 1;
    itemNotes.value = "";
    itemModal.style.display = "flex";
    itemModal.classList.add("show");
  }

  function addToCartFromModal() {
    const quantity = parseInt(itemQuantity.value);
    const notes = itemNotes.value;
    const price = parseFloat(currentItem.price.replace(/[^0-9.]/g, ""));

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.id === currentItem.id && item.notes === notes
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        id: currentItem.id,
        title: currentItem.title,
        price: price,
        quantity: quantity,
        notes: notes,
        image: currentItem.image,
      });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    updateCartCount();
    renderCartItems();

    // Close the modal
    itemModal.style.display = "none";
    itemModal.classList.remove("show");

    // Scroll to cart to show the update
    scrollToCart();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach((element) => {
      element.textContent = count;
    });
    checkoutButton.disabled = count === 0;
  }

  function renderCartItems() {
    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<div class="empty-cart-message">Your cart is empty</div>';
      cartSubtotal.textContent = "R0.00";
      deliveryFeeElement.textContent = "R0.00";
      cartTotal.textContent = "R0.00";
      return;
    }

    cartContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          ${
            item.notes ? `<div class="cart-item-notes">${item.notes}</div>` : ""
          }
          <div class="cart-controls">
            <button class="decrease-btn" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn" data-index="${index}">+</button>
          </div>
        </div>
        <div class="cart-item-price">R${(item.price * item.quantity).toFixed(
          2
        )}</div>
        <button class="remove-btn" data-index="${index}">&times;</button>
      `;
      cartContainer.appendChild(itemElement);

      subtotal += item.price * item.quantity;
    });

    // Add event listeners to new buttons
    document.querySelectorAll(".decrease-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        updateCartItemQuantity(index, -1);
      });
    });

    document.querySelectorAll(".increase-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        updateCartItemQuantity(index, 1);
      });
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        removeCartItem(index);
      });
    });

    // Update totals
    cartSubtotal.textContent = `R${subtotal.toFixed(2)}`;
    deliveryFeeElement.textContent = `R${DELIVERY_FEE.toFixed(2)}`;
    cartTotal.textContent = `R${(subtotal + DELIVERY_FEE).toFixed(2)}`;
  }

  function updateCartItemQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;

    if (newQuantity < 1) {
      removeCartItem(index);
      return;
    }

    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  function removeCartItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  // ===== CHECKOUT FUNCTIONALITY =====
  function showOrderSummary(e) {
    e.preventDefault();

    let subtotal = 0;
    let summaryHTML = `
      <div class="order-summary-container">
        <h3>Order Summary</h3>
        <ul class="order-items">
    `;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      summaryHTML += `
        <li>
          <div class="order-item">
            <span class="item-name">${item.quantity}x ${item.title}</span>
            <span class="item-price">R${itemTotal.toFixed(2)}</span>
          </div>
          ${item.notes ? `<div class="item-notes">${item.notes}</div>` : ""}
        </li>
      `;
    });

    summaryHTML += `
        </ul>
        <div class="order-totals">
          <div class="order-total-row">
            <span>Subtotal:</span>
            <span>R${subtotal.toFixed(2)}</span>
          </div>
          <div class="order-total-row">
            <span>Delivery Fee:</span>
            <span>R${DELIVERY_FEE.toFixed(2)}</span>
          </div>
          <div class="order-total-row total">
            <span>Total:</span>
            <span>R${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
          </div>
        </div>
        <button type="button" id="proceedToCheckout" class="submit-btn">Proceed to Checkout</button>
      </div>
    `;

    orderSummary.innerHTML = summaryHTML;
    confirmationBox.style.display = "none";
    orderModal.style.display = "flex";

    document
      .getElementById("proceedToCheckout")
      ?.addEventListener("click", () => {
        confirmationBox.style.display = "none";
        showCheckoutForm();
      });
  }

  function showCheckoutForm() {
    confirmationBox.style.display = "none";
    checkoutForm.style.display = "block";
    updateCheckoutTotals();
  }

  async function handleCheckout(e) {
    e.preventDefault();

    // Validate form as before
    if (!fullNameInput.value || !emailInput.value || !phoneInput.value) {
      alert("Please fill in all required fields");
      return;
    }

    const deliveryType = document.querySelector(
      'input[name="deliveryType"]:checked'
    ).value;
    if (deliveryType === "delivery") {
      if (
        !address1Input.value ||
        !address2Input.value ||
        !address3Input.value
      ) {
        alert("Please fill in all required address fields");
        return;
      }
    }

    if (!deliveryDateInput.value || !deliveryTimeSelect.value) {
      alert("Please select a delivery/pickup date and time");
      return;
    }

    // Calculate totals
    let subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const fee = deliveryType === "pickup" ? SERVICE_FEE : DELIVERY_FEE;
    const total = subtotal + fee;

    // Build payload to send
    const orderData = {
      full_name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: address1Input.value || "",
      delivery_type: deliveryType,
      delivery_date: deliveryDateInput.value,
      delivery_time: deliveryTimeSelect.value,
      payment_method: document.querySelector(
        'input[name="paymentMethod"]:checked'
      ).value,
      notes: document.getElementById("orderNotes").value,
      subtotal: subtotal,
      delivery_fee: fee,
      service_fee: 0, // or whatever value you use
      total: total,
      cart: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        notes: item.notes || "",
      })),
    };

    try {
      const response = await fetch("/submit-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // If you use CSRF protection, implement this helper
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        // Show confirmation (you can reuse your existing orderSummary UI)
        alert(`Order placed successfully! Your order ID is ${data.order_id}`);

        // Clear cart & form as before
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        checkoutForm.reset();
        orderModal.style.display = "none";
        scrollToMenu();
      } else {
        alert("Failed to place order: " + data.error);
      }
    } catch (err) {
      alert("Error submitting order: " + err.message);
    }
  }

  function updateCheckoutTotals() {
    let subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryType =
      document.querySelector('input[name="deliveryType"]:checked')?.value ||
      "delivery";
    const fee = deliveryType === "pickup" ? SERVICE_FEE : DELIVERY_FEE;
    const total = subtotal + fee;

    const orderSubtotal = document.getElementById("orderSubtotal");
    const orderFee = document.getElementById("orderFee");
    const orderTotal = document.getElementById("orderTotal");

    if (orderSubtotal) orderSubtotal.textContent = `R${subtotal.toFixed(2)}`;
    if (orderFee) orderFee.textContent = `R${fee.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `R${total.toFixed(2)}`;
  }

  function getCSRFToken() {
    let cookieValue = null;
    const name = "csrftoken";
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  async function submitOrderToBackend(orderData) {
    try {
      const response = await fetch("/place-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Order placed! Your order ID is ${result.order_id}`);
        // clear cart, redirect, etc
      } else {
        alert(`Order failed: ${result.error}`);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  }

  // ===== UTILITY FUNCTIONS =====
  function scrollToMenu() {
    document
      .querySelector(".order-menu-container")
      .scrollIntoView({ behavior: "smooth" });
  }

  function scrollToCart() {
    document
      .querySelector(".cart-section")
      .scrollIntoView({ behavior: "smooth" });
  }

  function scrollToCheckout() {
    if (cart.length > 0) {
      showOrderSummary(new Event("click"));
    } else {
      alert("Your cart is empty. Please add items before checkout.");
    }
  }

  function setupMobileNavigation() {
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });

    // Close when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    });
  }

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

  fetch("/api/menu/")
    .then((res) => res.json())
    .then((data) => console.log(data));

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

  //Send Order
  function submitOrder(cartItems, customerName, tableNumber, notes, total) {
    fetch("/submit-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(), // If using CSRF protection
      },
      body: JSON.stringify({
        customerName,
        tableNumber,
        notes,
        total,
        items: cartItems, // [{ id, quantity }]
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Order submitted! Order ID: " + data.order_id);
          // Optionally: clearCart();
        } else {
          alert("Error: " + data.error);
        }
      });
  }

  fetch("/submit-order/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      full_name: "Customer Name",
      phone: "0812345678",
      email: "customer@example.com",
      address: "123 Food Street",
      delivery_type: "delivery",
      delivery_date: "2025-08-06",
      payment_method: "card",
      delivery_fee: 25.0,
      subtotal: 200.0,
      service_fee: 10.0,
      total: 235.0,
      notes: "Leave at the gate",
      cart: [
        {
          id: 1,
          name: "Grilled Chicken",
          quantity: 2,
          price: 75.0,
          notes: "Extra spicy",
        },
        {
          id: 2,
          name: "Chips",
          quantity: 1,
          price: 50.0,
        },
      ],
    }),
  });

  fetch("/api/menu-items/")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("menu-items-container");
      container.innerHTML = "";

      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "menu-item";
        card.dataset.id = item.id;
        card.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>R${item.price}</span>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
        container.appendChild(card);
      });

      // Attach event listeners to new buttons
      container.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const menuItem = e.target.closest(".menu-item");
          const itemId = parseInt(menuItem.dataset.id);
          // Find the item in your menuItems array or use 'data'
          const currentItem = data.find((item) => item.id === itemId);
          openItemModal(currentItem);
        });
      });
    });

  // Initialize the application
  initialize();
});
