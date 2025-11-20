// hero.js
function initializeHero() {
  const hero = document.getElementById('hero-section');
  if (!hero) return;

  const bgElements = hero.querySelectorAll('.hero__bg');
  const indicators = hero.querySelectorAll('.hero__indicator');
  
  if (bgElements.length === 0) return;
  
  let currentIndex = 0;
  let slideInterval;
  
  function updateSlide(index) {
    bgElements.forEach((bg, i) => {
      bg.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateSlide(index);
      resetInterval();
    });
  });
  
  function startInterval() {
    // ここが5000(5秒)なら、アニメーション(40秒)の冒頭部分だけを使って
    // ゆっくり拡大しながら次の画像へクロスフェードします。
    slideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bgElements.length;
      updateSlide(nextIndex);
    }, 3000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  startInterval();
}

document.addEventListener('DOMContentLoaded', initializeHero);