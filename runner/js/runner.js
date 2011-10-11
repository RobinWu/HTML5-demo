(function(){var a={};casual.Astar=a;a.findPath=function(b,c,d,e){var f=b[0].length,g=b.length,h=f*g,k=Math.abs,l=Math.max,p={},r=[];c=[{x:c[0],y:c[1],f:0,g:0,v:c[0]+"_"+c[1]}];var j=1,m,s,n,q,o,t;d={x:d[0],y:d[1],v:d[0]+"_"+d[1]};switch(e){case "Diagonal":s=a.diagonalSuccessors;case "DiagonalFree":m=a.diagonal;break;case "Euclidean":s=a.diagonalSuccessors;case "EuclideanFree":l=Math.sqrt;m=a.euclidean;break;default:m=a.manhattan;s=a.nothingToDo}s||(s=a.diagonalSuccessorsFree);do{q=h;for(n=o=0;n<j;++n)if((e=
c[n].f)<q){q=e;o=n}o=c.splice(o,1)[0];if(o.v!=d.v){--j;t=a.successors(s,o.x,o.y,b,g,f);n=0;for(q=t.length;n<q;++n){(e=t[n]).p=o;e.f=e.g=0;e.v=e.x+"_"+e.y;if(!(e.v in p)){e.f=(e.g=o.g+m(e,o,k,l))+m(e,d,k,l);c[j++]=e;p[e.v]=1}}}else{n=j=0;do r[n++]=[o.x,o.y];while(o=o.p);r.reverse()}}while(j);return r};a.diagonalSuccessors=function(b,c,d,e,f,g,h,k,l,p,r,j,m){if(b){d&&!l[f][h]&&(j[m++]={x:h,y:f});e&&!l[f][k]&&(j[m++]={x:k,y:f})}if(c){d&&!l[g][h]&&(j[m++]={x:h,y:g});e&&!l[g][k]&&(j[m++]={x:k,y:g})}return j};
a.diagonalSuccessorsFree=function(b,c,d,e,f,g,h,k,l,p,r,j,m){b=f>-1;c=g<p;d=h<r;e=k>-1;if(d){b&&!l[f][h]&&(j[m++]={x:h,y:f});c&&!l[g][h]&&(j[m++]={x:h,y:g})}if(e){b&&!l[f][k]&&(j[m++]={x:k,y:f});c&&!l[g][k]&&(j[m++]={x:k,y:g})}return j};a.nothingToDo=function(b,c,d,e,f,g,h,k,l,p,r,j){return j};a.successors=function(b,c,d,e,f,g){var h=d-1,k=d+1,l=c+1,p=c-1,r=h>-1&&!e[h][c],j=k<f&&!e[k][c],m=l<g&&!e[d][l],s=p>-1&&!e[d][p],n=[],q=0;r&&(n[q++]={x:c,y:h});m&&(n[q++]={x:l,y:d});j&&(n[q++]={x:c,y:k});s&&
(n[q++]={x:p,y:d});return b(r,j,m,s,h,k,l,p,e,f,g,n,q)};a.diagonal=function(b,c,d,e){return e(d(b.x-c.x),d(b.y-c.y))};a.euclidean=function(b,c,d,e){d=b.x-c.x;b=b.y-c.y;return e(d*d+b*b)};a.manhattan=function(b,c,d){return d(b.x-c.x)+d(b.y-c.y)}})();ImageManager=[];
ImageManager.init=function(){ImageManager.icon={src:ImageManager[5],healthRed:[0,0,40,3],healthGreen:[0,3,40,3],money:[5,10,51,57],life:[5,75,58,54],sellIcon:[218,0,86,80,43,40],upgradeIcon:[305,0,82,80,41,40],upgradeDisabledIcon:[387,0,82,80,41,40],gatlingIcon:[new Frame(new Bitmap(ImageManager[5],[140,0,77,79])),new Frame(new Bitmap(ImageManager[5],[62,0,77,79]))],control:[new Frame(new Bitmap(ImageManager[5],[40,135,34,34])),new Frame(new Bitmap(ImageManager[5],[0,135,36,39]))],fastForward:[new Frame(new Bitmap(ImageManager[5],
[74,140,42,30])),new Frame(new Bitmap(ImageManager[5],[120,140,45,35]))]};ImageManager.font={digit:[new Frame(new Bitmap(ImageManager[4],[119,48,26,31,12,20])),new Frame(new Bitmap(ImageManager[4],[182,4,19,31,9,20])),new Frame(new Bitmap(ImageManager[4],[153,47,24,31,11,20])),new Frame(new Bitmap(ImageManager[4],[209,4,25,31,12,20])),new Frame(new Bitmap(ImageManager[4],[129,87,26,31,12,20])),new Frame(new Bitmap(ImageManager[4],[185,43,25,31,12,21])),new Frame(new Bitmap(ImageManager[4],[163,86,
26,31,12,21])),new Frame(new Bitmap(ImageManager[4],[218,43,24,31,11,21])),new Frame(new Bitmap(ImageManager[4],[197,82,26,31,12,21])),new Frame(new Bitmap(ImageManager[4],[4,121,26,30,12,20]))],darkdigit:[new Frame(new Bitmap(ImageManager[4],[165,427,27,35,13,20])),new Frame(new Bitmap(ImageManager[4],[140,464,19,34,9,19])),new Frame(new Bitmap(ImageManager[4],[196,427,26,34,13,19])),new Frame(new Bitmap(ImageManager[4],[163,466,26,34,13,19])),new Frame(new Bitmap(ImageManager[4],[139,504,27,34,
13,19])),new Frame(new Bitmap(ImageManager[4],[223,427,25,33,13,19])),new Frame(new Bitmap(ImageManager[4],[193,466,27,34,13,20])),new Frame(new Bitmap(ImageManager[4],[170,504,26,34,12,20])),new Frame(new Bitmap(ImageManager[4],[224,465,25,34,12,20])),new Frame(new Bitmap(ImageManager[4],[200,504,27,35,13,20]))],eng:{A:new Frame(new Bitmap(ImageManager[4],[91,150,29,31,13,21])),B:new Frame(new Bitmap(ImageManager[4],[128,126,29,31,11,21])),C:new Frame(new Bitmap(ImageManager[4],[74,189,27,31,13,
21])),D:new Frame(new Bitmap(ImageManager[4],[165,125,28,31,11,21])),E:new Frame(new Bitmap(ImageManager[4],[128,165,26,32,12,21])),F:new Frame(new Bitmap(ImageManager[4],[201,121,26,31,12,21])),G:new Frame(new Bitmap(ImageManager[4],[162,165,28,31,13,21])),H:new Frame(new Bitmap(ImageManager[4],[109,205,30,30,11,20])),I:new Frame(new Bitmap(ImageManager[4],[231,82,20,30,12,20])),J:new Frame(new Bitmap(ImageManager[4],[147,205,26,31,13,20])),K:new Frame(new Bitmap(ImageManager[4],[201,160,31,31,12,
21])),L:new Frame(new Bitmap(ImageManager[4],[181,204,25,31,11,21])),M:new Frame(new Bitmap(ImageManager[4],[214,199,32,32,12,21])),N:new Frame(new Bitmap(ImageManager[4],[4,234,29,31,12,21])),O:new Frame(new Bitmap(ImageManager[4],[41,234,28,30,12,20])),P:new Frame(new Bitmap(ImageManager[4],[4,273,27,31,11,21])),Q:new Frame(new Bitmap(ImageManager[4],[39,273,29,32,13,20])),R:new Frame(new Bitmap(ImageManager[4],[76,272,30,31,11,20])),S:new Frame(new Bitmap(ImageManager[4],[4,312,25,32,12,21])),
T:new Frame(new Bitmap(ImageManager[4],[37,313,28,31,12,21])),U:new Frame(new Bitmap(ImageManager[4],[4,352,29,31,12,21])),V:new Frame(new Bitmap(ImageManager[4],[73,313,28,32,12,21])),W:new Frame(new Bitmap(ImageManager[4],[114,244,35,30,13,20])),X:new Frame(new Bitmap(ImageManager[4],[4,391,29,31,13,21])),Y:new Frame(new Bitmap(ImageManager[4],[114,282,28,31,13,21])),Z:new Frame(new Bitmap(ImageManager[4],[157,244,25,31,12,21])),em:new Frame(new Bitmap(ImageManager[4],[4,4,16,31,11,20]))}};ImageManager.gatling=
{idle1:[new Frame(new Bitmap(ImageManager[1],[2,2,108,127,55,62]),null,20),new Frame(new Bitmap(ImageManager[1],[114,2,107,126,54,61]),null,21),new Frame(new Bitmap(ImageManager[1],[225,2,108,125,55,60]),null,22),new Frame(new Bitmap(ImageManager[1],[337,2,108,123,55,58]),null,23),new Frame(new Bitmap(ImageManager[1],[2,133,107,120,54,55]),null,24),new Frame(new Bitmap(ImageManager[1],[113,133,107,116,54,51]),null,25),new Frame(new Bitmap(ImageManager[1],[225,131,108,111,55,46]),null,26),new Frame(new Bitmap(ImageManager[1],
[337,129,108,111,55,46]),null,27),new Frame(new Bitmap(ImageManager[1],[2,257,107,111,54,46]),null,28),new Frame(new Bitmap(ImageManager[1],[113,253,108,111,55,46]),null,29),new Frame(new Bitmap(ImageManager[1],[2,372,108,111,55,46]),null,30),new Frame(new Bitmap(ImageManager[1],[225,246,108,111,55,46]),null,31),new Frame(new Bitmap(ImageManager[1],[114,368,108,111,55,46]),null,32),new Frame(new Bitmap(ImageManager[1],[337,244,107,111,54,46]),null,33),new Frame(new Bitmap(ImageManager[1],[226,361,
108,111,55,46]),null,34),new Frame(new Bitmap(ImageManager[1],[338,359,108,111,55,46]),null,35),new Frame(new Bitmap(ImageManager[1],[449,2,107,111,54,46]),null,36),new Frame(new Bitmap(ImageManager[1],[560,2,108,111,55,46]),null,37),new Frame(new Bitmap(ImageManager[1],[449,117,108,111,55,46]),null,38)],attack1:[new Frame(new Bitmap(ImageManager[1],[898,550,108,148,55,83]),null,1),new Frame(new Bitmap(ImageManager[1],[786,700,107,148,54,83]),null,2),new Frame(new Bitmap(ImageManager[1],[671,856,
107,147,54,82]),null,3),new Frame(new Bitmap(ImageManager[1],[897,702,107,144,54,79]),null,4),new Frame(new Bitmap(ImageManager[1],[782,852,107,140,54,75]),null,5),new Frame(new Bitmap(ImageManager[1],[893,852,112,134,55,69]),null,6),new Frame(new Bitmap(ImageManager[2],[2,2,119,127,55,62]),null,7),new Frame(new Bitmap(ImageManager[2],[125,2,123,119,55,54]),null,8),new Frame(new Bitmap(ImageManager[2],[2,133,125,111,55,46]),null,9),new Frame(new Bitmap(ImageManager[2],[252,2,124,111,54,46]),null,
10),new Frame(new Bitmap(ImageManager[2],[131,125,125,111,55,46]),null,11),new Frame(new Bitmap(ImageManager[2],[380,2,124,111,55,46]),null,12),new Frame(new Bitmap(ImageManager[2],[260,117,119,111,54,46]),null,13),new Frame(new Bitmap(ImageManager[2],[383,117,114,111,54,46]),null,14),new Frame(new Bitmap(ImageManager[2],[2,248,108,111,54,46]),null,15),new Frame(new Bitmap(ImageManager[2],[114,248,107,111,54,46]),null,16),new Frame(new Bitmap(ImageManager[2],[2,363,108,111,55,46]),null,17),new Frame(new Bitmap(ImageManager[2],
[225,240,108,111,55,46]),null,18),new Frame(new Bitmap(ImageManager[2],[114,363,107,111,54,46]),null,19)]};ImageManager.soldier={walkRight:[new Frame(new Bitmap(ImageManager[3],[155,64,38,53,15,39])),new Frame(new Bitmap(ImageManager[3],[197,60,34,57,12,41])),new Frame(new Bitmap(ImageManager[3],[2,122,32,58,15,42])),new Frame(new Bitmap(ImageManager[3],[38,123,37,55,20,41])),new Frame(new Bitmap(ImageManager[3],[79,123,36,53,16,40])),new Frame(new Bitmap(ImageManager[3],[43,182,38,53,17,40])),new Frame(new Bitmap(ImageManager[3],
[119,122,36,55,16,41])),new Frame(new Bitmap(ImageManager[3],[85,181,35,57,18,42])),new Frame(new Bitmap(ImageManager[3],[159,121,37,57,19,41])),new Frame(new Bitmap(ImageManager[3],[200,121,38,55,18,40])),new Frame(new Bitmap(ImageManager[3],[124,182,34,53,12,39]),null,1)],walkTop:[new Frame(new Bitmap(ImageManager[3],[2,2,24,57,13,41])),new Frame(new Bitmap(ImageManager[3],[30,2,25,56,12,42])),new Frame(new Bitmap(ImageManager[3],[59,2,29,56,16,42])),new Frame(new Bitmap(ImageManager[3],[92,2,31,
55,18,40])),new Frame(new Bitmap(ImageManager[3],[2,63,30,55,19,39])),new Frame(new Bitmap(ImageManager[3],[36,62,25,55,15,39])),new Frame(new Bitmap(ImageManager[3],[94,61,27,57,17,42])),new Frame(new Bitmap(ImageManager[3],[127,2,29,58,18,42])),new Frame(new Bitmap(ImageManager[3],[160,2,29,56,16,40])),new Frame(new Bitmap(ImageManager[3],[125,64,26,54,13,39])),new Frame(new Bitmap(ImageManager[3],[193,2,25,54,13,40]),null,12)],walkDown:[new Frame(new Bitmap(ImageManager[3],[162,182,23,58,12,33])),
new Frame(new Bitmap(ImageManager[3],[189,182,26,59,15,35])),new Frame(new Bitmap(ImageManager[3],[219,180,29,58,14,37])),new Frame(new Bitmap(ImageManager[3],[235,2,31,56,14,37])),new Frame(new Bitmap(ImageManager[3],[270,2,30,56,12,36])),new Frame(new Bitmap(ImageManager[3],[304,2,25,56,11,34])),new Frame(new Bitmap(ImageManager[3],[270,62,27,58,11,35])),new Frame(new Bitmap(ImageManager[3],[333,2,29,58,12,37])),new Frame(new Bitmap(ImageManager[3],[366,2,29,56,14,37])),new Frame(new Bitmap(ImageManager[3],
[301,62,26,58,14,36])),new Frame(new Bitmap(ImageManager[3],[252,124,24,59,13,35]),null,23)],deathRightForwards:[new Frame(new Bitmap(ImageManager[3],[802,254,20,60,10,41])),new Frame(new Bitmap(ImageManager[3],[911,137,21,73,10,50])),new Frame(new Bitmap(ImageManager[3],[759,310,27,76,14,52])),new Frame(new Bitmap(ImageManager[3],[936,137,32,79,16,55])),new Frame(new Bitmap(ImageManager[3],[702,377,41,75,19,53])),new Frame(new Bitmap(ImageManager[3],[972,113,46,69,16,52])),new Frame(new Bitmap(ImageManager[3],
[875,241,46,70,13,52])),new Frame(new Bitmap(ImageManager[3],[747,390,43,68,10,48])),new Frame(new Bitmap(ImageManager[3],[794,326,40,64,6,43])),new Frame(new Bitmap(ImageManager[3],[925,220,45,55,3,36])),new Frame(new Bitmap(ImageManager[3],[838,326,49,47,3,32])),new Frame(new Bitmap(ImageManager[3],[925,279,57,40,4,26])),new Frame(new Bitmap(ImageManager[3],[664,462,59,37,4,24])),new Frame(new Bitmap(ImageManager[3],[857,417,58,39,5,26])),new Frame(new Bitmap(ImageManager[3],[919,406,59,35,5,24])),
new Frame(new Bitmap(ImageManager[3],[2,584,59,32,4,22]),null,0,0,1)],deathRightBackwards:[new Frame(new Bitmap(ImageManager[3],[144,351,20,60,11,41])),new Frame(new Bitmap(ImageManager[3],[238,247,28,69,15,47])),new Frame(new Bitmap(ImageManager[3],[93,406,35,76,19,53])),new Frame(new Bitmap(ImageManager[3],[270,247,42,73,24,50])),new Frame(new Bitmap(ImageManager[3],[168,351,47,69,29,46])),new Frame(new Bitmap(ImageManager[3],[316,244,52,61,34,42])),new Frame(new Bitmap(ImageManager[3],[132,424,
53,58,35,39])),new Frame(new Bitmap(ImageManager[3],[189,424,50,58,34,38])),new Frame(new Bitmap(ImageManager[3],[243,414,52,48,34,30])),new Frame(new Bitmap(ImageManager[3],[299,368,54,49,37,32])),new Frame(new Bitmap(ImageManager[3],[426,290,54,45,38,31])),new Frame(new Bitmap(ImageManager[3],[2,466,55,42,39,29])),new Frame(new Bitmap(ImageManager[3],[359,400,52,44,37,27])),new Frame(new Bitmap(ImageManager[3],[429,339,53,42,38,25])),new Frame(new Bitmap(ImageManager[3],[301,469,55,41,39,24])),
new Frame(new Bitmap(ImageManager[3],[485,60,55,39,40,22]),null,0,0,1)],deathTopForwards:[new Frame(new Bitmap(ImageManager[3],[331,64,48,53,25,38])),new Frame(new Bitmap(ImageManager[3],[399,2,53,55,27,36])),new Frame(new Bitmap(ImageManager[3],[280,124,49,56,26,34])),new Frame(new Bitmap(ImageManager[3],[252,187,46,56,24,31])),new Frame(new Bitmap(ImageManager[3],[383,62,51,52,26,24])),new Frame(new Bitmap(ImageManager[3],[456,2,50,54,26,25])),new Frame(new Bitmap(ImageManager[3],[438,61,43,56,
19,28])),new Frame(new Bitmap(ImageManager[3],[349,179,50,56,26,28])),new Frame(new Bitmap(ImageManager[3],[435,121,52,53,27,26])),new Frame(new Bitmap(ImageManager[3],[2,245,40,52,18,23])),new Frame(new Bitmap(ImageManager[3],[46,242,42,50,24,21])),new Frame(new Bitmap(ImageManager[3],[47,296,46,49,22,19])),new Frame(new Bitmap(ImageManager[3],[2,353,45,53,21,23])),new Frame(new Bitmap(ImageManager[3],[97,295,43,55,19,25])),new Frame(new Bitmap(ImageManager[3],[2,410,41,52,17,22])),new Frame(new Bitmap(ImageManager[3],
[190,297,44,50,19,20]),null,0,0,1)],deathDownBackwards:[new Frame(new Bitmap(ImageManager[3],[569,2,48,54,25,41])),new Frame(new Bitmap(ImageManager[3],[544,60,52,56,27,45])),new Frame(new Bitmap(ImageManager[3],[621,2,49,62,25,49])),new Frame(new Bitmap(ImageManager[3],[496,120,44,66,23,51])),new Frame(new Bitmap(ImageManager[3],[544,120,51,67,28,52])),new Frame(new Bitmap(ImageManager[3],[674,2,51,64,26,49])),new Frame(new Bitmap(ImageManager[3],[600,68,48,61,25,45])),new Frame(new Bitmap(ImageManager[3],
[729,2,41,58,25,43])),new Frame(new Bitmap(ImageManager[3],[543,191,49,56,25,42])),new Frame(new Bitmap(ImageManager[3],[652,70,50,56,26,41])),new Frame(new Bitmap(ImageManager[3],[706,70,37,54,26,39])),new Frame(new Bitmap(ImageManager[3],[774,2,40,51,24,37])),new Frame(new Bitmap(ImageManager[3],[644,133,41,48,20,35])),new Frame(new Bitmap(ImageManager[3],[596,193,44,48,23,36])),new Frame(new Bitmap(ImageManager[3],[689,130,44,55,27,41])),new Frame(new Bitmap(ImageManager[3],[489,364,42,48,26,35]),
null,0,0,1)]}};Gatling=function(){MovieClip.call(this);this.name=NameUtil.createUniqueName("Gatling");this.status="idle";this.realTurnSpeed=this.turnSpeed=this.attackRadius=this.maxDamage=this.minDamage=this.upgradeMoney=this.sellMoney=this.cost=this.level=0;this.target=null;this.ty=this.tx=-1;this._fireTime=this._turnTime=0;this._currentAngleFrame=-1;this._currentAngle=0;this._create()};casual.inherit(Gatling,MovieClip);Gatling.IDLE="idle";Gatling.FIRE="fire";Gatling.currentLevel=0;
Gatling.levels=[{cost:50,sellMoney:25,upgradeMoney:45,minDamage:10,maxDamage:20,attackRadius:135,turnSpeed:300},{cost:90,sellMoney:45,upgradeMoney:65,minDamage:20,maxDamage:50,attackRadius:160,turnSpeed:300},{cost:150,sellMoney:75,upgradeMoney:95,minDamage:50,maxDamage:80,attackRadius:200,turnSpeed:300}];
Gatling.setLevel=function(a,b){a.level=b;a.cost=Gatling.levels[b].cost;a.sellMoney=Gatling.levels[b].sellMoney;a.upgradeMoney=Gatling.levels[b].upgradeMoney;a.minDamage=Gatling.levels[b].minDamage;a.maxDamage=Gatling.levels[b].maxDamage;a.attackRadius=Gatling.levels[b].attackRadius;a.realTurnSpeed=a.turnSpeed=Gatling.levels[b].turnSpeed};Gatling.getLevel=function(a){if(a==undefined)a=Gatling.currentLevel;if(a<0||a>=Gatling.levels.length)return null;return Gatling.levels[a]};
Gatling.prototype.canUpgrade=function(){return this.level<10};Gatling.prototype.upgrade=function(){if(this.canUpgrade()){this.level++;this.cost+=this.upgradeMoney;this.sellMoney=this.cost*0.5>>0;this.upgradeMoney+=25;this.minDamage+=10;this.maxDamage=this.maxDamage+20+this.level*this.level;if(this.attackRadius<200)this.attackRadius+=10;this.turnSpeed+=2;this.realTurnSpeed+=2}};
Gatling.prototype._create=function(){Gatling.setLevel(this,0);this.addFrame(ImageManager.gatling.idle1);this.addFrame(ImageManager.gatling.attack1);this.gotoAndStop(1)};Gatling.prototype.stop=function(){this.status=Gatling.IDLE;this.gotoAndStop(this.getRealFrame(this._currentAngleFrame,this._currentAngle));Gatling.superClass.stop.call(this)};Gatling.prototype.getDamange=function(){return Math.round(Math.random()*(this.maxDamage-this.minDamage))+this.minDamage};
Gatling.prototype.isInAttackRadius=function(a){return a<=this.attackRadius};
Gatling.prototype.aim=function(a,b){var c=a.x-this.x,d=a.y-this.y,e=180/Math.PI*Math.atan2(d,c)+180,f=Math.round(e/10);c=this.isInAttackRadius(Math.sqrt(c*c+d*d));var g;if(b)g=c?Gatling.FIRE:Gatling.IDLE;if(d=g==Gatling.FIRE)if(this.status==Gatling.IDLE){this._turnTime=(new Date).getTime();this._fireTime=0}else this._fireTime=(new Date).getTime()-this._turnTime;if((!c||this._currentAngleFrame==f)&&this.status==g){if(d)return this._checkShot();return false}this._currentAngleFrame=f;this._currentAngle=
e;this.status=g;f=this.getRealFrame(f,e);if(d){this.gotoAndPlay(f);return this._checkShot()}else this.gotoAndStop(f);return false};Gatling.prototype.getRealFrame=function(a,b){var c=a;if(b>=90&&b<=270){c-=8;this.scaleX=1}else if(b>=0&&b<90){c=10-c;this.scaleX=-1}else if(b>270&&b<=360){c=19-(c-27);this.scaleX=-1}return c};Gatling.prototype._checkShot=function(){if(this._fireTime>=this.realTurnSpeed){this._fireTime=0;this._turnTime=(new Date).getTime();return true}return false};Soldier=function(){Sprite.call(this);this.name=NameUtil.createUniqueName("Soldier");this.money=this.score=this.speed=this.health=this.maxHealth=this.level=0;this.path=null;this.tx=-1;this.ty=3;this.direction=[1,0];this._healthBarBg=this._healthBar=this._avatar=null;this._create()};casual.inherit(Soldier,Sprite);Soldier.currentLevel=0;Soldier.levels=[{maxHealth:100,score:10,money:3,speed:5}];
Soldier.setLevel=function(a,b){if(b>=Soldier.levels.length){var c=Soldier.levels[b-1];Soldier.levels[b]={};Soldier.levels[b].maxHealth=c.maxHealth*1.5>>0;Soldier.levels[b].score=c.score*1.1>>0;Soldier.levels[b].money=c.money+(b>>1);Soldier.levels[b].speed=c.speed}if(a){a.level=b;a.health=a.maxHealth=Soldier.levels[b].maxHealth;a.score=Soldier.levels[b].score;a.money=Soldier.levels[b].money;a.speed=Soldier.levels[b].speed}};
Soldier.getLevel=function(a){if(a==undefined)a=Soldier.currentLevel;if(a<0||a>=Soldier.levels.length)return null;return Soldier.levels[a]};Soldier.upgrade=function(){Soldier.currentLevel++;return true};
Soldier.prototype._create=function(){Soldier.setLevel(this,Soldier.currentLevel);this._avatar=new MovieClip;this._avatar.addFrame(ImageManager.soldier.walkRight);this._avatar.addFrame(ImageManager.soldier.walkTop);this._avatar.addFrame(ImageManager.soldier.walkDown);this._avatar.addFrame(ImageManager.soldier.deathRightForwards);this._avatar.addFrame(ImageManager.soldier.deathRightBackwards);this._avatar.addFrame(ImageManager.soldier.deathDownBackwards);this._avatar.addFrame(ImageManager.soldier.deathTopForwards);
this.addChild(this._avatar);var a=new Bitmap(ImageManager.icon.src,ImageManager.icon.healthRed);a.x=-18;a.y=-50;this._healthBarBg=a;this.addChild(a);a=new Bitmap(ImageManager.icon.src,ImageManager.icon.healthGreen);a.x=-18;a.y=-50;this._healthBar=a;this.addChild(a)};
Soldier.prototype.setDirection=function(a){if(!(this.direction[0]==a[0]&&this.direction[1]==a[1])){this.direction=a;this._avatar.scaleX=1;this._healthBarBg.x=-18;this._healthBar.x=-18;if(a[0]==1)this._avatar.gotoAndPlay(1);else if(a[0]==-1){this._healthBarBg.x=-20;this._healthBar.x=-20;this._avatar.scaleX=-1;this._avatar.gotoAndPlay(1)}else if(a[1]==1)this._avatar.gotoAndPlay(23);else if(a[1]==-1){this._healthBarBg.x=-21;this._healthBar.x=-21;this._avatar.gotoAndPlay(12)}}};
Soldier.prototype.getShot=function(a){this.health-=a;if(this.health<0)this.health=0;a=Math.round(40*(this.health/this.maxHealth))||1;if(this._healthBar)this._healthBar.width=a};
Soldier.prototype.animateDeath=function(){this.removeChild(this._healthBar);this.removeChild(this._healthBarBg);this._healthBarBg=this._healthBar=null;var a=33;if(this.direction[0]==1)a+=1;else if(this.direction[0]==-1)a+=ImageManager.soldier.deathRightForwards.length+1;else if(this.direction[1]==1)a+=ImageManager.soldier.deathRightForwards.length+ImageManager.soldier.deathRightBackwards.length+1;else if(this.direction[1]==-1)a=this._avatar._frames.length-ImageManager.soldier.deathTopForwards.length+
1;this._avatar.gotoAndPlay(a)};Soldier.prototype.isDead=function(){return this.health==0};Soldier.prototype.isDeadFinished=function(){return this._avatar.currentFrame>33&&this._avatar._paused};Soldier.prototype.render=function(a){if(this.isDead()&&this._avatar.currentFrame<34)this.animateDeath();else if(this.isDeadFinished()){this._avatar.alpha-=0.1;this._avatar.stop()}Soldier.superClass.render.call(this,a)};ScoreBar=function(a){Sprite.call(this);this.name=NameUtil.createUniqueName("ScoreBar");this.player=a;this._create()};casual.inherit(ScoreBar,Sprite);
ScoreBar.prototype._create=function(){this._moneyIcon=new Bitmap(ImageManager.icon.src,ImageManager.icon.money);this.addChild(this._moneyIcon);this._lifeIcon=new Bitmap(ImageManager.icon.src,ImageManager.icon.life);this._lifeIcon.x=1135;this._lifeIcon.y=0;this.addChild(this._lifeIcon);this._digits=new MovieClip(ImageManager.font.digit);this._roundTitle=new MovieClip;this._roundTitle.addFrame(ImageManager.font.eng.R);this._roundTitle.addFrame(ImageManager.font.eng.O);this._roundTitle.addFrame(ImageManager.font.eng.U);
this._roundTitle.addFrame(ImageManager.font.eng.N);this._roundTitle.addFrame(ImageManager.font.eng.D);this._pausedTitle=new MovieClip;this._pausedTitle.addFrame(ImageManager.font.eng.P);this._pausedTitle.addFrame(ImageManager.font.eng.A);this._pausedTitle.addFrame(ImageManager.font.eng.U);this._pausedTitle.addFrame(ImageManager.font.eng.S);this._pausedTitle.addFrame(ImageManager.font.eng.E);this._pausedTitle.addFrame(ImageManager.font.eng.D)};
ScoreBar.prototype.render=function(a){for(var b=this.getStage().getStageWidth(),c=60,d=this.player.money.toString(),e=0;e<d.length;e++){var f=Number(d[e]);(f=this._digits._frames[f])&&f.render(a,this.x+c,this.y+30);c+=f.disObj.regX+8}d=enemyFactory.countDown<=enemyFactory.roundTime?enemyFactory.countDown.toString():this.player.score.toString();c=b-d.length*16>>1;for(e=0;e<d.length;e++){f=Number(d[e]);(f=this._digits._frames[f])&&f.render(a,this.x+c,this.y+30);c+=f.disObj.regX+8}if(stage.getPaused()){c=
b-120>>1;for(e=0;e<this._pausedTitle.getTotalFrames();e++){(f=this._pausedTitle._frames[e])&&f.render(a,this.x+c,this.y+75);c+=f.disObj.width-5}}else{d=this.player.round.toString();c=b-120-d.length*16>>1;for(e=0;e<this._roundTitle.getTotalFrames();e++){(f=this._roundTitle._frames[e])&&f.render(a,this.x+c,this.y+75);c+=f.disObj.width-5}c+=7;for(e=0;e<d.length;e++){f=Number(d[e]);(f=this._digits._frames[f])&&f.render(a,this.x+c,this.y+75);c+=f.disObj.regX+8}}c=this._lifeIcon.x-20;d=this.player.life.toString();
for(e=d.length-1;e>=0;e--){f=Number(d[e]);(f=this._digits._frames[f])&&f.render(a,this.x+c,this.y+30);if(f)c-=f.disObj.regX+8}ScoreBar.superClass.render.call(this,a)};Player=function(a,b){this.scene=a;this.stage=a.getStage();this.id=b;this.startPoint=[105,140];this.tileHeight=this.tileWidth=60;this.mapWidth=18;this.mapHeight=7;this.fastForward=1;this.reset()};Player.prototype.reset=function(){this.money=100;this.life=20;this.score=0;this.round=1;this.weapons=[];this.targets=[];this.path=this.buildPath()};
Player.prototype.buildPath=function(a,b,c,d){var e=[],f=c;if(!f||f[0]<0)f=[0,3];d||(d=[17,3]);for(var g=0;g<this.mapHeight;g++){e[g]=[];for(var h=0;h<this.mapWidth;h++)e[g][h]=this.getWeaponAt(h,g)?1:0}if(a||b)e[b][a]=1;a=Astar.findPath(e,f,d);if(a.length>0){a.push([18,3],[19,3]);c&&c[0]<0&&a.unshift(c);return a}else return null};
Player.prototype.buidAllPaths=function(){this.path=this.buildPath();for(i=0;i<this.targets.length;i++){var a=this.targets[i];if(!(a.tx>=this.mapWidth||a.ty>=this.mapHeight))a.path=this.buildPath(null,null,[a.tx,a.ty])}};Player.prototype.addWeapon=function(a){this.weapons.push(a);this.buidAllPaths()};Player.prototype.removeWeapon=function(a){a=this.weapons.indexOf(a);a>=0&&this.weapons.splice(a,1);this.buidAllPaths()};
Player.prototype.getWeaponAt=function(a,b){for(var c=0;c<this.weapons.length;c++){var d=this.weapons[c];if(d.tx==a&&d.ty==b)return d}return null};Player.prototype.addTarget=function(a){a.path=this.path;this.targets.push(a)};Player.prototype.findTarget=function(a,b){for(var c=0;c<b.length;c++){var d=b[c];if(!d.isDead()&&this.checkInAttackRadius(a,d))return d}return null};Player.prototype.checkInAttackRadius=function(a,b){var c=b.x-a.x,d=b.y-a.y;return a.isInAttackRadius(Math.sqrt(c*c+d*d))};
Player.prototype.autoAttack=function(){for(var a=0;a<this.targets.length;a++){var b=this.targets[a];if(b.isDeadFinished()&&b._avatar.alpha<=0.1){this.scene.removeChild(b);this.targets.splice(a,1);a--}else if(b.isDead()){if(b.money>0){this.money+=b.money;this.score+=b.score;b.money=0}}else if(b.x>=this.stage.getStageWidth()+b.width){this.life--;this.scene.removeChild(b);this.targets.splice(a,1);a--}else this.moveTarget(b)}for(a=0;a<this.weapons.length;a++){b=this.weapons[a];b.realTurnSpeed=Math.round(b.turnSpeed/
this.fastForward);if(b.target==null||!this.checkInAttackRadius(b,b.target)||b.target.x>=this.stage.getStageWidth()+b.target.width){var c=this.findTarget(b,this.targets);b.target=c}if(b.target){if(b.aim(b.target,true)){c=b.getDamange();b.target.getShot(c)}if(b.target.isDead()){b.stop();b.target=null}}else b.stop()}};
Player.prototype.moveTarget=function(a){if(a.x<this.startPoint[0]){var b=a.x+a.speed;if(b<this.startPoint[0])a.x=b;else{a.x=this.startPoint[0];a.tx=0;a.ty=3}}else{b=this.getTile(a);if(a.direction[0]!=0){if(a.x-(this.startPoint[0]+b[0]*this.tileWidth)==0){a.setDirection(this.getNextDirection(a));a.tx+=a.direction[0];a.ty+=a.direction[1]}this.moveByDirection(a)}else if(a.direction[1]!=0){if(a.y-(this.startPoint[1]+b[1]*this.tileHeight)==-5){a.setDirection(this.getNextDirection(a));a.tx+=a.direction[0];
a.ty+=a.direction[1]}this.moveByDirection(a)}}};Player.prototype.moveByDirection=function(a){if(a.direction)if(a.direction[0]!=0)a.x+=a.speed*a.direction[0];else if(a.direction[1]!=0)a.y+=a.speed*a.direction[1]};Player.prototype.getTile=function(a){return[Math.round((a.x-this.startPoint[0])/this.tileWidth),Math.round((a.y-this.startPoint[1])/this.tileHeight)]};
Player.prototype.getNextDirection=function(a){for(var b=0;b<a.path.length-1;b++){var c=a.path[b];if(c[0]==a.tx&&c[1]==a.ty){b=a.path[b+1];return[b[0]-a.tx,b[1]-a.ty]}}return null};WeaponTool=function(a,b){Sprite.call(this);this.name=NameUtil.createUniqueName("WeaponTool");this.player=b;this.stage=a;this.weapon=null;this.sellIcon=new Bitmap(ImageManager.icon.src,ImageManager.icon.sellIcon);this.sellIcon.name="sellIcon";this.sellIcon.mouseEnabled=true;this.upgradeIcon=new Bitmap(ImageManager.icon.src,ImageManager.icon.upgradeIcon);this.upgradeIcon.name="upgradeIcon";this.upgradeIcon.mouseEnabled=true;this.upgradeDisabledIcon=new Bitmap(ImageManager.icon.src,ImageManager.icon.upgradeDisabledIcon);
this.upgradeDisabledIcon.name="upgradeDisabledIcon";this.upgradeDisabledIcon.mouseEnabled=true};casual.inherit(WeaponTool,Sprite);
WeaponTool.prototype.drawRadius=function(a,b){if(b==undefined)b=false;if(!this._radiusCircle)this._radiusCircle=new Shape;var c=a.attackRadius;if(this._radiusCircle.radius!=c){this._radiusCircle.radius=c;this._radiusCircle.graphics.drawCircle(2,2,c);this._radiusCircle.x=-c;this._radiusCircle.y=-c-8}if(this._radiusCircle.enabled!=b){this._radiusCircle.enabled=b;this._radiusCircle.graphics.lineStyle(4,"#b8eaff",0.4);this._radiusCircle.graphics.beginFill(b?"#008b00":"#ff0000",0.4)}this._radiusCircle.graphics.clear();
this._radiusCircle.graphics.endFill();return this._radiusCircle};WeaponTool.prototype.removeRadius=function(){this._radiusCircle.parent&&this._radiusCircle.parent.removeChild(this._radiusCircle)};WeaponTool.prototype.remove=function(){this.rightIcon&&this.removeChild(this.rightIcon);this.stage.removeChild(this);this.weapon=null};
WeaponTool.prototype.show=function(a,b,c){this.weapon=a;this.drawRadius(a,b);this.addChildAt(this._radiusCircle,0);if(c){this.addChild(this.sellIcon);this.sellIcon.x=0;this.sellIcon.y=0;this.sellIcon.scaleX=this.sellIcon.scaleY=0.2;this.rightIcon=a.canUpgrade()&&this.player.money>=a.upgradeMoney?this.upgradeIcon:this.upgradeDisabledIcon;this.rightIcon.x=0;this.rightIcon.y=0;this.rightIcon.scaleX=this.rightIcon.scaleY=0.2;this.addChild(this.rightIcon)}a.localToGlobal(0,0);this.x=a.x-0;this.y=a.y-5;
this._radiusCircle.x=-a.attackRadius-2;this._radiusCircle.y=-a.attackRadius-4;this.stage.addChild(this)};
WeaponTool.prototype._render=function(a){var b=this.sellIcon.scaleX;if(b<1){this.sellIcon.scaleX=this.sellIcon.scaleY=b+0.2;this.sellIcon.x-=17;this.rightIcon.scaleX=this.rightIcon.scaleY=b+0.2;this.rightIcon.x+=20}WeaponTool.superClass._render.call(this,a);if(b>=1){b=this.localToGlobal(0,0);for(var c=this.weapon.sellMoney.toString(),d=this.sellIcon.x+25-(35-c.length*7)*0.5,e=this.sellIcon.y+30,f=c.length-1;f>=0;f--){var g=ImageManager.font.darkdigit[Number(c[f])];g.disObj.scaleX=g.disObj.scaleY=
0.7;g.render(a,b.x+d,b.y+e);d-=g.disObj.regX*0.7-1}c=this.weapon.upgradeMoney.toString();d=this.rightIcon.x+25-(28-c.length*7)*0.5;e=this.rightIcon.y+30;for(f=c.length-1;f>=0;f--){g=ImageManager.font.darkdigit[Number(c[f])];g.disObj.scaleX=g.disObj.scaleY=0.7;g.render(a,b.x+d,b.y+e);d-=g.disObj.regX*0.7-1}}};WeaponFactory=function(a,b,c){Sprite.call(this);this.name=NameUtil.createUniqueName("WeaponFactory");this.stage=a;this.scene=a.getChildAt(0);this.player=b;this.weaponTool=c;this._gatingIcon=new MovieClip(ImageManager.icon.gatlingIcon);this._gatingIcon.stop();this._gatingIcon.width=77;this._gatingIcon.height=79;this.addChild(this._gatingIcon);a.addEventListener(StageEvent.MOUSE_MOVE,casual.delegate(this.mouseMoveHandler,this));a.addEventListener(StageEvent.MOUSE_DOWN,casual.delegate(this.mouseDownHandler,
this));a.addEventListener(StageEvent.MOUSE_UP,casual.delegate(this.mouseUpHandler,this))};casual.inherit(WeaponFactory,Sprite);WeaponFactory.prototype.mouseMoveHandler=function(){this.placeWeapon(this._dragWeapon)};WeaponFactory.prototype.mouseDownHandler=function(a){a.button!=2&&this._gatingIcon.currentFrame==2&&this._gatingIcon.hitTestPoint(a.mouseX,a.mouseY)&&this.createWeapon()};
WeaponFactory.prototype.mouseUpHandler=function(){if(this._dragWeapon){if(this.placeWeapon(this._dragWeapon)){this.player.addWeapon(this._dragWeapon);this.player.money-=this._dragWeapon.cost;this.updateWeapon();this.weaponTool.removeRadius()}else this._dragWeapon.parent.removeChild(this._dragWeapon);this._dragWeapon=null}};WeaponFactory.prototype.updateWeapon=function(){this.canCreate(Gatling)?this._gatingIcon.gotoAndStop(2):this._gatingIcon.gotoAndStop(1)};
WeaponFactory.prototype.createWeapon=function(){if(this.canCreate(Gatling)){var a=new Gatling;this._dragWeapon=a;this.placeWeapon(a);this.scene.addChild(a)}};
WeaponFactory.prototype.placeWeapon=function(a){if(!a)return false;if(a=this.getAvailablePositionNearby(this.stage.mouseX,this.stage.mouseY)){this._dragWeapon.x=a.x;this._dragWeapon.y=a.y;this._dragWeapon.tx=a.tx;this._dragWeapon.ty=a.ty;if(a.tx==0&&a.ty==3||a.tx<0||a.tx>17||a.ty<0||a.ty>=7||this.player.getWeaponAt(a.tx,a.ty)||!this.player.buildPath(a.tx,a.ty)){a=this.weaponTool.drawRadius(this._dragWeapon,false);a.x=-this._dragWeapon.attackRadius-2;a.y=-this._dragWeapon.attackRadius-8;this._dragWeapon.addChild(a);
this._dragWeapon.alpha=0.5;return false}else{a=this.weaponTool.drawRadius(this._dragWeapon,true);a.x=-this._dragWeapon.attackRadius-2;a.y=-this._dragWeapon.attackRadius-8;this._dragWeapon.addChild(a);this._dragWeapon.alpha=1}return true}return false};
WeaponFactory.prototype.getAvailablePositionNearby=function(a,b){var c=Math.round((a-this.player.startPoint[0])/this.player.tileWidth),d=Math.round((b-this.player.startPoint[1])/this.player.tileHeight);a=this.player.startPoint[0]+c*this.player.tileWidth;b=this.player.startPoint[1]+d*this.player.tileHeight;return{x:a,y:b,tx:c,ty:d}};WeaponFactory.prototype.canCreate=function(){return this.player.money>=Gatling.getLevel(0).cost};EnemyFactory=function(a,b){this.scene=a;this.stage=a.getStage();this.player=b;this._soldierStartX=0;this._soldierStartY=315;this.started=false;this.roundCount=this.round=this.count=0;this.roundTotal=20;this.roundTime=5;this.countDown=this.roundTime+1;this.createTime=1.5};EnemyFactory.prototype.run=function(){this._roundInterval=setInterval(casual.delegate(this.create,this),this.createTime*1E3)};
EnemyFactory.prototype.resume=function(){if(this.roundCount==0)this._createInterval=setInterval(casual.delegate(this._countDown,this),1E3);else this.run()};EnemyFactory.prototype.stop=function(){this._roundInterval&&clearInterval(this._roundInterval);this._roundInterval=null;this._createInterval&&clearInterval(this._createInterval);this._createInterval=null};
EnemyFactory.prototype._countDown=function(){if(--this.countDown<0){this.countDown=this.roundTime+1;clearInterval(this._createInterval);this._createInterval=null;this.create();this.run()}};EnemyFactory.prototype.nextRound=function(){this.started=true;this.round++;this.player.round=this.round;this.roundCount=0;this._createInterval=setInterval(casual.delegate(this._countDown,this),1E3);Soldier.currentLevel=Math.floor(this.round/2)};
EnemyFactory.prototype.create=function(){if(this.roundCount>=this.roundTotal){this.started=false;this.stop()}else{var a=new Soldier;a.x=this._soldierStartX;a.y=this._soldierStartY;a.mouseEnabled=false;this.player.addTarget(a);this.scene.addChild(a);this.count++;this.roundCount++}};Runner={};var imageURLs=["images/grasslands_grid_s.png","images/gatling_01.png","images/gatling_02.png","images/soldier_01.png","images/font.png","images/other.png"],bgURLs=["sounds/grasslands.ogg","sounds/grasslands.mp3"],loaded=0,canvas,context,stage,scene,gatling,scoreBar,soldierStartX=0,soldierStartY=315,soldierInterval,frames=0,lastTime=0,fpsInterval,player,weaponFactory,enemyFactory,controlBtn,fastBtn,selectedWeapon,weaponTool,defaultWeapons,bgSound;Runner.startup=function(){Runner.loadImage()};
Runner.loadImage=function(){var a=new Image;a.onload=Runner.imgLoadHandler;a.src=imageURLs.shift();ImageManager.push(a);document.getElementById("status").innerHTML="Loading("+loaded+"/6): "+a.src};
Runner.imgLoadHandler=function(){loaded++;if(imageURLs.length>0)Runner.loadImage();else{document.getElementById("status").innerHTML="";document.getElementById("main").style.backgroundImage="url("+ImageManager[0].src+")";window.Astar=casual.Astar;canvas=document.getElementById("canvas");canvas.width=1200;canvas.height=580;canvas.oncontextmenu=function(){return false};context=canvas.getContext("2d");ImageManager.init();Runner.createGame()}};
Runner.createGame=function(){stage=new Stage(context);stage.setFrameRate(25);stage.traceMouseTarget=false;scene=new Sprite;scene.id="scene";scene.x=0;scene.y=0;stage.addChild(scene);player=new Player(scene);weaponTool=new WeaponTool(stage,player);weaponFactory=new WeaponFactory(stage,player,weaponTool);weaponFactory.x=1100;weaponFactory.y=495;weaponFactory.updateWeapon();stage.addChild(weaponFactory);scoreBar=new ScoreBar(player);scoreBar.x=5;scoreBar.y=5;scoreBar.score=player.score;stage.addChild(scoreBar);
controlBtn=new MovieClip(ImageManager.icon.control);controlBtn.stop();controlBtn.x=20;controlBtn.y=530;controlBtn.name="controlBtn";stage.addChild(controlBtn);fastBtn=new MovieClip(ImageManager.icon.fastForward);fastBtn.stop();fastBtn.x=controlBtn.x+45;fastBtn.y=controlBtn.y+4;fastBtn.name="fastBtn";stage.addChild(fastBtn);enemyFactory=new EnemyFactory(scene,player);if(defaultWeapons){for(var a=0;a<defaultWeapons.length;a++){var b=new Gatling;b.x=player.startPoint[0]+defaultWeapons[a][0]*player.tileWidth;
b.y=player.startPoint[1]+defaultWeapons[a][1]*player.tileHeight;b.tx=defaultWeapons[a][0];b.ty=defaultWeapons[a][1];scene.addChild(b);player.weapons.push(b)}player.path=player.buildPath()}fpsInterval=setInterval(Runner.showFPS,1E3);stage.addEventListener(StageEvent.ENTER_FRAME,Runner.enterFrameHandler);stage.addEventListener(StageEvent.MOUSE_DOWN,Runner.mouseDownHandler);if(/GECKO/.test(window.navigator.userAgent.toUpperCase())){bgSound=new casual.Audio(bgURLs[0],true,true);bgSound._element.addEventListener("ended",
function(){this.play()},false)}else bgSound=new casual.Audio(bgURLs[1],true,true)};Runner.enterFrameHandler=function(){frames++;if(player.life==0)Runner.gameOver();else if(player.targets.length==0&&!enemyFactory.started&&!stage.getPaused())enemyFactory.nextRound();else{player.autoAttack();weaponFactory.updateWeapon()}};
Runner.gameOver=function(){stage.setPaused(true);enemyFactory.started=false;enemyFactory.stop();context.globalAlpha=0.7;context.fillStyle="#000000";context.fillRect(0,0,context.canvas.width,context.canvas.height);context.globalAlpha=1;for(var a=500,b=0;b<10;b++){var c="GAME OVER!"[b];if(c==" ")a+=15;else{if(c=="!")c="em";c=ImageManager.font.eng[c];c.render(context,a,250);a+=c.disObj.width-5}}context.fillStyle="#d89304";context.font="10px verdana";context.fillText("(Click anywhere to play again)",
515,280)};
Runner.mouseDownHandler=function(a){if(player.life<=0){player.reset();player.money=100;scene.removeAllChildren();Gatling.level=0;Soldier.level=0;stage.setPaused(false);enemyFactory.count=0;enemyFactory.round=0;enemyFactory.started=false}else{a=stage.getObjectUnderPoint(a.mouseX,a.mouseY,true);if(a==controlBtn)if(stage.getPaused()){controlBtn.gotoAndStop(1);stage.setPaused(false);enemyFactory.resume()}else{controlBtn.gotoAndStop(2);stage.setPaused(true,true);enemyFactory.stop()}else if(a==fastBtn)if(fastBtn.currentFrame==
1){stage.setFrameRate(50);fastBtn.gotoAndStop(2);player.fastForward=2}else{stage.setFrameRate(25);fastBtn.gotoAndStop(1);player.fastForward=1}else if(a instanceof Gatling){selectedWeapon=a;weaponTool.show(selectedWeapon,true,true);return}else if(a&&a.name=="sellIcon"){player.money+=selectedWeapon.sellMoney;player.removeWeapon(selectedWeapon);scene.removeChild(selectedWeapon);weaponTool.remove();selectedWeapon=null;return}else if(a&&a.name=="upgradeIcon"){player.money-=selectedWeapon.upgradeMoney;
selectedWeapon.upgrade();weaponTool.remove();selectedWeapon=null;return}else if(a&&a.name=="upgradeDisabledIcon")return;selectedWeapon&&weaponTool.remove()}};Runner.mouseMoveHandler=function(){};Runner.mouseUpHandler=function(){};Runner.showFPS=function(){var a=(new Date).getTime(),b=frames*1E3/(a-lastTime);lastTime=a;frames=0;document.getElementById("status").innerHTML="FPS: "+b.toFixed(1)};
