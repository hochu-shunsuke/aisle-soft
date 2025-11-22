document.addEventListener('DOMContentLoaded', function() {
  initializeHeaderMenu();
});

function initializeHeaderMenu() {
  const navToggle = document.querySelector('.header__nav-toggle');
  const navMenu = document.querySelector('.header__nav-menu');
  const overlay = document.querySelector('.header__overlay');
  
  if (navToggle && navMenu && overlay) {
    // メニューの開閉切り替え
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
    
    // オーバーレイをクリックしたら閉じる
    overlay.addEventListener('click', function() {
      closeMenu();
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navToggle.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // 【重要】メニュー内のリンクをクリックした時の処理
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // e.stopPropagation(); // ここでの伝播阻止は削除（クリック判定を優先）

        // リンク移動を阻害しないよう、わずかに遅らせてからメニューを閉じる
        // これにより「ボタンが消えたからクリック無効」となるのを防ぎます
        setTimeout(() => {
          closeMenu();
        }, 200); 
      });
    });
    
    // メニュー開閉の共通処理
    function toggleMenu() {
      const isOpen = navToggle.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      navToggle.classList.add('is-open');
      navMenu.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // 背景固定
      navToggle.setAttribute('aria-label', 'メニューを閉じる');
    }

    function closeMenu() {
      navToggle.classList.remove('is-open');
      navMenu.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = ''; // 背景固定解除
      navToggle.setAttribute('aria-label', 'メニューを開く');
    }
  }
}