/**
 * 愤怒的小鸟 场景教学演示
 * @author Flashlizi
 * @微博 http://t.sina.com.cn/flashlizi
 * @博客 http://www.riaidea.com
 * @CasualJS http://code.google.com/p/casualjs/
 */

game = 
{
	images: null,
	canvas: null,
	context: null,
	stage: null,
	width: 0,
	height: 0,	
		
	birdContainer: null,	
	pigContainer: null,
	pathContainer: null,
	rightSling: null,
	leftSling: null,
	slingLineLeft: null,
	slingLineRight: null,
	dragBird: null,

	birds: [],
	pigs: [],
	animateTimer: null,
	
	originX: 0,
	originY: 0,
	startX: 0,
	startY: 0,
	groundY: 0,
	
	shotTarget: null,
	shotAngle: 0,
	speed: 100,
	speedFactor: 1.5,
	gravity: 10,
	shotTime: 0,
	timeFactor: 0.2,
	
	enableSound: true,
	bgSound: null,
	bgSoundURLs: ["sounds/title_theme.mp3", "sounds/title_theme.ogg"]
};

				
game.startup = function(res)
{
	this.images = [];
	var resources = res || ["images/all.png",
					"images/skin1.png",
					"images/ground1.png",
					"images/parallax1.png",
					"images/parallax2.png",
					"images/parallax3.png"];
	//图片素材加载器		
	var loader = new ImageLoader(resources);
	loader.addEventListener("loaded", this.onLoaded);
	loader.addEventListener("complete", this.onComplete);	
	loader.load();
	this.showProgress(0, resources.length, resources[0]);
}

game.onLoaded = function(e)
{
	//某一图片加载完成
	game.showProgress(e.target.getLoaded(), e.target.getTotal(), e.params.src);
}

game.onComplete = function(e)
{
	//全部素材加载完成
	e.target.removeEventListener("loaded", game.onLoaded);
	e.target.removeEventListener("complete", game.onComplete);
	document.getElementById("status").innerHTML = "";
	
	//保存位图
	game.images = e.params;
	//初始化游戏
	game.initGame();
}

game.showProgress = function(loaded, total, src)
{
	//显示加载进度
	var status = document.getElementById("status");
	status.innerHTML = "Loading resources, please wait...<br>";
	status.innerHTML += "(" + loaded + "/" + total + ") " ;
	status.innerHTML += src.substring(src.lastIndexOf("/") + 1);
}

