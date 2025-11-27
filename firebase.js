// Подключаем Firebase через CDN (для обычного сайта без npm)
(function () {
  // Проверяем, не подключён ли Firebase уже
  if (window.firebase) return;

  // 1. Загружаем Firebase App SDK
  const appScript = document.createElement('script');
  appScript.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js';
  appScript.onload = () => {
    // 2. Загружаем Auth SDK
    const authScript = document.createElement('script');
    authScript.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js';
    authScript.onload = () => {
      // 3. Инициализация Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyCKcUnzPEilGxOXB2L5QYLr0Kw7fgI_hCY",
        authDomain: "testik-b6f72.firebaseapp.com",
        projectId: "testik-b6f72",
        storageBucket: "testik-b6f72.firebasestorage.app",
        messagingSenderId: "398523760786",
        appId: "1:398523760786:web:35ecca7778ebe25564a64b"
      };

      // Инициализируем приложение
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase успешно подключён!');
    };
    document.head.appendChild(authScript);
  };
  document.head.appendChild(appScript);
})();
