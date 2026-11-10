// Lógica JavaScript optimizada para VetCare Medellín

const products = [
  {
    id: 1,
    name: 'Royal Canin Gastrointestinal 3kg',
    price: 145000,
    tag: 'Nutrición',
    desc: 'Alimento dietético para perros con trastornos digestivos agudos o crónicos.',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 2,
    name: 'Bravecto Perros 10-20kg',
    price: 115000,
    tag: 'Protección',
    desc: 'Protección sistémica de 12 semanas contra pulgas y garrapatas.',
    img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 3,
    name: 'Meloxicam Oral 0.5mg/ml',
    price: 42000,
    tag: 'Receta Médica',
    desc: 'Antiinflamatorio no esteroideo (AINE) para alivio del dolor e inflamación.',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 4,
    name: 'Simparica Trio 5-10kg',
    price: 98000,
    tag: 'Protección',
    desc: 'Protección triple contra pulgas, garrapatas y parásitos intestinales.',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 5,
    name: 'NexGard Spectra 7.5-15kg',
    price: 105000,
    tag: 'Protección',
    desc: 'Tableta masticable con sabor a carne contra parásitos internos y externos.',
    img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 6,
    name: "Hill's Prescription Diet c/d Feline",
    price: 128000,
    tag: 'Nutrición',
    desc: 'Nutrición clínica formulada para cuidar la salud urinaria en gatos adultos.',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500'
  }
];

let cart = [];
let activeCategory = 'Todos';

function showTab(tabId) {
  // Ocultar todas las vistas
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  
  // Desactivar botones de navegación (escritorio y móvil)
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.remove('text-emerald-700', 'font-bold');
    btn.classList.add('text-slate-500');
  });

  // Mostrar vista seleccionada
  const selectedView = document.getElementById(`view-${tabId}`);
  if (selectedView) {
    selectedView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Activar botón en navbar escritorio
  const selectedNav = document.getElementById(`nav-${tabId}`);
  if (selectedNav && tabId !== 'triage') {
    selectedNav.classList.add('active');
  }

  // Activar botón en navbar móvil
  const mobileNav = document.getElementById(`mobile-nav-${tabId}`);
  if (mobileNav) {
    mobileNav.classList.remove('text-slate-500');
    mobileNav.classList.add('text-emerald-700', 'font-bold');
  }
}

function toggleQR() {
  const qrBox = document.getElementById('qr-box');
  const qrBtnText = document.getElementById('qr-btn-text');
  if (qrBox.classList.contains('hidden')) {
    qrBox.classList.remove('hidden');
    qrBtnText.innerText = 'Ocultar QR Clínico';
  } else {
    qrBox.classList.add('hidden');
    qrBtnText.innerText = 'Mostrar QR Clínico';
  }
}

function handleAppointmentSubmit(e) {
  e.preventDefault();
  
  // Obtener los datos del formulario para dar feedback personalizado
  const owner = document.getElementById('appt-owner')?.value || 'Propietario';
  const pet = document.getElementById('appt-pet')?.value || 'tu mascota';
  const date = document.getElementById('appt-date')?.value || 'fecha acordada';
  const time = document.getElementById('appt-time')?.value || '09:00 AM';

  const summary = document.getElementById('appointment-summary');
  if (summary) {
    summary.innerText = `Cita confirmada para ${pet} con ${owner} el ${date} a las ${time}. Recibirás un recordatorio por WhatsApp.`;
  }

  document.getElementById('appointment-form').classList.add('hidden');
  document.getElementById('appointment-success').classList.remove('hidden');
}

function resetAppointmentForm() {
  document.getElementById('appointment-form').reset();
  document.getElementById('appointment-form').classList.remove('hidden');
  document.getElementById('appointment-success').classList.add('hidden');
}

function filterCategory(category) {
  activeCategory = category;
  
  // Actualizar estilos de los botones de filtro
  document.querySelectorAll('.category-chip').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.className = 'category-chip px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm transition';
    } else {
      btn.className = 'category-chip px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition';
    }
  });

  renderPharmacy();
}

