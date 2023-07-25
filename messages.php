<?php
// Это просто заглушка для тестирования, реальные данные могут быть получены из базы данных или другого источника.
$messages = [
  'Hello!',
  'How are you?',
  'I like cats!',
  'This chat is awesome!',
  'Goodbye!'
];

// Возвращаем данные в формате JSON
header('Content-Type: application/json');
echo json_encode($messages);
?>
