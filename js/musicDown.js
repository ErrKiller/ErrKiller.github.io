$(document).ready(function() {
	$("#subPost").click(function() {
		let songName = $("#songName").val();
		if (songName == "") {
			$("#resShow").html('<h1 style="color:red;background-color: #ffff00;">输入为空,请重新输入</h1>');
			return;
		}
      //
		$.ajax({
			url:'https://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s= ' +
				songName + '&type=1&offset=0&total=true&limit=10',
			type: 'POST',
			dataType: "jsonp", //指定服务器返回的数据类型
			success: function(data) {
				data = JSON.parse(data);
				let code = data.code;
				if (parseInt(code) != 200) {
					$("#resShow").html(
						'<h1 style="color:red;background-color: #ffff00;">没有搜索结果，请稍后再试</h1>'
					);
					return;
				}
				//全部歌曲列表
				let songs = data.result.songs;
				let html =
					'<hr/><table class="table table-hover"> <tr><th>封面</th><th>歌曲</th><th>歌手</th></tr>';
				for (let i = 0; i <= songs.length; i++) {
					var songId = songs[i].id;
					var name = songs[i].name
					var author = songs[i].artists.name;
					var pic = songs[i].artists.img1v1Url;
					html += '<tr onclick="details(' + songId + ')"><td><img src="' + pic +
						'" alt="..." class="img-rounded"></td><td>' + name + '</td><td>' +
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
		//播放和下载
		function details(songId) {
			$.ajax({
				url: "https://yuanxiapi.cn/api/NetEaseCloud?id=" + songId,
				type: 'POST',
				dataType: 'jsonp', //这里修改成jsonp
				success: function(data) {
					console.log(data);
					//解析json
					data = JSON.parse(data);
					var code = data.code;
					var title = data.Song;
					var author = data.singer;
					var pic = data.Picture;
					var type = data.type;
					var resUrl = data.MusicLink;
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


	});

});
