Function.prototype.method = function(a,b){
  if(!this.prototype[a])this.prototype[a] = b;
  return this
};
Object.beget = function(b){
  var a = function(){
    
  };
  a.prototype = b;
  return new a
};
Object.merge = function(c,a){
  for(var b in a)if(a.hasOwnProperty(b))c[b] = a[b];
  return c
};
Function.method("inherit",function(a){
  this.prototype = Object.beget(a.prototype);
  this.prototype.constroctor = this
});
Object.createClass = function(a){
  var b = a.cfn||function(){
    
  };
  if(a){
    a.parent&&b.inherit(a.parent);
    a.numbers&&Object.merge(b.prototype,a.numbers)
  }return b
};
var Interface = function(c,b){
  this.name = c;
  this.methods = [];
  for(var a = 0,d = b.length;
  a<d;
  a++)this.methods.push(b[a])
};
Object.method("ensureImplements",function(){
  var c = this;
  if(typeof this === "function")c = this.prototype;
  for(var d = 0,g = arguments.length; d<g; d++){
    var a = arguments[d];
    if(a.constructor !== Interface)
      throw new Error("Function Interface.ensureImplements expects argumentstwo and above to be instances of Interface.");

    for(var e = 0,f = a.methods.length; e<f; e++){
      var b = a.methods[e];

      if(!c[b]||typeof c[b]!== "function")
        throw new Error("function Interface.ensureImplements :  object does not implement the "+a.name+" interface. Method "+b+" was not found.");
    }
  }return true
});
Array.isArray = function(a){
  return a&&typeof a === "object"&&typeof a.length === "number"&&typeof a.splice === "function"&&!a.propertyIsEnumerable("length")
};
Array.method("forEach",function(b,c){
  var d = this.length>>>0;
  if(typeof b!= "function")throw new TypeError;
  for(var c = arguments[1],a = 0;
  a<d;
  a++)a in this&&b.call(c,this[a],a,this)
});
Array.method("indexOf",function(c,a){
  var b = this.length>>>0,a = Number(arguments[1])||0;
  a = a<0 ? Math.ceil(a) : Math.floor(a);
  if(a<0)a+= b;
  for(;
  a<b;
  a++)if(a in this&&this[a] === c)return a;
  return-1
});
Array.method("draw",function(a){
  this.forEach(function(b){
    b.draw(a)
  })
});
Array.method("update",function(){
  this.forEach(function(a){
    a.update()
  })
});
Array.method("addNew",function(a){
  this.indexOf(a) == -1&&this.push(a)
});
Array.method("delEle",function(a){
  var b = this.indexOf(a);
  this.indexOf(a)!= -1&&this.splice(b,1)
});
Array.method("randomEle",function(){
  return this[Math.floor(Math.random()*this.length)]
});
Math.distance = function(c,e,d,f){
  var a = d-c,b = f-e;
  return Math.sqrt(a*a+b*b)
};
Math.randomNum = function(a){
  return Math.floor(Math.random()*a)
};
Math.compend = function(a,b){
  return a>= Math.floor(Math.random()*b)
};
var GCanvas = Object.createClass({
  cfn : function(a){
    this._canvas = a;
    this._ctx = a.getContext("2d");
    this._layers = [];
    this.width = a.width;
    this.height = a.height
  },numbers : {
    addLayer : function(a){
      this._layers.addNew(a)
    },removeLayer : function(a){
      this._layers.delEle(a)
    },removeLayerByName : function(b){
      for(var a = 0;
      a<this._layers.length;
      a++)if(this._layers[a].name === b){
        this._layers.splice(a,1);
        return true
      }
    },removeAllLayers : function(){
      this._layers = [];
      while(this._layers[0])this._layers.splice(0,1)
    },getLayer : function(a){
      return this._layers[a]
    },getLayerByName : function(b){
      for(var a = 0;
      a<this._layers.length;
      a++)if(this._layers[a].name === b)return this._layers[a];
      return false
    },setBg : function(a){
      this._canvas.style.background = a
    },setSize : function(b,a){
      this._canvas.width = b;
      this._canvas.height = a;
      this.width = b;
      this.height = a
    },eraseAll : function(){
      this._ctx.clearRect(0,0,this.width,this.height)
    },getCtx : function(){
      return this._ctx
    },render : function(){
      this.eraseAll();
      this._layers.draw(this)
    },_getPointPos : function(b){
      var a = this._canvas,c = a.offsetLeft,d = a.offsetTop;
      while(a.offsetParent){
        a = a.offsetParent;
        c+= a.offsetLeft;
        d+= a.offsetTop
      }return{
        x : b.clientX-c,y : b.clientY-d
      }
    },getPointObj : function(a){
      var b = this._getPointPos(a);
      return false
    },addEventListener : function(a,b){
      this._canvas.addEventListener(a,b,false)
    }
  }
}),GLayer = Object.createClass({
  cfn : function(a){
    this.name = a;
    this.objs = []
  },numbers : {
    addChild : function(a){
      this.objs.addNew(a)
    },removeChild : function(a){
      this.objs.delEle(a)
    },empty : function(){
      while(this.objs[0])this.objs.splice(0,1)
    },draw : function(a){
      this.objs.draw(a)
    },update : function(a){
      this.objs.update(a)
    },size : function(){
      return this.objs.length
    },getChild : function(a){
      return this.objs[a]
    },getChildByName : function(b){
      for(var a = 0;
      a<this.objs.length;
      a++)if(this.objs[a].name === b)return this.objs[a];
      return false
    },removeAll : function(){
      this.empty()
    }
  }
}),GAnimate = Object.createClass({
  cfn : function(a){
    this._frames = a;
    this.frames = a.length;
    this.currentFrame = 0;
    this._step = 0
  },numbers : {
    play : function(){
      if(this._step<this._frames[this.currentFrame].frame)this._step++;
      else{
        this.nextFrame();
        this._step = 0
      }
    },nextFrame : function(){
      if(this.currentFrame<this.frames-1)this.currentFrame++;
      else this.currentFrame = 0
    },getTilesIndex : function(){
      return this._frames[this.currentFrame].tilesIndex
    }
  }
}),GTile = Object.createClass({
  cfn : function(c,d,e,b,a){
    this.img = c;
    this.sx = d;
    this.sy = e;
    this.tileWidth = b;
    this.tileHeight = a
  },numbers : {
    draw : function(a,b,c){
      a._ctx.drawImage(this.img,this.sx,this.sy,this.tileWidth,this.tileHeight,b,c,this.tileWidth,this.tileHeight)
    },setTile : function(){
      
    }
  }
}),GATileGroup = Object.createClass({
  numbers : {
    getTile : function(a){
      var b = a<0 ? 0 : a>this._tiles.length-1 ? this._tiles.length-1 : a;
      return this._tiles[b]
    },size : function(){
      return this._tiles.length
    }
  }
}),GTiles = Object.createClass({
  cfn : function(d,e,a,c,f,g){
    this._tiles = [];
    this._index = 0;
    this.width = a;
    this.height = a;
    for(var b = 0;
    b<e;
    b++)this._tiles.push(new GTile(d,b*a+f,g,a,c))
  },parent : GATileGroup,numbers : {
    setTile : function(a){
      this._index = a
    },getCurrentTile : function(){
      return this._tiles[this._index]
    },draw : function(b,c,d){
      var a = this._tiles[this._index];
      a.draw(b,c,d)
    },concat : function(a){
      this._tiles = this._tiles.concat(a._tiles)
    }
  }
}),GTilesAnimate = Object.createClass({
  cfn : function(e,b,a,d,f,g){
    this.animate = b;
    this.width = a;
    this.height = a;
    if(b.constructor!== GAnimate)this.animate = new GAnimate(b);
    this._tiles = [];
    for(var c = 0;
    c<this.animate.frames;
    c++)this._tiles.push(new GTile(e,(this.animate._frames[c].tilesIndex-1)*a+f,g,a,d))
  },parent : GATileGroup,numbers : {
    play : function(){
      this.animate.play()
    },getCurrentTile : function(){
      return this._tiles[this.animate.currentFrame]
    },setTile : function(a){
      var b = a<0 ? 0 : a>this._tiles.length-1 ? this._tiles.length-1 : a;
      while(this.animate.currentFrame!== b)this.play()
    },stop : function(){
      this.stoped = true
    },stopAt : function(a){
      this.setTile(a);
      this.stoped = true
    },draw : function(a,b,c){
      !this.stoped&&this.play();
      this.getCurrentTile().draw(a,b,c)
    }
  }
}),GSpriteTile = Object.createClass({
  cfn : function(a,c,d,b){
    this.tiles = a;
    this.x = c;
    this.y = d;
    this.width = a.width;
    this.height = a.height;
    this.state = b||0
  },numbers : {
    draw : function(a){
      this.tiles.setTile(this.state);
      this.tiles.draw(a,this.x,this.y)
    }
  }
}),GShape = Object.createClass({
  numbers : {
    setColor : function(a){
      this._color = a
    },setBorder : function(a,b){
      if(a === "none")this.hasBorder = false;
      else{
        this._border = a;
        this._bw = b||1
      }
    }
  }
}),GCircle = Object.createClass({
  cfn : function(a,b,c){
    this.x = b||0;
    this.y = c||0;
    this.r = a||20;
    this.hasBorder = true;
    this._color = "#000";
    this._border = "#000";
    this._bw = 1
  },parent : GShape,numbers : {
    draw : function(a){
      a._ctx.save();
      a._ctx.fillStyle = this._color;
      a._ctx.strokeStyle = this._border;
      a._ctx.lineWidth = this._bw;
      a._ctx.beginPath();
      a._ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
      a._ctx.closePath();
      a._ctx.fill();
      this.hasBorder&&a._ctx.stroke();
      a._ctx.restore()
    },atPoint : function(a){
      var b = this.hasBorder ? this.r+this._bw/2 : this.r;
      return Math.distance(this.x,this.y,a.x,a.y)<= b ? true : false
    }
  }
}),GRect = Object.createClass({
  cfn : function(c,d,b,a){
    this.x = c||0;
    this.y = d||0;
    this.width = b||20;
    this.height = a||20;
    this.hasBorder = true;
    this._color = "#000";
    this._border = "#000";
    this._bw = 1
  },parent : GShape,numbers : {
    draw : function(a){
      a._ctx.save();
      a._ctx.fillStyle = this._color;
      a._ctx.strokeStyle = this._border;
      a._ctx.lineWidth = this._bw;
      a._ctx.fillRect(this.x,this.y,this.width,this.height);
      this.hasBorder&&a._ctx.strokeRect(this.x,this.y,this.width,this.height);
      a._ctx.restore()
    },atPoint : function(a){
      var b = this.hasBorder ? this._bw/2 : 0;
      return a.x>= this.x-b&&a.x<= this.x+this.width+b&&a.y>= this.y-b&&a.y<= this.y+this.height+b ? true : false
    }
  }
}),GText = Object.createClass({
  cfn : function(c,d,b,a){
    this.x = c||0;
    this.y = d||0;
    this.text = b||"";
    this.color = a||"#000"
  },numbers : {
    draw : function(a){
      a._ctx.save();
      a._ctx.fillStyle = this.color;
      a._ctx.fillText(this.text,this.x,this.y);
      a._ctx.restore()
    },atPoint : function(){
      return false
    }
  }
}),GTilesMap = Object.createClass({
  cfn : function(a,b,c){
    this.map = a;
    this.tw = c;
    this.tmap = this.createTmap(b,a)
  },numbers : {
    draw : function(c){
      for(var a = 0;
      a<this.tmap.length;
      a++)for(var b = 0;
      b<this.tmap[a].length;
      b++)this.tmap[a][b]&&this.tmap[a][b].draw(c)
    },atPoint : function(){
      return false
    },createTmap : function(e,c){
      for(var d = [],a = 0;
      a<c.length;
      a++){
        d[a] = [];
        for(var b = 0;
        b<c[a].length;
        b++)if(c[a][b]&&c[a][b]!== spaceTile)d[a][b] = new GSpriteTile(e,b*this.tw,a*this.tw,c[a][b])
      }return d
    }
  }
}),preLoadImgs = [{
  url : "img/logo.png",name : "logo"
},{
  url : "img/loadbar.png",name : "loadbar"
}],pimgs = {
  
},gimgSrouce = [{
  url : "img/title.png",name : "title",size : 154
},{
  url : "img/bg.png",name : "bg",size : 154
},{
  url : "img/tiles.png",name : "tiles",size : 15
},{
  url : "img/pause.png",name : "puaseText",size : 5
}],gsoundSrouce = [{
  url : "sound/start.ogg",name : "start",size : 71
},{
  url : "sound/shoot.ogg",name : "shoot",size : 8
},{
  url : "sound/item.ogg",name : "item",size : 10
},{
  url : "sound/getItem.ogg",name : "getItem",size : 16
},{
  url : "sound/gameover.ogg",name : "gameover",size : 38
},{
  url : "sound/eleveldown.ogg",name : "eleveldown",size : 8
},{
  url : "sound/edie.ogg",name : "edie",size : 10
},{
  url : "sound/die.ogg",name : "die",size : 15
},{
  url : "sound/bulletOut.ogg",name : "bulletOut",size : 9
},{
  url : "sound/move.ogg",name : "move",size : 13
},{
  url : "sound/up.ogg",name : "up",size : 24
}],enableSound = true,Direction = {
  UP : 0,DOWN : 2,LEFT : 3,RIGHT : 1,SSTAR : 4,LSTAR : 5
},Tdir = ["dir","dir","dir","dir",5,4],TType = {
  PLAYER : 1,ENEMYA : 2,ENEMYB : 3,ENEMYC : 4,ENEMYD : 5
},MBullets = [],EBullets = [],TLevelVBullets = [1,1,2,2],BulletsSpeed = [3,6,6,6],spaceTile = 31,imgs = {
  
},sounds = {
  
},thandle,fps = 40,tlayers = {
  
},tiles = {
  
},gtexts = {
  
},difficulties = [{
  state : [2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1,1,1,1,1,3,3,3,3,3],shoot : 6
},{
  state : [2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1,1,1,1,1,3,3,3,3,3],shoot : 3
}],tileImgMap = {
  " " : 31,"1" : 1,"2" : 2,"3" : 3,"4" : 4,"5" : 5,"6" : 6,"7" : 7,"8" : 8,"9" : 9,a : 10,b : 11,c : 12,d : 13,e : 14,f : 15,g : 16,h : 17,i : 18,j : 19,k : 20,l : 21,m : 22,n : 23,o : 24,p : 25,q : 26,r : 27,s : 28,t : 29,u : 30
},canpassTile = 23,iceTile = 27,tileTolerance = 5,itemTypes = {
  levelup : 0,baseiron : 1,stopetanks : 2,bomb : 3,invincible : 4,lifeup : 5
},DelayTime = {
  stageIntroDelay : fps*3,stageClearDelay : fps*5,gameOverDelay : fps*5,gameClearDelay : fps*5,etankDelay : fps*3,shootDelay : [Math.floor(fps/3),Math.floor(fps/4),Math.floor(fps/8),Math.floor(fps/10)],bornDelay : fps,ethinkTime : 20,itemDelay : fps*15,invincibleDelay : fps*15,stopedDelay : fps*15,effectDelay : Math.floor(fps/8),baseDelay : fps*20
},gstate = 50,level = 1,highScore = 0,time = 0,mt = 3,et = 20,maxEtanks = 4,mtank = null,stageEt = [],cmap = null,cmaptanks = null,wTilesMap = null,wtopTilesMap = null,cdifficulty = difficulties[0],etankIndex = 0,etankStopDelay = -1,gameover = false,gamePause = false,baseIron = false,baseDelay = -1,lastMtankLevel = 0,etankDelay = 0,keyState = {
  left : false,right : false,down : false,up : false,shoot : false,start : false
},gc,BulletsFactory = {
  mb : MBullets,eb : EBullets,add : function(b){
    var a = new Bullet(b,tiles.bullets);
    if(b.type == TType.PLAYER)this.mb.push(a);
    else{
      a.state = 2;
      this.eb.push(a)
    }
  },remove : function(a,b){
    var c = a[b],d = c.owner;
    d.bulletsNum--;
    a.splice(b,1)
  }
},Tank = Object.createClass({
  cfn : function(a,b,c){
    GSpriteTile.call(this,a,b,c);
    this.level = 0;
    this.bulletsNum = 0;
    this.maxBullets = 1;
    this.life = 1;
    this.speed = 1;
    this.canMove = false;
    this.canShoot = false;
    this.invincible = true;
    this.dir = Direction.SSTAR;
    this.state = this.dir;
    this.stoped = true;
    this.shootPass = DelayTime.shootDelay[this.level];
    this.shootDelay = DelayTime.shootDelay[this.level];
    this.invincibleTime = DelayTime.bornDelay;
    this.invincibleDelay = DelayTime.invincibleDelay
  },parent : GSpriteTile,numbers : {
    bf : BulletsFactory,shoot : function(){
      if(!this.stoped)if(this.shootPass>this.shootDelay&&this.canShoot&&this.bulletsNum<this.maxBullets){
        this.bf.add(this);
        this.bulletsNum++;
        this.shootPass = 0
      }
    },update : function(){
      if(Tdir[this.dir]!== "dir"){
        this.setState(Tdir[this.dir]);
        this.invincibleTime--;
        this.invincibleTime<0&&this.beBorn()
      }else{
        this.shootPass++;
        if(this.invincible)if(this.invincibleDelay<0)this.invincible = false;
        else this.invincibleDelay--;
        if(this.stoped){
          this.stopedDelay--;
          this.stopedDelay<0&&this.resume()
        }
      }
    },setState : function(a){
      this.dir = a;
      this.state = a
    },move : function(a){
      switch(this.dir){
        case Direction.UP : this.y-= this.speed;
        break;
        case Direction.DOWN : this.y+= this.speed;
        break;
        case Direction.LEFT : this.x-= this.speed;
        break;
        case Direction.RIGHT : this.x+= this.speed
      }enableSound&&a&&a.play()
    },setPos : function(a){
      this.x = a.x;
      this.y = a.y
    },fixed : function(){
      this.canMove = false
    },turn : function(a){
      this.setState(a)
    },stop : function(){
      this.stoped = true;
      this.stopedDelay = DelayTime.stopedDelay
    },resume : function(){
      this.stoped = false
    }
  }
}),MTank = Object.createClass({
  cfn : function(a,b,c){
    Tank.call(this,a,b,c);
    this.type = TType.PLAYER;
    this.sliding = 0
  },parent : Tank,numbers : {
    update : function(){
      if(Tdir[this.dir]!== "dir"){
        this.setState(Tdir[this.dir]);
        this.invincibleTime--;
        this.invincibleTime<0&&this.beBorn()
      }else{
        this.shootPass++;
        if(this.invincible)if(this.invincibleDelay<0){
          this.invincible = false;
          this.tiles = tiles.mt
        }else this.invincibleDelay--
      }
    },levelUp : function(){
      if(this.level<3){
        this.level++;
        this.maxBullets = TLevelVBullets[this.level];
        this.shootDelay = DelayTime.shootDelay[this.level]
      }
    },beBorn : function(){
      this.setState(Direction.UP);
      this.canMove = true;
      this.canShoot = true;
      this.stoped = false;
      this.invincible = false
    },invincibled : function(){
      this.invincible = true;
      this.invincibleDelay = DelayTime.invincibleDelay;
      this.tiles = tiles.mti
    }
  }
}),ETank = Object.createClass({
  cfn : function(a,b,c){
    Tank.call(this,a,b,c);
    this.ishoot = false;
    this.thinkTime = DelayTime.ethinkTime
  },parent : Tank,numbers : {
    shoot : function(){
      if(this.shootPass>this.shootDelay&&this.ishoot&&this.canShoot&&this.bulletsNum<this.maxBullets){
        this.bf.add(this);
        this.bulletsNum++;
        this.shootPass = 0;
        this.ishoot = false
      }
    },think : function(){
      if(this.thinkTime>= DelayTime.ethinkTime){
        this.setState(cdifficulty.state.randomEle());
        this.ishoot = Math.compend(1,cdifficulty.shoot);
        this.thinkTime = 0
      }this.thinkTime++
    },beBorn : function(){
      this.setState(Direction.DOWN);
      this.canMove = true;
      this.canShoot = true;
      this.stoped = false;
      this.invincible = false
    }
  }
}),Bullet = Object.createClass({
  cfn : function(a,b){
    GSpriteTile.call(this,b,0,0);
    this.owner = a;
    this.dir = a.dir;
    this.level = a.level;
    this.speed = BulletsSpeed[a.level];
    this.state = 1;
    switch(a.dir){
      case Direction.UP : this.y = a.y-Math.floor(this.height/2);
      this.x = a.x+Math.floor((a.width-this.width)/2);
      this.move = this.moveUp;
      this.impactCheck = BulletImpact.impactUp;
      break;
      case Direction.DOWN : this.y = a.y+a.height-Math.floor(this.height/2);
      this.x = a.x+Math.floor((a.width-this.width)/2);
      this.move = this.moveDown;
      this.impactCheck = BulletImpact.impactDown;
      break;
      case Direction.LEFT : this.x = a.x-Math.floor(this.width/2);
      this.y = a.y+Math.floor((a.height-this.height)/2);
      this.move = this.moveLeft;
      this.impactCheck = BulletImpact.impactLeft;
      break;
      case Direction.RIGHT : this.x = a.x+a.width-Math.floor(this.width/2);
      this.y = a.y+Math.floor((a.height-this.height)/2);
      this.move = this.moveRight;
      this.impactCheck = BulletImpact.impactRight
    }
  },parent : GSpriteTile,numbers : {
    moveUp : function(){
      this.y-= this.speed
    },moveDown : function(){
      this.y+= this.speed
    },moveLeft : function(){
      this.x-= this.speed
    },moveRight : function(){
      this.x+= this.speed
    }
  }
}),BombEffect = Object.createClass({
  cfn : function(a,b,c){
    GSpriteTile.call(this,a,b,c);
    this.showDelay = DelayTime.effectDelay*2;
    this.over = false;
    this.state = 4
  },parent : GSpriteTile,numbers : {
    update : function(){
      this.showDelay--;
      if(this.showDelay<0)this.over = true;
      else if(this.showDelay<DelayTime.effectDelay)this.state = 5
    }
  }
}),BulletEffect = Object.createClass({
  cfn : function(b,c,d,a){
    GSpriteTile.call(this,b,c,d);
    this.showDelay = DelayTime.effectDelay;
    this.over = false;
    this.state = a||5
  },parent : GSpriteTile,numbers : {
    update : function(){
      this.showDelay--;
      if(this.showDelay<0)this.over = true
    }
  }
}),Item = Object.createClass({
  cfn : function(a,c,d,b){
    GSpriteTile.call(this,a,c,d,b);
    this.timeDelay = DelayTime.itemDelay
  },parent : GSpriteTile,numbers : {
    update : function(){
      this.timeDelay--
    }
  }
}),HorizontalCheckSingle = [,,"top","top","top","bottom","bottom","bottom",],HorizontalCheckDouble = ["up","up",,,,,,,"down","down"],HorizontalBulletTopLeftImpactTiles = [,"clear","clear",,,"clear","clear",,1,5,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletBottomLeftImpactTiles = [,,,"clear","clear","clear","clear",3,,5,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletTopRightImpactTiles = [,"clear","clear",,,"clear","clear",,2,6,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletBottomRightImpactTiles = [,,,"clear","clear","clear","clear",4,,6,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletLeftTopImpactTiles = [,"clear",,"clear",,3,,"clear","clear",7,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletRightTopImpactTiles = [,,"clear",,"clear",,4,"clear","clear",7,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletLeftBottomImpactTiles = [,"clear",,"clear",,1,,"clear","clear",8,"iron","base","base","base","base",,,,,,,,,,,,,,,,],HorizontalBulletRightBottomImpactTiles = [,,"clear",,"clear",,2,"clear","clear",8,"iron","base","base","base","base",,,,,,,,,,,,,,,,],BulletImpact = {
  impactCheck : function(c,e,d,f,b,a){
    if(c){
      if(c === "base")baseDestroy(e,d);
      else if(c === "iron"){
        if(f.level === 3){
          e[b][a] = spaceTile;
          d[b][a] = null
        }
      }else if(c === "clear"){
        e[b][a] = spaceTile;
        d[b][a] = null
      }else e[b][a] = d[b][a].state = c;
      return true
    }return false
  },impactLeft : function(c,a,k,j){
    var n = a.x,o = a.y,q = a.width,m = a.height,i = a.speed,f;
    if(n-i<0)return{
      x : 0,y : o+m/2
    };
    var p = o+m/2,g = Math.floor(p/k),l = p % k,d = Math.floor((n-i)/k),e = g,h,b;
    if(HorizontalCheckSingle[l]){
      if(HorizontalCheckSingle[l] === "top")b = HorizontalBulletTopLeftImpactTiles[c[e][d]];
      else b = HorizontalBulletBottomLeftImpactTiles[c[e][d]];
      f = BulletImpact.impactCheck(b,c,j,a,e,d)
    }else{
      if(HorizontalCheckDouble[l] == "up"){
        e = g-1;
        h = g
      }else h = g+1;
      b = HorizontalBulletBottomLeftImpactTiles[c[e][d]];
      if(BulletImpact.impactCheck(b,c,j,a,e,d))f = true;
      b = HorizontalBulletTopLeftImpactTiles[c[h][d]];
      if(BulletImpact.impactCheck(b,c,j,a,h,d))f = true
    }return f ? {
      x : n-i,y : o+m/2
    } : false
  },impactRight : function(b,a,j,i){
    var n = a.x,o = a.y,m = a.width,l = a.height,h = a.speed,e;
    if(n+m+h>260)return{
      x : 260,y : o+l/2
    };
    var p = o+l/2,f = Math.floor(p/j),k = p % j,c = Math.floor((n+m+h-1)/j),d = f,g;
    if(HorizontalCheckSingle[k]){
      if(HorizontalCheckSingle[k] === "top")impactTile = HorizontalBulletTopRightImpactTiles[b[d][c]];
      else impactTile = HorizontalBulletBottomRightImpactTiles[b[d][c]];
      e = BulletImpact.impactCheck(impactTile,b,i,a,d,c)
    }else{
      if(HorizontalCheckDouble[k] == "up"){
        d = f-1;
        g = f
      }else g = f+1;
      impactTile = HorizontalBulletBottomRightImpactTiles[b[d][c]];
      if(BulletImpact.impactCheck(impactTile,b,i,a,d,c))e = true;
      impactTile = HorizontalBulletTopRightImpactTiles[b[g][c]];
      if(BulletImpact.impactCheck(impactTile,b,i,a,g,c))e = true
    }return e ? {
      x : n+m+h,y : o+l/2
    } : false
  },impactDown : function(c,a,k,j){
    var o = a.x,p = a.y,n = a.width,m = a.height,i = a.speed,f;
    if(p+m+i>260)return{
      x : o+n/2,y : 260
    };
    var q = o+n/2,g = Math.floor(q/k),l = q % k,d = Math.floor((p+m+i-1)/k),e = g,h,b;
    if(HorizontalCheckSingle[l]){
      if(HorizontalCheckSingle[l] === "top")b = HorizontalBulletLeftTopImpactTiles[c[d][e]];
      else b = HorizontalBulletRightTopImpactTiles[c[d][e]];
      f = BulletImpact.impactCheck(b,c,j,a,d,e)
    }else{
      if(HorizontalCheckDouble[l] == "up"){
        e = g-1;
        h = g
      }else h = g+1;
      b = HorizontalBulletRightTopImpactTiles[c[d][e]];
      if(BulletImpact.impactCheck(b,c,j,a,d,e))f = true;
      b = HorizontalBulletLeftTopImpactTiles[c[d][h]];
      if(BulletImpact.impactCheck(b,c,j,a,d,h))f = true
    }return f ? {
      x : o+n/2,y : p+m+i
    } : false
  },impactUp : function(c,a,k,j){
    var n = a.x,o = a.y,m = a.width,q = a.height,i = a.speed,f;
    if(o-i<0)return{
      x : n+m/2,y : 0
    };
    var p = n+m/2,g = Math.floor(p/k),l = p % k,d = Math.floor((o-i)/k),e = g,h,b;
    if(HorizontalCheckSingle[l]){
      if(HorizontalCheckSingle[l] === "top")b = HorizontalBulletLeftBottomImpactTiles[c[d][e]];
      else b = HorizontalBulletRightBottomImpactTiles[c[d][e]];
      f = BulletImpact.impactCheck(b,c,j,a,d,e)
    }else{
      if(HorizontalCheckDouble[l] == "up"){
        e = g-1;
        h = g
      }else h = g+1;
      b = HorizontalBulletRightBottomImpactTiles[c[d][e]];
      if(BulletImpact.impactCheck(b,c,j,a,d,e))f = true;
      b = HorizontalBulletLeftBottomImpactTiles[c[d][h]];
      if(BulletImpact.impactCheck(b,c,j,a,d,h))f = true
    }return f ? {
      x : n+m/2,y : o-i
    } : false
  }
},TilesImpact = {
  impactLeft : function(i,a,c,m){
    var l = a.x,d = a.y,p = a.width,k = a.height,h = a.speed;
    if(l-h<0)return true;
    for(var j = Math.floor((l-h)/c),o = Math.floor(d/c),n = Math.floor((d+k-1)/c),e = 0,f,g,b = o;
    b<= n;
    b++)if(i[b][j]<canpassTile){
      f = c*(b+1)-d;
      g = c*b-d-k;
      if(Math.abs(f)<tileTolerance)e = f;
      else if(Math.abs(g)<tileTolerance)e = g;
      else return true
    }else if(i[b][j]<iceTile&&m)a.sliding = 8;
    a.y = d+e;
    return false
  },impactRight : function(i,a,c,n){
    var m = a.x,d = a.y,l = a.width,k = a.height,h = a.speed;
    if(m+l+h>260)return true;
    for(var j = Math.floor((m+l+h-1)/c),p = Math.floor(d/c),o = Math.floor((d+k-1)/c),e = 0,f,g,b = p;
    b<= o;
    b++)if(i[b][j]<canpassTile){
      f = c*(b+1)-d;
      g = c*b-d-k;
      if(Math.abs(f)<tileTolerance)e = f;
      else if(Math.abs(g)<tileTolerance)e = g;
      else return true
    }else if(i[b][j]<iceTile&&n)a.sliding = 8;
    a.y = d+e;
    return false
  },impactDown : function(i,a,c,n){
    var d = a.x,m = a.y,l = a.width,k = a.height,h = a.speed;
    if(m+k+h>260)return true;
    for(var p = Math.floor((m+k+h-1)/c),j = Math.floor(d/c),o = Math.floor((d+l-1)/c),e = 0,f,g,b = j;
    b<= o;
    b++)if(i[p][b]<canpassTile){
      f = c*(b+1)-d;
      g = c*b-d-l;
      if(Math.abs(f)<tileTolerance)e = f;
      else if(Math.abs(g)<tileTolerance)e = g;
      else return true
    }else if(i[b][j]<iceTile&&n)a.sliding = 8;
    a.x = d+e;
    return false
  },impactUp : function(i,a,c,m){
    var d = a.x,l = a.y,k = a.width,p = a.height,h = a.speed;
    if(l-h<0)return true;
    for(var o = Math.floor((l-h)/c),j = Math.floor(d/c),n = Math.floor((d+k-1)/c),e = 0,f,g,b = j;
    b<= n;
    b++)if(i[o][b]<canpassTile){
      f = c*(b+1)-d;
      g = c*b-d-k;
      if(Math.abs(f)<tileTolerance)e = f;
      else if(Math.abs(g)<tileTolerance)e = g;
      else return true
    }else if(i[b][j]<iceTile&&m)a.sliding = 8;
    a.x = d+e;
    return false
  }
},CircleImpact = {
  impact : function(a,b){
    var e = a.x+a.width/2,g = a.y+a.height/2,f = b.x+b.width/2,h = b.y+b.height/2,d = (a.width+b.width)/2,c = Math.distance(e,g,f,h);
    return c<d ? d-c : false
  }
};
function initConfig(){
  gstate = 50;
  resetGameDate();
  resetKeyState()
}function initAllImgs(a){
  Object.merge(imgs,a)
}function initAllSounds(a){
  Object.merge(sounds,a)
}function loadResource(f){
  var e = computeTotalDate(gimgSrouce,gsoundSrouce),b = 0;
  gload.loadImgs(gimgSrouce,d,a);
  function d(b){
    initAllImgs(b);
    gload.loadAudios(gsoundSrouce,c,a)
  }function c(a){
    initAllSounds(a);
    f()
  }function a(a){
    b+= a.lsize;
    updateLoadingbar(gc,e,b)
  }
}function updateLoadingbar(e,d,c){
  var a = e.getCtx();
  a.clearRect(0,0,300,340);
  var b = c*174/d;
  a.drawImage(pimgs.logo,0,0);
  a.drawImage(pimgs.loadbar,0,0,b,30,56,157,b,30)
}function initGame(){
  initConfig();
  activeGameKeyListener();
  createAllTiles();
  createAllGTexts();
  createAllLayers();
  showGameTitle();
  thandle = window.setInterval(runGame,1e3/fps)
}function runGame(){
  switch(gstate){
    case 50 : gc.render();
    if(keyState.start){
      resetKeyState();
      showStageIntro();
      time = DelayTime.stageIntroDelay;
      gstate = 200
    }break;
    case 200 : gc.render();
    if(time>0)time--;
    else{
      resetKeyState();
      createLevel();
      showGameStage();
      enableSound&&sounds.start.play();
      gstate = 400
    }break;
    case 400 : gc.render();
    if(!gamePause){
      if(checkLost()){
        mtank&&mtank.stop();
        time = DelayTime.stageClearDelay;
        gstate = 800
      }else if(checkWin()){
        time = DelayTime.stageClearDelay;
        gstate = 500
      }
    }gameLoop();
    break;
    case 500 : gc.render();
    gameLoop();
    if(!gamePause){
      if(time>0){
        time--;
        if(checkLost())gstate = 800
      }else{
        clearStageLayer();
        gstate = 600
      }
    }break;
    case 600 : gc.render();
    level++;
    if(level>allMap.length){
      time = DelayTime.gameClearDelay;
      showFinishIntro();
      gstate = 900
    }else{
      showStageIntro();
      time = DelayTime.stageIntroDelay;
      gstate = 200
    }break;
    case 800 : gc.render();
    gameLoop();
    if(!gamePause){
      if(time>0)time--;
      else{
        clearStageLayer();
        time = DelayTime.gameOverDelay;
        showGameOverIntro();
        enableSound&&sounds.gameover.play();
        gstate = 900
      }
    }break;
    case 900 : gc.render();
    if(time>0)time--;
    else{
      resetGameDate();
      showGameTitle();
      gstate = 50
    }
  }
}function gameLoop(){
  if(!gamePause){
    var a = true;
    if(!mtank&&mt>0){
      addMtank();
      a = false
    }if(etankDelay<0&&et-stageEt.length>0&&stageEt.length<maxEtanks){
      addEtank();
      etankDelay = DelayTime.etankDelay
    }etankDelay--;
    a&&checkMtankGetItem();
    checkMtankHitTiles();
    checkEtankHitTiles();
    a&&mtankAction();
    etanksAction();
    checkBulletsImpact();
    checkHitEtanks();
    a&&checkHitMtanks();
    updateBase();
    updateEffects();
    updateItems();
    updateHud()
  }
}function resetKeyState(){
  keyState = {
    left : false,right : false,down : false,up : false,shoot : false,start : false
  }
}function activeKey(a){
  switch(a.keyCode){
    case 87 : case 38 : keyState.up = true;
    break;
    case 83 : case 40 : keyState.down = true;
    break;
    case 65 : case 37 : keyState.left = true;
    break;
    case 68 : case 39 : keyState.right = true;
    break;
    case 74 : case 75 : case 32 : keyState.shoot = true;
    break;
    case 13 : if(gstate === 50)keyState.start = true
  }
}function cancelKey(a){
  switch(a.keyCode){
    case 87 : case 38 : keyState.up = false;
    break;
    case 83 : case 40 : keyState.down = false;
    break;
    case 65 : case 37 : keyState.left = false;
    break;
    case 68 : case 39 : keyState.right = false;
    break;
    case 74 : case 75 : case 32 : keyState.shoot = false;
    break;
    case 13 : if(gstate === 50)keyState.start = false;
    else pauseGame();
    break;
    case 77 : switchSound()
  }
}function computeTotalDate(){
  for(var c = 0,b = 0,a = 0;
  a<arguments.length;
  a++){
    b = 0;
    while(arguments[a][b]){
      c+= arguments[a][b].size;
      b++
    }
  }return c
}function activeGameKeyListener(){
  document.addEventListener("keydown",activeKey,false);
  document.addEventListener("keyup",cancelKey,false)
}function switchSound(){
  if(!enableSound)enableSound = true;
  else enableSound = false
}function createAllTiles(){
  tiles.mt = createMtankTile();
  tiles.mti = createMtankiTile();
  tiles.ect1 = createEtankTile();
  tiles.ect = createECtankTile();
  tiles.ect4 = createEC4tankTile();
  tiles.ect3 = createEC3tankTile();
  tiles.ect2 = createEC2tankTile();
  tiles.maze = createMazeTile();
  tiles.bullets = createBulletsTile();
  tiles.effects = createEffectsTile();
  tiles.items = createItemsTile();
  tiles.bg = createBgTile();
  tiles.title = createTitleTile();
  tiles.pauseText = createPauseText()
}function createAllGTexts(){
  gtexts.stageIntro = createStageIntroText();
  gtexts.finishIntro = createFinishIntroText();
  gtexts.overIntro = createOverIntroText();
  gtexts.score = createScoreText();
  gtexts.mtank = createMTankText();
  gtexts.etank = createETankText();
  gtexts.flag = createFlagText()
}function createAllLayers(){
  tlayers.bg = createBgLayer();
  tlayers.tiles = createTilesLayer();
  tlayers.sprite = createSpriteLayer();
  tlayers.bullets = createBulletsLayer();
  tlayers.toptiles = createTopTilesLayer();
  tlayers.effects = createEffectsLayer();
  tlayers.items = createItemsLayer();
  tlayers.pauseText = createPauseTextLayer();
  tlayers.stage = createStageIntroLayer();
  tlayers.win = createWinLayer();
  tlayers.over = createOverLayer();
  tlayers.title = createTitleLayer();
  tlayers.hud = createHudLayer()
}function createStageIntroText(){
  return new GText(110,160,"STAGE "+level)
}function createFinishIntroText(){
  return new GText(90,160,"\u606d\u559c, \u4f60\u901a\u5173\u4e86")
}function createOverIntroText(){
  return new GText(90,160,"GAME OVER")
}function createScoreText(){
  return new GText(200,35,""+highScore)
}function createMTankText(){
  return new GText(60,328,""+mt,"#D67510")
}function createETankText(){
  return new GText(130,328,""+et)
}function createFlagText(){
  return new GText(210,328,""+level,"#FF0000")
}function createMtankTile(){
  return new GTiles(imgs.tiles,6,20,20,0,20)
}function createMtankiTile(){
  return new GTiles(imgs.tiles,6,20,20,120,20)
}function createEtankTile(){
  return new GTiles(imgs.tiles,6,20,20,0,40)
}function createECtankTile(){
  return new GTiles(imgs.tiles,6,20,20,0,0)
}function createEC4tankTile(){
  return new GTiles(imgs.tiles,6,20,20,120,0)
}function createEC3tankTile(){
  return new GTiles(imgs.tiles,6,20,20,240,0)
}function createEC2tankTile(){
  return new GTiles(imgs.tiles,6,20,20,240,20)
}function createMazeTile(){
  return new GTiles(imgs.tiles,31,10,10,0,100)
}function createBulletsTile(){
  return new GTiles(imgs.tiles,3,6,6,0,90)
}function createEffectsTile(){
  return new GTiles(imgs.tiles,6,30,30,0,60)
}function createItemsTile(){
  return new GTiles(imgs.tiles,6,20,20,0,110)
}function createBgTile(){
  return new GTile(imgs.bg,0,0,300,340)
}function createTitleTile(){
  return new GTile(imgs.title,0,0,300,340)
}function createPauseText(){
  return new GTile(imgs.puaseText,0,0,137,57)
}function createBgLayer(){
  var a = new GLayer("bg"),b = new GSpriteTile(tiles.bg,0,0);
  a.addChild(b);
  return a
}function createTilesLayer(){
  var a = new GLayer("tiles");
  a.draw = function(a){
    a._ctx.save();
    a._ctx.translate(20,40);
    this.objs.draw(a);
    a._ctx.restore()
  };
  return a
}function createTopTilesLayer(){
  var a = new GLayer("toptiles");
  a.draw = function(a){
    a._ctx.save();
    a._ctx.translate(20,40);
    this.objs.draw(a);
    a._ctx.restore()
  };
  return a
}function createSpriteLayer(){
  var a = new GLayer("sprite");
  a.addChild(stageEt);
  a.draw = function(a){
    a._ctx.save();
    a._ctx.translate(20,40);
    this.objs.draw(a);
    a._ctx.restore()
  };
  return a
}function createBulletsLayer(){
  var a = new GLayer("bullets");
  a.addChild(MBullets);
  a.addChild(EBullets);
  a.draw = function(a){
    a._ctx.save();
    a._ctx.translate(20,40);
    this.objs.draw(a);
    a._ctx.restore()
  };
  return a
}function createEffectsLayer(){
  var a = new GLayer("effects");
  a.draw = function(a){
    a._ctx.save();
    a._ctx.translate(20,40);
    this.objs.draw(a);
    a._ctx.restore()
  };
  return a
}function createItemsLayer(){
  var a = new GLayer("items");
  a.draw = function(a){
    a._ctx.save();
    a._ctx.translate(20,40);
    this.objs.draw(a);
    a._ctx.restore()
  };
  return a
}function createStageIntroLayer(){
  var a = new GLayer("stage");
  a.addChild(gtexts.stageIntro);
  return a
}function createPauseTextLayer(){
  var a = new GLayer("pauseText"),b = new GSpriteTile(tiles.pauseText,81,140);
  a.addChild(b);
  return a
}function createWinLayer(){
  var a = new GLayer("win");
  a.addChild(gtexts.finishIntro);
  return a
}function createOverLayer(){
  var a = new GLayer("over");
  a.addChild(gtexts.overIntro);
  return a
}function createTitleLayer(){
  var a = new GLayer("title"),b = new GSpriteTile(tiles.title,0,0);
  a.addChild(b);
  return a
}function createHudLayer(){
  var a = new GLayer("hud");
  a.addChild(gtexts.score);
  a.addChild(gtexts.mtank);
  a.addChild(gtexts.etank);
  a.addChild(gtexts.flag);
  return a
}function showGameTitle(){
  gc.removeAllLayers();
  gc.addLayer(tlayers.title)
}function showStageIntro(){
  gc.removeAllLayers();
  gc.addLayer(tlayers.bg);
  gc.addLayer(tlayers.stage);
  setStageIntroText()
}function showGameStage(){
  gc.removeAllLayers();
  gc.addLayer(tlayers.bg);
  gc.addLayer(tlayers.tiles);
  gc.addLayer(tlayers.sprite);
  gc.addLayer(tlayers.bullets);
  gc.addLayer(tlayers.toptiles);
  gc.addLayer(tlayers.effects);
  gc.addLayer(tlayers.items);
  gc.addLayer(tlayers.hud);
  setHudText()
}function showFinishIntro(){
  gc.removeAllLayers();
  gc.addLayer(tlayers.bg);
  gc.addLayer(tlayers.win)
}function showGameOverIntro(){
  gc.removeAllLayers();
  gc.addLayer(tlayers.bg);
  gc.addLayer(tlayers.over)
}function setStageIntroText(){
  gtexts.stageIntro.text = "STAGE "+level
}function setHudText(){
  gtexts.score.text = highScore;
  gtexts.mtank.text = mt;
  gtexts.etank.text = et;
  gtexts.flag.text = level
}function resetGameDate(){
  level = 1;
  highScore = 0;
  mt = 3;
  time = 0;
  mtank = null;
  lastMtankLevel = 0;
  etankStopDelay = -1;
  gameover = false;
  gamePause = false;
  baseIron = false;
  baseDelay = -1;
  while(stageEt[0])stageEt.splice(0,1);
  cmap = null;
  cmaptanks = null;
  wTilesMap = null;
  wtopTilesMap = null;
  cdifficulty = difficulties[0];
  DelayTime.etankDelay = fps*3;
  maxEtanks = 4;
  
}function createLevel(){
  tlayers.tiles.empty();
  tlayers.sprite.empty();
  tlayers.toptiles.empty();
  MBullets.length = 0;
  EBullets.length = 0;
  if(level === 10)DelayTime.etankDelay = fps*2;
  if(level === 20)DelayTime.etankDelay = fps*1;
  if(level === 20)cdifficulty = difficulties[1];
  if(level === 20)maxEtanks = 5;
  if(level === 30)DelayTime.etankDelay = fps*0.5;
  if(level === 30)maxEtanks = 6;
  var a = createTileMap(allMap[level-1],tiles.maze,tileImgMap);
  cmap = a.map;
  wTilesMap = a.wTilesMap;
  wtopTilesMap = a.wtopTilesMap;
  cmaptanks = allMapTanks[level-1];
  tlayers.tiles.addChild(wTilesMap);
  tlayers.toptiles.addChild(wtopTilesMap);
  addMtank();
  etankStopDelay = -1;
  etankIndex = 0;
  et = cmaptanks.length;
  tlayers.sprite.addChild(stageEt)
}function createTileMap(h,g,e){
  for(var d = [],f = [],c,a = 0;
  a<h.length;
  a++){
    d[a] = [];
    f[a] = [];
    c = h[a].split("");
    for(var b = 0;
    b<c.length;
    b++)if(e[c[b]]>26)f[a][b] = e[c[b]];
    else d[a][b] = e[c[b]]
  }var j = new GTilesMap(d,g,10),i = new GTilesMap(f,g,10);
  return{
    map : d,wTilesMap : j,wtopTilesMap : i
  }
}function addMtank(){
  mtank = new MTank(tiles.mt,80,240);
  while(mtank.level<lastMtankLevel)mtank.levelUp();
  tlayers.sprite.addChild(mtank)
}function removeMtank(){
  if(mtank){
    lastMtankLevel = mtank.level;
    tlayers.sprite.removeChild(mtank);
    mtank = null
  }
}function addEtank(){
  stageEt.push(createEtank(cmaptanks[etankIndex],etankIndex+1));
  etankIndex++
}function removeEtanks(){
  while(stageEt[0])stageEt.splice(0,1);
  tlayers.sprite.removeChild(stageEt)
}function destoryEtank(b){
  var a = stageEt.splice(b,1)[0];
  et--;
  createBombEffect(a.x+a.width/2,a.y+a.height/2)
}function destoryMtank(){
  createBombEffect(mtank.x+mtank.width/2,mtank.y+mtank.height/2);
  tlayers.sprite.removeChild(mtank);
  mtank = null;
  lastMtankLevel = 0;
  mt--
}function createBombEffect(b,c,a){
  tlayers.effects.addChild(new BombEffect(tiles.effects,b-15,c-15));
  if(enableSound)if(a)a.play();
  else sounds.edie.play()
}function createBulletsEffect(a,c,d,b){
  tlayers.effects.addChild(new BulletEffect(tiles.effects,c-15,d-15,a));
  enableSound&&b&&sounds.shoot.play()
}function createNewItem(){
  tlayers.items.empty();
  tlayers.items.addChild(new Item(tiles.items,Math.floor(Math.random()*220+10),Math.floor(Math.random()*190+20),Math.floor(Math.random()*6)));
  enableSound&&sounds.item.play()
}function createEtank(d,c){
  var a,b = c % 3*120;
  switch(d){
    case 1 : a = new ETank(tiles.ect1,b,0);
    a.cost = 100;
    break;
    case 2 : a = new ETank(tiles.ect1,b,0);
    a.speed = 1.5;
    a.cost = 200;
    break;
    case 3 : a = new ETank(tiles.ect1,b,0);
    a.level = 1;
    a.cost = 400;
    break;
    case 4 : a = new ETank(tiles.ect4,b,0);
    a.life = 4;
    a.cost = 800;
    break;
    case 5 : a = new ETank(tiles.ect,b,0);
    a.item = true;
    a.cost = 100;
    break;
    case 6 : a = new ETank(tiles.ect,b,0);
    a.speed = 1.5;
    a.item = true;
    a.cost = 200;
    break;
    case 7 : a = new ETank(tiles.ect,b,0);
    a.level = 1;
    a.item = true;
    a.cost = 400;
    break;
    case 8 : a = new ETank(tiles.ect,b,0);
    a.life = 4;
    a.item = true;
    a.cost = 800
  }return a
}function clearStageLayer(){
  removeMtank();
  removeEtanks();
  MBullets.length = 0;
  EBullets.length = 0;
  tlayers.effects.empty();
  tlayers.items.empty()
}function checkMtankGetItem(){
  if(tlayers.items.size()>0)if(CircleImpact.impact(mtank,tlayers.items.getChild(0))){
    mtankGetItem(tlayers.items.getChild(0));
    tlayers.items.empty()
  }
}function checkBulletsImpact(){
  var a = 0,b = 0,c;
  while(MBullets[a]){
    c = false;
    b = 0;
    while(EBullets[b]){
      if(CircleImpact.impact(MBullets[a],EBullets[b])){
        c = true;
        createBulletsEffect(3,MBullets[a].x+MBullets[a].width/2,MBullets[a].y+MBullets[a].height/2,true);
        BulletsFactory.remove(MBullets,a);
        BulletsFactory.remove(EBullets,b);
        break
      }b++
    }if(!c)a++
  }
}function checkHitEtanks(){
  var b = 0,a = 0,c;
  while(MBullets[b]){
    c = false;
    a = 0;
    while(stageEt[a]){
      if(!stageEt[a].invincible&&CircleImpact.impact(stageEt[a],MBullets[b])){
        c = true;
        createBulletsEffect(3,MBullets[b].x+MBullets[b].width/2,MBullets[b].y+MBullets[b].height/2,true);
        BulletsFactory.remove(MBullets,b);
        if(stageEt[a].item){
          stageEt[a].item = false;
          stageEt[a].tiles = tiles.ect1;
          createNewItem()
        }stageEt[a].life--;
        enableSound&&sounds.eleveldown.play();
        if(stageEt[a].life<1){
          highScore+= stageEt[a].cost;
          destoryEtank(a)
        }else stageEt[a].tiles = tiles["ect"+stageEt[a].life];
        break
      }a++
    }if(!c)b++
  }
}function checkHitMtanks(){
  if(mtank&&!mtank.invincible){
    var a = 0;
    while(EBullets[a]){
      if(CircleImpact.impact(mtank,EBullets[a])){
        destoryMtank();
        createBulletsEffect(5,EBullets[a].x+EBullets[a].width/2,EBullets[a].y+EBullets[a].height/2);
        BulletsFactory.remove(EBullets,a);
        break
      }a++
    }
  }
}function checkMtankHitTiles(){
  checkBulletsHitTiles(3,MBullets,true)
}function checkEtankHitTiles(){
  checkBulletsHitTiles(5,EBullets)
}function checkBulletsHitTiles(c,b,d){
  var a = 0;
  while(b[a]){
    impact = b[a].impactCheck(cmap,b[a],10,wTilesMap.tmap);
    if(!impact){
      b[a].move();
      a++
    }else{
      createBulletsEffect(c,b[a].x+b[a].width/2,b[a].y+b[a].height/2,d);
      BulletsFactory.remove(b,a)
    }
  }
}function checkTanksImpact(){
  var a = 0,b;
  while(stageEt[a]){
    if(CircleImpact.impact(stageEt[a],mtank)){
      fixedMtankPos(stageEt[a]);
      return true
    }a++
  }return false
}function mtankAction(){
  if(mtank){
    mtank.update();
    if(!gameover){
      if(mtank.canShoot)keyState.shoot&&mtank.shoot();
      if(mtank.canMove)if(keyState.left){
        mtank.setState(Direction.LEFT);
        if(!TilesImpact.impactLeft(cmap,mtank,10,true))if(!checkTanksImpact())mtank.move(sounds.move);
        else{
          mtank.turn(Direction.LEFT);
          mtank.sliding = 0
        }else mtank.sliding = 0
      }else if(keyState.right){
        mtank.setState(Direction.RIGHT);
        if(!TilesImpact.impactRight(cmap,mtank,10,true))if(!checkTanksImpact())mtank.move(sounds.move);
        else{
          mtank.turn(Direction.RIGHT);
          mtank.sliding = 0
        }else mtank.sliding = 0
      }else if(keyState.down){
        mtank.setState(Direction.DOWN);
        if(!TilesImpact.impactDown(cmap,mtank,10,true))if(!checkTanksImpact())mtank.move(sounds.move);
        else{
          mtank.turn(Direction.DOWN);
          mtank.sliding = 0
        }else mtank.sliding = 0
      }else if(keyState.up){
        mtank.setState(Direction.UP);
        if(!TilesImpact.impactUp(cmap,mtank,10,true))if(!checkTanksImpact())mtank.move(sounds.move);
        else{
          mtank.turn(Direction.UP);
          mtank.sliding = 0
        }else mtank.sliding = 0
      }else if(mtank.sliding>0)switch(mtank.dir){
        case Direction.UP : if(!TilesImpact.impactUp(cmap,mtank,10)&&!checkTanksImpact()){
          mtank.move(sounds.move);
          mtank.sliding--
        }break;
        case Direction.DOWN : if(!TilesImpact.impactDown(cmap,mtank,10)&&!checkTanksImpact()){
          mtank.move(sounds.move);
          mtank.sliding--
        }break;
        case Direction.RIGHT : if(!TilesImpact.impactRight(cmap,mtank,10)&&!checkTanksImpact()){
          mtank.move(sounds.move);
          mtank.sliding--
        }break;
        case Direction.LEFT : if(!TilesImpact.impactLeft(cmap,mtank,10)&&!checkTanksImpact()){
          mtank.move(sounds.move);
          mtank.sliding--
        }
      }
    }
  }
}function etanksAction(){
  etankStopDelay--;
  stageEt.forEach(function(a){
    a.update();
    if(Tdir[a.dir] === "dir"&&!a.stoped)if(etankStopDelay<0){
      a.think();
      a.ishoot&&a.shoot();
      if(a.canMove)switch(a.dir){
        case Direction.UP : if(!TilesImpact.impactUp(cmap,a,10))if(!mtank)a.move();
        else if(!CircleImpact.impact(a,mtank))a.move();
        else a.turn(Direction.UP);
        break;
        case Direction.DOWN : if(!TilesImpact.impactDown(cmap,a,10))if(!mtank)a.move();
        else if(!CircleImpact.impact(a,mtank))a.move();
        else a.turn(Direction.DOWN);
        break;
        case Direction.LEFT : if(!TilesImpact.impactLeft(cmap,a,10))if(!mtank)a.move();
        else if(!CircleImpact.impact(a,mtank))a.move();
        else a.turn(Direction.LEFT);
        break;
        case Direction.RIGHT : if(!TilesImpact.impactRight(cmap,a,10))if(!mtank)a.move();
        else if(!CircleImpact.impact(a,mtank))a.move();
        else a.turn(Direction.RIGHT)
      }
    }
  })
}function updateHud(){
  gtexts.score.text = ""+highScore;
  gtexts.mtank.text = ""+mt;
  gtexts.etank.text = ""+et;
  gtexts.flag.text = ""+level
}function updateEffects(){
  var a = 0,b = tlayers.effects.objs;
  while(b[a])if(b[a].over)b.splice(a,1);
  else{
    b[a].update();
    a++
  }
}function updateItems(){
  if(tlayers.items.size()>0){
    var a = tlayers.items.getChild(0);
    a.update();
    a.timeDelay<0&&tlayers.items.empty()
  }
}function mtankGetItem(a){
  switch(a.state){
    case itemTypes.levelup : mtank.levelUp();
    break;
    case itemTypes.baseiron : buildBaseIron(cmap,wTilesMap.tmap);
    break;
    case itemTypes.stopetanks : stopAllEtanks();
    break;
    case itemTypes.bomb : destroyAllEtanks();
    break;
    case itemTypes.invincible : mtank.invincibled();
    break;
    case itemTypes.lifeup : addPlayerLife()
  }highScore+= 500;
  enableSound&&sounds.getItem.play()
}function stopAllEtanks(){
  etankStopDelay = DelayTime.stopedDelay
}function destroyAllEtanks(){
  while(stageEt[0])destoryEtank(0)
}function addPlayerLife(){
  mt++;
  enableSound&&sounds.up.play()
}function checkWin(){
  return et === 0
}function checkLost(){
  if(mt === 0||cmap[24][12] === 15)return true
}function buildBaseIron(b,a){
  baseDelay = DelayTime.baseDelay;
  baseIron = true;
  b[23][11] = 10;
  b[23][12] = 10;
  b[23][13] = 10;
  b[23][14] = 10;
  b[24][11] = 10;
  b[24][14] = 10;
  b[25][11] = 10;
  b[25][14] = 10;
  a[23][11] = new GSpriteTile(tiles.maze,110,230,10);
  a[23][12] = new GSpriteTile(tiles.maze,120,230,10);
  a[23][13] = new GSpriteTile(tiles.maze,130,230,10);
  a[23][14] = new GSpriteTile(tiles.maze,140,230,10);
  a[24][11] = new GSpriteTile(tiles.maze,110,240,10);
  a[24][14] = new GSpriteTile(tiles.maze,140,240,10);
  a[25][11] = new GSpriteTile(tiles.maze,110,250,10);
  a[25][14] = new GSpriteTile(tiles.maze,140,250,10)
}function updateBase(){
  if(baseIron){
    baseDelay--;
    if(baseDelay<0){
      baseIron = false;
      removeBaseIron(cmap,wTilesMap.tmap)
    }
  }
}function removeBaseIron(b,a){
  b[23][11] = 9;
  b[23][12] = 9;
  b[23][13] = 9;
  b[23][14] = 9;
  b[24][11] = 9;
  b[24][14] = 9;
  b[25][11] = 9;
  b[25][14] = 9;
  a[23][11] = new GSpriteTile(tiles.maze,110,230,9);
  a[23][12] = new GSpriteTile(tiles.maze,120,230,9);
  a[23][13] = new GSpriteTile(tiles.maze,130,230,9);
  a[23][14] = new GSpriteTile(tiles.maze,140,230,9);
  a[24][11] = new GSpriteTile(tiles.maze,110,240,9);
  a[24][14] = new GSpriteTile(tiles.maze,140,240,9);
  a[25][11] = new GSpriteTile(tiles.maze,110,250,9);
  a[25][14] = new GSpriteTile(tiles.maze,140,250,9)
}function fixedMtankPos(a){
  switch(mtank.dir){
    case Direction.UP : if(a.y>mtank.y)mtank.y--;
    break;
    case Direction.DOWN : if(a.y<mtank.y)mtank.y++;
    break;
    case Direction.LEFT : if(a.x>mtank.x)mtank.x--;
    break;
    case Direction.RIGHT : if(a.x<mtank.x)mtank.x++
  }
}function baseDestroy(b,a){
  b[24][12] = 15;
  b[24][13] = 16;
  b[25][12] = 17;
  b[25][13] = 18;
  a[24][12].state = 15;
  a[24][13].state = 16;
  a[25][12].state = 17;
  a[25][13].state = 18;
  createBombEffect(130,250,sounds.die);
  gameover = true
}function pauseGame(){
  if(gstate === 400||gstate === 500||gstate === 800)if(gamePause){
    gamePause = false;
    removePauseGameText()
  }else{
    gamePause = true;
    addPauseGameText()
  }
}function addPauseGameText(){
  gc.addLayer(tlayers.pauseText);
  
}function removePauseGameText(){
  gc.removeLayer(tlayers.pauseText);
  
}var gload = {
  loadScript : function(c,b){
    var a = document.createElement("script");
    a.type = "text/javascript";
    if(a.readyState)a.onreadystatechange = function(){
      if(a.readyState == "loaded"||a.readyState == "complete"){
        a.onreadystatechange = null;
        b()
      }
    };
    else a.onload = function(){
      b()
    };
    a.src = c;
    document.getElementsByTagName("head")[0].appendChild(a)
  },loadScripts : function(b,e){
    var a = 0,c = this;
    function d(){
      a++;
      if(b.length>a)c.loadScript(b[a],d);
      else e()
    }c.loadScript(b[a],d)
  },loadImgs : function(a,g,d){
    var f = 0,e = {
      
    };
    function h(){
      a.length == f&&g(e)
    }for(var b = 0;
    b<a.length;
    b++){
      var c = new Image;
      c.src = a[b].url;
      e[a[b].name] = c;
      if(a[b].size)c.lsize = a[b].size;
      c.onload = function(){
        d&&d(this);
        f++;
        h()
      }
    }
  },loadAudio : function(e,b){
    var a = new Audio;
    a.src = e;
    var c;
    function d(){
      if(a.readyState == 4){
        window.clearInterval(c);
        b&&b(a)
      }
    }c = window.setInterval(d,100);
    a.load()
  },loadAudios : function(b,g,c){
    var a = 0,d = {
      
    },e = this;
    function f(h){
      if(b[a].size)h.lsize = b[a].size;
      c&&c(h);
      d[b[a].name] = h;
      a++;
      if(b.length>a)e.loadAudio(b[a].url,f);
      else g(d)
    }e.loadAudio(b[a].url,f)
  }
}
