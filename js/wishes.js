
function init() {
	// $.getJSON("goods.json", goodsOut);
	$.post(
			"admin/core.php",
			{
				"action" : "loadGoods"
			},
			goodsOut
		); 
}


function goodsOut(data){
	data = JSON.parse(data);
	var out='';
	var wishes = {};
	if (localStorage.getItem('wishes')) {
		wishes = JSON.parse(localStorage.getItem('wishes'));
		for (var key in wishes){

        out +='<div class="cart">';
        out +=`<button class="wishes" data-id="${key}">&#9825;</button>`;
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<a href = "goods.html#${key}">Подробнее</a>`;
        out +='</div>';

		}
		$('.goods-out').html(out);

	}
	else {
		$('.goods-out').html('Нет избранного');
	}
	$('.wishes').on('click', removeWishes);
}

function removeWishes() {
	var wishes = {};
	if (localStorage.getItem('wishes')) {
		wishes = JSON.parse(localStorage.getItem('wishes'));
	}
	var id = $(this).attr('data-id');
	delete wishes[id];
	localStorage.setItem('wishes', JSON.stringify(wishes));
	alert('Удалено из избранного');
	init();
}

$(document).ready(function() {
	init();
});