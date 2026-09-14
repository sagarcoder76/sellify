import { seedProducts, categories, collections } from './data.js';
import { initHeroScene, initProductViewer } from './three-hero.js';

const LS_PRODUCTS = 'sellify_products_v2';
const LS_CART = 'sellify_cart_v2';
const LS_WISHLIST = 'sellify_wishlist_v2';

function getProducts() {
  try {
    const stored = localStorage.getItem(LS_PRODUCTS);
    if (stored) return JSON.parse(stored);
  } catch {}
  return seedProducts;
}
function saveProducts(products) {
  localStorage.setItem(LS_PRODUCTS, JSON.stringify(products));
}

let PRODUCTS = getProducts();
let CART = JSON.parse(localStorage.getItem(LS_CART) || '[]');
let WISHLIST = JSON.parse(localStorage.getItem(LS_WISHLIST) || '[]');
let currentProduct = null;
let activeFilters = { category: 'All', price: [0, 2000], search: '', colors: [], sizes: [], inStock: false };
let sortBy = 'featured';
let viewerInstance = null;
let heroInstance = null;

// DOM
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function formatPrice(n) { return `$${n.toFixed(0)}`; }
function saveCart() { localStorage.setItem(LS_CART, JSON.stringify(CART)); updateCartUI(); }
function saveWishlist() { localStorage.setItem(LS_WISHLIST, JSON.stringify(WISHLIST)); }

function getCartCount() { return CART.reduce((s, i) => s + i.qty, 0); }
function getCartTotal() { return CART.reduce((s, i) => s + i.qty * i.price, 0); }

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl z-[100] flex items-center gap-3 animate-[slideUp_0.4s_ease]';
  t.innerHTML = `<span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>${msg}`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translate(-50%,20px)'; setTimeout(() => t.remove(), 300); }, 2500);
}

// Router
const views = {
  home: $('#view-home'),
  shop: $('#view-shop'),
  product: $('#view-product'),
  checkout: $('#view-checkout')
};
function showView(name) {
  Object.entries(views).forEach(([k, el]) => {
    if (!el) return;
    if (k === name) { el.classList.remove('hidden'); el.classList.add('animate-[fadeIn_0.6s_ease]'); }
    else el.classList.add('hidden');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name !== 'home' && heroInstance) {
    // keep hero but dim
    const canvas = $('#hero-canvas');
    if (canvas) canvas.style.opacity = name === 'home' ? '1' : '0.15';
  }
}

function navigateToShop(cat = 'All') {
  activeFilters.category = cat;
  showView('shop');
  renderShop();
  updateFilterUI();
}
function navigateToProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  showView('product');
  renderProductDetail(p);
}
function navigateHome() { showView('home'); }
function navigateCheckout() { showView('checkout'); renderCheckout(); }

// Header
function initHeader() {
  $('#year') && ($('#year').textContent = new Date().getFullYear());
  $('#logo-btn')?.addEventListener('click', navigateHome);
  $('#nav-shop')?.addEventListener('click', () => navigateToShop('All'));
  $('#nav-collections')?.addEventListener('click', () => { showView('shop'); document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' }); });
  $('#shop-all-btn')?.addEventListener('click', () => navigateToShop('All'));
  $('#hero-shop-btn')?.addEventListener('click', () => navigateToShop('All'));
  $('#mobile-menu-btn')?.addEventListener('click', () => {
    $('#mobile-menu')?.classList.toggle('hidden');
  });
  // Search
  const searchInput = $('#search-input');
  const searchInputMobile = $('#search-input-mobile');
  const handleSearch = (val) => {
    activeFilters.search = val.toLowerCase();
    if (views.shop.classList.contains('hidden')) navigateToShop('All');
    else renderShop();
  };
  searchInput?.addEventListener('input', e => handleSearch(e.target.value));
  searchInputMobile?.addEventListener('input', e => handleSearch(e.target.value));
  // Cart buttons
  $$('[data-open-cart]').forEach(btn => btn.addEventListener('click', openCart));
  $('#close-cart')?.addEventListener('click', closeCart);
  $('#cart-overlay')?.addEventListener('click', closeCart);
}

// Cart UI
function openCart() {
  $('#cart-drawer')?.classList.remove('translate-x-full');
  $('#cart-overlay')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('#cart-drawer')?.classList.add('translate-x-full');
  $('#cart-overlay')?.classList.add('hidden');
  document.body.style.overflow = '';
}
function addToCart(product, opts = {}) {
  const { color, size, qty = 1 } = opts;
  const key = `${product.id}-${color || 'default'}-${size || 'default'}`;
  const existing = CART.find(i => i.key === key);
  if (existing) existing.qty += qty;
  else {
    CART.push({
      key,
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      color, size, qty
    });
  }
  saveCart();
  toast(`${product.title} added to cart`);
  openCart();
}
function updateCartUI() {
  const count = getCartCount();
  $$('[data-cart-count]').forEach(el => el.textContent = count);
  const total = getCartTotal();
  const cartItemsEl = $('#cart-items');
  const cartEmptyEl = $('#cart-empty');
  const cartFooterEl = $('#cart-footer');
  if (!cartItemsEl) return;
  if (CART.length === 0) {
    cartItemsEl.innerHTML = '';
    cartEmptyEl?.classList.remove('hidden');
    cartFooterEl?.classList.add('hidden');
    return;
  }
  cartEmptyEl?.classList.add('hidden');
  cartFooterEl?.classList.remove('hidden');
  cartItemsEl.innerHTML = CART.map(item => `
    <div class="flex gap-4 py-5 border-b border-black/5">
      <img src="${item.image}" class="w-20 h-24 object-cover rounded-xl bg-[#f5f3f0]" />
      <div class="flex-1 min-w-0">
        <div class="flex justify-between gap-2">
          <h4 class="font-medium text-sm leading-tight truncate">${item.title}</h4>
          <button data-remove="${item.key}" class="text-black/40 hover:text-black transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
        <p class="text-xs text-black/50 mt-1">${item.brand}${item.color ? ` • ${item.color}` : ''}${item.size ? ` • ${item.size}` : ''}</p>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center gap-2 bg-[#f5f3f0] rounded-full px-2 py-1">
            <button data-dec="${item.key}" class="w-6 h-6 grid place-items-center rounded-full hover:bg-white transition">−</button>
            <span class="text-sm w-6 text-center">${item.qty}</span>
            <button data-inc="${item.key}" class="w-6 h-6 grid place-items-center rounded-full hover:bg-white transition">+</button>
          </div>
          <span class="font-medium text-sm">${formatPrice(item.price * item.qty)}</span>
        </div>
      </div>
    </div>
  `).join('');

  cartItemsEl.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
    CART = CART.filter(i => i.key !== b.dataset.remove);
    saveCart();
  }));
  cartItemsEl.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => {
    const it = CART.find(i => i.key === b.dataset.dec);
    if (it) { it.qty = Math.max(1, it.qty - 1); saveCart(); }
  }));
  cartItemsEl.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => {
    const it = CART.find(i => i.key === b.dataset.inc);
    if (it) { it.qty++; saveCart(); }
  }));

  $('#cart-subtotal') && ($('#cart-subtotal').textContent = formatPrice(total));
  $('#cart-total') && ($('#cart-total').textContent = formatPrice(total + (total > 0 ? 12 : 0)));
}

