//获取所有的元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress =player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');
//执行函数

function togglePlay(){
    const method =video.paused?'play':'pause'
    //只有video.paused属性
    video[method]();
    //切换播放状态
}
//切换播放暂停案件
function updateButton(){
    const icon =this.paused?'▶':'⏸';
    console.log(icon);
    toggle.textContent=icon
}

//快进
function skip(){
    video.currentTime +=parseFloat(this.dataset.skip);
    //dataset.skip就是data-set
}

//快进的时候进度条更新
function handleProgress(){
    const percent =(video.currentTime/video.duration)*100;
    // console.log(percent)
    progressBar.style.flexBasis=`${percent}%`;
}
//调整播放速度和音量
function handleRangeUpdate(){
    // console.log(this.name);
    // console.log(this.value);
    video[this.name]=this.value;
}

function scrub(e){
    const scrubTime =(e.offsetX/progress.offsetWidth)*video.duration;
    //通过拖动来获取视频当前播放时间。
    video.currentTime= scrubTime
}


//监听事件

video.addEventListener('click',togglePlay);
//监听播放状态
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
//点击按钮时也会切换
toggle.addEventListener('click',togglePlay);
//
video.addEventListener('timeupdate',handleProgress);
//快进时间监听
skipButtons.forEach(button => button.addEventListener('click',skip));

//播放速度和音量调整
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

//拖动进度条
let mousedown =false;
progress.addEventListener('click',scrub);
//只有mousedown按下才能在mousemove时更新拖动条以及播放时间
progress.addEventListener('mousemove',(e)=>mousedown&&scrub(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);
