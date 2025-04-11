'use strict';

// DOM Elements
const elements = {
  // Sidebar
  sidebar: document.querySelector("[data-sidebar]"),
  sidebarBtn: document.querySelector("[data-sidebar-btn]"),
  
  // Testimonials Modal
  testimonialsItems: document.querySelectorAll("[data-testimonials-item]"),
  modalContainer: document.querySelector("[data-modal-container]"),
  modalCloseBtn: document.querySelector("[data-modal-close-btn]"),
  overlay: document.querySelector("[data-overlay]"),
  modalImg: document.querySelector("[data-modal-img]"),
  modalTitle: document.querySelector("[data-modal-title]"),
  modalText: document.querySelector("[data-modal-text]"),
  
  // Custom Select
  select: document.querySelector("[data-select]"),
  selectItems: document.querySelectorAll("[data-select-item]"),
  selectValue: document.querySelector("[data-selecct-value]"),
  filterBtns: document.querySelectorAll("[data-filter-btn]"),
  filterItems: document.querySelectorAll("[data-filter-item]"),
  
  // Contact Form
  form: document.querySelector("[data-form]"),
  formInputs: document.querySelectorAll("[data-form-input]"),
  formBtn: document.querySelector("[data-form-btn]"),
  
  // Page Navigation
  navigationLinks: document.querySelectorAll("[data-nav-link]"),
  pages: document.querySelectorAll("[data-page]"),
  
  // Horizontal Scrolling
  scrollContainer: document.querySelector(".itinerary-items")
};

// Utility Functions
const utils = {
  toggleElement: (elem) => elem.classList.toggle("active"),
  
  // Horizontal scrolling with touch support
  initHorizontalScroll: (container) => {
    if (!container) return;
    
    let isDragging = false;
    let startX, scrollLeft;
    let animationFrame;

    const handleStart = (e) => {
      isDragging = true;
      startX = (e.touches ? e.touches[0].pageX : e.pageX) - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.scrollBehavior = 'auto';
      container.style.cursor = 'grabbing';
      cancelAnimationFrame(animationFrame);
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      
      const x = (e.touches ? e.touches[0].pageX : e.pageX) - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX) * 2.5;
    };

    const handleEnd = () => {
      isDragging = false;
      container.style.scrollBehavior = 'smooth';
      container.style.cursor = 'grab';
      snapToNearestItem();
    };

    const snapToNearestItem = () => {
      const items = container.querySelectorAll('.itinerary-item');
      if (!items.length) return;
      
      let closestItem = items[0];
      let closestDistance = Math.abs(items[0].offsetLeft - container.scrollLeft);
      
      items.forEach(item => {
        const distance = Math.abs(item.offsetLeft - container.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
        }
      });
      
      animationFrame = requestAnimationFrame(() => {
        container.scrollTo({
          left: closestItem.offsetLeft - 20,
          behavior: 'smooth'
        });
      });
    };

    // Event listeners
    const events = [
      { el: container, type: 'touchstart', fn: handleStart, opts: { passive: false } },
      { el: container, type: 'mousedown', fn: handleStart },
      { el: document, type: 'touchmove', fn: handleMove, opts: { passive: false } },
      { el: document, type: 'mousemove', fn: handleMove },
      { el: document, type: 'touchend', fn: handleEnd },
      { el: document, type: 'mouseup', fn: handleEnd }
    ];

    events.forEach(({ el, type, fn, opts }) => 
      el.addEventListener(type, fn, opts));

    container.style.cursor = 'grab';
  }
};

// Sidebar Toggle
if (elements.sidebarBtn) {
  elements.sidebarBtn.addEventListener("click", () => 
    utils.toggleElement(elements.sidebar));
}

// Testimonials Modal
if (elements.testimonialsItems.length) {
  const toggleModal = () => {
    utils.toggleElement(elements.modalContainer);
    utils.toggleElement(elements.overlay);
  };

  elements.testimonialsItems.forEach(item => {
    item.addEventListener("click", () => {
      elements.modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      elements.modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      elements.modalTitle.textContent = item.querySelector("[data-testimonials-title]").textContent;
      elements.modalText.textContent = item.querySelector("[data-testimonials-text]").textContent;
      toggleModal();
    });
  });

  elements.modalCloseBtn.addEventListener("click", toggleModal);
  elements.overlay.addEventListener("click", toggleModal);
}

// Custom Select and Filtering
if (elements.select) {
  elements.select.addEventListener("click", () => 
    utils.toggleElement(elements.select));

  elements.selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedValue = item.textContent.toLowerCase();
      elements.selectValue.textContent = item.textContent;
      utils.toggleElement(elements.select);
      filterItems(selectedValue);
    });
  });

  const filterItems = (selectedValue) => {
    elements.filterItems.forEach(item => {
      item.classList.toggle(
        "active", 
        selectedValue === "all" || selectedValue === item.dataset.category
      );
    });
  };

  let lastClickedBtn = elements.filterBtns[0];
  elements.filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedValue = btn.textContent.toLowerCase();
      elements.selectValue.textContent = btn.textContent;
      filterItems(selectedValue);
      lastClickedBtn.classList.remove("active");
      btn.classList.add("active");
      lastClickedBtn = btn;
    });
  });
}

// Form Validation
if (elements.form) {
  elements.formInputs.forEach(input => {
    input.addEventListener("input", () => {
      elements.formBtn.disabled = !elements.form.checkValidity();
    });
  });
}

// Page Navigation
if (elements.navigationLinks.length) {
  elements.navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetPage = link.textContent.toLowerCase();
      
      elements.pages.forEach(page => 
        page.classList.toggle("active", page.dataset.page === targetPage));
      
      elements.navigationLinks.forEach(navLink => 
        navLink.classList.toggle("active", navLink === link));
      
      window.scrollTo(0, 0);
    });
  });
}

// Initialize Horizontal Scrolling
utils.initHorizontalScroll(elements.scrollContainer);






// Get DOM elements
const viewAllBtn = document.getElementById('viewAllBtn');
const popupL1 = document.getElementById('popup-l1');
const overlay = document.getElementById('overlay');
const closePopup = document.getElementById('closePopup');

// Show popup when View All is clicked
viewAllBtn.addEventListener('click', function(e) {
    e.preventDefault();
    popupL1.classList.add('active');
    overlay.classList.add('active');
});

// Close popup when X is clicked
closePopup.addEventListener('click', function() {
    popupL1.classList.remove('active');
    overlay.classList.remove('active');
});

// Close popup when clicking outside
overlay.addEventListener('click', function() {
    popupL1.classList.remove('active');
    overlay.classList.remove('active');
});



