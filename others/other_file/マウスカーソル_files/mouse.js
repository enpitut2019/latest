
window.alert('起動確認');
//ホバーしたとき表示
$('.area_red').hover( function(){$("#popup_red").show();},function(){$("#popup_red").hide();});
$('.area_green').hover( function(){$("#popup_green").show();},function(){$("#popup_green").hide();});
$('.area_blue').hover( function(){$("#popup_blue").show();},function(){$("#popup_blue").hide();});

$(function(){
	 $('#area').hover(function(){
		// ------------------------------------------------------------
		// マウスを移動するたびに実行される関数
		// ------------------------------------------------------------
		function MouseMoveFunc(e){

			// クライアント座標系を基点としたマウスカーソルの座標を取得
			var mouse_x = e.clientX + 5;
			var mouse_y = $(window).scrollTop() + e.clientY + 5;


		    $("#popup").css({
		        "position": "absolute",
		        "left": mouse_x,
		        "top": mouse_y
		    });
		}


		// ------------------------------------------------------------
		// イベントのリッスンを開始する
		// ------------------------------------------------------------
		// イベントリスナーに対応している
		if(document.addEventListener){

			// マウスを移動するたびに実行されるイベント
			document.addEventListener("mousemove" , MouseMoveFunc);

		// アタッチイベントに対応している
		}else if(document.attachEvent){

			// マウスを移動するたびに実行されるイベント
			document.attachEvent("onmousemove" , MouseMoveFunc);

		}
	});
});