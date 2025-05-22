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