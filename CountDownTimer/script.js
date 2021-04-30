const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let countdown;
//获取所有元素

function timer(seconds) {
	//清除已有的计时器
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000; //结束时间
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//计时结束，那么取消
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		//显示时间
		displayTimeLeft(secondsLeft);
	}, 1000);
	// clear any existing timers
}

function startTime() {
	const seconds = parseInt(this.dataset.time); //获取按钮的秒数
	timer(seconds);
}
//显示剩余时间
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainerSeconds = seconds % 60;
	// 小于10的时候，添加一个0
	const display = `${minutes}:${
		remainerSeconds < 10 ? "0" : ""
	}${remainerSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}
//显示结束时间
function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	//习惯不同,我不需要
	// const adjustedHour =hour>12?hour-12:hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${hour}:${
		minutes < 10 ? "0" : ""
	}${minutes}`;
}

buttons.forEach((button) => button.addEventListener("click", startTime));

document.customForm.addEventListener("submit", function (e) {
	//防止重新渲染
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins * 60);
	//清除form的内容
	this.reset();
});
