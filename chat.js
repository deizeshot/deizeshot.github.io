const socket = new WebSocket('wss://intermediate-easy-ship.glitch.me/');

// Обработчик события открытия соединения
socket.onopen = () => {
  console.log('WebSocket connection established.');
};

// Обработчик события получения сообщения от сервера
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Добавьте ваш код для обновления чата и отображения сообщений здесь
};

// Обработчик события закрытия соединения
socket.onclose = () => {
  console.log('WebSocket connection closed.');
};

// Функция для отправки сообщения на сервер
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket connection is not open.');
  }
}

// Добавляем обработчик для кнопки отправки
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  
  if (message !== '') {
    sendMessage(message); // Отправляем сообщение на сервер
    messageInput.value = ''; // Очищаем поле ввода после отправки
  }
});

// Функция для отображения последних сообщений в столбике
function displayLastMessages(messages) {
  const messageContainer = document.getElementById('chatMessages');
  messageContainer.innerHTML = '';

  const startIndex = Math.max(0, messages.length - 5);
  for (let i = startIndex; i < messages.length; i++) {
    const message = messages[i];
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
  }
}

// Функция для отправки сообщения на сервер
function sendMessage(message) {
  // Здесь вы можете выполнить логику отправки сообщения на ваш сервер,
  // например, через AJAX запрос или WebSocket.

  // Добавим заглушку для логирования на клиенте:
  const logEntry = `[${new Date().toLocaleString()}] Отправлено сообщение: "${message}"\n`;
  console.log(logEntry);

  // Отправляем сообщение на сервер (здесь будет ваша логика отправки сообщения на сервер)
  $.ajax({
    type: 'POST',
    url: 'log.php',
    data: { message: message },
    success: function (data) {
      console.log(`Сообщение успешно отправлено на сервер: "${message}"`);
      // После успешной отправки сообщения обновляем чат, чтобы показать новое сообщение
      updateChat();
    },
    error: function (xhr, status, error) {
      console.error(`Ошибка при отправке сообщения на сервер: "${message}"`);
      console.error(error);
    }
  });
}

// Получение сообщений с сервера и обновление чата
function updateChat() {
  $.ajax({
    type: 'GET',
    url: 'https://intermediate-easy-ship.glitch.me/messages',
    success: function (data) {
      const messages = JSON.parse(data);
      displayLastMessages(messages);
    },
    error: function (xhr, status, error) {
      console.error('Ошибка при получении сообщений с сервера.');
      console.error(error);
    }
  });
}

// Отображение последних сообщений при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateChat();
});
