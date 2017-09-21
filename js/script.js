//需找与数组相等的值函数
function arrIndexOf(arr,v)
{
	for(i=0;i<arr.length;i++){
		if(arr[i]==v){
			return i; //返回与目标值相等的数组的下标值
		}
	}
	return -1;
}

//addClass函数
function addClass(obj,className)
{
	if(obj.className==''){
		//如果原来没有class
		obj.className=className;
	}
	else{
		var arrClassName=obj.className.split(' ');
		var _index=arrIndexOf(arrClassName,className);
		if(_index == -1){
			//如果要添加的class在原来的class中不存在
			obj.className += ' ' + className;
		}
		//如果要添加的class在原来的class中存在,则不需要做任何事
	}
}

//removeClass函数
function removeClass(obj,className)
{
	//如果原来有class
	if(obj.className!=''){
		var arrClassName=obj.className.split(' ');
		var _index=arrIndexOf(arrClassName,className);
		if(_index != -1){
			arrClassName.splice(_index,1);  //删除需要删除的calss
			obj.className=arrClassName.join(' '); //然后将arrClassName数组拼接起来
		}
	}
}

// 全局变量
	// 获取box
var box = document.querySelector('.box'),
	// 获取ul
	screen = box.querySelector('.screen'),
	// 获取li
	screenItem = screen.getElementsByTagName("li"),
	// 获取显示器尺寸 offset属性，获取自身的宽高
	width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	height=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
	// 获取男孩元素
	boy = document.querySelector('.boy'),
	//获取测试按钮
	btn = document.querySelector('.button'),
	// 检测男孩是否有动画
	isWalking = true,
	// 获取第一屏太阳元素
	sun = document.querySelector('.screen-1__sun'),
	// 获取第一屏小云朵元素
	cloudSm = document.querySelector('.screen-1__cloud-1'),
	// 获取第一屏大云朵元素
	cloudBg = document.querySelector('.screen-1__cloud-2'),
	// 获取第二屏左边门
	doorLeft = document.querySelector('.screen-2__door-left'),
	// 获取第二屏右边门
	doorRight = document.querySelector('.screen-2__door-right'),
	// 获取女孩元素
	girl = document.querySelector('.screen-3__girl');

// 页面初始宽高设置
var screenDefault = (function(){
	// 设置box总宽度和高度
	box.style.width = width + 'px';
	box.style.height = height + 'px';
	// 设置ul总宽度和高度
	screen.style.width = (width * screenItem.length) + 'px';
	screen.style.height = height + 'px';
	// 设置每一个页面li的宽度
	for (var i = 0; i < screenItem.length; i++) {
	    screenItem[i].style.width = width + 'px';
	    screenItem[i].style.height = height + 'px';
	}
})();

// 主页面滚动函数
var screenScrollTo = function(x,time,delay){
	screen.style.transitionDuration = time + 'ms';
	screen.style.transitionDelay = delay + 'ms';
	screen.style.transform = 'translate3d(-' + x + 'px,0px,0px)';
	screen.style.webkitTransform = 'translate3d(-' + x + 'px,0px,0px)';
	screen.style.mozTransform = 'translate3d(-' + x + 'px,0px,0px)';
}

// 小男孩的初始位置函数
var boyPosition = (function(){
	// 设置男孩距离底部的位置
	var boyDefaultTop = height * 0.82 - boy.offsetHeight + 'px';
	boy.style.top =boyDefaultTop;
})();

// 小女孩的初始位置函数
var girlPosition = (function(){
	// 设置男孩距离底部的位置
	var girlDefaultTop = height * 0.72 - girl.offsetHeight + 'px';
	girl.style.top =girlDefaultTop;
})();

// 小男孩动画函数
var boyWalking = function(){
	addClass(boy,'boy_status_walking');
}

// 小男孩走路函数
var boyMoveTo = function(x,y,time){
	boy.style.transitionDuration = time + 'ms';
	boy.style.left = boy.offsetLeft + x + 'px';
	boy.style.top = boy.offsetTop + y + 'px';
}

