$(function(){
	let url = window.location.href;
	if (url.includes("errkiller.github.io")) {
		url = "errkiller.github.io";
	} else if (url.includes("errkiller.pages.dev")) {
		url = "errkiller.pages.dev";
	}
	switch (url) {
		case "errkiller.github.io": {
			let flag=confirm("为了获得更好的体验，本站已启动高速站点，是否切换到高速站点？");
			if(flag==true){
				window.location.href="https://errkiller.pages.dev";
				return;
			}
			//百度统计
			(function() {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?b2479f6a67589a424660fb68b42f95d2";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			})();
			break;
		}
		case "errkiller.pages.dev": {
			//百度统计
			(function() {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?41f4a1beb687ae9d803b9156fd45abf1";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			})();
			break;
		}
		default:{
			console.log("none");
			}
	}
});


