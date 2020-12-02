var cart = {}; //корзина

function init() {
	$.getJSON("goods.json", goodsOut);
}

function goodsOut(data){
	var out='';
	for (var key in data){

        out +='<div class="cart">';
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';

	}
	$('.goods-out').html(out);
	$('.add-to-cart').on('click', addToCart);
}

function addToCart(){
	var id = $(this).attr('data-id');
	if (cart[id]==undefined) {
		cart[id] = 1; //если в корзине такого товара нет, делаем равным 1
	}
	else {
		cart[id]++; //если есть - увеличиваем на единицу
	}
	showMiniCart();
	saveCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart() {
	var out = "";
	for (var key in cart){
		out += key + ' --- ' + cart[key];
		out += '<br>';
	}
	$('.mini-cart').html(out);
}

function loadCart() {
	// проверка localStorage на наличие заполненной корзины
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
		showMiniCart();
	}
}

$(document).ready(function() {
	init();
	loadCart();
});