game.initGame = function()
{	
	//初始化画布
	this.canvas = document.getElementById("canvas");
	this.canvas.oncontextmenu = function(){return false;};
	this.context = this.canvas.getContext("2d");	
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	
	//创建舞台
	this.stage = new Stage(this.context);
	this.stage.setFrameRate(25);
	this.stage.traceMouseTarget = false;
	
	//地面
	var img = this.images[2].image;
	this.groundY = img.height;
	var ground = new Shape();
	ground.graphics.setSize(this.width, img.height);
	ground.graphics.beginBitmapFill(img, "repeat-x");
	ground.graphics.drawRect(0, 0, this.width, img.height).endFill();
	ground.y = this.height - img.height;
	this.stage.addChild(ground);
	
	//天空背景
	img = this.images[1].image;
	var skin = new Shape();
	skin.graphics.setSize(this.width, img.height);
	skin.graphics.beginBitmapFill(img, "repeat-x");
	skin.graphics.drawRect(0, 0, this.width, img.height).endFill();
	skin.scaleY = (this.height - this.groundY) / img.height;
	this.stage.addChild(skin);
	
	//草皮1
	img = this.images[3].image;
	var grass = new Shape();
	grass.graphics.setSize(this.width, img.height);
	grass.graphics.beginBitmapFill(img, "repeat-x");
	grass.graphics.drawRect(0, 0, this.width, img.height).endFill();
	grass.y = this.height - this.groundY - img.height;
	grass.alpha = 0.8;
	this.stage.addChild(grass);
	
	//草皮2
	img = this.images[4].image;
	var grass = new Shape();
	grass.graphics.setSize(this.width, img.height);
	grass.graphics.beginBitmapFill(img, "repeat-x");
	grass.graphics.drawRect(0, 0, this.width, img.height).endFill();
	grass.y = this.height - this.groundY - img.height;
	grass.alpha = 1.0;
	this.stage.addChild(grass);	

	//草皮3
	img = this.images[5].image;
	var grass = new Shape();
	grass.graphics.setSize(this.width, img.height);
	grass.graphics.beginBitmapFill(img, "repeat-x");
	grass.graphics.drawRect(0, 0, this.width, img.height).endFill();
	grass.y = this.height - this.groundY - img.height + 6;
	grass.alpha = 1.0;
	this.stage.addChild(grass);

	//右发射器架
	this.rightSling = new Bitmap(game.images[0].image,[54,153,38,199]);
	this.rightSling.x = 200;
	this.rightSling.y = this.height - this.groundY - 158;
	this.rightSling.scaleX = this.rightSling.scaleY = 0.80;
	this.stage.addChildAt(this.rightSling, 4);
	
	//左发射器架
	this.leftSling = new Bitmap(game.images[0].image,[0,153,44,126]);
	this.leftSling.x = this.rightSling.x - 23;
	this.leftSling.y = this.rightSling.y - 5;
	this.leftSling.scaleX = this.leftSling.scaleY = 0.80;
	this.stage.addChild(this.leftSling);
	
	//发射原点
	this.originX = this.rightSling.x;
	this.originY = this.rightSling.y + 20;
	
	//装发射小鸟时的运动轨迹的容器
	this.pathContainer = new Sprite();
	this.stage.addChildAt(this.pathContainer, 5);
	
	//装小鸟的容器
	this.birdContainer = new Sprite();
	this.stage.addChildAt(this.birdContainer, 6);
	
	//装小猪的容器
	this.pigContainer = new Sprite();
	this.pigContainer.mouseEnabled = false;
	this.stage.addChildAt(this.pigContainer, 7);
	
	//初始化小鸟和小猪
	this.initBirds();
	this.initPigs();

	//让小鸟和小猪们动起来
	this.animateTimer = setInterval(casual.delegate(this.animate, this), 300);

	//预先准备好一只小鸟待射
	this.getBirdReady(0);

	//背景音乐
	var isGECKO = (/GECKO/).test(window.navigator.userAgent.toUpperCase());	
	if(isGECKO) 
	{
		this.bgSound = new Audio(this.bgSoundURLs[1], true, true);
		this.bgSound._element.addEventListener("ended", function(){this.play();}, false);
	}else 
	{
		this.bgSound = new Audio(this.bgSoundURLs[0], true, true);
	}
	
	//注册鼠标事件侦听器
	this.stage.addEventListener(StageEvent.ENTER_FRAME, casual.delegate(this.enterFrameHandler, this));	
	this.stage.addEventListener(StageEvent.MOUSE_DOWN, casual.delegate(this.mouseDownHandler, this));
	this.stage.addEventListener(StageEvent.MOUSE_MOVE, casual.delegate(this.mouseMoveHandler, this));
	this.stage.addEventListener(StageEvent.MOUSE_UP, casual.delegate(this.mouseUpHandler, this));
}

game.initBirds = function()
{
	//初始化4只小鸟，整装待发
	var num = 4;
	for(var i = 0; i < num; i++)
	{
		var bird = new Bird();	
		bird.x = 200 - 50*i;
		bird.y = this.height - this.groundY - 20;
		this.birdContainer.addChild(bird);
		this.birds.push(bird);
	}
}

game.initPigs = function()
{
	//初始化4只小猪，散布在地面上
	var num = 4;
	for(var i = 0; i < num; i++)
	{
		var pig = new Pig();	
		pig.x = 600 + 150*i;
		pig.y = this.height - this.groundY - 37;
		this.pigContainer.addChild(pig);
		this.pigs.push(pig);
	}
}

game.getBirdReady = function(index)
{
	if(index < 0 || index >= this.birds.length) return;
	
	//准备好小鸟，可以进行发射了。。。
	var bird = this.birds[index];	
	bird.mouseEnabled = true;
	bird.ready = true;
	bird.x = this.originX;
	bird.y = this.originY;
}

game.animate = function()
{	
	//给小鸟们和小猪们赋予随机动作
	for(var i = 0, len = this.birds.length; i < len; i++)
	{
		var bird = this.birds[i];
		bird.animate();
	}

	for(var i = 0, len = this.pigs.length; i < len; i++)
	{
		var pig = this.pigs[i];
		pig.animate();
	}
}

game.enterFrameHandler = function(e)
{
	if(this.shotTarget)
	{
		//检查小鸟是否落地
		if(this.shotTarget.y >= this.height - this.groundY - 20)
		{			
			//如果小鸟已经落地但未击中小猪，小鸟也会身亡。
			if(!this.shotTarget.dead)
			{
				this.birds.splice(this.birds.indexOf(this.shotTarget), 1);
				this.shotTarget.die();
			}
			//重新装弹，预备发射。。。
			this.shotTarget = null;
			this.getBirdReady(0);
			return;
		}
		
		//弹道抛物线轨迹方程
		this.shotTime += this.timeFactor;
		var x = this.speed*Math.cos(this.shotAngle)*this.shotTime + this.startX;
		var y = this.speed*Math.sin(this.shotAngle)*this.shotTime - (this.gravity*this.shotTime*this.shotTime)/2 - this.startY;

		this.shotTarget.x = x;
		//确保发射的小鸟不会落到地面以下
		this.shotTarget.y = Math.min(-y, this.height - this.groundY - 20);
		//绘制小鸟飞行轨迹
		this.drawPath(this.shotTarget.x, this.shotTarget.y);
		//检测小鸟是否击中小猪
		if(!this.shotTarget.dead) this.CheckCollision(this.shotTarget);
	}
}

