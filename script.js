// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    
    // Корзина
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    
    // Обновление счетчика корзины
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
    
    // Добавление в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productCard = this.closest('.flower-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
            
            // Проверяем, есть ли товар уже в корзине
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            // Сохраняем в localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Обновляем счетчик
            updateCartCount();
            
            // Анимация кнопки
            this.textContent = 'Добавлено!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.style.backgroundColor = '';
            }, 1000);
            
            console.log('Товар добавлен в корзину:', { id: productId, name: productName });
        });
    });
    
    // Инициализация счетчика корзины
    updateCartCount();
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.flower-card, .benefit');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    document.querySelectorAll('.flower-card, .benefit').forEach(el => {
        el.style.opacity =


'0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Форматирование цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}
// Проверка авторизации
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authBtn = document.getElementById('authBtnHeader');
    const userInfo = document.getElementById('userInfo');
    
    if (authBtn && userInfo) {
        if (user) {
            authBtn.style.display = 'none';
            userInfo.style.display = 'flex';
            document.getElementById('userName').textContent = user.name || user.email.split('@')[0];
            document.getElementById('userAvatar').textContent = (user.name || user.email[0]).toUpperCase();
        } else {
            authBtn.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }
}

// Выход из системы
function logout() {
    localStorage.removeItem('user');
    checkAuth();
    alert('Вы вышли из системы');
}

// Проверяем авторизацию при загрузке каждой страницы
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});