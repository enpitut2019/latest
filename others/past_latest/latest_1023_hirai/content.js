//window.alert('アプリ開いたね！');
//var add = document.getElementsByTagName("body")
//var add = document.getElementsByTagName('div')
//add[0].insertHTML = ('<img src="images/ball.png" id="img" name="myIMG" style="position:absolute;">')
//document.getElementsByTagName("h1").insertHTML = ('<p>こんにちは</p>')

function moveImg()
{
	//window.alert('ここまでは動くよ');
	//var obj = document.getElementByClassName("myIMG");
	var greet = document.getElementsByTagName('div')
	//great[0].insertHTML = '<img src="ball.gif" id="img" name="myIMG" style="position:absolute;">'
	//great[0].insertHTML = '<h1>こんにちは～～</h1>'
	var padd = document.getElementsByTagName("img")
	var pid = document.getElementById("img")
	var imgadd = document.getElementsByClassName("myIMG")
	var num = padd.length;
	var greet = document.getElementsByTagName('div')
	//var greet = document.getElementsByTagName('body')
	greet[0].innerHTML = '<img src="ball.gif" id="img" name="myIMG" style="position:absolute;">'
	//greet[0].insertAdjacentHTML = ('afterbegin','<img src="ball.gif" id="img" name="myIMG" style="position:absolute;">')
	moving = document.getElementById("img")
	moving.style.left = event.x;
	moving.style.top  = event.y;
	//var add = document.getElementsByTagName('div')
	//var pnum = pid.length;
	//var pid = 
	//window.alert('この文書には ' + num + ' 個の段落があります');
}
window.document.onclick = moveImg;
