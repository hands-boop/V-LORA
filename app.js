/**
 * VÉLORA Luxury Fashion - Interactive Application Logic
 */

// Sample Curated Products Database with Real E-Commerce Details & Descriptions
const products = [
  {
    id: 1,
    name: "Kacamata Aviator Tortoise Gold",
    category: "aksesori",
    price: 890000,
    oldPrice: 1100000,
    discount: "-20%",
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    isNew: false,
    description: "Kacamata aviator mewah dengan bingkai logam berlapis emas murni dan aksen motif penyu klasik. Lensa perlindungan UV400 terpolarisasi untuk keteduhan dan estetika kontemporer.",
    colors: ["Tortoise Gold", "Obsidian Black", "Amber Gold"],
    sizes: ["Standard"]
  },
  {
    id: 2,
    name: "Sneakers Kulit Minimalis Blanc",
    category: "sepatu",
    price: 1450000,
    oldPrice: 1800000,
    discount: "-20%",
    rating: 4.8,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    isNew: false,
    description: "Sneakers minimalis potongan rendah dari kulit calfskin premium Italia. Sol karet empuk fleksibel dengan bantalan memory foam untuk kenyamanan melangkah sepanjang hari.",
    colors: ["Blanc White", "Camel Tan", "Noir Grey"],
    sizes: ["40", "41", "42", "43", "44"]
  },
  {
    id: 3,
    name: "Jam Tangan Chrono Sapphire Onyx",
    category: "jam",
    price: 2850000,
    oldPrice: null,
    discount: null,
    rating: 5.0,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    isNew: true,
    description: "Jam tangan presisi tinggi dengan kaca safir anti gores, dial bertekstur sunburst onyx, serta tali kulit buaya artisan warna cokelat tua dengan gesper kupu-kupu.",
    colors: ["Sapphire Onyx", "Silver White", "Rose Gold"],
    sizes: ["40mm", "42mm"]
  },
  {
    id: 4,
    name: "Tas Jinjing Artisan Calfskin Camel",
    category: "tas",
    price: 2150000,
    oldPrice: 2550000,
    discount: "-15%",
    rating: 4.9,
    reviews: 84,
    image: "images/tas-camel-mewah.jpg",
    isNew: false,
    description: "Tas jinjing berstruktur mewah dari kulit anak sapi (calfskin) asli pilihan berwarna camel hangat. Dilengkapi pegangan kokoh, tali bahu yang dapat dilepas, dan hardware emas murni berkilau halus.",
    colors: ["Camel Tan", "Noir Charcoal", "Alabaster Beige"],
    sizes: ["Medium", "Large"]
  },
  {
    id: 5,
    name: "Blazer Tailored Linen Charcoal",
    category: "pria",
    price: 1690000,
    oldPrice: 1990000,
    discount: "-15%",
    rating: 4.7,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
    isNew: false,
    description: "Blazer potongan sartorial modern dari perpaduan serat linen dan wol ringan. Memberikan siluet rapi berwibawa tanpa mengorbankan sirkulasi udara dan kenyamanan gerak.",
    colors: ["Charcoal Blue", "Stone Sand", "Deep Navy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Gaun Silk Satin Beige Champagne",
    category: "wanita",
    price: 1850000,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 52,
    image: "images/gaun-silk-satin.jpg",
    isNew: true,
    description: "Gaun sutra satin lipit (pleated) warna beige champagne dengan drape anggun mempesona. Didesain dengan aksen ikat pinggang bordir halus untuk pesta cocktail maupun perjamuan malam eksklusif.",
    colors: ["Beige Champagne", "Emerald Green", "Midnight Black"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 7,
    name: "Tas Bahu Quilted Noir Gold Chain",
    category: "tas",
    price: 2490000,
    oldPrice: 2990000,
    discount: "-17%",
    rating: 5.0,
    reviews: 47,
    image: "images/tas-chanel-noir.jpg",
    isNew: false,
    description: "Tas bahu quilted kulit domba (lambskin) hitam pekat dengan tekstur empuk mewah. Rantai bahu anyaman kulit berbalut sepuhan emas 24k memberikan aura klasik haute couture abadi.",
    colors: ["Noir Gold", "Burgundy Red", "Pearl Ivory"],
    sizes: ["Small", "Medium"]
  },
  {
    id: 8,
    name: "Loafers Kulit Venetian Espresso",
    category: "sepatu",
    price: 1720000,
    oldPrice: null,
    discount: null,
    rating: 4.8,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80",
    isNew: true,
    description: "Sepatu loafers kulit Venetian buatan tangan artisan Florentine dengan sentuhan patina espresso mewah. Dilengkapi sol kulit tebal Goodyear welted yang awet dan anggun.",
    colors: ["Espresso Brown", "Noir Black", "Cognac Tan"],
    sizes: ["40", "41", "42", "43", "44"]
  }
];

// App State
let cart = [];
let wishlist = new Set();
let activeFilter = 'all';

// Modal State
let currentModalProduct = null;
let modalSelectedQty = 1;

// Format currency into Rupiah
function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterContainer = document.getElementById('filterContainer');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const cartDrawer = document.getElementById('cartDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotalAmount = document.getElementById('cartSubtotalAmount');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const freeShippingNotice = document.getElementById('freeShippingNotice');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const toastContainer = document.getElementById('toastContainer');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const newsletterForm = document.getElementById('newsletterForm');

const productModal = document.getElementById('productModal');
const closeProductModalBtn = document.getElementById('closeProductModal');
const productModalBody = document.getElementById('productModalBody');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFilterEvents();
  setupCartEvents();
  setupSearchEvents();
  setupProductModalEvents();
  setupScrollNavbar();
  setupNewsletter();
});

// Render Product Cards
function renderProducts() {
  const filtered = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  productsGrid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.has(product.id);
    return `
      <article class="product-card" data-id="${product.id}" onclick="openProductModal(${product.id})" title="Klik untuk melihat detail produk">
        <div class="product-thumb-container">
          ${product.discount ? `<span class="badge-discount">${product.discount}</span>` : ''}
          ${product.isNew && !product.discount ? `<span class="badge-new">Baru</span>` : ''}
          
          <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist(${product.id})" 
                  aria-label="Simpan ke favorit" title="Simpan ke favorit">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>

          <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy">

          <div class="product-quick-bar">
            <button class="btn-quick-view" onclick="event.stopPropagation(); openProductModal(${product.id})">
              <i class="fa-solid fa-eye"></i> Lihat Detail
            </button>
          </div>
        </div>

        <div class="product-info">
          <div class="product-meta">
            <span class="product-category">${product.category}</span>
            <div class="product-rating">
              <i class="fa-solid fa-star"></i>
              <span>${product.rating}</span>
            </div>
          </div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-pricing">
            <div class="price-box">
              <span class="price-current">${formatIDR(product.price)}</span>
              ${product.oldPrice ? `<span class="price-old">${formatIDR(product.oldPrice)}</span>` : ''}
            </div>
            <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})" aria-label="Tambah ke keranjang" title="Tambah ke keranjang">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Category Filter Handling
function setupFilterEvents() {
  const filterBtns = filterContainer.querySelectorAll('.filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderProducts();
    });
  });

  // Category circular bubbles interaction
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = card.getAttribute('data-category');
      const targetPill = document.querySelector(`.filter-pill[data-filter="${cat}"]`);
      if (targetPill) {
        filterBtns.forEach(b => b.classList.remove('active'));
        targetPill.classList.add('active');
        activeFilter = cat;
        renderProducts();
      }
      document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// PRODUCT DETAIL / QUICK VIEW MODAL
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  modalSelectedQty = 1;

  const defaultDescription = product.description || "Dibuat dari bahan terkurasi dengan standar haute couture, menawarkan perpaduan sempurna antara kenyamanan superior, estetika mewah kontemporer, dan ketahanan jangka panjang.";
  const colors = product.colors || ["Camel Tan", "Noir Black", "Champagne"];
  const sizes = product.sizes || ["S", "M", "L", "XL"];

  productModalBody.innerHTML = `
    <div class="modal-media-col">
      <img src="${product.image}" alt="${product.name}" class="modal-product-img">
    </div>
    <div class="modal-info-col">
      <span class="modal-category-badge">${product.category}</span>
      <h2 class="modal-product-title">${product.name}</h2>
      
      <div class="modal-rating-row">
        <div class="modal-stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <span><strong>${product.rating}</strong> (${product.reviews || 48} ulasan terverifikasi)</span>
      </div>

      <div class="modal-price-row">
        <span class="modal-price-current">${formatIDR(product.price)}</span>
        ${product.oldPrice ? `<span class="modal-price-old">${formatIDR(product.oldPrice)}</span>` : ''}
        ${product.discount ? `<span class="modal-discount-tag">${product.discount} OFF</span>` : ''}
      </div>

      <p class="modal-description">${defaultDescription}</p>

      <div class="modal-option-group">
        <label class="modal-option-label">Pilihan Warna:</label>
        <div class="modal-option-chips" id="modalColorChips">
          ${colors.map((c, idx) => `<button type="button" class="option-chip ${idx === 0 ? 'active' : ''}" onclick="selectModalChip(this)">${c}</button>`).join('')}
        </div>
      </div>

      <div class="modal-option-group">
        <label class="modal-option-label">Pilihan Ukuran:</label>
        <div class="modal-option-chips" id="modalSizeChips">
          ${sizes.map((s, idx) => `<button type="button" class="option-chip ${idx === 0 ? 'active' : ''}" onclick="selectModalChip(this)">${s}</button>`).join('')}
        </div>
      </div>

      <div class="modal-action-row">
        <div class="modal-qty-box">
          <button type="button" class="modal-qty-btn" onclick="changeModalQty(-1)">-</button>
          <span class="modal-qty-val" id="modalQtyVal">1</span>
          <button type="button" class="modal-qty-btn" onclick="changeModalQty(1)">+</button>
        </div>
        <button type="button" class="btn btn-primary btn-modal-add" onclick="addModalProductToCart()">
          <i class="fa-solid fa-bag-shopping"></i> Tambah ke Keranjang
        </button>
      </div>

      <div class="modal-guarantees">
        <div class="guarantee-item">
          <i class="fa-solid fa-truck-fast"></i>
          <span>Bebas Ongkir Nasional</span>
        </div>
        <div class="guarantee-item">
          <i class="fa-solid fa-arrows-rotate"></i>
          <span>Garansi Retur 30 Hari</span>
        </div>
        <div class="guarantee-item">
          <i class="fa-solid fa-certificate"></i>
          <span>100% Produk Asli</span>
        </div>
      </div>
    </div>
  `;

  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  if (productModal) {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function selectModalChip(btn) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.option-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeModalQty(delta) {
  modalSelectedQty = Math.max(1, modalSelectedQty + delta);
  const qtyEl = document.getElementById('modalQtyVal');
  if (qtyEl) qtyEl.textContent = modalSelectedQty;
}

function addModalProductToCart() {
  if (!currentModalProduct) return;
  
  const existing = cart.find(item => item.id === currentModalProduct.id);
  if (existing) {
    existing.quantity += modalSelectedQty;
  } else {
    cart.push({ ...currentModalProduct, quantity: modalSelectedQty });
  }

  updateCartUI();
  closeProductModal();
  openCartDrawer();
  showToast(`"${currentModalProduct.name}" (${modalSelectedQty}x) berhasil ditambahkan ke keranjang.`);
}

function setupProductModalEvents() {
  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', closeProductModal);
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        closeProductModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartDrawer();
      closeSearchModal();
    }
  });
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  openCartDrawer();
  showToast(`"${product.name}" berhasil ditambahkan ke keranjang.`);
}

function quickAddToCart(productId) {
  addToCart(productId);
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast(`"${product.name}" dihapus dari favorit.`);
  } else {
    wishlist.add(productId);
    showToast(`"${product.name}" ditambahkan ke favorit.`);
  }

  wishlistCount.textContent = wishlist.size;
  renderProducts();
}

// Update Cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartDrawerCount.textContent = totalItems;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartSubtotalAmount.textContent = formatIDR(subtotal);

  // Free shipping threshold check (Rp 750.000)
  const freeThreshold = 750000;
  if (subtotal >= freeThreshold) {
    freeShippingNotice.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: #2E7D32;"></i>
      <span>Selamat! Anda mendapatkan <strong>Gratis Ongkir</strong>!</span>
    `;
  } else {
    const diff = freeThreshold - subtotal;
    freeShippingNotice.innerHTML = `
      <i class="fa-solid fa-truck-fast"></i>
      <span>Belanja <strong>${formatIDR(diff)}</strong> lagi untuk Bebas Ongkir!</span>
    `;
  }

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <h4>Keranjang Anda Kosong</h4>
        <p>Jelajahi koleksi elegan kami dan tambahkan pakaian idaman Anda.</p>
        <button class="btn btn-dark-pill" onclick="closeCartDrawer()">Mulai Berbelanja</button>
      </div>
    `;
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.5';
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">${formatIDR(item.price)}</span>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem(${item.id})" title="Hapus">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }
}

// Modify Quantity in Cart
function updateItemQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeCartItem(productId);
  } else {
    updateCartUI();
  }
}

// Remove from Cart
function removeCartItem(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
}

// Open/Close Cart Drawer
function openCartDrawer() {
  cartDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function setupCartEvents() {
  cartBtn.addEventListener('click', openCartDrawer);
  closeCartBtn.addEventListener('click', closeCartDrawer);
  drawerOverlay.addEventListener('click', () => {
    closeCartDrawer();
    closeSearchModal();
    closeProductModal();
  });

  clearCartBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      cart = [];
      updateCartUI();
      showToast("Semua produk di keranjang telah dikosongkan.");
    }
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      showToast("Pesanan Anda sedang diproses ke halaman pembayaran...");
      setTimeout(() => {
        alert("Terima kasih telah berbelanja di VÉLORA Studio! Integrasi sistem pembayaran aman sedang disiapkan.");
        cart = [];
        updateCartUI();
        closeCartDrawer();
      }, 1000);
    }
  });

  // Wishlist Icon click
  document.getElementById('wishlistBtn').addEventListener('click', () => {
    if (wishlist.size === 0) {
      showToast("Daftar keinginan masih kosong. Klik ikon hati pada produk untuk menyimpan.");
    } else {
      showToast(`Anda memiliki ${wishlist.size} produk favorit tersimpan.`);
    }
  });

  // User Account button
  document.getElementById('userBtn').addEventListener('click', () => {
    showToast("Selamat datang di VÉLORA Privilege Club! Fitur masuk akun segera hadir.");
  });
}

// Search Modal
function setupSearchEvents() {
  searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
  });

  closeSearchBtn.addEventListener('click', closeSearchModal);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      closeSearchModal();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '<p class="search-hint">Ketik nama produk atau kategori untuk mencari...</p>';
      return;
    }

    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = '<p class="search-hint">Tidak ada produk yang cocok dengan pencarian Anda.</p>';
    } else {
      searchResults.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="selectSearchedProduct(${p.id})">
          <img src="${p.image}" alt="${p.name}" class="search-result-img">
          <div>
            <strong style="display:block; font-size: 0.94rem;">${p.name}</strong>
            <span style="font-size: 0.85rem; color: var(--gold-dark);">${formatIDR(p.price)}</span>
          </div>
        </div>
      `).join('');
    }
  });
}

function closeSearchModal() {
  searchModal.classList.remove('active');
  document.body.style.overflow = '';
}

function selectSearchedProduct(productId) {
  closeSearchModal();
  openProductModal(productId);
}

// Sticky Navbar Scroll Effect
function setupScrollNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile navigation menu toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Newsletter Subscription
function setupNewsletter() {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    showToast(`Terima kasih! Voucher diskon 15% telah dikirimkan ke ${email}`);
    newsletterForm.reset();
  });
}

// Toast Notifications
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}
