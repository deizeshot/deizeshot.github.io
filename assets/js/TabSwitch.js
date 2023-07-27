// // Функция для установки активной вкладки по параметру URL или из Local Storage
// function setActiveTab() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const activeTab = urlParams.get("tab") || localStorage.getItem("activeTab");
  
//     if (activeTab) {
//       const tabs = document.querySelectorAll(".nav-link");
//       tabs.forEach((tab) => {
//         tab.classList.remove("active");
//       });
//       const activeTabElement = document.querySelector(`[href="${activeTab}"]`);
//       if (activeTabElement) {
//         activeTabElement.classList.add("active");
//       }
  
//       // Показываем соответствующий экран, если используется Bootstrap табы
//       const tabContent = document.querySelector(".tab-content");
//       if (tabContent) {
//         tabContent.querySelector(".active").classList.remove("active", "show");
//         const activeContent = document.querySelector(activeTab);
//         if (activeContent) {
//           activeContent.classList.add("active", "show");
//         }
//       }
//     }
//   }
  
//   // Вызываем функцию при загрузке страницы
//   window.addEventListener("DOMContentLoaded", setActiveTab);
  
//   // Сохраняем активный таб в параметре URL и в Local Storage при переключении
//   const tabs = document.querySelectorAll(".nav-link");
//   tabs.forEach((tab) => {
//     tab.addEventListener("click", () => {
//       const activeTab = tab.getAttribute("href");
//       const url = new URL(window.location.href);
//       url.searchParams.set("tab", activeTab.slice(1)); // Удаляем символ "#" из ID вкладки
//       window.history.replaceState({}, "", url);
  
//       localStorage.setItem("activeTab", activeTab); // Сохраняем активный таб в Local Storage
//     });
//   });
  
  // Дополнительные скрипты для переключения табов и сохранения активного таба
  const gamesButton = document.getElementById('gamesButton');
  const chatButton = document.getElementById('chatButton');
  
  gamesButton.addEventListener('click', () => {
    document.getElementById('tab-1').classList.add('show', 'active');
    document.getElementById('tab-2').classList.remove('show', 'active');
  });
  
  chatButton.addEventListener('click', () => {
    document.getElementById('tab-2').classList.add('show', 'active');
    document.getElementById('tab-1').classList.remove('show', 'active');
  });
  