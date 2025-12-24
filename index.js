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

  // Width must match CSS
  const IMAGE_WIDTH = 640;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * IMAGE_WIDTH}px)`;
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


