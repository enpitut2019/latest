/* 
function moveImg()
{
	var obj = document.getElementById("img");
	obj.style.left = event.x;
	obj.style.top  = event.y - 50;
}
 */
function change_html()
{
	var objs = document.getElementsByTagName("div")
	for (var i = 0; i < objs.length; i++){
		objs[0].innerHTML = "ttt"
	}
}

window.document.onclick = change_html;