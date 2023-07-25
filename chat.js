const ws = new WebSocket('wss://intermediate-easy-ship.glitch.me');

ws.onopen = () => {
  console.log('Connected to the WebSocket server.');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'chat-history') {
    const history = data.messages;
    // Очищаем текущий чат перед отображением истории сообщений
    document.getElementById('chatMessages').innerHTML = '';
    history.forEach(message => displayMessage(message));
  } else if (data.type === 'chat-message') {
    const message = data.message;
    displayMessage(message);
  }
};

function displayMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message.text;
  chatMessages.appendChild(messageDiv);

  console.log(message.text); // Вывод текста сообщения в консоль
}

function sendMessageToServer(message) {
  ws.send(JSON.stringify(message));
}

// Пример отправки сообщения на сервер при клике на кнопку "Отправить"
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();

  if (message !== '') {
    sendMessageToServer({ type: 'chat', text: message });
    messageInput.value = '';
  }
});