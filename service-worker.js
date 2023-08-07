// Устанавливаем сервис-воркер
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          // Список всех файлов, которые нужно закэшировать
          // Укажите пути к файлам, которые вы хотите кэшировать, например, CSS, JS, изображения и т.д.
        ]);
      })
    );
  });
  
  // Активируем сервис-воркер и удаляем старые кэши при обновлении
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName !== 'v1';
          }).map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  // Слушаем событие "push" (получение уведомления с сервера)
  self.addEventListener('push', (event) => {
    if (event.data) {
      const message = event.data.text();
      event.waitUntil(showNotification(message));
    }
  });
  
  // Показываем уведомление
  function showNotification(message) {
    return self.registration.showNotification('Новое сообщение в чате', {
      body: message,
      icon: 'assets/img/668287.png', // Путь к иконке уведомления
    });
  }
  