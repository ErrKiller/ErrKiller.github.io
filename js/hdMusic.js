$(document).ready(function() {
	/* //百度统计
	let _hmt = _hmt || [];
	(function() {
		let hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?b2479f6a67589a424660fb68b42f95d2";
		let s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})(); */
	let details=function(mess,num){
			$("#loading").show(100);
			$.ajax({
			url: "https://xiaoapi.cn/API/yy_sq.php?msg=",
			type: "GET",
			data:{msg:mess,type:"josn",n:num},
			contentType:"application/json", //指定内容格式
			//dataType:"json",
			timeout:3000,
			success:function(data){
				
					//解析json
					//data = JSON.parse(data);
					let quality=data.quality;
					let title = data.name;
					let author = data.singer;
					let pic = data.cover;
					let code = data.code;
					let resUrl = data.url;
					//渲染页面
					if (resUrl == null) {
						$("#loading").remove();
						$("#resShow").html(
							'<h1 style="color:red;background-color: #ffff00;">资源获取失败，请稍后再试</h1>'
						);
				        return;
					}
					if (parseInt(code) == 200) {
						$("#loading").remove();
						$("#songMess").append(
							'<hr/><a class="btn btn-lg  btn-success" href="' +
							resUrl + '" role="button">下载</a></a><h2>' + title +
							'</h2><h2>' +
							author +
							'</h2><h3>' +
							quality +
							'</h3><img id="pic" class="featurette-image img-responsive center-block" alt="图片去了火星" src="' +
							pic + '"data-holder-rendered="true">');
						//播放器的
						$("#player").vpplayer({
							src: resUrl,
							preloadMessage: "加载中......",
							trackName: "正在播放：" + title + ", 歌手：" + author,
						});
						
					} else {
						$("#loading").remove();
						$("#resShow").html(
							'<h1 style="color:red;background-color: #ffff00;">资源获取失败，请稍后再试</h1>'
						);
					}
				
			},
			error:function(){
					// 状态码
					console.log(XMLHttpRequest.status);
					// 状态
					console.log(XMLHttpRequest.readyState);
					// 错误信息
					console.log(textStatus);
					$("#loading").remove();
					$("#resShow").html(
						'<h1 style="color:red;background-color: #ffff00;">请求失败,请稍后再试</h1>'
					);
				
			}
		});
		
		
	}

	$("#postBtn").click(function() {
		let song = $("#song").val().trim();
		let singer = $("#singer").val().trim();
		let mess = song + " " + singer;
		let index = $("#indexNum").val().trim();
		if (song == "") {
			alert("请输入歌曲名");
			return;
		}
		if (index == "") {
			index = 1;
		} else if (!/^[1-9]$|^([1-4]{1}[0-9]{1})$|^(50)$/.test(index)) {
			//1-200
			alert("请输入正确的序号范围：1~50");
			return;
		}
		details(mess,index);
	});
});
