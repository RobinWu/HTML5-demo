
ImageLoader = function(resources)
{
	casual.EventDispatcher.call(this);
	this.resources = resources;
	this.images = [];
	
	this._loaded = 0;
}
casual.inherit(ImageLoader, casual.EventDispatcher);

ImageLoader.load = function(resources, callback)
{
	var loader = new ImageLoader(resources, callback);
	loader.load();
}

ImageLoader.prototype.load = function()
{
	//load completely
	if(this._loaded > this.resources.length - 1)
	{
		this.dispatchEvent({type:"complete", target:this, params:this.images});
		return;
	}
	
	var img = new Image();
	img.onload = casual.delegate(this._loadHandler, this);
	img.src = this.resources[this._loaded];
}

ImageLoader.prototype._loadHandler = function(e)
{
	this.images.push({src: this.resources[this._loaded], image:e.target});
	this.dispatchEvent({type:"loaded", target:this, params:e.target});
	this._loaded++;
	this.load();
}

ImageLoader.prototype.getLoaded = function()
{
	return this.images.length;
}

ImageLoader.prototype.getTotal = function()
{
	return this.resources.length;
}

ImageLoader.prototype.isLoaded = function()
{
	return this.images.length == this.resources.length;
}