// Home render
function renderHome() {
  // Categories
  const catGrid = $('#categories-grid');
  if (catGrid) {
    catGrid.innerHTML = categories.map(c => `
      <button data-cat="${c.id}" class="group relative overflow-hidden rounded-[24px] aspect-[4/5] bg-[#f5f3f0] text-left">
        <img src="${c.image}" alt="${c.name}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-[cubic-bezier(.2,.8,.2,1)]" loading="lazy"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        <div class="absolute bottom-0 p-6 text-white">
          <p class="text-xs uppercase tracking-[0.2em] opacity-70 mb-2">${c.description}</p>
          <h3 class="font-display text-2xl leading-none">${c.name}</h3>
          <p class="mt-2 text-xs opacity-70 flex items-center gap-2">${c.count} products <span class="w-5 h-[1px] bg-white inline-block group-hover:w-8 transition-all"></span></p>
        </div>
      </button>
    `).join('');
    catGrid.querySelectorAll('[data-cat]').forEach(btn => btn.addEventListener('click', () => navigateToShop(btn.dataset.cat)));
  }

  // Featured collections
  const collGrid = $('#collections-grid');
  if (collGrid) {
    collGrid.innerHTML = collections.map(col => `
      <div class="group relative rounded-[32px] overflow-hidden bg-[#0a0a0a] min-h-[480px] flex items-end p-8 md:p-10">
        <img src="${col.image}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.03] transition duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div class="relative text-white max-w-sm">
          <p class="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">${col.subtitle}</p>
          <h3 class="font-display text-4xl md:text-5xl leading-[0.9] mb-6">${col.name}</h3>
          <button data-col="${col.id}" class="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-[#f5f3f0] transition">Shop Collection <span>→</span></button>
        </div>
      </div>
    `).join('');
    collGrid.querySelectorAll('[data-col]').forEach(btn => {
      btn.addEventListener('click', () => {
        const col = collections.find(c => c.id === btn.dataset.col);
        if (!col) return;
        // filter by col logic
        const filtered = PRODUCTS.filter(col.filter);
        renderBestSellers(filtered);
        navigateToShop('All');
        // override shop render with collection filtered? For simplicity go to shop
        toast(`Showing ${col.name}`);
      });
    });
  }

  // Best sellers
  renderBestSellers(PRODUCTS.filter(p => p.featured));

  // Marquee
  const marquee = $('#marquee-text');
  if (marquee) {
    const text = " • Curated Modern Essentials • Free Shipping over $150 • New Drops Weekly • Designed to Last • ";
    marquee.innerHTML = Array(8).fill(text).join('');
  }
}

function renderBestSellers(list) {
  const grid = $('#bestsellers-grid');
  if (!grid) return;
  grid.innerHTML = list.map(p => productCardHTML(p)).join('');
  attachProductCardEvents(grid);
}

