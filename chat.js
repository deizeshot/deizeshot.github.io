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
  
  function getMessagesFromServer(callback) {
	const ws = new WebSocket('https://intermediate-easy-ship.glitch.me/');
  
	ws.onopen = () => {
	  console.log('Connected to the server.');
	};
  
	ws.onmessage = (event) => {
	  const messages = JSON.parse(event.data);
	  callback(messages);
	};
  }
  
  
  // Обновление чата (получение сообщений с сервера и отображение последних 5)
  function updateChat() {
	getMessagesFromServer((messages) => {
	  displayLastMessages(messages);
	});
  }
  
  // Отображение последних сообщений при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
	updateChat();
  });
  