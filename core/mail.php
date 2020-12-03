<?php 
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Имя: ' .$_POST['name'].'</p>';
$message .= '<p>Телефон: ' .$_POST['phone'].'</p>';
$message .= '<p>Почта: ' .$_POST['email'].'</p>';

$cart = $_POST['cart'];
$sum = 0;

foreach ($cart as $id => $count) {
	$message .= $json[$id]['name'] .' --- ';
	$message .= $count . ' --- ';
	$message .= $count*$json[$id]['cost'];
	$message .= '</br>';
	$sum += $count*$json[$id]['cost'];
}
$message .= 'Всего: ' . $sum;

// print_r($message);

$to = 'musicy@yandex.ru' . ',';
$to .= $_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset = utf-8' . "\r\n";
$m = mail($to, 'Заказ в магазине', $spectext . $message . 
'</body></html>', $headers);
if ($m) {echo 1;} else {echo 0;}

