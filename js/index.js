$(function() {function dj() {var k = new Date();var tim = document.getElementById("ti");ti.style.cssText = "text-align: center;";tim.innerHTML = k.getFullYear() + "年" + (k.getMonth() + 1) + "月" + k.getDate() + "日" + k.getHours() + "时" + k.getMinutes() + "分" + k.getSeconds() + "秒"};setInterval(function() {dj()}, 1000);let showtime = function(b) {var nowtime = new Date(),endtime = new Date(b);var lefttime = endtime.getTime() - nowtime.getTime(),leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),leftm = Math.floor(lefttime / (1000 * 60) % 60),lefts = Math.floor(lefttime / 1000 % 60);if (lefttime <= 0) {return "已结束"} else {return leftd + "天" + lefth + "时" + leftm + "分" + lefts + "秒"}};function stop(domId) {$('#' + domId + '_time').remove(200);$('#' + domId + '_message').append('<h3 style="color: #6A0834;">已结束</h3>')};function countDown(endTime, domId) {var now = new Date().getTime();var end = new Date(endTime).getTime();if (now - end >= 0) {stop(domId);return}var options = {value: new Date(endTime),captions: {days: '天',hours: '时',minutes: '分',seconds: '秒'},showDays: 3,onFinish: function() {stop(endTime)}};var ft = new FancyTimer(document.getElementById(domId + '_time'), options);ft.start(-1);};var centerShow_time = document.getElementById("centerShow_time");var centerShow_word = document.getElementById("centerShow_word");centerShow_time.style.cssText = "color:#ff1111;";centerShow_word.style.cssText = "color:#ffff00;";var endTime_center = $("#centerShow_time").attr("endTime");countDown(endTime_center, "centerShow");var leftShow_time = document.getElementById("leftShow_time");var leftShow_word = document.getElementById("leftShow_word");leftShow_time.style.cssText = "color:#ffffff;";var endTime_left = $("#leftShow_time").attr("endTime");countDown(endTime_left, "leftShow");var rightShow_word = document.getElementById("rightShow_word");var rightShow_time = document.getElementById("rightShow_time");rightShow_time.style.cssText = "color:#ffffff;";var endTime_right = $("#rightShow_time").attr("endTime");countDown(endTime_right, "rightShow");function weekShow(startDate, startWeekNum) {startWeekNum = Number(startWeekNum);var endtime = new Date();var nowtime = new Date(startDate);var lefttime = endtime.getTime() - nowtime.getTime();var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24));var ds = Math.floor(leftd / 7) % 2 == 0 ? "单周" : "双周";var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周";switch (endtime.getDay()) {case 0:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期天";break;case 1:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期一";break;case 2:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期二";break;case 3:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期三";break;case 4:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期四";break;case 5:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期五";break;case 6:var zs = "第" + (startWeekNum + Math.floor(leftd / 7)) + "周&nbsp;星期六";break}$("#weekNumber").html(zs + "&nbsp;&nbsp;" + ds)};weekShow($("#weekNumber").attr("startDate"), $("#weekNumber").attr("startWeekNum"))});
