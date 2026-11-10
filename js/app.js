// Lógica JavaScript para la aplicación VetCare Medellín

const products = [
  { id: 1, name: 'Royal Canin Gastrointestinal 3kg', price: 145000, tag: 'Nutrición', desc: 'Alimento dietético para trastornos digestivos.' },
  { id: 2, name: 'Bravecto Perros 10-20kg', price: 115000, tag: 'Protección', desc: 'Protección de 12 semanas contra pulgas y garrapatas.' },
  { id: 3, name: 'Meloxicam Oral 0.5mg/ml', price: 42000, tag: 'Receta Médica', desc: 'Antiinflamatorio y analgésico veterinario.' },
  { id: 4, name: 'Simparica Trio 5-10kg', price: 98000, tag: 'Protección', desc: 'Protección triple contra pulgas y parásitos.' }
];

let cart = [];

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const selectedView = document.getElementById(`view-${tabId}`);
  if (selectedView) selectedView.classList.remove('hidden');

  const selectedNav = document.getElementById(`nav-${tabId}`);
  if (selectedNav && tabId !== 'triage') selectedNav.classList.add('active');
}

function toggleQR() {
  const qrBox = document.getElementById('qr-box');
  const qrBtnText = document.getElementById('qr-btn-text');
  if (qrBox.classList.contains('hidden')) {
    qrBox.classList.remove('hidden');
    qrBtnText.innerText = 'Ocultar QR';
  } else {
    qrBox.classList.add('hidden');
    qrBtnText.innerText = 'Mostrar QR Clínico';
  }
}

function handleAppointmentSubmit(e) {
  e.preventDefault();
  document.getElementById('appointment-form').classList.add('hidden');
  document.getElementById('appointment-success').classList.remove('hidden');
}

function resetAppointmentForm() {
  document.getElementById('appointment-form').reset();
  document.getElementById('appointment-form').classList.remove('hidden');
  document.getElementById('appointment-success').classList.add('hidden');
}

function renderPharmacy() {
  const query = document.getElementById('pharmacy-search').value.toLowerCase();
  const container = document.getElementById('product-grid');
  container.innerHTML = '';

  const filtered = products.filter(p => p.name.toLowerCase().includes(query));

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
        <div>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">${p.tag}</span>
          <h4 class="font-bold text-slate-900 mt-2">${p.name}</h4>
          <p class="text-xs text-slate-500 mt-1">${p.desc}</p>
        </div>
        <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span class="font-extrabold text-slate-900">$${p.price.toLocaleString('es-CO')} COP</span>
          <button onclick="addToCart(${p.id})" class="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartBadge = document.getElementById('cart-badge');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-xs text-slate-400 py-6 text-center">Tu carrito está vacío.</p>';
    cartTotal.innerText = '$0 COP';
    cartBadge.classList.add('hidden');
    return;
  }

  cartBadge.classList.remove('hidden');
  cartBadge.innerText = cart.length;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
        <div>
          <p class="font-semibold text-slate-800 text-xs">${item.name}</p>
          <p class="text-xs text-slate-500">$${item.price.toLocaleString('es-CO')} COP</p>
        </div>
        <button onclick="removeFromCart(${idx})" class="text-rose-500 hover:text-rose-700">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  });

  cartTotal.innerText = `$${total.toLocaleString('es-CO')} COP`;
}

// Inicializar la vista
document.addEventListener('DOMContentLoaded', () => {
  renderPharmacy();
});
