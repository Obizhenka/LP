document.addEventListener("DOMContentLoaded", () => {
  // --- 1. ПЛАВНЫЙ СКРОЛЛ СТРАНИЦЫ ПО ЯКОРЯМ ---
  const anchors = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector(".header");

  anchors.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (href.startsWith("#") && href.length > 1) {
        event.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // --- 2. СЛАЙДЕР (УПРАВЛЕНИЕ ТОЧКАМИ И АВТОПЕРЕКЛЮЧЕНИЕ) ---
  const mainContainer = document.getElementById("container");
  const images = document.querySelectorAll(".slide-image");
  let currentIndex = 0; // Текущий индекс слайда
  let autoPlayInterval; // Переменная для таймера

  if (mainContainer && images.length > 0) {
    const selectButtonsContainer = document.createElement("div");
    selectButtonsContainer.className = "select-slide-buttons-container";
    mainContainer.appendChild(selectButtonsContainer);

    // Создаем точки
    images.forEach((el, index) => {
      const selectButton = document.createElement("div");
      selectButton.className = "select-slide-buttons";
      if (index === 0) selectButton.classList.add("active");

      selectButton.addEventListener("click", () => {
        currentIndex = index; // Обновляем индекс при клике
        setActiveSlide(index);
        resetAutoPlay(); // Сбрасываем таймер, чтобы слайд не перепрыгнул сразу
      });
      selectButtonsContainer.appendChild(selectButton);
    });

    // Функция запуска автоплея
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Идем по кругу
        setActiveSlide(currentIndex);
      }, 5000); // 5000 мс = 5 секунд
    }

    // Сброс таймера при ручном нажатии
    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // Запускаем при загрузке
    startAutoPlay();
  }

  function setActiveSlide(index) {
    // Убираем активный класс у всех картинок
    images.forEach((img) => img.classList.remove("active"));
    // Добавляем нужной
    if (images[index]) images[index].classList.add("active");

    // Обновляем активную точку
    const allDots = document.querySelectorAll(".select-slide-buttons");
    allDots.forEach((dot) => dot.classList.remove("active"));
    if (allDots[index]) allDots[index].classList.add("active");
  }

  // --- 3. МОДАЛЬНОЕ ОКНО ---
  const modal = document.getElementById("modal");

  const closeBtn = document.getElementById("closeModal");

  if (modal) {
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
});
