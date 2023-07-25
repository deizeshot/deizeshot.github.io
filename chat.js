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

  // Добавляем класс в зависимости от типа сообщения (отправленное или полученное)
  if (message.type === 'chat') {
    messageDiv.classList.add('chat-message', 'sent'); // Здесь можно использовать класс 'received' для полученных сообщений
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;


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