document.addEventListener("DOMContentLoaded", () => {
  const thumbsList = document.querySelector(".pdp-thumbs__list");
  const thumbs = document.querySelectorAll(".pdp-thumbs__list img");
  const arrowBottom = document.querySelector(".pdp-thumbs__arrow--bottom");
  const arrowTop = document.querySelector(".pdp-thumbs__arrow--top");

  const THUMB_HEIGHT = 200;
  const GAP = 15;
  const STEP = THUMB_HEIGHT + GAP;

  const VISIBLE_COUNT = 3;
  const TOTAL_COUNT = thumbs.length;

  let currentIndex = 0;
  const maxIndex = TOTAL_COUNT - VISIBLE_COUNT;

  // Initial state
  arrowTop.style.display = "none";
  arrowBottom.style.display = TOTAL_COUNT > VISIBLE_COUNT ? "flex" : "none";

  arrowBottom.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    }
    updateThumbs();
  });

  arrowTop.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    }
    updateThumbs();
  });

  function updateThumbs() {
    const translateY = -(currentIndex * STEP);
    thumbsList.style.transform = `translateY(${translateY}px)`;

    // Toggle top arrow
    arrowTop.style.display = currentIndex > 0 ? "flex" : "none";

    // Toggle bottom arrow
    arrowBottom.style.display = currentIndex < maxIndex ? "flex" : "none";
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".pdp-main-image-slider");
  const images = document.querySelectorAll(".pdp-main-image-slider img");
  const leftArrow = document.querySelector(".overlay-left-arrow");
  const rightArrow = document.querySelector(".overlay-icon"); // right arrow
  const total = images.length;
  let currentIndex = 0;

  // Dynamically get image width
  function getImageWidth() {
    return slider.clientWidth;
  }

  function updateSlider() {
    const width = getImageWidth();
    slider.style.transform = `translateX(-${currentIndex * width}px)`;
    slider.style.transition = "transform 0.3s ease-in-out";
  }

  // Left arrow click
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Right arrow click
  rightArrow.addEventListener("click", () => {
    if (currentIndex < total - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  // Touch / swipe support for mobile
  let startX = 0;
  let isDragging = false;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    slider.style.transform = `translateX(-${currentIndex * getImageWidth() + diff}px)`;
  });

  slider.addEventListener("touchend", (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && currentIndex < total - 1) {
      currentIndex++;
    } else if (diff < -50 && currentIndex > 0) {
      currentIndex--;
    }

    updateSlider();
  });

  // Update slider on window resize
  window.addEventListener("resize", updateSlider);

  // Initialize
  updateSlider();
});

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".pdp-main-image-slider");
  const images = document.querySelectorAll(".pdp-main-image-slider img");
  const leftArrow = document.querySelector(".overlay-left-arrow");
  const rightArrow = document.querySelector(".overlay-icon"); // right arrow
  const thumbs = document.querySelectorAll(".pdp-thumbs__list img");

  let currentIndex = 0;

  function updateSlider() {
    const imageWidth = images[0].clientWidth + 10; // width + gap
    slider.scrollTo({
      left: currentIndex * imageWidth,
      behavior: "smooth"
    });
  }

  // Overlay left arrow click
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Overlay right arrow click
  rightArrow.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  // Click thumbnail to change main image
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Optional: update currentIndex on swipe for mobile
  let startX = 0;
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50; // minimum swipe distance
    if (diff > threshold && currentIndex < images.length - 1) {
      currentIndex++;
      updateSlider();
    } else if (diff < -threshold && currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Initialize slider
  updateSlider();
});


const thumbnails = document.querySelectorAll('.pdp-thumbs__list img');
const lightbox = document.querySelector('.pdp-lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.pdp-lightbox__close');
const prevBtn = document.querySelector('.pdp-lightbox__arrow--left');
const nextBtn = document.querySelector('.pdp-lightbox__arrow--right');

let currentIndex = 0;
const images = Array.from(thumbnails).map(img => img.src);

/* OPEN */
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = images[currentIndex];
  lightbox.style.display = 'flex';
}

/* CLOSE */
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

/* NAVIGATION */
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
});

/* CLICK OUTSIDE IMAGE CLOSE */
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


  
   const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-tab');

      tabContents.forEach(content => {
        content.classList.add('hidden');
      });

      tabButtons.forEach(btn => btn.classList.remove('active'));

      document.getElementById(tab).classList.remove('hidden');
      button.classList.add('active');
    });
  });

  const slider = document.getElementById("qtySlider");
const bubble = document.getElementById("sliderBubble");
const qtyText = document.getElementById("qtyText");
const qtyValue = document.getElementById("qtyValue");
const unitPrice = document.getElementById("unitPrice");
const discountBadge = document.getElementById("discountBadge");

const priceTable = [
  { max: 1, price: 57.9 },
  { max: 2, price: 55.9 },
  { max: 4, price: 53.9 },
  { max: 9, price: 50.9 },
  { max: 19, price: 41.9 },
  { max: 34, price: 39.9 },
  { max: 49, price: 37.9 },
  { max: 99, price: 35.9 },
  { max: 1000, price: 33.9 }
];

function updateUI(val) {
  const percent = ((val - slider.min) / (slider.max - slider.min)) * 100;
  bubble.style.left = `${percent}%`;

  bubble.textContent = `${val} Piece`;
  qtyText.textContent = val;
  qtyValue.textContent = val;

  const base = 57.9;
  const tier = priceTable.find(t => val <= t.max);
  unitPrice.textContent = tier.price.toFixed(2);

  const discount = Math.round(((base - tier.price) / base) * 100);
  discountBadge.textContent = `${discount}% QUANTITY DISCOUNT`;
}

slider.addEventListener("input", () => updateUI(slider.value));

document.getElementById("plus").onclick = () => {
  slider.value = Math.min(100, +slider.value + 1);
  updateUI(slider.value);
};

document.getElementById("minus").onclick = () => {
  slider.value = Math.max(1, +slider.value - 1);
  updateUI(slider.value);
};

updateUI(slider.value);
