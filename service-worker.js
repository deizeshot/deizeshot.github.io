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
  
  self.addEventListener('push', event => {
    const options = {
      body: event.data.text(), // Текст уведомления
    //   icon: 'assets/icon.png', // Путь к иконке уведомления
    //   badge: 'assets/badge.png' // Путь к значку уведомления
    };
  
    event.waitUntil(
      self.registration.showNotification('Новое уведомление', options)
    );
  });
  
  
//   // Показываем уведомление
//   function showNotification(message) {
//     return self.registration.showNotification('Новое сообщение в чате', {
//       body: message,
//       icon: 'assets/img/668287.png', // Путь к иконке уведомления
//     });
//   }
  