// Product card
function productCardHTML(p) {
  const discount = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  return `
    <div class="group cursor-pointer" data-product="${p.id}">
      <div class="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#f5f3f0]">
        <img src="${p.images[0]}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700 ease-[cubic-bezier(.2,.8,.2,1)]" loading="lazy"/>
        ${p.badge ? `<span class="absolute top-3 left-3 bg-[#0a0a0a] text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">${p.badge}</span>` : ''}
        ${discount ? `<span class="absolute top-3 right-3 bg-white text-black text-[10px] font-medium px-2.5 py-1 rounded-full">-${discount}%</span>` : ''}
        <div class="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
          <button data-quick-add="${p.id}" class="bg-white/90 backdrop-blur text-black text-xs font-medium px-4 py-2.5 rounded-full hover:bg-white transition shadow-lg">Quick Add</button>
          <button data-wish="${p.id}" class="w-9 h-9 grid place-items-center bg-white/90 backdrop-blur rounded-full hover:bg-white transition shadow-lg">${WISHLIST.includes(p.id) ? '♥' : '♡'}</button>
        </div>
      </div>
      <div class="pt-4 px-1">
        <div class="flex justify-between gap-2">
          <div class="min-w-0">
            <p class="text-[11px] tracking-[0.15em] uppercase text-black/40">${p.brand}</p>
            <h4 class="font-medium text-[15px] leading-tight truncate">${p.title}</h4>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[15px] font-medium">${formatPrice(p.price)}</p>
            ${p.compareAt ? `<p class="text-xs line-through text-black/30">${formatPrice(p.compareAt)}</p>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-1 mt-2">
          <span class="text-xs">★ ${p.rating.toFixed(1)}</span>
          <span class="text-[11px] text-black/40">(${p.reviewsCount})</span>
          <span class="ml-auto flex gap-1">${p.colors.slice(0,3).map(c => `<span class="w-3 h-3 rounded-full border border-black/10" style="background:${c.hex}" title="${c.name}"></span>`).join('')}</span>
        </div>
      </div>
    </div>
  `;
}
function attachProductCardEvents(container) {
  container.querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-quick-add]') || e.target.closest('[data-wish]')) return;
      navigateToProduct(card.dataset.product);
    });
  });
  container.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === btn.dataset.quickAdd);
      if (p) addToCart(p, { color: p.colors[0]?.name, size: p.sizes[0], qty: 1 });
    });
  });
  container.querySelectorAll('[data-wish]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.wish;
      if (WISHLIST.includes(id)) WISHLIST = WISHLIST.filter(x => x !== id);
      else WISHLIST.push(id);
      saveWishlist();
      btn.textContent = WISHLIST.includes(id) ? '♥' : '♡';
      toast(WISHLIST.includes(id) ? 'Added to wishlist' : 'Removed from wishlist');
    });
  });
}

// Shop
function renderShop() {
  const filtered = applyFiltersAndSort();
  const grid = $('#shop-grid');
  const countEl = $('#shop-count');
  if (countEl) countEl.textContent = `${filtered.length} products`;
  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="col-span-full py-24 text-center"><p class="font-display text-3xl">No products found</p><p class="text-black/50 mt-2">Try adjusting filters or search</p><button id="clear-filters" class="mt-6 bg-black text-white px-6 py-3 rounded-full text-sm">Clear filters</button></div>`;
      $('#clear-filters')?.addEventListener('click', clearFilters);
    } else {
      grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
      attachProductCardEvents(grid);
    }
  }
  // reveal animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-[fadeUp_0.6s_ease_forwards]');
    });
  }, { threshold: 0.1 });
  $$('#shop-grid > div').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

