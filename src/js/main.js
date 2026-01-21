document.addEventListener("DOMContentLoaded", () => {
  /* ========== FANCYBOX ========== */
  Fancybox.bind("[data-fancybox]", {});
  /* ========== END FANCYBOX ========== */

  /* ========== IMASK ========== */

  const elements = document.querySelectorAll("[data-imask]");
  const maskOptions = {
    mask: "+{7} (000) 000-00-00",
  };

  elements.forEach((element) => {
    const phoneMask = IMask(element, maskOptions);
    element.phoneMask = phoneMask;
  });
  /* ========== END IMASK ========== */

  /* ========== MODAL LOGIC ========== */
  function modal() {
    let btnOpenModal = document.querySelectorAll("*[data-modal-open]");
    const btnCloseModal = document.querySelectorAll("*[data-modal-close]");
    const btnBlockModal = document.querySelectorAll("*[data-modal-block]");

    btnOpenModal.forEach((btn) => {
      btn.addEventListener("click", toggleModalClass);
    });
    btnCloseModal.forEach((btn) => {
      btn.addEventListener("click", toggleModalClass);
    });

    document.addEventListener("click", (e) => {
      const modal = e.target.classList.contains("modal-wrapper")
        ? e.target
        : null;

      if (modal) {
        modal?.classList.remove("active");
      }
    });

    function toggleModalClass() {
      btnBlockModal.forEach((block) => {
        if (
          this.dataset.modalOpen === block.dataset.modalBlock ||
          this.dataset.modalClose === block.dataset.modalBlock
        ) {
          block.classList.toggle("active");
          this.classList.toggle("active");
        }
      });
    }
  }
  modal();
  /* ========== END MODAL LOGIC ========== */

  /* ========== SCROLL EVENT ========== */
  document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("scroll", window.scrollY > 10);
  });
  /* ========== END SCROLL EVENT ========== */

  /* ========== TOGGLE CLASS ========== */
  function toggleClass() {
    document.addEventListener("click", (e) => {
      const wrapper = e.target.closest("*[data-toggle-class-wrapper]");
      const items = wrapper?.querySelectorAll("*[data-toggle-class-item]");
      if (wrapper && items) {
        items.forEach((item) => item.classList.toggle("active"));
      }
    });
  }
  toggleClass();
  /* ========== END TOGGLE CLASS ========== */

  /* ========== TABS ========== */
  const initTabs = () => {
    const tabsContainer = document.querySelector("*[data-tabs]");
    if (!tabsContainer) return;

    // const buttons = tabsContainer.querySelectorAll(".tabs__btn");
    const buttons = tabsContainer.querySelectorAll("*[data-tab-btn]");
    const panes = tabsContainer.querySelectorAll("*[data-tab-pane]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;

        // Смена состояний кнопок
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        // Смена состояний контента
        panes.forEach((pane) => {
          pane.classList.toggle("is-active", pane.id === targetId);
        });
      });
    });
  };
  initTabs();
  /* ========== END TABS ========== */

  /* ========== SWIPER ========== */
  const swiperAllNeed = new Swiper(".sec-all-need__slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".sec-all-need__slider-nav .slider-button-next",
      prevEl: ".sec-all-need__slider-nav .slider-button-prev",
    },
  });
  // Находим все обертки слайдеров
  const sliderWrappers = document.querySelectorAll(
    ".sec-services__item-slider",
  );
  sliderWrappers.forEach((wrapper) => {
    const swiperContainer = wrapper.querySelector(".swiper");

    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: wrapper.querySelector(".slider-button-next"),
        prevEl: wrapper.querySelector(".slider-button-prev"),
      },
      pagination: {
        el: wrapper.querySelector(".swiper-pagination"),
        clickable: true,
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });
  });

  const swiperPortfolio = new Swiper(".sec-portfolio__slider .swiper", {
    initialSlide: 1,
    centeredSlides: true,
    navigation: {
      nextEl: ".sec-portfolio__slider .slider-button-next",
      prevEl: ".sec-portfolio__slider .slider-button-prev",
    },
    pagination: {
      el: ".sec-portfolio__slider .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: -50,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: -30,
      },
    },
  });

  const swiperVideos = new Swiper(".sec-videos__slider .swiper", {
    spaceBetween: 30,
    navigation: {
      nextEl: ".sec-videos__slider .slider-button-next",
      prevEl: ".sec-videos__slider .slider-button-prev",
    },
    pagination: {
      el: ".sec-videos__slider .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  });

  /* ========== END SWIPER ========== */

  /* ========== ACCORDION ========== */
  const initAccordion = () => {
    const accordion = document.querySelector("[data-accordion]");
    if (!accordion) return;

    const items = accordion.querySelectorAll("[data-accordion-item]");

    items.forEach((item) => {
      const control = item.querySelector("[data-accordion-control]");

      control.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // 1. Сначала закрываем все активные вкладки (если нужен режим "только одна открыта")
        items.forEach((i) => i.classList.remove("is-active", "is-open"));

        // 2. Если текущая не была открыта — открываем её
        if (!isOpen) {
          item.classList.add("is-open");
        }
      });
    });
  };
  initAccordion();
  /* ========== END ACCORDION ========== */

  /* ========== CHECK FORM ========== */
  function checkForm() {
    function validateForm(e) {
      e.preventDefault();

      const phoneInput = e.target.querySelector("*[data-form-phone]");
      const nameInput = e.target.querySelector("*[data-form-name]");
      const checkboxInput = e.target.querySelector("*[data-form-checkbox]");
      const modalFormSuccess = document.querySelector(".modal-form-success");
      const allModals = document.querySelectorAll(".modal-wrapper");

      let isValid = true;

      if (nameInput.value.trim() === "") {
        nameInput.classList.add("is-error");
        isValid = false;
      } else {
        nameInput.classList.remove("is-error");
      }

      if (phoneInput.value.length < 17) {
        phoneInput.classList.add("is-error");
        isValid = false;
      } else {
        phoneInput.classList.remove("is-error");
      }

      if (!checkboxInput.checked) {
        checkboxInput.classList.add("is-error");
        isValid = false;
      } else {
        checkboxInput.classList.remove("is-error");
      }

      if (isValid) {
        console.log("Форма валидна, отправляем данные...");
        allModals.forEach((modal) => modal.classList.remove("active"));
        modalFormSuccess.classList.add("active");
        e.target.reset();
      }
    }

    const forms = document.querySelectorAll("*[data-form]");
    forms.forEach((form) => {
      const phoneInput = form.querySelector("*[data-form-phone]");
      const nameInput = form.querySelector("*[data-form-name]");

      form.addEventListener("submit", validateForm);

      [(phoneInput, nameInput)].forEach((input) => {
        input.addEventListener("input", () => {
          input.classList.remove("is-error");
        });
      });
    });
  }
  checkForm();
  /* ========== CHECK FORM ========== */
});