// 小男孩停止走路函数
var boyStopWalking = function(){
	removeClass(boy,'boy_status_walking');
	removeClass(boy,'boy_status_flower');
}

// 太阳落山函数
var sunMove = function(){
	addClass(sun,'screen-1__sun_status_move');
}

// 云朵漂浮函数
var cloudMove = function(){
	addClass(cloudSm,'screen-1__cloud-1_status_move');
	addClass(cloudBg,'screen-1__cloud-2_status_move');
}

// 商店开门函数
var doorOpen = function(){
	//2s
	addClass(doorLeft,'screen-2__door-left_status_open');
	addClass(doorRight,'screen-2__door-right_status_open');
}

// 商店关门函数
var doorClose = function(){
	removeClass(doorLeft,'screen-2__door-left_status_open');
	removeClass(doorRight,'screen-2__door-right_status_open');
}

// 商店亮灯函数
var lampBright = function(){
	addClass(screenItem[1],'screen-2_status_bright');
}

// 商店灭灯函数
var lampDark = function(){
	removeClass(screenItem[1],'screen-2_status_bright');
}

// 进出商店
var shopIn = function(){
	var shopLeft = document.querySelector('.screen-2__shop').offsetLeft,
		shopTop = document.querySelector('.screen-2__shop').offsetTop,
		doorLeft = document.querySelector('.screen-2__door').offsetLeft,
		doorWidth = document.querySelector('.screen-2__door').offsetWidth,
		doorTop = document.querySelector('.screen-2__door').offsetTop,
		doorHeight = document.querySelector('.screen-2__door').offsetHeight,
		boyLeft = boy.offsetLeft,
		boyWidth = boy.offsetWidth,
		boyTop = boy.offsetTop,
		boyHeight = boy.offsetHeight,
		distanceX = doorLeft + shopLeft + doorWidth/2 - boyLeft - boyWidth/2,
		distanceY = doorTop + shopTop + doorHeight - (boyTop + boyHeight);
	// 男孩停止走路
	boyStopWalking();
	// 商店开门
	doorOpen();
	// 商店开门后亮灯，男孩进入
	setTimeout(function(){
		// 共用时2000ms
		lampBright();
		boyWalking();
		boyMoveTo(distanceX,distanceY,2000);
		boy.style.webkitTransform = 'scale(0.3,0.3)';
		boy.style.mozTransform = 'scale(0.3,0.3)';
		boy.style.transform = 'scale(0.3,0.3)';
		boy.style.opacity = '0';
	},2000)
	// 一秒之后男孩走出来
	setTimeout(function(){
		//小鸟动画
		var bird = document.querySelector('.screen-2__bird');
		addClass(bird,'screen-2__bird_status_fly');
		bird.style.webkitTransform = 'translate3d(-' + (width + 100) + 'px,0px,0px)';
		bird.style.mozTransform = 'translate3d(-' + (width + 100) + 'px,0px,0px)';
		bird.style.transform = 'translate3d(-' + (width + 100) + 'px,0px,0px)';
		// 共用时2000ms
		boy.style.backgroundPosition = '-150px -0px';
		boyStopWalking();
		boyMoveTo(0,-distanceY,2000);
		addClass(boy,'boy_status_flower');
		boy.style.webkitTransform = 'scale(1,1)';
		boy.style.mozTransform = 'scale(1,1)';
		boy.style.transform = 'scale(1,1)';
		boy.style.opacity = '1';
	},5000)
	// 商店关门关灯
	setTimeout(function(){
		// 共用时2000ms
		doorClose();
		setTimeout(lampDark,2000);
	},7000)
	//进出商店用时9s
}

// 飘花动画
// 图片路径
var snowURl = [
        './images/snowflake/snowflake1.png',
        './images/snowflake/snowflake2.png',
        './images/snowflake/snowflake3.png',
        './images/snowflake/snowflake4.png',
        './images/snowflake/snowflake5.png',
        './images/snowflake/snowflake6.png'
    ],
    snowIndex = 0;

