<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');

$EmailTo = "test@rambler.ru";
$EmailFrom = "test2517@mail.ru";
$Subject = "Заявка на получение прайс-листа Benson";

// Sanitize POST array
$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

// Create a new array with user-friendly field names
$userFriendlyPost = array(
    'Имя' => mb_convert_encoding($post['name'], 'UTF-8'),
    'Электронная почта' => mb_convert_encoding($post['email'], 'UTF-8'),
    'Телефон' => mb_convert_encoding($post['telephone'], 'UTF-8'),
    'Компания' => mb_convert_encoding($post['company'], 'UTF-8'),
    'Город' => mb_convert_encoding($post['city'], 'UTF-8')
);

$message = '';
foreach ($userFriendlyPost as $key => $value) {
    $message .= "<b>" . $key . ':</b> ' . $value . "<br>\n";
}

// Additional headers
$headers = "From: <$EmailFrom>\r\n";
$headers .= "Reply-To: <$EmailFrom>\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$success = mail($EmailTo, $Subject, $message, $headers);
if($success) { 
    echo '<div><svg class="bi bi-envelope-check submission-form-success" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="font-size: 100px;">
        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"></path>
        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"></path>
    </svg>
    <h1 class="submission-form-success" style="font-size: 20px;margin-left: 10px;margin-right: 10px;margin-top: 20px;color: rgb(66, 220, 163;">Успешно отправлена</h1>
    <p>В ближайшее время с Вами свяжется наш специалист и подробно проконсультирует про условия сотрудничества</p>
</div>'; 
} else {  
    echo '<div><svg class="bi bi-envelope-x submission-form-error" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="font-size: 100px;">
        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"></path>
        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-4.854-1.354a.5.5 0 0 0 0 .708l.647.646-.647.646a.5.5 0 0 0 .708.708l.646-.647.646.647a.5.5 0 0 0 .708-.708l-.647-.646.647-.646a.5.5 0 0 0-.708-.708l-.646.647-.646-.647a.5.5 0 0 0-.708 0Z"></path>
    </svg>
    <h1 class="submission-form-error" style="font-size: 20px;margin-left: 10px;margin-right: 10px;margin-top: 20px;color: rgb(66, 220, 163;">Ошибка отправки</h1>
    <p>Пожалуйста, попробуйте отправить заявку позже или свяжитесь с сотрудником компании по указанному номеру телефона</p>
</div>'; 
}

?>
