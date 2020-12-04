
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
        out +=`<button class="wishes" data-id="${key}">&#10084;</button>`;
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button><a href = "goods.html#${key}">Купить</a></button>`;
        out +='</div>';

		}
		$('.goods-out').html(out);

	}
	else {
		$('.goods-out').html('Нет избранного');
	}
}


$(document).ready(function() {
	init();
	loadCart();
});