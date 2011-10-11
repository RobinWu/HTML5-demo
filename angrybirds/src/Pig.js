/**
 * 小猪类
 * @author Flashlizi 
 * @微博 http://t.sina.com.cn/flashlizi
 * @博客 http://www.riaidea.com
 * @CasualJS http://code.google.com/p/casualjs/
 */
 
Pig = function()
{
	Sprite.call(this);
	this.name = NameUtil.createUniqueName("Pig");
	
	this.ready = false;
	this.dead = false;
	
	this._avatar = null;
	this.mouseEnabled = false;
	this.mouseChildren = false;

	this._create();
}
casual.inherit(Pig, Sprite);


Pig.prototype._create = function()
{
	this._avatar = new MovieClip();

	//小猪动画帧
	var bmp1 = new Bitmap(game.images[0].image,[0,0,48,45]);
	var bmp2 = new Bitmap(game.images[0].image,[0,47,48,45]);
	
	this._avatar.addFrame(new Frame(bmp1, null, null, 2));
	this._avatar.addFrame(new Frame(bmp2, null, null, 2));
	this._avatar.addFrame(new Frame(bmp1, null, null, 2, 1));
	
	//小猪死亡图片及帧
	var bmp3 = new Bitmap(game.images[0].image,[217,0,126,120,63,60]);
	var bmp4 = new Bitmap(game.images[0].image,[113,147,128,123,64,61]);
	var bmp5 = new Bitmap(game.images[0].image,[274,141,143,138,71,69]);

	this._avatar.addFrame(new Frame(bmp3, "die", null, 1));
	this._avatar.addFrame(new Frame(bmp4, null, null, 1));
	this._avatar.addFrame(new Frame(bmp5, null, null, 1));
	this._avatar.addFrame(new Frame(casual.copy(bmp5, null, {alpha:0.7}), null, null, 1));
	this._avatar.addFrame(new Frame(casual.copy(bmp5, null, {alpha:0.4}), null, null, 1));
	this._avatar.addFrame(new Frame(casual.copy(bmp5, null, {alpha:0.1}), null, null, 1, 1));
	
	this._avatar.scaleX = this._avatar.scaleY = 0.8;
	this._avatar.stop();
	this.addChild(this._avatar);

    //显式的设置对象的高度和宽度
	this.width = this._avatar.getCurrentWidth();
	this.height = this._avatar.getCurrentHeight();
}

Pig.prototype.animate = function()
{	
	var yes = Math.random() > 0.7;
	if(!yes || !this._avatar._paused) return;

	this._avatar.gotoAndPlay(1);	
}

Pig.prototype.die = function()
{	
	if(this._avatar.currentFrame >= 4) return;
	this.dead = true;
	this._avatar.gotoAndPlay("die");
}