function applyFiltersAndSort() {
  let list = [...PRODUCTS];
  if (activeFilters.category !== 'All') list = list.filter(p => p.category === activeFilters.category);
  if (activeFilters.search) {
    list = list.filter(p => (p.title + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(activeFilters.search));
  }
  list = list.filter(p => p.price >= activeFilters.price[0] && p.price <= activeFilters.price[1]);
  if (activeFilters.colors.length) {
    list = list.filter(p => p.colors.some(c => activeFilters.colors.includes(c.name.trim())));
  }
  if (activeFilters.sizes.length) {
    list = list.filter(p => p.sizes.some(s => activeFilters.sizes.includes(s)));
  }
  if (activeFilters.inStock) list = list.filter(p => p.inStock && p.inventory > 0);

  switch (sortBy) {
    case 'price-asc': list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'rating': list.sort((a,b) => b.rating - a.rating); break;
    case 'newest': list.sort((a,b) => b.id.localeCompare(a.id)); break;
    case 'featured':
    default: list.sort((a,b) => (b.featured?1:0) - (a.featured?1:0));
  }
  return list;
}

function updateFilterUI() {
  $$('[data-filter-cat]').forEach(btn => {
    btn.classList.toggle('bg-black', btn.dataset.filterCat === activeFilters.category);
    btn.classList.toggle('text-white', btn.dataset.filterCat === activeFilters.category);
    btn.classList.toggle('bg-[#f5f3f0]', btn.dataset.filterCat !== activeFilters.category);
  });
}

function initShopFilters() {
  // Category
  const catContainer = $('#filter-categories');
  if (catContainer) {
    const allCats = ['All', ...categories.map(c => c.id)];
    catContainer.innerHTML = allCats.map(cat => `
      <button data-filter-cat="${cat}" class="px-4 py-2 rounded-full text-sm font-medium transition bg-[#f5f3f0] hover:bg-black hover:text-white ${activeFilters.category===cat?'bg-black text-white':''}">${cat}</button>
    `).join('');
    catContainer.querySelectorAll('[data-filter-cat]').forEach(btn => btn.addEventListener('click', () => {
      activeFilters.category = btn.dataset.filterCat;
      updateFilterUI();
      renderShop();
    }));
  }

  // Price
  const priceMin = $('#price-min');
  const priceMax = $('#price-max');
  const priceRange = $('#price-range');
  const updatePrice = () => {
    const min = parseInt(priceMin?.value || 0);
    const max = parseInt(priceMax?.value || 2000);
    activeFilters.price = [min, max];
    $('#price-label') && ($('#price-label').textContent = `${formatPrice(min)} - ${formatPrice(max)}`);
    renderShop();
  };
  priceMin?.addEventListener('input', updatePrice);
  priceMax?.addEventListener('input', updatePrice);
  priceRange?.addEventListener('input', e => {
    const val = parseInt(e.target.value);
    activeFilters.price[1] = val;
    if (priceMax) priceMax.value = val;
    updatePrice();
  });

  // Colors
  const colorContainer = $('#filter-colors');
  if (colorContainer) {
    const allColors = [...new Set(PRODUCTS.flatMap(p => p.colors.map(c => c.name.trim())))].slice(0,12);
    colorContainer.innerHTML = allColors.map(col => `
      <button data-color="${col}" class="group flex items-center gap-2 text-sm">
        <span class="w-5 h-5 rounded-full border border-black/10 group-[.active]:ring-2 group-[.active]:ring-black group-[.active]:ring-offset-2" style="background:${PRODUCTS.flatMap(p=>p.colors).find(c=>c.name.trim()===col)?.hex || '#ccc'}"></span>
        <span class="text-black/70 group-[.active]:text-black">${col}</span>
      </button>
    `).join('');
    colorContainer.querySelectorAll('[data-color]').forEach(btn => btn.addEventListener('click', () => {
      const c = btn.dataset.color;
      btn.classList.toggle('active');
      if (activeFilters.colors.includes(c)) activeFilters.colors = activeFilters.colors.filter(x=>x!==c);
      else activeFilters.colors.push(c);
      renderShop();
    }));
  }

  // Sizes
  const sizeContainer = $('#filter-sizes');
  if (sizeContainer) {
    const allSizes = [...new Set(PRODUCTS.flatMap(p => p.sizes))].slice(0,15);
    sizeContainer.innerHTML = allSizes.map(s => `
      <button data-size="${s}" class="w-10 h-10 rounded-full border border-black/10 text-xs font-medium hover:bg-black hover:text-white transition data-[active=true]:bg-black data-[active=true]:text-white">${s}</button>
    `).join('');
    sizeContainer.querySelectorAll('[data-size]').forEach(btn => btn.addEventListener('click', () => {
      const s = btn.dataset.size;
      const active = btn.dataset.active === 'true';
      btn.dataset.active = !active;
      if (activeFilters.sizes.includes(s)) activeFilters.sizes = activeFilters.sizes.filter(x=>x!==s);
      else activeFilters.sizes.push(s);
      renderShop();
    }));
  }

  // In stock toggle
  $('#filter-instock')?.addEventListener('change', e => {
    activeFilters.inStock = e.target.checked;
    renderShop();
  });

  // Sort
  $('#sort-select')?.addEventListener('change', e => {
    sortBy = e.target.value;
    renderShop();
  });

  // Clear
  $('#clear-filters-btn')?.addEventListener('click', clearFilters);
}

function clearFilters() {
  activeFilters = { category: 'All', price: [0,2000], search: '', colors: [], sizes: [], inStock: false };
  const search = $('#search-input'); if (search) search.value = '';
  const searchM = $('#search-input-mobile'); if (searchM) searchM.value = '';
  $$('#filter-colors button').forEach(b=>b.classList.remove('active'));
  $$('#filter-sizes button').forEach(b=>b.dataset.active='false');
  $('#filter-instock') && ($('#filter-instock').checked = false);
  $('#price-min') && ($('#price-min').value = 0);
  $('#price-max') && ($('#price-max').value = 2000);
  $('#price-range') && ($('#price-range').value = 2000);
  $('#price-label') && ($('#price-label').textContent = '$0 - $2000');
  updateFilterUI();
  renderShop();
}

// Product Detail
function renderProductDetail(p) {
  const container = $('#view-product');
  if (!container) return;

  const discount = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

  container.innerHTML = `
    <div class="max-w-[1440px] mx-auto px-6 md:px-10 py-8 md:py-12">
      <nav class="flex items-center gap-2 text-xs text-black/40 mb-8">
        <button id="back-to-shop" class="hover:text-black flex items-center gap-1">← Back</button>
        <span>/</span>
        <span>${p.category}</span>
        <span>/</span>
        <span class="text-black">${p.title}</span>
      </nav>

      <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
        <!-- Gallery -->
        <div class="space-y-4">
          <div class="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#f5f3f0] group">
            <img id="main-image" src="${p.images[0]}" alt="${p.title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-[1.02]" />
            <div class="absolute top-4 left-4 flex gap-2">
              ${p.badge ? `<span class="bg-black text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">${p.badge}</span>` : ''}
              ${discount ? `<span class="bg-white text-black text-[10px] font-medium px-2.5 py-1 rounded-full">-${discount}%</span>` : ''}
            </div>
            <button id="toggle-3d" class="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg hover:bg-white transition">◐ 3D View</button>
            <canvas id="product-3d-canvas" class="absolute inset-0 w-full h-full hidden"></canvas>
          </div>
          <div class="grid grid-cols-4 gap-3">
            ${p.images.map((img,i) => `
              <button data-thumb="${i}" class="aspect-[4/5] rounded-2xl overflow-hidden bg-[#f5f3f0] ring-2 ${i===0?'ring-black':'ring-transparent'} hover:ring-black/20 transition">
                <img src="${img}" class="w-full h-full object-cover" />
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Info -->
        <div class="lg:sticky lg:top-28">
          <p class="text-[11px] tracking-[0.2em] uppercase text-black/40 mb-3">${p.brand} • ${p.subcategory}</p>
          <h1 class="font-display text-4xl md:text-5xl leading-[0.9] tracking-[-0.02em]">${p.title}</h1>
          <div class="flex items-center gap-3 mt-4">
            <div class="flex items-center gap-1 text-sm">★ ${p.rating.toFixed(1)} <span class="text-black/40">(${p.reviewsCount} reviews)</span></div>
            <span class="w-1 h-1 bg-black/20 rounded-full"></span>
            <span class="text-xs ${p.inStock?'text-green-600':'text-red-500'}">${p.inStock?`In stock (${p.inventory})`:'Out of stock'}</span>
          </div>

          <div class="flex items-baseline gap-3 mt-6">
            <span class="text-3xl font-medium">${formatPrice(p.price)}</span>
            ${p.compareAt ? `<span class="text-lg line-through text-black/30">${formatPrice(p.compareAt)}</span>` : ''}
          </div>

          <div class="h-[1px] bg-black/5 my-8"></div>

          <!-- Colors -->
          <div class="space-y-3">
            <p class="text-xs tracking-[0.15em] uppercase font-medium">Color: <span id="selected-color" class="normal-case tracking-normal font-normal text-black/60">${p.colors[0]?.name || ''}</span></p>
            <div class="flex gap-2">
              ${p.colors.map((c,i) => `
                <button data-color-opt="${c.name}" data-color-index="${i}" class="group relative w-12 h-12 rounded-full p-1 ring-2 ${i===0?'ring-black':'ring-transparent'} hover:ring-black/20 transition">
                  <span class="block w-full h-full rounded-full" style="background:${c.hex}"></span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Sizes -->
          <div class="space-y-3 mt-8">
            <div class="flex justify-between">
              <p class="text-xs tracking-[0.15em] uppercase font-medium">Size: <span id="selected-size" class="normal-case tracking-normal font-normal text-black/60">${p.sizes[0]}</span></p>
              <button class="text-xs underline text-black/50 hover:text-black">Size guide</button>
            </div>
            <div class="flex flex-wrap gap-2">
              ${p.sizes.map((s,i) => `
                <button data-size-opt="${s}" class="min-w-[48px] h-11 px-4 rounded-full border text-sm font-medium transition ${i===0?'bg-black text-white border-black':'bg-white border-black/10 hover:border-black'}">${s}</button>
              `).join('')}
            </div>
          </div>

          <!-- Qty + Add -->
          <div class="flex gap-3 mt-10">
            <div class="flex items-center gap-2 bg-[#f5f3f0] rounded-full px-2">
              <button id="qty-dec" class="w-10 h-10 grid place-items-center rounded-full hover:bg-white transition">−</button>
              <span id="qty-val" class="w-8 text-center text-sm font-medium">1</span>
              <button id="qty-inc" class="w-10 h-10 grid place-items-center rounded-full hover:bg-white transition">+</button>
            </div>
            <button id="add-to-cart-btn" class="flex-1 bg-[#0a0a0a] text-white rounded-full h-14 px-8 text-sm font-medium tracking-wide hover:bg-black transition flex items-center justify-center gap-2">Add to Cart — ${formatPrice(p.price)}</button>
            <button id="wish-btn" class="w-14 h-14 grid place-items-center rounded-full border border-black/10 hover:bg-[#f5f3f0] transition">${WISHLIST.includes(p.id)?'♥':'♡'}</button>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3 text-[11px] text-black/60">
            <div class="bg-[#f5f3f0] rounded-2xl p-4"><p class="font-medium text-black text-xs">Free Shipping</p><p class="mt-1 leading-snug">Free over $150. 2-3 days.</p></div>
            <div class="bg-[#f5f3f0] rounded-2xl p-4"><p class="font-medium text-black text-xs">Free Returns</p><p class="mt-1 leading-snug">30 days return policy.</p></div>
            <div class="bg-[#f5f3f0] rounded-2xl p-4"><p class="font-medium text-black text-xs">Secure Pay</p><p class="mt-1 leading-snug">Encrypted checkout.</p></div>
          </div>

          <!-- Tabs -->
          <div class="mt-12">
            <div class="flex gap-6 border-b border-black/10 text-sm">
              <button data-tab="desc" class="pb-3 border-b-2 border-black font-medium">Description</button>
              <button data-tab="details" class="pb-3 border-b-2 border-transparent text-black/50 hover:text-black">Details</button>
              <button data-tab="reviews" class="pb-3 border-b-2 border-transparent text-black/50 hover:text-black">Reviews (${p.reviews?.length || 0})</button>
            </div>
            <div id="tab-desc" class="py-6 text-[15px] leading-relaxed text-black/70">
              <p>${p.description}</p>
              <ul class="mt-4 space-y-2 list-disc pl-5">
                ${p.features.map(f=>`<li>${f}</li>`).join('')}
              </ul>
            </div>
            <div id="tab-details" class="py-6 hidden">
              <dl class="grid grid-cols-2 gap-4 text-sm">
                ${Object.entries(p.specs).map(([k,v])=>`<div><dt class="text-black/40 text-xs uppercase tracking-wide">${k}</dt><dd class="font-medium mt-1">${v}</dd></div>`).join('')}
              </dl>
            </div>
            <div id="tab-reviews" class="py-6 hidden space-y-6">
              ${p.reviews?.length ? p.reviews.map(r=>`
                <div class="border-b border-black/5 pb-6">
                  <div class="flex justify-between items-start">
                    <div><p class="font-medium text-sm">${r.name} ${r.verified?'<span class="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>':''}</p><p class="text-xs text-black/40 mt-1">${r.date}</p></div>
                    <span class="text-xs">★ ${r.rating}</span>
                  </div>
                  <p class="text-sm text-black/70 mt-3 leading-relaxed">${r.text}</p>
                </div>
              `).join('') : `<p class="text-sm text-black/50">No reviews yet. Be the first.</p>`}
              <form id="review-form" class="bg-[#f5f3f0] rounded-[20px] p-6 space-y-3">
                <h4 class="font-medium text-sm">Write a review</h4>
                <div class="flex gap-1" id="review-stars">
                  ${[1,2,3,4,5].map(n=>`<button type="button" data-star="${n}" class="text-xl text-black/20 hover:text-black">★</button>`).join('')}
                </div>
                <textarea id="review-text" placeholder="Share your experience..." class="w-full bg-white rounded-xl p-3 text-sm border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 min-h-[80px]"></textarea>
                <button type="submit" class="bg-black text-white px-5 py-2.5 rounded-full text-sm">Submit review</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Related -->
      <div class="mt-24">
        <h3 class="font-display text-3xl mb-8">You may also like</h3>
        <div id="related-grid" class="grid grid-cols-2 md:grid-cols-4 gap-6"></div>
      </div>
    </div>
  `;

  // Interactions
  $('#back-to-shop')?.addEventListener('click', () => navigateToShop('All'));

  let selectedColor = p.colors[0]?.name;
  let selectedSize = p.sizes[0];
  let qty = 1;

  // Thumbs
  $$('[data-thumb]').forEach(btn => btn.addEventListener('click', () => {
    const idx = parseInt(btn.dataset.thumb);
    $('#main-image').src = p.images[idx];
    $$('[data-thumb]').forEach(b=>b.classList.remove('ring-black')); $$('[data-thumb]').forEach(b=>b.classList.add('ring-transparent'));
    btn.classList.remove('ring-transparent'); btn.classList.add('ring-black');
    if (viewerInstance) { viewerInstance.destroy(); viewerInstance = null; $('#product-3d-canvas')?.classList.add('hidden'); $('#main-image')?.classList.remove('hidden'); }
  }));

  // Color
  $$('[data-color-opt]').forEach(btn => btn.addEventListener('click', () => {
    selectedColor = btn.dataset.colorOpt;
    $('#selected-color').textContent = selectedColor;
    $$('[data-color-opt]').forEach(b=>{ b.classList.remove('ring-black'); b.classList.add('ring-transparent'); });
    btn.classList.remove('ring-transparent'); btn.classList.add('ring-black');
    const idx = parseInt(btn.dataset.colorIndex);
    if (p.colors[idx]?.imageIndex !== undefined) {
      $('#main-image').src = p.images[p.colors[idx].imageIndex];
    }
  }));

  // Size
  $$('[data-size-opt]').forEach(btn => btn.addEventListener('click', () => {
    selectedSize = btn.dataset.sizeOpt;
    $('#selected-size').textContent = selectedSize;
    $$('[data-size-opt]').forEach(b=>{ b.classList.remove('bg-black','text-white','border-black'); b.classList.add('bg-white','border-black/10'); });
    btn.classList.remove('bg-white','border-black/10'); btn.classList.add('bg-black','text-white','border-black');
    $('#add-to-cart-btn').textContent = `Add to Cart — ${formatPrice(p.price)} • ${selectedSize}`;
  }));

  // Qty
  $('#qty-dec')?.addEventListener('click', () => { qty = Math.max(1, qty-1); $('#qty-val').textContent = qty; });
  $('#qty-inc')?.addEventListener('click', () => { qty++; $('#qty-val').textContent = qty; });

  // Add to cart
  $('#add-to-cart-btn')?.addEventListener('click', () => {
    addToCart(p, { color: selectedColor, size: selectedSize, qty });
  });

  // Wishlist
  $('#wish-btn')?.addEventListener('click', (e) => {
    if (WISHLIST.includes(p.id)) WISHLIST = WISHLIST.filter(x=>x!==p.id);
    else WISHLIST.push(p.id);
    saveWishlist();
    e.target.textContent = WISHLIST.includes(p.id)?'♥':'♡';
    toast(WISHLIST.includes(p.id)?'Added to wishlist':'Removed from wishlist');
  });

  // Tabs
  $$('[data-tab]').forEach(btn => btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    $$('[data-tab]').forEach(b=>{ b.classList.remove('border-black','font-medium'); b.classList.add('border-transparent','text-black/50'); });
    btn.classList.remove('border-transparent','text-black/50'); btn.classList.add('border-black','font-medium');
    $('#tab-desc')?.classList.toggle('hidden', tab!=='desc');
    $('#tab-details')?.classList.toggle('hidden', tab!=='details');
    $('#tab-reviews')?.classList.toggle('hidden', tab!=='reviews');
  }));

  // Review stars
  let reviewRating = 5;
  $$('#review-stars [data-star]').forEach(btn => {
    btn.addEventListener('click', () => {
      reviewRating = parseInt(btn.dataset.star);
      $$('#review-stars [data-star]').forEach((b,i)=>{ b.classList.toggle('text-black', i < reviewRating); b.classList.toggle('text-black/20', i >= reviewRating); });
    });
  });
  // init stars
  $$('#review-stars [data-star]').forEach((b,i)=>{ if(i<5) b.classList.add('text-black'); });

  $('#review-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const text = $('#review-text')?.value.trim();
    if (!text) return;
    const newReview = { id: `r${Date.now()}`, name: 'You', rating: reviewRating, date: new Date().toISOString().split('T')[0], text, verified: true };
    p.reviews = p.reviews || [];
    p.reviews.unshift(newReview);
    p.reviewsCount++;
    // update products storage
    PRODUCTS = PRODUCTS.map(prod => prod.id===p.id ? p : prod);
    saveProducts(PRODUCTS);
    renderProductDetail(p);
    toast('Review submitted');
  });

  // 3D toggle
  let is3D = false;
  $('#toggle-3d')?.addEventListener('click', () => {
    is3D = !is3D;
    const canvas = $('#product-3d-canvas');
    const img = $('#main-image');
    const btn = $('#toggle-3d');
    if (is3D) {
      canvas?.classList.remove('hidden');
      img?.classList.add('hidden');
      btn.textContent = '✕ Close 3D';
      viewerInstance = initProductViewer(canvas, p.images[0]);
    } else {
      canvas?.classList.add('hidden');
      img?.classList.remove('hidden');
      btn.textContent = '◐ 3D View';
      if (viewerInstance) { viewerInstance.destroy(); viewerInstance = null; }
    }
  });

  // Related
  const related = PRODUCTS.filter(x => x.category===p.category && x.id!==p.id).slice(0,4);
  const relatedGrid = $('#related-grid');
  if (relatedGrid) {
    relatedGrid.innerHTML = related.map(x=>productCardHTML(x)).join('');
    attachProductCardEvents(relatedGrid);
  }
}

