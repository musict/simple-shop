var cart = {}; 

function init() {
	// $.getJSON("goods.json", goodsOut);
	var hash = window.location.hash.substring(1);
	console.log(hash);
	$.post(
			"admin/core.php",
			{
				"action" : "loadSingleGood",
				"id" : hash
			},
			goodsOut
		); 
}

function goodsOut(data){
	if (data != 0) {
		data = JSON.parse(data);
		var out='';
		out +='<div class="cart">';
	    out +=`<button class="wishes" data-id="${data.id}">&#9825;</button>`;
	    out +=`<p class="name">${data.name}</p>`;
	    out +=`<img src="images/${data.img}" alt="">`;
	    out +=`<div class="cost">${data.cost}</div>`;
	    out +=`<button class="add-to-cart" data-id="${data.id}">Купить</button>`;
	    out +='</div>';
		$('.goods-out').html(out);
		$('.add-to-cart').on('click', addToCart);
		$('.wishes').on('click', addWishes);
	} else {
		$('.goods-out').html("Товар не найден");
	}
    
}

function addWishes() {
	var wishes = {};
	if (localStorage.getItem('wishes')) {
		wishes = JSON.parse(localStorage.getItem('wishes'));
	}
	alert('Добавлено в избранное');
	var id = $(this).attr('data-id');
	wishes[id] = 1;
	localStorage.setItem('wishes', JSON.stringify(wishes));
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