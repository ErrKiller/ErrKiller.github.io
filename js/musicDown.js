/* 
 src： 音频文件的地址。
 trackName： 音频文件的名称。
 type： 音频文件的类型。
 preloadMessage： 加载时显示的文字信息。
 
 view： 音乐播放器的外观， 可以是 'basic'
 或 'minimal'。
 
 playerColor： 音乐播放器皮肤的颜色。 可以是单个颜色， 如playerColor: "black"，
 也可以设置多个颜色， 设置多个颜色时会以渐变的方式展现， 如： playerColor: "black, grey"。
 
 displayColor： 音乐播放器显示屏幕的颜色。 同样它可以是单个颜色， 或设置多个颜色。
  
  
  https://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s={搜索内容}&type=1&offset=0&total=true&limit=20
 limit：返回数据条数（每页获取的数量），默认为20，可以自行更改
 offset：偏移量（翻页），offset需要是limit的倍数
 
 type：搜索的类型
 
 type=1 单曲
 
 type=10 专辑
 
 type=100 歌手
 
 type=1000 歌单
 
 type=1002 用户
 
 type=1004 MV
 
 type=1006 歌词
 
 type=1009 主播电台
  */
$(document).ready(function() {
	//播放和下载
	details= function(obj) {
		var songId=$(obj).attr("songId");
				$.ajax({
					url: "https://errkiller-netmusic.vercel.app/song/url?id=" + songId,
					type: 'post',
					dataType:'json',
					success: function(data) {
						//解析json
						//data = JSON.parse(data);
						
						var title=$(obj).attr("name");
						var author=$(obj).attr("author");
						var pic=$(obj).attr("pic");
						var code = data.code;
						var resUrl = data.data[0].url;
						//渲染页面
						if (parseInt(code) == 200) {
							$("#songMess").empty();
							$("#songMess").append(
								'<hr/><a class="btn btn-lg  btn-success" href="' +
								resUrl + '" role="button">下载</a><h2>' + title +
								'</h2><h2>' +
								author +
								'</h2><img id="pic" class="featurette-image img-responsive center-block" alt="300x300" src="' +
								pic + '"data-holder-rendered="true">');
							//播放器的
							$("#player").vpplayer({
								src: resUrl,
								preloadMessage: "加载中......",
								trackName: "正在播放：" + title + ", 歌手：" + author,
							});
	
						} else {
							$("#resShow").html(
								'<h1 style="color:red;background-color: #ffff00;">暂未查询到信息</h1>'
							);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						// 状态码
						console.log(XMLHttpRequest.status);
						// 状态
						console.log(XMLHttpRequest.readyState);
						// 错误信息
						console.log(textStatus);
						$("#resShow").html(
							'<h1 style="color:red;background-color: #ffff00;">请求失败,请稍后再试</h1>'
						);
					}
				});
	
			}
	$("#subPost").click(function() {
		let songName = $("#songName").val();
		if (songName == "") {
			$("#resShow").html('<h1 style="color:red;background-color: #ffff00;">输入为空,请重新输入</h1>');
			return;
		}
      //
		$.ajax({
			url:'https://errkiller-netmusic.vercel.app/search?keywords= ' +
				songName + '&type=1&offset=0&total=true&limit=10',
			type:'POST',
			dataType: 'json',
			success: function(data) {
				let code = data.code;
				if (parseInt(code) != 200) {
					$("#resShow").html(
						'<h1 style="color:red;background-color: #ffff00;">没有搜索结果，请稍后再试</h1>'
					);
					return;
				}
				//全部歌曲列表
				let html =
					'<hr/><table class="table table-hover"> <tr><th>封面</th><th>歌曲</th><th>歌手</th></tr>';
				for (let i = 0; i < data.result.songs.length; i++) {
					var songId = data.result.songs[i].id;
					var name = data.result.songs[i].name
					var authors = data.result.songs[i].artists;
					var author="";
						for(let j=0;j<authors.length;j++){
							if(j==authors.length-1){
								author=author+authors[j].name;
							}
							else author=author+authors[j].name+"/";
						}
					var pic = data.result.songs[i].artists[0].img1v1Url;
					//var cs=songId+","+name+ ","+author+","+pic;
					html +='<tr  songId='+songId+' name='+name+' pic='+pic+' author='+author+' onclick="details(this)"><td><img src="' + pic +
						'" alt="666" height="140px" width="140px" class="img-rounded"></td><td>' + name + '</td><td>' +
						author + '</td></tr>';
				}
				html += '</table>';
				$("#songsList").empty();
				$("#songsList").append(html);

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				// 状态码
				console.log(XMLHttpRequest.status);
				// 状态
				console.log(XMLHttpRequest.readyState);
				// 错误信息
				console.log(textStatus);
				$("#resShow").html(
					'<h1 style="color:red;background-color: #ffff00;">请求失败</h1>');
			}
		});
		
		


	});

});
