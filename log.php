<?php
// Проверяем, что запрос пришел методом POST и содержит поле "message"
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['message'])) {
  $message = $_POST['message'];

  // Открываем файл для записи
  $file = fopen('chat.log', 'a');
  if ($file) {
    // Записываем сообщение в файл
    fwrite($file, $message . "\n");
    fclose($file);

    // Отправляем ответ об успешной записи
    echo json_encode(['status' => 'success', 'message' => 'Message is logged.']);
  } else {
    // Ошибка при открытии файла
    echo json_encode(['status' => 'error', 'message' => 'Unable to open file for writing.']);
  }
} else {
  // Неверный метод запроса или отсутствует поле "message"
  echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>
