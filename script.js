  const WORKER_URL = 'https://milkyshop.kirilldrobysevskij78.workers.dev';
  const products = [
    { id:99, name:'Кастом',  price:0, unit:'—', img:'images/custom.png', tag:'', custom:true,
    desc:'Не нашёл нужный товар? Напиши что тебе нужно и назначь свою цену — продавец рассмотрит заявку и возможно свяжется с тобой.' },
    { id:1,  name:'Шерсть',              price:1,  unit:'3 стака',  img:'images/wool.png',        tag:'Блок',       desc:'Цвет указывайте в комментарии к заказу' },
    { id:2,  name:'Призмарин',           price:1,  unit:'64 шт.',    img:'images/prismarine.gif',  tag:'Блок',       desc:'Красивый декоративный блок' },
    { id:3,  name:'Трезубец',            price:35, unit:'1 шт.',    img:'images/trident.png',     tag:'Инструмент', desc:'Зачарования указывайте в комментарии' },
    { id:4,  name:'Булава',              price:25, unit:'1 шт.',    img:'images/mace.png',        tag:'Оружие',     desc:'Попрыгунчик' },
    { id:5,  name:'Меч',                 price:10, unit:'1 шт.',    img:'images/sword.png',       tag:'Оружие',     desc:'Зачарования указывайте в комментарии' },
    { id:6,  name:'Кирка',               price:5,  unit:'1 шт.',    img:'images/pickaxe.png',     tag:'Инструмент', desc:'Зачарования указывайте в комментарии' },
    { id:7,  name:'Топор',               price:5,  unit:'1 шт.',    img:'images/axe.png',         tag:'Инструмент', desc:'Зачарования указывайте в комментарии' },
    { id:8,  name:'Лопата',              price:5,  unit:'1 шт.',    img:'images/shovel.png',      tag:'Инструмент', desc:'Зачарования указывайте в комментарии' },
    { id:9,  name:'Фулл сет брони',      price:20, unit:'1 комп.',  img:'images/сhestplate.png',  tag:'Броня',      desc:'Отдельный элемент 5 АР • Зачарования в комментарии' },
    { id:10, name:'Любое зачарование',   price:3,  unit:'1 кн.',    img:'images/book.gif',        tag:'Чары',       desc:'Кроме редких' },
    { id:11, name:'Незерит',             price:15, unit:'1 шт.',    img:'images/netherite.png',   tag:'Руда',       desc:'Был добыт потным шахтером' },
    { id:12, name:'Изумрудный блок',     price:5,  unit:'64 шт.',   img:'images/embl.png',        tag:'Руда',       desc:'Hmmm' },
    { id:13, name:'Череп визера',        price:6,  unit:'1 шт.',    img:'images/skull.png',       tag:'Предмет',    desc:'Акция: 3 по цене 3' },
    { id:14, name:'Шалкер',             price:1,  unit:'5 шт.',    img:'images/shulker.png',     tag:'Хранилище',  desc:'Портативный сундук' },
    { id:15, name:'Пластинка',           price:1,  unit:'1 шт.',    img:'images/disc.png',        tag:'Предмет',    desc:'В продаже все пластинки которые падают с крипера' },
    { id:16, name:'Шаблон улучшения',           price:4,  unit:'1 шт.',    img:'images/temp.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:17, name:'Шаблон ось',           price:4,  unit:'1 шт.',    img:'images/temp2.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:18, name:'Шаблон страж',           price:4,  unit:'1 шт.',    img:'images/temp3.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:19, name:'Шаблон дюна',           price:4,  unit:'1 шт.',    img:'images/temp4.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:20, name:'Шаблон берег',           price:4,  unit:'1 шт.',    img:'images/temp5.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:21, name:'Шаблон хранитель',           price:4,  unit:'1 шт.',    img:'images/temp6.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:22, name:'Шаблон прилив',           price:4,  unit:'1 шт.',    img:'images/temp7.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:23, name:'Шаблон шпиль',           price:4,  unit:'1 шт.',    img:'images/temp8.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:24, name:'Шаблон тишина',           price:4,  unit:'1 шт.',    img:'images/temp9.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:25, name:'Шаблон поток',           price:4,  unit:'1 шт.',    img:'images/temp10.png',        tag:'Шаблон',    desc:'Крутое украшение для брони' },
    { id:26, name:'Раковина наутилуса',        price:1,  unit:'3 шт.',    img:'images/shell.png',       tag:'Предмет',    desc:'Украл у утопленника' },
  ];

  let cart = {};
  let customOrder = null;
  const DELIVERY_COST = 5;

  const fmt = n => n + ' АР';

  let activeCategory = 'Все';

  function getCategories() {
    const tags = products.map(p => p.tag).filter(Boolean);
    return ['Все', ...new Set(tags)];
  }

  function renderCategories() {
    const bar = document.getElementById('categoryBar');
    if (!bar) return;
    bar.innerHTML = getCategories().map(cat =>
      `<button class="cat-btn ${cat === activeCategory ? 'active' : ''}" onclick="setCategory('${cat}')">${cat}</button>`
    ).join('');
  }

  function setCategory(cat) {
    activeCategory = cat;
    renderCategories();
    renderProducts();
  }

  function renderCustomCard(p) {
    return `
      <div class="card" id="card-${p.id}">
        <div class="card-img-placeholder">
          <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'" />
        </div>
        <div class="card-body">
          <div class="card-tag">${p.tag}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-desc">${p.desc}</div>
          <div class="card-custom-field">
            <div class="card-custom-label">Что нужно?</div>
            <textarea class="card-custom-input" id="customDesc" rows="2" placeholder="Опишите что хотите заказать..."></textarea>
          </div>
          <div class="card-custom-field">
            <div class="card-custom-label">Ваша цена</div>
            <div class="card-custom-price-wrap">
              <input type="text" class="card-custom-input" id="customPrice" placeholder="0" inputmode="numeric" oninput="validateCustomPrice(this)" />
              <div class="card-custom-currency">АР</div>
            </div>
            <div class="card-custom-err" id="customPriceErr">Только цифры</div>
          </div>
          <button class="add-btn" style="width:100%;justify-content:center;margin-top:4px" id="addbtn-${p.id}" onclick="addCustomToCart()">
            <span>+</span> В корзину
          </button>
        </div>
      </div>`;
  }

  function validateCustomPrice(input) {
    const val = input.value;
    const valid = /^\d*$/.test(val);
    const err = document.getElementById('customPriceErr');
    if (!valid) {
      input.value = val.replace(/[^\d]/g, '');
      input.style.borderColor = 'var(--danger)';
      if (err) err.classList.add('show');
    } else {
      input.style.borderColor = '';
      if (err) err.classList.remove('show');
    }
  }

  function addCustomToCart() {
    const desc = document.getElementById('customDesc').value.trim();
    const price = parseInt(document.getElementById('customPrice').value.trim()) || 0;
    if (!desc) {
      document.getElementById('customDesc').style.borderColor = 'var(--danger)';
      setTimeout(() => { document.getElementById('customDesc').style.borderColor = ''; }, 1500);
      showToast('⚠️ Опишите что вам нужно');
      return;
    }
    if (!price) {
      document.getElementById('customPrice').style.borderColor = 'var(--danger)';
      setTimeout(() => { document.getElementById('customPrice').style.borderColor = ''; }, 1500);
      showToast('⚠️ Укажите цену');
      return;
    }
    customOrder = { desc, price };
    cart[99] = 1;
    updateCartCount();
    const btn = document.getElementById('addbtn-99');
    btn.classList.add('added');
    btn.innerHTML = '<span>✓</span> Добавлено';
    setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<span>+</span> В корзину'; }, 1500);
    showToast('✅ Заявка добавлена в корзину');
  }

  function renderProducts() {
    const filtered = activeCategory === 'Все' ? products : products.filter(p => p.tag === activeCategory);
    document.getElementById('productsGrid').innerHTML = filtered.map(p => {
      if (p.custom) return renderCustomCard(p);
      return `
      <div class="card" id="card-${p.id}">
        <div class="card-img-placeholder">
          <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'" />
        </div>
        <div class="card-body">
          <div class="card-tag">${p.tag}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-desc">${p.desc}</div>
          <div class="card-footer">
            <div>
              <div class="card-price">${fmt(p.price)} <span></span></div>
              <div class="card-unit">/ ${p.unit}</div>
            </div>
            <button class="add-btn" id="addbtn-${p.id}" onclick="addToCart(${p.id})">
              <span>+</span> В корзину
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateCartCount();
    const btn = document.getElementById('addbtn-' + id);
    btn.classList.add('added');
    btn.innerHTML = '<span>✓</span> Добавлено';
    setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<span>+</span> В корзину'; }, 1500);
    showToast('✅ Товар добавлен в корзину');
  }

  function updateCartCount() {
    const total = Object.values(cart).reduce((a,b) => a+b, 0);
    const el = document.getElementById('cartCount');
    el.textContent = total;
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 350);
  }

  function cartSubtotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      if (id == 99 && customOrder) return sum + customOrder.price;
      return sum + products.find(x => x.id == id).price * qty;
    }, 0);
  }

  function cartTotal(withDelivery) {
    return cartSubtotal() + (withDelivery ? DELIVERY_COST : 0);
  }

  function openCart() {
    document.getElementById('cartOverlay').classList.add('open');
    renderCartScreen();
  }
  function closeCart() {
    document.getElementById('cartOverlay').classList.remove('open');
    deliveryEnabled = false;
  }
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('cartOverlay')) closeCart();
  }

  function renderCartScreen() {
    const screen = document.getElementById('cartScreen');
    const items = Object.entries(cart).filter(([,q]) => q > 0);
    if (!items.length) {
      screen.innerHTML = `<h2>🛒 Корзина</h2><div class="cart-empty"><div class="cart-empty-icon">🛍️</div><div>Корзина пуста</div></div>`;
      return;
    }
    const itemsHTML = items.map(([id, qty]) => {
      const p = products.find(x => x.id == id);
      if (id == 99 && customOrder) {
        return `<div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">Кастом</div>
            <div class="cart-item-price" style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${customOrder.desc}</div>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${id},-1)">−</button>
          </div>
          <div class="cart-item-total">${fmt(customOrder.price)}</div>
        </div>`;
      }
      return `<div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${fmt(p.price)} / ${p.unit}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${id},-1)">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${id},1)">+</button>
        </div>
        <div class="cart-item-total">${fmt(p.price * qty)}</div>
      </div>`;
    }).join('');
    screen.innerHTML = `
      <h2>🛒 Корзина</h2>
      <div class="cart-items">${itemsHTML}</div>
      <div class="cart-total-row">
        <span>Итого</span>
        <span class="total-price">${fmt(cartTotal(false))}</span>
      </div>
      <button class="checkout-btn" onclick="openCheckout()">Оформить заказ →</button>`;
  }

  function changeQty(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    if (!cart[id]) {
      delete cart[id];
      if (id == 99) customOrder = null;
    }
    updateCartCount();
    renderCartScreen();
  }

  function openCheckout() {
    const items = Object.entries(cart).filter(([,q]) => q > 0);
    if (!items.length) return;
    const summaryItems = items.map(([id, qty]) => {
      const p = products.find(x => x.id == id);
      if (id == 99 && customOrder) {
        return `<div class="summary-item"><span class="item-name">Кастом — ${customOrder.desc.slice(0,30)}${customOrder.desc.length>30?'…':''}</span><span>${fmt(customOrder.price)}</span></div>`;
      }
      const totalUnits = qty > 1 ? `${qty} × ${p.unit}` : p.unit;
      return `<div class="summary-item"><span class="item-name">${p.name} — ${totalUnits}</span><span>${fmt(p.price * qty)}</span></div>`;
    }).join('');
    document.getElementById('cartScreen').innerHTML = `
      <button class="back-btn" onclick="renderCartScreen()">← Назад к корзине</button>
      <h2>📋 Оформление</h2>
      <div class="order-summary">
        <div class="order-summary-title">Ваш заказ</div>
        ${summaryItems}
        <div class="summary-item" id="deliverySummaryRow" style="display:none">
          <span class="item-name">🚚 Доставка</span><span>${fmt(DELIVERY_COST)}</span>
        </div>
        <div class="summary-total">
          <span>Итого</span>
          <span class="total-amt" id="checkoutTotal">${fmt(cartTotal(false))}</span>
        </div>
      </div>
      <div class="form-group">
        <label>Никнейм игрока</label>
        <input type="text" id="buyerName" placeholder="Steve_Pro228" />
      </div>
      <div class="form-group">
        <label>Способ получения</label>
        <div class="delivery-toggle" onclick="toggleDelivery()">
          <input type="checkbox" id="deliveryCheck" />
          <div class="toggle-box" id="toggleBox"><span class="toggle-check">✓</span></div>
          <div>
            <div class="toggle-text">🚚 Нужна доставка (+${fmt(DELIVERY_COST)})</div>
            <div class="toggle-subtext">Без доставки — продавец ждёт на спавне</div>
          </div>
        </div>
        <div class="address-field" id="addressField">
          <div style="display:flex;gap:8px;align-items:flex-start">
            <div style="flex:1">
              <div style="font-size:11px;color:var(--muted);font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px">X</div>
              <input type="text" id="coordX" placeholder="100" inputmode="numeric" oninput="validateCoord(this)" />
            </div>
            <div style="flex:1">
              <div style="font-size:11px;color:var(--muted);font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px">Z</div>
              <input type="text" id="coordZ" placeholder="-200" inputmode="numeric" oninput="validateCoord(this)" />
            </div>
          </div>
          <div id="coordError" style="display:none;color:#e05a5a;font-size:12px;margin-top:6px;font-weight:500">⚠️ Некорректные координаты</div>
          <span class="world-label">Мир доставки</span>
          <div class="world-select">
            <button type="button" class="world-btn selected" id="world-overworld" onclick="selectWorld('Обычный мир')">
              <span class="world-icon">🌍</span>Обычный мир
            </button>
            <button type="button" class="world-btn" id="world-nether" onclick="selectWorld('Незер')">
              <span class="world-icon">🔥</span>Незер
            </button>
            <button type="button" class="world-btn" id="world-end" onclick="selectWorld('Энд')">
              <span class="world-icon">🌑</span>Энд
            </button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Комментарий к заказу</label>
        <textarea id="orderComment" rows="3" placeholder="Необязательно — уточните детали, пожелания..."></textarea>
      </div>
      <button class="checkout-btn" onclick="submitOrder()">Завершить оформление ✓</button>
      <div class="error-banner" id="errorBanner"></div>`;
  }

  let deliveryEnabled = false;
  let selectedWorld = 'Обычный мир';

  function selectWorld(world) {
    selectedWorld = world;
    const map = { 'Обычный мир': 'world-overworld', 'Незер': 'world-nether', 'Энд': 'world-end' };
    document.querySelectorAll('.world-btn').forEach(b => b.classList.remove('selected'));
    const el = document.getElementById(map[world]);
    if (el) el.classList.add('selected');
  }

  function validateCoord(input) {
    const val = input.value;
    const valid = /^-?\d*$/.test(val);
    const errEl = document.getElementById('coordError');
    if (!valid) {
      input.style.borderColor = 'var(--danger)';
      if (errEl) errEl.style.display = 'block';
      // Strip invalid chars, keep only digits and leading minus
      input.value = val.replace(/[^0-9\-]/g, '').replace(/(?!^)-/g, '');
    } else {
      input.style.borderColor = '';
      if (errEl) errEl.style.display = 'none';
    }
  }

  function toggleDelivery() {
    deliveryEnabled = !deliveryEnabled;
    document.getElementById('toggleBox').classList.toggle('checked', deliveryEnabled);
    document.getElementById('deliveryCheck').checked = deliveryEnabled;
    document.getElementById('addressField').classList.toggle('visible', deliveryEnabled);
    const row = document.getElementById('deliverySummaryRow');
    if (row) row.style.display = deliveryEnabled ? 'flex' : 'none';
    const el = document.getElementById('checkoutTotal');
    if (el) el.textContent = fmt(cartTotal(deliveryEnabled));
  }

  async function submitOrder() {
    const name    = document.getElementById('buyerName').value.trim();
    const comment = document.getElementById('orderComment').value.trim();
    const coordX = deliveryEnabled ? document.getElementById('coordX').value.trim() : '';
    const coordZ = deliveryEnabled ? document.getElementById('coordZ').value.trim() : '';
    const coords = (coordX || coordZ) ? `X: ${coordX}, Z: ${coordZ}` : '';
    const errEl   = document.getElementById('errorBanner');
    errEl.classList.remove('show');
    if (!name)   { errEl.textContent = '⚠️ Введите ваш никнейм'; errEl.classList.add('show'); return; }
    const coordRegex = /^-?\d+$/;
    if (deliveryEnabled && (!coordX || !coordZ)) { errEl.textContent = '⚠️ Укажите координаты X и Z для доставки'; errEl.classList.add('show'); return; }
    if (deliveryEnabled && (!coordRegex.test(coordX) || !coordRegex.test(coordZ))) { errEl.textContent = '⚠️ Некорректные координаты'; errEl.classList.add('show'); return; }

    const btn = document.querySelector('.checkout-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Отправляем...';

    const items = Object.entries(cart).filter(([,q]) => q > 0);
    const lines = items.map(([id, qty]) => {
      if (id == 99 && customOrder) {
        return `  • Кастом: ${customOrder.desc} — ${fmt(customOrder.price)}`;
      }
      const p = products.find(x => x.id == id);
      const totalUnits = qty > 1 ? `${qty} × ${p.unit}` : p.unit;
      return `  • ${p.name}: ${totalUnits} — ${fmt(p.price * qty)}`;
    }).join('\n');

    let msg = `🛒 Новый заказ — MILKY-SHOP\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 Игрок: ${name}\n`;
    if (deliveryEnabled) {
      msg += `🚚 Получение: доставка\n`;
      msg += `🌍 Мир: ${selectedWorld}\n`;
      msg += `📍 Координаты: ${coords}\n`;
    } else {
      msg += `🏪 Получение: самовывоз на спавне\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 Товары:\n${lines}\n`;
    if (deliveryEnabled) msg += `🚚 Доставка: ${fmt(DELIVERY_COST)}\n`;
    if (comment) msg += `━━━━━━━━━━━━━━━━━━━━\n💬 Комментарий: ${comment}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 Итого: ${fmt(cartTotal(deliveryEnabled))}`;

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Ошибка сервера');
      cart = {}; deliveryEnabled = false; customOrder = null; updateCartCount();
      document.getElementById('cartScreen').innerHTML = `
        <div class="success-screen">
          <div class="success-icon">🎉</div>
          <h2>Заказ принят!</h2>
          <p>Спасибо, ${name}! Ваш заказ отправлен продавцу.<br/>Ожидайте на сервере 💜</p>
          <button class="close-success-btn" onclick="closeCart()">Закрыть</button>
        </div>`;
    } catch(e) {
      btn.disabled = false;
      btn.innerHTML = 'Завершить оформление ✓';
      errEl.textContent = `❌ Ошибка отправки: ${e.message}`;
      errEl.classList.add('show');
    }
  }

  function showToast(text) {
    const t = document.getElementById('toast');
    document.getElementById('toastText').textContent = text;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  renderCategories();
  renderProducts();

  // FEEDBACK
  let feedbackType = 'Отзыв';
  let feedbackOpen = false;

  function toggleFeedback() {
    feedbackOpen = !feedbackOpen;
    document.getElementById('feedbackPopup').classList.toggle('open', feedbackOpen);
    document.getElementById('feedbackBtn').classList.toggle('open', feedbackOpen);
    document.getElementById('feedbackBtn').textContent = feedbackOpen ? '+' : '💬';
    if (feedbackOpen) {
      // reset to default state
      document.getElementById('feedbackContent').innerHTML = `
        <h3>Обратная связь</h3>
        <p>Жалоба, идея или отзыв — нам важно всё</p>
        <div class="feedback-types">
          <button class="feedback-type-btn active" id="ft-review" onclick="setFeedbackType('Отзыв')"><span class="ft-icon">⭐</span>Отзыв</button>
          <button class="feedback-type-btn" id="ft-idea" onclick="setFeedbackType('Идея')"><span class="ft-icon">💡</span>Идея</button>
          <button class="feedback-type-btn" id="ft-complaint" onclick="setFeedbackType('Жалоба')"><span class="ft-icon">⚠️</span>Жалоба</button>
        </div>
        <input type="text" id="feedbackNick" placeholder="Ваш никнейм..." style="margin-bottom:8px" />
        <textarea class="feedback-textarea" id="feedbackText" placeholder="Напишите ваше сообщение..."></textarea>
        <button class="feedback-send-btn" id="feedbackSendBtn" onclick="sendFeedback()">Отправить</button>`;
      feedbackType = 'Отзыв';
    }
  }

  function setFeedbackType(type) {
    feedbackType = type;
    const map = { 'Отзыв': 'ft-review', 'Идея': 'ft-idea', 'Жалоба': 'ft-complaint' };
    document.querySelectorAll('.feedback-type-btn').forEach(b => b.classList.remove('active'));
    const el = document.getElementById(map[type]);
    if (el) el.classList.add('active');
    const placeholders = { 'Отзыв': 'Расскажите о своём опыте...', 'Идея': 'Поделитесь идеей...', 'Жалоба': 'Опишите проблему...' };
    const ta = document.getElementById('feedbackText');
    if (ta) ta.placeholder = placeholders[type];
  }

  async function sendFeedback() {
    const nick = document.getElementById('feedbackNick').value.trim();
    const text = document.getElementById('feedbackText').value.trim();
    if (!nick) {
      document.getElementById('feedbackNick').focus();
      document.getElementById('feedbackNick').style.borderColor = 'var(--danger)';
      setTimeout(() => { document.getElementById('feedbackNick').style.borderColor = ''; }, 1500);
      return;
    }
    if (!text) {
      document.getElementById('feedbackText').focus();
      document.getElementById('feedbackText').style.borderColor = 'var(--danger)';
      setTimeout(() => { document.getElementById('feedbackText').style.borderColor = ''; }, 1500);
      return;
    }
    const btn = document.getElementById('feedbackSendBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>';

    const esc = s => s;
    const typeEmoji = { 'Отзыв': '⭐', 'Идея': '💡', 'Жалоба': '⚠️' };
    const msg = `${typeEmoji[feedbackType] || '💬'} ${feedbackType} — MILKY-SHOP\n━━━━━━━━━━━━━━━━━━━━\n👤 Игрок: ${nick}\n\n📝 ${text}`;

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      document.getElementById('feedbackContent').innerHTML = `
        <div class="feedback-success">
          <div class="fs-icon">🎉</div>
          <h3 style="margin-bottom:8px">Отправлено!</h3>
          <p>Спасибо за обратную связь 💜<br/>Мы обязательно прочитаем.</p>
        </div>`;
      setTimeout(() => { if (feedbackOpen) toggleFeedback(); }, 2500);
    } catch(e) {
      btn.disabled = false;
      btn.innerHTML = 'Отправить';
      showToast('❌ Ошибка отправки, попробуйте позже');
    }
  }