// Checkout
function renderCheckout() {
  const container = $('#view-checkout');
  if (!container) return;
  if (CART.length===0) {
    container.innerHTML = `
      <div class="max-w-[1440px] mx-auto px-6 md:px-10 py-24 text-center">
        <p class="font-display text-5xl">Your cart is empty</p>
        <p class="text-black/50 mt-4">Add some products to continue</p>
        <button id="go-shop" class="mt-8 bg-black text-white px-8 py-3 rounded-full text-sm">Continue Shopping</button>
      </div>
    `;
    $('#go-shop')?.addEventListener('click', () => navigateToShop('All'));
    return;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  container.innerHTML = `
    <div class="max-w-[1440px] mx-auto px-6 md:px-10 py-8 md:py-12">
      <div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16">
        <div>
          <h1 class="font-display text-4xl md:text-5xl leading-[0.9]">Checkout</h1>
          <div class="mt-8 flex gap-2 text-xs">
            <span class="bg-black text-white px-3 py-1.5 rounded-full">1 Information</span>
            <span class="bg-[#f5f3f0] text-black/50 px-3 py-1.5 rounded-full">2 Shipping</span>
            <span class="bg-[#f5f3f0] text-black/50 px-3 py-1.5 rounded-full">3 Payment</span>
          </div>

          <form id="checkout-form" class="mt-10 space-y-8">
            <div class="space-y-4">
              <h3 class="font-medium">Contact</h3>
              <input required type="email" placeholder="Email address" class="w-full bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
              <label class="flex items-center gap-2 text-xs text-black/60"><input type="checkbox" class="rounded" /> Email me about new drops</label>
            </div>

            <div class="space-y-4">
              <h3 class="font-medium">Shipping Address</h3>
              <div class="grid grid-cols-2 gap-3">
                <input required placeholder="First name" class="bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
                <input required placeholder="Last name" class="bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
              </div>
              <input required placeholder="Address" class="w-full bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
              <div class="grid grid-cols-3 gap-3">
                <input required placeholder="City" class="bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
                <input required placeholder="State" class="bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
                <input required placeholder="ZIP" class="bg-[#f5f3f0] border border-transparent focus:border-black/20 focus:bg-white rounded-2xl px-5 py-4 text-sm outline-none transition" />
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="font-medium">Shipping Method</h3>
              <label class="flex items-center justify-between p-4 rounded-2xl border border-black bg-[#f5f3f0] cursor-pointer">
                <span class="flex items-center gap-3"><input type="radio" name="ship" checked /> <span class="text-sm font-medium">Standard — 2-3 days</span></span>
                <span class="text-sm">${shipping===0?'Free':formatPrice(shipping)}</span>
              </label>
              <label class="flex items-center justify-between p-4 rounded-2xl border border-black/10 hover:border-black/20 cursor-pointer">
                <span class="flex items-center gap-3"><input type="radio" name="ship" /> <span class="text-sm">Express — Next day</span></span>
                <span class="text-sm">${formatPrice(24)}</span>
              </label>
            </div>

            <div class="space-y-4">
              <h3 class="font-medium">Payment</h3>
              <div class="bg-[#f5f3f0] rounded-[20px] p-5 space-y-4">
                <div class="flex gap-2">
                  <span class="bg-white border border-black/10 rounded-lg px-3 py-1 text-[10px] font-medium">VISA</span>
                  <span class="bg-white border border-black/10 rounded-lg px-3 py-1 text-[10px] font-medium">MASTERCARD</span>
                  <span class="bg-white border border-black/10 rounded-lg px-3 py-1 text-[10px] font-medium">AMEX</span>
                </div>
                <input required placeholder="Card number" inputmode="numeric" class="w-full bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:ring-2 focus:ring-black/10" />
                <div class="grid grid-cols-2 gap-3">
                  <input required placeholder="MM / YY" class="bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:ring-2 focus:ring-black/10" />
                  <input required placeholder="CVC" class="bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:ring-2 focus:ring-black/10" />
                </div>
              </div>
              <label class="flex items-start gap-2 text-xs text-black/60"><input type="checkbox" required class="mt-0.5" /> I agree to Terms and Privacy Policy</label>
            </div>

            <button type="submit" class="w-full bg-black text-white rounded-full h-14 text-sm font-medium tracking-wide hover:bg-[#1a1a1a] transition">Pay ${formatPrice(total)}</button>
            <p class="text-[11px] text-center text-black/40">Secure checkout • Encrypted • 30-day returns</p>
          </form>
        </div>

        <div class="lg:sticky lg:top-28 h-fit">
          <div class="bg-[#f5f3f0] rounded-[28px] p-6 md:p-8">
            <h3 class="font-medium mb-6">Order Summary • ${getCartCount()} items</h3>
            <div class="space-y-4 max-h-[320px] overflow-auto pr-2">
              ${CART.map(i=>`
                <div class="flex gap-3">
                  <img src="${i.image}" class="w-16 h-20 object-cover rounded-xl bg-white" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium leading-tight truncate">${i.title}</p>
                    <p class="text-xs text-black/50 mt-1">${i.color||''} ${i.size?`• ${i.size}`:''} • Qty ${i.qty}</p>
                    <p class="text-sm font-medium mt-2">${formatPrice(i.price * i.qty)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="h-[1px] bg-black/5 my-6"></div>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between"><span class="text-black/60">Subtotal</span><span class="font-medium">${formatPrice(subtotal)}</span></div>
              <div class="flex justify-between"><span class="text-black/60">Shipping</span><span class="font-medium">${shipping===0?'Free':formatPrice(shipping)}</span></div>
              <div class="flex justify-between"><span class="text-black/60">Tax</span><span class="font-medium">${formatPrice(tax)}</span></div>
              <div class="flex justify-between text-base font-medium pt-3 border-t border-black/5"><span>Total</span><span>${formatPrice(total)}</span></div>
            </div>
            <div class="mt-6 bg-white rounded-2xl p-4 flex gap-3">
              <input id="coupon" placeholder="Discount code" class="flex-1 bg-transparent text-sm outline-none" />
              <button id="apply-coupon" class="text-xs font-medium underline">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  $('#checkout-form')?.addEventListener('submit', e => {
    e.preventDefault();
    // Simulate order
    const orderId = 'SL-' + Math.random().toString(36).slice(2,8).toUpperCase();
    CART = [];
    saveCart();
    container.innerHTML = `
      <div class="max-w-[640px] mx-auto px-6 py-24 text-center">
        <div class="w-16 h-16 bg-black text-white rounded-full grid place-items-center mx-auto text-2xl">✓</div>
        <h1 class="font-display text-5xl mt-8 leading-[0.9]">Order Confirmed</h1>
        <p class="text-black/60 mt-4">Thank you! Your order <span class="font-medium text-black">${orderId}</span> is being prepared. You'll receive an email shortly.</p>
        <div class="mt-10 bg-[#f5f3f0] rounded-[24px] p-6 text-left text-sm">
          <p class="font-medium">What happens next?</p>
          <ul class="mt-3 space-y-2 text-black/60 list-disc pl-5">
            <li>Order confirmation email sent</li>
            <li>We’ll pack your items with care in plastic-free packaging</li>
            <li>Tracking link will be sent when it ships</li>
          </ul>
        </div>
        <button id="continue-shopping" class="mt-8 bg-black text-white px-8 py-3 rounded-full text-sm">Continue Shopping</button>
      </div>
    `;
    $('#continue-shopping')?.addEventListener('click', () => navigateToShop('All'));
    toast(`Order ${orderId} placed!`);
  });

  $('#apply-coupon')?.addEventListener('click', () => {
    const code = $('#coupon')?.value.trim().toLowerCase();
    if (code === 'welcome10') { toast('10% discount applied!'); }
    else if (code) toast('Invalid coupon');
  });
}

// Newsletter
function initNewsletter() {
  $('#newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input')?.value;
    if (email) { toast(`Welcome to Sellify, ${email.split('@')[0]}! 15% off code: WELCOME15`); e.target.reset(); }
  });
}

