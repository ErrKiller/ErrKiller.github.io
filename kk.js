window.onload=function(){
	let son2=document.getElementById("son2");
	son2.onclick=function(){
		let son2pic=document.getElementById("son2pic");
		let tpsx=son2pic.getAttribute("src");
		son2pic.onclick=function(){
			if(tpsx=="img/pic2.jpg")
			son2pic.setAttribute("src","img/pic5.jpg");
			else if(tpsx=="img/pic5.jpg"){son2pic.setAttribute("src","img/pic2.jpg");}
		}
	}
	let dw=document.getElementById("dingwei");
	dw.onclick=function(){
		dw.setAttribute("href","#logo")
	}
	// function lunbo(){
	// 	var img=document.getElementById("img");
	// 	var tu=["img/1.png","img/2.png","img/3.png"];
	// 	for(var k=0;k<tu.length;k++){
	// 		img.setAttribute("src",tu[k]);
	// }
	// }
	function dj(){
	var k=new Date();
	var tim=document.getElementById("ti");
	ti.style.cssText="text-align: center;";
	tim.innerHTML=k.getFullYear()+"年"+(k.getMonth()+1)+"月"+k.getDate()+"日"+k.getHours()+"时"+k.getMinutes()+"分"+k.getSeconds()+"秒";
	}
	setInterval(function(){dj();},1000);
}

var k=0;
function lb(){
	var lbo=document.getElementById("img");
	var lj=["img/pic1.jpg","img/pic2.jpg","img/pic3.jpg"];
	
	if(k<3){
		lbo.setAttribute("src",lj[k]);
		k++;
	}
	else if(k>=3){
		k=0;
		lbo.setAttribute("src",lj[k]);
		k++;
	}
}
setInterval(lb,4000);
