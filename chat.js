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
  messageDiv.classList.add('chat-message');

  // Добавляем текст сообщения с пробелом и временем
  const messageTextWithTime = document.createElement('div');
  messageTextWithTime.textContent = message.text + ' ' + message.time;
  messageDiv.appendChild(messageTextWithTime);

  // Добавляем класс в зависимости от типа сообщения (отправленное или полученное)
  if (message.type === 'chat') {
    messageDiv.classList.add('sent'); // Здесь можно использовать класс 'received' для полученных сообщений
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Функция для получения текущего времени в формате "HH:mm"
function getTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Пример отправки сообщения на сервер при клике на кнопку "Отправить"
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  let messageText = messageInput.value.trim();

  if (messageText !== '') {
    // Проверяем, содержит ли сообщение текст вида "id-0123456" и извлекаем chat_id
    const chatIdMatch = messageText.match(/id-(\d+)/);
    if (chatIdMatch) {
      const chatId = chatIdMatch[1];
      messageText = messageText.replace(/id-(\d+)/, ''); // Удаляем из сообщения текст с форматом id-0123456
      sendMessageToServer({ type: 'chat', text: messageText, chatId: chatId });
    } else {
      sendMessageToServer({ type: 'chat', text: messageText });
    }

    messageInput.value = '';
  }
});

async function sendMessageToServer(message) {
  const currentTime = getTimeString(); // Получаем текущее время в формате "HH:mm"
  message.time = currentTime; // Добавляем поле "time" с текущим временем в объект сообщения

  // Получаем YOUR_TELEGRAM_USER_ID с сервера
  const YOUR_TELEGRAM_USER_ID = await getYourTelegramUserId();

  // Добавляем YOUR_TELEGRAM_USER_ID в сообщение
  message.YOUR_TELEGRAM_USER_ID = YOUR_TELEGRAM_USER_ID;

  ws.send(JSON.stringify(message));
}


async function getYourTelegramUserId() {
  try {
    const response = await fetch('/get-your-telegram-user-id'); // Здесь '/get-your-telegram-user-id' - путь к вашему серверному маршруту для получения chatIds.json
    const data = await response.json();
    return data.YOUR_TELEGRAM_USER_ID; // Ваш YOUR_TELEGRAM_USER_ID будет содержаться в поле data.YOUR_TELEGRAM_USER_ID
  } catch (error) {
    console.error('Error getting YOUR_TELEGRAM_USER_ID:', error);
    return null;
  }
}

// Функция для отправки запроса на сервер для добавления chatId
async function addChatIdToServer(chatId) {
  try {
    const response = await fetch(`/add-chat-id/${chatId}`, { method: 'POST' });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error adding chatId:', error);
  }
}

// В функции sendMessageToServer извлекаем chatId из текста сообщения и добавляем его в массив chatIds на сервере
async function sendMessageToServer(message) {
  const currentTime = getTimeString(); // Получаем текущее время в формате "HH:mm"
  message.time = currentTime; // Добавляем поле "time" с текущим временем в объект сообщения

  // Извлекаем chatId из текста сообщения, если он есть (формат id-1234567)
  const chatIdMatch = message.text.match(/id-(\d+)/);
  if (chatIdMatch) {
    const chatId = chatIdMatch[1];
    addChatIdToServer(chatId); // Отправляем запрос на сервер для добавления chatId
    // Удаляем из сообщения текст с форматом id-1234567
    message.text = message.text.replace(/id-(\d+)/, '');
  }

  ws.send(JSON.stringify(message));
}

