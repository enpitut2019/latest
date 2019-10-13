function moveImg()
{
	var obj = document.getElementByClassName("facebook_link");
	obj.style.left = event.x;
	obj.style.top  = event.y;
}
window.document.onclick = moveImg;
