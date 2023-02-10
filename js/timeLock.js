$(function() {

	/* 定义一个公共密钥 */
	const publicPwd = "U2FsdGVkX18tDyJeshG3zHdbbjl6MpuyYsT0malh7Dk=";
	const dbUrl = "../static/data.json";
	/* 时间输入 */
	new Rolldate({
		el: '#timeInput',
		format: 'YYYY-MM-DD hh:mm:ss',
		beginYear: 2023,
		endYear: 2100,
		init: function() {
			//console.log('插件开始触发');
		},
		moveEnd: function(scroll) {
			//console.log(scroll)
			//console.log('滚动结束');
		},
		confirm: function(date) {
			//确定按钮触发
			let now = new Date().getTime();
			let end = new Date(date).getTime();
			if (end < now + 60 * 1000) {
				alert("结束时间不能是过去的时间，且距离现在不能少于1分钟。请重新输入");
			}

			//时间戳转 日期
			//console.log('确定按钮触发');
		},
		cancel: function() {
			//console.log('插件运行取消');
		}
	});
	//ajax
	let ajax = function(url) {
		let res = null;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: "json",
			async: false,
			success: function(data) {
				res = data;
			},
		});
		return res;
	}

	/* 关于 */
	$("#aboutBtn").click(function() {
		//隐藏解锁
		$("#unLockDivs").hide(400);
		$("#lockDivs").hide(400);
		//显示关于div
		$("#helpDiv").toggle(400);
	});


	/* 加锁 */
	$("#lockBtn").click(function() {
		//隐藏解锁
		$("#unLockDivs").hide(400);
		$("#helpDiv").hide(400);
		//显示加锁div
		$("#lockDivs").toggle(600);
	});
	/* 加锁：监听下拉表变化 */
	$("#seeMethod").change(function() {
		let res = $("#seeMethod").val();
		if (res == "json") {
			$("#keyInput").removeAttr("disabled");
		} else {
			$("#keyInput").val("");
			$("#keyInput").attr("disabled", "disabled");
		}
	});
	/* 监听：key唯一性检测 */
	$("#keyInput").change(function() {
		let db = ajax(dbUrl);
		let seeMethod = $("#seeMethod").val();
		if (seeMethod == "") {
			$("#keyInput").val("");
			$("#keyInput").attr("disabled", "disabled");
			alert("请先选择加锁模式");
			return;
		}
		let key = $("#keyInput").val().trim();
		let flag1 = /^[A-Za-z0-9]{6,20}$/.test(key);
		let userArr = db.list;
		if (!flag1) {
			$("#keyInputTips").html("【key】规则：使用长度为【6~20】位的【数字，英文字母】组成的字符串，请检查你的输入");
			return;
		}
		for (let i = 0; i < userArr.length; i++) {
			if (userArr[i].key == CryptoJS.MD5(key).toString()) {
				$("#keyInputTips").html("key已经被使用，请换一个");
				$("#keyInput").val("");
				break;
			} else if (i == userArr.length - 1) {
				$("#keyInputTips").html("输入的key可用");
			}
		}
	});
	//加锁：获取数据
	$("#lockPostBtn").click(function() {
		//查看方法
		let seeMethod = $("#seeMethod").val();
		let key = $("#keyInput").val().trim();
		//key 校验
		let flag1 = /^[A-Za-z0-9]{6,20}$/.test(key);
		let time = $("#timeInput").val().trim();
		//时间校验
		let flag2 = true;
		let now = new Date().getTime();
		let end = new Date(time).getTime();
		if (time == "" || end < now + 60 * 1000) {
			flag2 = false;
		}
		let desc = $("#messInput").val().trim();
		//内容校验
		let flag3 = desc.length >= 1 && desc.length <= 1000;
		let tips = $("#tipsInput").val().trim();
		//提示校验
		let flag4 = tips.length >= 1 && tips.length <= 1000;
		//校验数据
		if (seeMethod == "") {
			alert("请选择加锁模式");
			return 0;
		} else if (seeMethod == "json" && !flag1) {
			alert("【key】规则：使用长度为【6~20】位的【数字，英文字母】组成的字符串，请检查你的输入");
			return 0;
		} else if (!flag2) {
			alert("【时间】规则：结束时间不能是过去的时间，且距离现在不能少于1分钟。请检查你的输入");
			return 0;
		} else if (!flag3) {
			alert("【内容】规则：使用长度为【1~1000】位的【任意字符】组成的字符串，请检查你的输入");
			return 0;
		} else if (!flag4) {
			alert("【未到期提示信息】规则：使用长度为【1~1000】位的【任意字符】组成的字符串，请检查你的输入");
			return 0;
		}
		//加密处理
		const obj = {
			key: key,
			time: time,
			createTime: new Date().toLocaleString(),
			desc: desc,
			tips: tips
		};
		//处理加密模式
		if (seeMethod == "url") {
			//加密
			const objstr = JSON.stringify(obj);
			console.log(objstr);
			let encrypted = CryptoJS.TripleDES.encrypt(objstr, publicPwd);
			let encrypedStr = encrypted.toString();
			console.log(encrypedStr);
			//返回结果
			let res = `${window.location.href}@@${encrypedStr}`;
			$("#lockResShowDiv").show(400);
			$("#lockResShow").html(res);
			window.location.href = "#lockResShow";
			return;
		} else if (seeMethod == "json") {
			//加密
			const objstr = JSON.stringify(obj);
			console.log(objstr);
			//采用公共密钥
			let encrypted = CryptoJS.TripleDES.encrypt(objstr, publicPwd);
			let encrypedStr = encrypted.toString();
			console.log(encrypedStr);
			//返回结果
			/* 
			此处可以提交到后端 
			*/
			const resObj = {
				key: CryptoJS.MD5(key).toString(),
				value: encrypedStr
			}
			$("#lockResShowDiv").show(400);
			$("#lockResShow").html(JSON.stringify(resObj));
			window.location.href = "#lockResShow";
		}
	});








	/* 		//解密
			let decrypted = CryptoJS.TripleDES.decrypt(encrypted.toString(), pass).toString(CryptoJS.enc.Utf8);
			console.dir(JSON.parse(decrypted));
			//返回JSON数据，便于存储
		 */
	/* 解锁 */
	$("#unLockBtn").click(function() {
		//隐藏加锁
		$("#lockDivs").hide(400);
		$("#helpDiv").hide(400);
		//显示解锁
		$("#unLockDivs").toggle(600);
	});
	//return :
	let jiemi = function(str, pass) {
		let decrypted = CryptoJS.TripleDES.decrypt(str, publicPwd).toString(CryptoJS.enc.Utf8);
		return decrypted;
	}


	//解锁点击
	$("#unLockPostBtn").click(function() {
		let userInputKey = $("#userKey").val().trim();
		//key 校验
		let flag1 = /^[A-Za-z0-9]{6,20}$/.test(userInputKey);
		if (!flag1) {
			alert("【key】不合法，请检查你的输入");
			return;
		}
		let db = ajax(dbUrl);
		console.log(db);
		let userInfo = null;
		if (db != null) {
			let userInputKeyMd5 = CryptoJS.MD5(userInputKey).toString();
			for (let i = 0; i < db.list.length; i++) {
				if (db.list[i].key == userInputKeyMd5) {
					userInfo = jiemi(db.list[i].value, publicPwd);
				} else if (i == (db.list.length - 1) && userInputKeyMd5 != db.list[i].key) {
					alert("你输入的key不存在，请检查");
					return;
				}
			}

		} else {
			alert("数据库为空");
			return;
		}
		let {
			key,
			desc,
			time,
			createTime,
			tips
		} = JSON.parse(userInfo);
		//显示信息
		let now = new Date().getTime();
		let end = new Date(time).getTime();
		let html = null;
		if (now < end) {
			html =
				`<h2>目前还未到达查看时间，请在<span style="color:#ee1111">【${time}】</span>后，再来查看。</h2><h2>但此刻ta想对你说：<textarea style="color:red;font-size:30px;" class="form-control" rows="5"  readonly>${tips}</textarea></h2>`;
		} else {
			html =
				`
				<h2>key:<span style="color:#ee1111">【${key}】</span></h2><h2>ta写的时间:<span style="color:#ee1111">【${createTime}】</span><br/>ta写的内容:<textarea style="color:red;font-size:30px;" class="form-control" rows="5"  readonly>${desc}</textarea></h2>
				`;
		}
		$("#unLockResShowDiv").show(400);
		$("#unLockResShowDiv div").html(html);
	});


	/* 执行链接检查 */
	let chekeUrl = function() {
		let url = window.location.href;
		let flag = url.includes("@@");
		let resStr = null;
		if (flag) {
			resStr = url.split("@@")[1];
			if (resStr != "") {
				resStr = jiemi(resStr, publicPwd);
			} else {
				return;
			}
			let {
				key,
				desc,
				time,
				createTime,
				tips
			} = JSON.parse(resStr);
			//显示信息
			let now = new Date().getTime();
			let end = new Date(time).getTime();
			let html = null;
			if (now < end) {
				html =
					`<h2>目前还未到达查看时间，请在<span style="color:#ee1111">【${time}】</span>后，再来查看。</h2><h2>但此刻ta想对你说：<textarea style="color:red;font-size:30px;" class="form-control" rows="5"  readonly>${tips}</textarea></h2>`;
			} else {
				html =
					`
					<h2>ta写的时间:<span style="color:#ee1111">【${createTime}】</span></h2><h2>ta写的内容:<textarea style="color:red;font-size:30px;" class="form-control"  rows="5"  readonly>${desc}</textarea></h2>
					`;
			}
			//隐藏加锁
			$("#lockDivs").hide(400);
			$("#helpDiv").hide(400);
			$("#unLockDivs").show(600);
			$("#unLockResShowDiv").show(400);
			console.log(html);
			$("#unLockResShowDiv div").html(html);
		} else {
			return;
		}

	};
	setTimeout(chekeUrl, 2000);
});
