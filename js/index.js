$(function() {
	//当前时间
	function dj() {
		var k = new Date();
		var tim = document.getElementById("ti");
		ti.style.cssText = "text-align: center;";
		tim.innerHTML = k.getFullYear() + "年" + (k.getMonth() + 1) + "月" + k.getDate() + "日" + k.getHours() +
			"时" + k.getMinutes() + "分" + k.getSeconds() + "秒";
	}
	setInterval(function() {
		dj();
	}, 1000);

	//倒计时功能
	//b为截至时间,格式为：2021/7/7
	//2023考研倒计时
	let showtime = function(b) {
		var nowtime = new Date(), //获取当前时间
			endtime = new Date(b); //定义结束时间
		var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
			leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
			lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
			leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
			lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
		if (lefttime <= 0) {
			/* return "已结束：" + Math.abs(leftd) + "天" + +Math.abs(lefth) + "时" + +Math.abs(leftm) + "分" + Math .abs(lefts) + "秒";*/
			return "已结束";
		} else {
			return leftd + "天" + lefth + "时" + leftm + "分" + lefts + "秒"; //返回倒计时的字符串
		}

	}
	/**
	 * @param {Object} endTime:结束时间
	 * 时间格式 2022/2/22 10:15:22
	 */
	function stop(domId) {
		$('#' + domId + '_time').remove(200);
		$('#' + domId + '_message').append('<h3 style="color: #6A0834;">已结束</h3>');

	}

	/**
	 * 倒计时显示
	 * @param {Object} endTime
	 * @param {Object} domId
	 */
	function countDown(endTime, domId) {
		var now = new Date().getTime();
		var end = new Date(endTime).getTime();
		//过期不执行，跳过插件BUG
		if (now - end >= 0) {
			stop(domId);
			return;
		}
		//获取毫秒时间戳
		//设置时间格式的时钟
		var options = {
			value: new Date(endTime),
			captions: {
				days: '天',
				hours: '时',
				minutes: '分',
				seconds: '秒'
			},
			showDays: 3,
			onFinish: function() {
				stop(endTime)
			}
		};
		var ft = new FancyTimer(
			document.getElementById(domId + '_time'),
			options
		);
		ft.start(-1);

	}
	//"centerShow倒计时
	var centerShow_time = document.getElementById("centerShow_time");
	var centerShow_word = document.getElementById("centerShow_word");
	centerShow_time.style.cssText = "color:#ff1111;";
	centerShow_word.style.cssText = "color:#ffff00;";
	var endTime_center = $("#centerShow_time").attr("endTime");
	countDown(endTime_center, "centerShow");


	//leftShow倒计时
	var leftShow_time = document.getElementById("leftShow_time");
	var leftShow_word = document.getElementById("leftShow_word");
	leftShow_time.style.cssText = "color:#ffffff;";
	//var content_left=$("#rightShow_word").text();
	var endTime_left = $("#leftShow_time").attr("endTime");
	countDown(endTime_left, "leftShow");

	//rightShow倒计时
	var rightShow_word = document.getElementById("rightShow_word");
	var rightShow_time = document.getElementById("rightShow_time");
	rightShow_time.style.cssText = "color:#ffffff;";
	//var content_right=$("#rightShow_word").text();
	var endTime_right = $("#rightShow_time").attr("endTime");
	countDown(endTime_right, "rightShow");
	//son2(中间的区域)
	/**
	 * 单双周计算
	 * @param {Object} startDate：格式："2022/3/28"
	 * startWeekNum:开始的时间对应的周数,>=1
	 */
	function weekShow(startDate, startWeekNum) {
		//startWeekNum:开始的时间对应的周数,>=1
		startWeekNum = Number(startWeekNum);
		var endtime = new Date(); //获取当前时间
		var nowtime = new Date(startDate); //28,第五周,单周
		var lefttime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数
		var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)); //计算天数
		var ds = Math.floor(leftd / 7) % 2 == 0 ? "单周" : "双周";
		var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周";
		switch (endtime.getDay()) {
			case 0:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期天";
				break;
			case 1:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期一";
				break;
			case 2:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期二";
				break;
			case 3:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期三";
				break;
			case 4:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期四";
				break;
			case 5:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期五";
				break;
			case 6:
				var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期六";
				break;
		}
		$("#weekNumber").html(zs + "&nbsp;&nbsp;" + ds);
	}
	//渲染
	weekShow($("#weekNumber").attr("startDate"), $("#weekNumber").attr("startWeekNum"));
});