game.drawPath = function(x, y)
{
	//绘制发射小鸟的抛物线轨迹
	var path = new Bitmap(this.images[0].image, [55,47,45,44,22,22]);
	path.scaleX = path.scaleY = this.pathContainer.getNumChildren()%2 ? 0.12 : 0.2;
	path.x = x;
	path.y = y;
	this.pathContainer.addChild(path);
}

game.CheckCollision = function(bird)
{
	//检测发射的小鸟是否与某只小猪有碰撞，有则玉石俱焚。
	for(var i = 0, len = this.pigs.length; i < len; i++)
	{
		var pig = this.pigs[i];
		if(bird.hitTestObject(pig))
		{
			this.pigs.splice(i, 1);
			this.birds.splice(this.birds.indexOf(bird), 1);
			pig.die();
			bird.die();
			return;
		}
	}
}

game.mouseDownHandler = function(e)
{
	var obj = this.stage.getObjectUnderPoint(e.mouseX, e.mouseY, true);
	//trace(obj);

	//按下鼠标，开始拖曳小鸟
	if((obj instanceof Bird) && obj.ready)
	{
		this.dragBird = obj;
	}
}

game.mouseMoveHandler = function(e)
{
	if(!this.dragBird) return;

	//限制拉动范围
	var mx = e.mouseX;
	var my = e.mouseY;
	var dx = mx - this.originX;
	var dy = my - this.originY;
	var distance = Math.sqrt(dx*dx + dy*dy);
	if(distance > 100) return;
	
	//发射器夹角范围内，限制垂直方向
	var angle = 180 / Math.PI * Math.atan2(dy, -dx);
	if(angle >= 80 && angle <= 115)
	{
		if(dy > 32) my = this.originY + 32;
	}	
	this.dragBird.x = mx;
	this.dragBird.y = my;
	
	//开始绘制发射器拉力带
	var bird = this.dragBird;
	if(!this.slingLineLeft) 
	{
		this.slingLineLeft = new Shape();
		this.slingLineRight = new Shape();
	}else 
	{
		this.slingLineLeft.graphics.clear();
		this.slingLineRight.graphics.clear();
	}
	
	//拉力带坐标
	var w = 5;		
	if(this.originX > bird.x) var endX = bird.x+w-15;
	else endX = bird.x+w+10;
	if(this.originY > bird.y) var endY = bird.y+w-10;
	else endY = bird.y+w+10;		
	
	//拉力带左边部分
	this.slingLineLeft.graphics.lineStyle(w, "#301708");
	this.slingLineLeft.graphics.beginPath();
	this.slingLineLeft.graphics.moveTo(this.originX+w-10, this.originY+w-5);
	this.slingLineLeft.graphics.lineTo(endX, endY);
	this.slingLineLeft.graphics.closePath();
	this.slingLineLeft.graphics.endFill();

	//拉力带右边部分
	this.slingLineRight.graphics.lineStyle(w, "#301708");
	this.slingLineRight.graphics.beginPath();
	this.slingLineRight.graphics.moveTo(endX, endY);
	this.slingLineRight.graphics.lineTo(this.originX+w+10, this.originY+w+2);
	this.slingLineRight.graphics.closePath();
	this.slingLineRight.graphics.endFill();
	
	//绘制发射拉力带
	this.stage.addChildAt(this.slingLineLeft, 7);
	this.stage.addChildAt(this.slingLineRight, 6);
}

game.mouseUpHandler = function(e)
{
	if(this.dragBird == null) return;
	
	//设置拖曳对象为发射对象，然后删除拖曳对象及发射器拉力带
	this.shotTarget = this.dragBird;
	this.dragBird = null;
	this.stage.removeChild(this.slingLineLeft);
	this.stage.removeChild(this.slingLineRight);	
	
	//发射起始坐标
	this.startX = this.shotTarget.x;
	this.startY = this.shotTarget.y;

	//计算发射角度和发射速度
	var dx = this.startX - this.originX;
	var dy = this.startY - this.originY;
	this.shotAngle = Math.atan2(dy, -dx);
	var distance = Math.sqrt(dx*dx + dy*dy);
	this.speed = distance*this.speedFactor;
	this.shotTime = 0;

	//清除上一次绘制的发射路线
	this.pathContainer.removeAllChildren();
}