// 飘花函数
function snowFloat() {

    // 随机六张图
    function getURL() {
        return snowURl[[Math.floor(Math.random() * 6)]];
    }
    // 创建一个雪花元素
    function createSnow() {
        var url = getURL();
        // 新建一个div
        var snowItem = document.createElement('div');
        snowItem.className = 'snow__item';
        snowItem.style.backgroundImage = 'url(' + url + ')';
        return snowItem;
    }
    // 开始飘花
    setInterval(function() {
        // 运动的轨迹
        var startPositionLeft = Math.random() * width,
            startOpacity    = 1,
            endPositionTop  = height - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration        = Math.random() * 5 + 5 + 's',
    		// 雪花容器
            snowBox         = document.querySelector('.snow') ;

        // 随机透明度，不小于0.5
        var randomStart = Math.floor(Math.random()*6+5)/10;

        // 创建一个雪花
        var newSnowItem = createSnow();

        // 设计起点位置
        newSnowItem.style.position = 'absolute';
        newSnowItem.style.left = startPositionLeft + 'px';
        newSnowItem.style.opacity = randomStart;

        // 加入到容器
        snowBox.appendChild(newSnowItem);

        // 开始执行动画
        newSnowItem.style.transitionDuration =duration;
        setTimeout(function(){
        	newSnowItem.style.left = endPositionLeft + 'px';
        newSnowItem.style.top = endPositionTop + 'px';
        newSnowItem.style.opacity = 0.7;
        },100)
        setTimeout(function(){
        	snowBox.removeChild(newSnowItem);
        },10000)
        
        
    }, 200);
}

// 音乐函数
var playMusic = function(){
	var audio1 = document.querySelector('.audio1'),
		audio2 = document.querySelector('.audio2');
	// 播放音乐1
	audio1.play();
	setTimeout(function(){
		// 暂停音乐1
		audio1.pause();
		// 播放音乐2
		audio2.play();
	},26000)
}

window.onload = function(){
	// 加入音乐
	playMusic();
	// 小男孩加入动画
	boyWalking();
	// 云朵加入动画
	cloudMove();
	// 太阳加入动画
	sunMove();
	// 小男孩3s走到相对商店位置
	// 截至目前，共用时3s
	boyMoveTo((width/2.2),0,3000);
	// 屏幕延迟3s后用时4s走到相对商店位置
	// 截至目前，共用时7s
	screenScrollTo(width,4000,3000);
	// 7s后男孩进入商店动画
	// 商店开门2s，男孩进入2s，男孩商店内停留1s，男孩出来2s，商店关门2s
	// 商店动画共用时9s
	// 截至目前，共用时16s
	setTimeout(shopIn,7000);
	// 16s后用时4s男孩走至桥前，屏幕移动到第三屏
	// 截至目前，共用时20s
	setTimeout(function(){
		boyMoveTo((-width*0.366),0,4000);
		screenScrollTo(width*2,4000,0);
	},16000);
	// 20s后用时1.5s男孩走至桥上
	// 截至目前，共用时21.5s
	setTimeout(function(){
		boyMoveTo((width*0.1),(girl.offsetTop-boy.offsetTop),1500);
	},20000);
	// 21.5s后用时2s男孩走至女孩面前
	// 截至目前，共用时23.5s
	setTimeout(function(){
		boyMoveTo((girl.offsetLeft-boy.offsetLeft-boy.offsetWidth*.5),0,2000);
	},21500);
	// 23.5s后男孩停止走路，并停留一秒
	// 截至目前，共用时24.5s
	setTimeout(function(){
		boyStopWalking();
	},23500);
	// 24.5s后用时1s男孩女孩转身
	// 截至目前，共用时25.5s
	setTimeout(function(){
		// 男孩转身
		addClass(boy,'boy_status_turn');
		//女孩转身
		addClass(girl,'screen-3__girl_status_turn');
	},24500);
	// 25.5s后开始飘花
	setTimeout(snowFloat,25500);
}

// H5+CSS3+原生JS七夕送发