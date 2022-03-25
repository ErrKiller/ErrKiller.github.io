/* window.onload=function(){

 } */
	//当前时间
	function dj(){
	var k=new Date();
	var tim=document.getElementById("ti");
	ti.style.cssText="text-align: center;";
	tim.innerHTML=k.getFullYear()+"年"+(k.getMonth()+1)+"月"+k.getDate()+"日"+k.getHours()+"时"+k.getMinutes()+"分"+k.getSeconds()+"秒";
	}
	setInterval(function(){dj();},1000);


//倒计时功能
//b为截至时间,格式为：2021/7/7
//软考倒计时
var showtime = function (b) {
    var nowtime = new Date(),  //获取当前时间
        endtime = new Date(b);  //定义结束时间
    var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
        leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        lefts = Math.floor(lefttime/1000%60);  //计算秒数
    return leftd + "天" + lefth + "时" + leftm + "分" + lefts+"秒";  //返回倒计时的字符串
}
var sysj = document.getElementById("djs");
setInterval (function () {
sysj.innerHTML=showtime("2022/12/20");
sysj.style.cssText="color:#ffffff;";
}, 1000);  //反复执行函数本身


//cet4倒计时
var cet4 = document.getElementById("cet4");
setInterval (function () {
cet4.innerHTML=showtime("2021/12/18");
cet4.style.cssText="color:#ffffff;";
}, 1000);  //反复执行函数本身
//son2(中间的区域)



//动效
//软考倒计时的
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  
  //logo
  // Wrap every letter in a span
  var textWrapper = document.querySelector('.ml6 .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
  anime.timeline({loop: true})
    .add({
      targets: '.ml6 .letter',
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 50 * i
    }).add({
      targets: '.ml6',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
	
	