function renderPharmacy() {
  const query = (document.getElementById('pharmacy-search')?.value || '').toLowerCase().trim();
  const container = document.getElementById('product-grid');
  if (!container) return;

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.tag.toLowerCase().includes(query);
    const matchesCategory = activeCategory === 'Todos' || p.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 p-8">
        <i class="fa-solid fa-box-open text-slate-300 text-4xl mb-3"></i>
        <p class="text-sm font-semibold text-slate-600">No encontramos productos que coincidan con tu búsqueda.</p>
        <button onclick="document.getElementById('pharmacy-search').value=''; filterCategory('Todos');" class="mt-3 text-xs font-bold text-emerald-600 hover:text-emerald-700">Ver todos los medicamentos</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden card-hover flex flex-col justify-between group shadow-sm hover:border-emerald-300">
      <div>
        <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 text-[11px] font-bold text-emerald-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-emerald-100">
            ${p.tag}
          </span>
        </div>
        <div class="p-5">
          <h4 class="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors">${p.name}</h4>
          <p class="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">${p.desc}</p>
        </div>
      </div>
      <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Precio COP</span>
          <span class="font-extrabold text-slate-900 text-base">$${p.price.toLocaleString('es-CO')}</span>
        </div>
        <button onclick="addToCart(${p.id})" class="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-sm shadow-emerald-600/20">
          <i class="fa-solid fa-cart-plus"></i>
          <span>Agregar</span>
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  
  // Feedback visual sutil (toast temporal en badge)
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.classList.add('scale-125');
    setTimeout(() => cartBadge.classList.remove('scale-125'), 200);
  }
}

function changeQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartBadge = document.getElementById('cart-badge');
  const cartShipping = document.getElementById('cart-shipping');
  const checkoutBtn = document.getElementById('checkout-btn');

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    if (totalItemsCount === 0) {
      cartBadge.classList.add('hidden');
    } else {
      cartBadge.classList.remove('hidden');
      cartBadge.innerText = totalItemsCount;
    }
  }

  if (cart.length === 0) {
    if (cartItems) {
      cartItems.innerHTML = `
        <div class="py-8 text-center text-slate-400 space-y-2">
          <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <i class="fa-solid fa-basket-shopping text-xl"></i>
          </div>
          <p class="text-xs font-medium">Tu carrito está vacío.</p>
          <p class="text-[11px] text-slate-400">Selecciona medicamentos o alimentos veterinarios.</p>
        </div>
      `;
    }
    if (cartTotal) cartTotal.innerText = '$0 COP';
    if (cartShipping) cartShipping.innerText = '$0 COP';
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    return;
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  let subtotal = 0;
  cartItems.innerHTML = cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
        <img src="${item.img}" alt="${item.name}" class="w-11 h-11 object-cover rounded-lg shrink-0">
        <div class="flex-1 min-w-0">
          <p class="font-bold text-slate-800 truncate">${item.name}</p>
          <p class="text-[11px] text-slate-500 font-medium">$${item.price.toLocaleString('es-CO')} c/u</p>
        </div>
        <div class="flex items-center space-x-1.5 shrink-0">
          <button onclick="changeQuantity(${idx}, -1)" class="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold flex items-center justify-center text-xs">-</button>
          <span class="w-5 text-center font-bold text-slate-800 text-xs">${item.quantity}</span>
          <button onclick="changeQuantity(${idx}, 1)" class="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold flex items-center justify-center text-xs">+</button>
          <button onclick="removeFromCart(${idx})" class="text-rose-400 hover:text-rose-600 ml-1.5 text-xs">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Envío gratis en Medellín para compras superiores a 100.000 COP
  const isFreeShipping = subtotal >= 100000;
  const shippingCost = isFreeShipping ? 0 : 8000;
  const grandTotal = subtotal + shippingCost;

  if (cartShipping) {
    cartShipping.innerHTML = isFreeShipping 
      ? '<span class="text-emerald-600 font-bold text-xs">Gratis</span>' 
      : `$${shippingCost.toLocaleString('es-CO')} COP`;
  }

  if (cartTotal) {
    cartTotal.innerText = `$${grandTotal.toLocaleString('es-CO')} COP`;
  }
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;

  const itemsList = cart.map(item => `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CO')})`).join('\n');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeShipping = subtotal >= 100000;
  const shipping = isFreeShipping ? 'Gratis' : '$8.000 COP';
  const total = isFreeShipping ? subtotal : subtotal + 8000;

  const message = `🐾 *Pedido Farmacia VetCare Medellín*\n\nHola, deseo realizar el siguiente pedido a domicilio:\n\n${itemsList}\n\n*Envío:* ${shipping}\n*Total a pagar:* $${total.toLocaleString('es-CO')} COP\n\n¿Me confirman disponibilidad y tiempo de entrega? Muchas gracias.`;

  const url = `https://wa.me/573004440000?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Inicializar la vista al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderPharmacy();
  updateCart();
});
