<?php
// Получение сообщения из POST-запроса
if (isset($_POST['message'])) {
    $message = $_POST['message'];

    // Логируем сообщение в файл chat.log
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message\n";
    file_put_contents('chat.log', $logEntry, FILE_APPEND);
}
