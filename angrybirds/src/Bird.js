/**
 * 小鸟类
 * @author Flashlizi 
 * @微博 http://t.sina.com.cn/flashlizi
 * @博客 http://www.riaidea.com
 * @CasualJS http://code.google.com/p/casualjs/
 */
 
Bird = function()
{
	Sprite.call(this);
	this.name = NameUtil.createUniqueName("Bird");

	//指示小鸟是否已准备发射
	this.ready = false;
	//指示小鸟是否已经死亡
	this.dead = false;
	//小鸟动画形象影片剪辑
	this._avatar = null;
	//小鸟动作种类
	this._motions = ["motion1","motion2", "jump", "rotate1", "rotate2"];
	//关闭mouse侦测,提高性能
	this.mouseEnabled = false;
	this.mouseChildren = false;
    //创建小鸟
	this._create();
}
casual.inherit(Bird, Sprite);


Bird.prototype._create = function()
{	
	//小鸟动画位图元素
	var bmp1 = new Bitmap(game.images[0].image,[50,0,47,45,23,22]);
	var bmp2 = new Bitmap(game.images[0].image,[105,45,47,43,23,22]);
	var bmp3 = new Bitmap(game.images[0].image,[98,0,47,45,23,22]);

	//初始化小鸟动画MC
	this._avatar = new MovieClip();
	
	//表情片段1
	this._avatar.addFrame(new Frame(bmp1, this._motions[0], null, 2));
	this._avatar.addFrame(new Frame(bmp2, null, null, 2));	
	this._avatar.addFrame(new Frame(bmp1, null, this._motions[0], 2, 1));
	
	//表情片段2
	this._avatar.addFrame(new Frame(bmp1, this._motions[1], null, 2));
	this._avatar.addFrame(new Frame(bmp3, null, null, 2));
	this._avatar.addFrame(new Frame(bmp1, null, this._motions[1], 2, 1));
	
	//跳跃片段
	this._avatar.addFrame(new Frame(bmp1, this._motions[2], null));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-10})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-15})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-20})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-25})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-30})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-35})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-40})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-30})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-20})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-10})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:0})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-10})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5})));
	this._avatar.addFrame(new Frame(bmp1, null, this._motions[2], 2, 1));

	//向前翻转片段
	this._avatar.addFrame(new Frame(bmp1, this._motions[3]));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:45})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:90})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:135})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:180})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:225})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:270})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:315})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:360})));
	this._avatar.addFrame(new Frame(bmp1, null, this._motions[3], 2, 1));

	//向后翻转片段
	this._avatar.addFrame(new Frame(bmp1, this._motions[4]));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:360})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:315})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:270})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:225})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:180})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:135})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:90})));
	this._avatar.addFrame(new Frame(casual.copy(bmp1, null, {y:-5, rotation:45})));
	this._avatar.addFrame(new Frame(bmp1, null, this._motions[4], 2, 1));
	
	//缩小小鸟到合适的尺寸
	this._avatar.scaleX = this._avatar.scaleY = 0.8;
	//让小鸟停止在第一帧
	this._avatar.stop();
	this.addChild(this._avatar);

    //显式的设置对象的高度和宽度
	this.width = this._avatar.getCurrentWidth();
	this.height = this._avatar.getCurrentHeight();
}

//控制小鸟随机运动的接口
Bird.prototype.animate = function()
{	
	//为避免小鸟运动过度，这里运用了随机数来控制小鸟运动频率
	var yes = Math.random() > 0.7;
	//如果小鸟已经在运动过程中，就不再继续执行
	if(!yes || !this._avatar._paused) return;
	//已经准备发射的小鸟不能跳跃和翻转，只能做做表情:)
	var labelIndex = 0;
	if(this.ready) labelIndex = Math.floor(Math.random()*2);
	else labelIndex = Math.floor(Math.random()*this._motions.length);
    //播放指定标签的帧
	this._avatar.gotoAndPlay(this._motions[labelIndex]);	
}

Bird.prototype.die = function()
{
	this.dead = true;
	if(this.parent) this.parent.removeChild(this);	
}