// Init
function init() {
  // seed check
  if (!localStorage.getItem(LS_PRODUCTS)) saveProducts(PRODUCTS);

  initHeader();
  initShopFilters();
  initNewsletter();
  renderHome();
  renderShop();
  updateCartUI();
  updateFilterUI();

  // Hero 3D
  const heroCanvas = $('#hero-canvas');
  if (heroCanvas) heroInstance = initHeroScene(heroCanvas);

  // Cart checkout button
  $('#checkout-btn')?.addEventListener('click', () => { closeCart(); navigateCheckout(); });

  // Reveal animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-[fadeUp_0.8s_cubic-bezier(.2,.8,.2,1)_forwards]');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  $$('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    revealObserver.observe(el);
  });

  // Hash router simple
  window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#','');
    if (hash.startsWith('product-')) navigateToProduct(hash.replace('product-',''));
    else if (hash==='shop') navigateToShop('All');
    else if (hash==='checkout') navigateCheckout();
    else if (hash==='' || hash==='home') navigateHome();
  });
  // initial hash
  const initial = location.hash.replace('#','');
  if (initial.startsWith('product-')) navigateToProduct(initial.replace('product-',''));
  else if (initial==='shop') navigateToShop('All');
  else if (initial==='checkout') navigateCheckout();

  // Keyboard
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeCart(); });
}

document.addEventListener('DOMContentLoaded', init);

// Expose for admin sync
window.SELLIFY = {
  getProducts: () => PRODUCTS,
  setProducts: (newProducts) => { PRODUCTS = newProducts; saveProducts(PRODUCTS); renderHome(); renderShop(); if (currentProduct) { const updated = PRODUCTS.find(p=>p.id===currentProduct.id); if (updated) renderProductDetail(updated); } },
  getCategories: () => categories
};
