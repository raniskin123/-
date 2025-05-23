let burgerIcon = document.querySelector(".burger_menu");
let burger = document.querySelector(".burger");
burgerIcon.addEventListener("click", ()=>{
    burger.classList.toggle("active")
})


// =========================Переключатель===============================
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  // Проверяем сохранённую тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateIcon(savedTheme);
  }
  
  // Обработчик клика
  themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
          updateIcon('light');
      } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          updateIcon('dark');
      }
  });
  
  // Функция обновления иконки
  function updateIcon(theme) {
      if (theme === 'dark') {
          // Иконка солнца для тёмной темы
          themeIcon.src = "./images/sun.svg";
      } else {
          // Иконка луны для светлой темы
          themeIcon.src = "./images/moon.svg";
      }
  }
});


// ========================КОРЗИНА===========================
document.addEventListener('DOMContentLoaded', function() {
    // Элементы корзины
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const clearCart = document.getElementById('clearCart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Массив товаров в корзине
    let cart = [];

    // Открытие/закрытие корзины
    cartButton.addEventListener('click', function() {
        cartDropdown.classList.toggle('active');
    });

    closeCart.addEventListener('click', function() {
        cartDropdown.classList.remove('active');
    });

    // Добавление товара в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            
            // Проверяем, есть ли товар уже в корзине
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
            cartDropdown.classList.add('active');
            
            // Анимация добавления в корзину
            button.textContent = 'Добавлено!';
            setTimeout(() => {
                button.textContent = 'В корзину';
            }, 1000);
        });
    });

    // Очистка корзины
    clearCart.addEventListener('click', function() {
        cart = [];
        updateCart();
    });

    // Обновление корзины
    function updateCart() {
        // Очищаем содержимое корзины
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Ваша корзина пуста</div>';
            cartCount.textContent = '0';
            cartTotal.textContent = '0 ₽';
            return;
        }
        
        // Обновляем список товаров
        let total = 0;
        let totalCount = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalCount += item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${item.price.toLocaleString()} ₽ × ${item.quantity}</div>
                </div>
                <div class="item-total">${itemTotal.toLocaleString()} ₽</div>
                <button class="remove-item" data-name="${item.name}">×</button>
            `;
            
            cartItems.appendChild(itemElement);
        });
        
        // Обновляем счетчик и общую сумму
        cartCount.textContent = totalCount;
        cartTotal.textContent = total.toLocaleString() + ' ₽';
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const name = button.getAttribute('data-name');
                cart = cart.filter(item => item.name !== name);
                updateCart();
            });
        });
    }
});