/* ============ 頁面載入動效邏輯 ============
   使用方式：緊接在 <div id="page-loader">...</div> 之後放入：
   <script src="assets/js/loader.js"></script>

   邏輯：不論圖片／資源實際載入到哪，進度條固定在 2 秒內以等速從 0 慢慢推進到 100%
   （動畫本身寫在 loader.css 的 @keyframes loaderFill，timing function 用 linear
   確保是等速推進、不是忽快忽慢），跑滿後停留一下再淡出進入頁面。
*/
(function () {
  var loader = document.getElementById('page-loader');
  var htmlEl = document.documentElement;

  if (!loader) {
    htmlEl.classList.remove('is-loading');
    return;
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FILL_DURATION = 2000; // 對應 loader.css 的 2s 動畫時長，兩邊要保持一致
  var HOLD_AFTER_FILL = 150; // 跑滿 100% 後停留一下，讓「完成」感更明確，再淡出

  function hideLoader() {
    loader.classList.add('is-hidden');
    htmlEl.classList.remove('is-loading');

    loader.addEventListener('transitionend', function onDone() {
      loader.removeEventListener('transitionend', onDone);
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    });
  }

  var delay = prefersReducedMotion ? 0 : (FILL_DURATION + HOLD_AFTER_FILL);
  setTimeout(hideLoader, delay);
})();
