document.addEventListener('DOMContentLoaded', () => {
  // 1. 연도 자동 표시 (안전장치 추가)
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. 다크 모드 토글 (저장 및 접근성 개선)
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  
  if (toggle) {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    
    // 초기 세팅
    root.setAttribute('data-theme', initial);
    toggle.textContent = initial === 'dark' ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', initial === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');

    // 클릭 이벤트
    toggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      
      toggle.textContent = next === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', next === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
    });
  }

  // 3. 스크롤 시 섹션 페이드인 (Intersection Observer)
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
});
