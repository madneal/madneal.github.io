在javascript里面看到javascript的继承模式和传统的继承模式是有区别的，就想查资料看一下到底有区别，就看到了这篇文章，觉得讲得还可以，暂时先放上来，以后有别的东西再补充：
http://segmentfault.com/a/1190000000766541
## 基本模式 ##

```
var Parent = function(){
	this.name = 'parent';
｝;
Parent.prototype.getName = function(){
	return this.name;
};
Parent.prototype.obj = {a:1};

var Child = function(){
	this.name = 'child';
}
Child.protytype = new Parent();

var parent = new Parent();
var child = new Child();

console.log(parent.getName());//parent
console.log(child.getName());//child
```
这种事最简单实现原型继承的方法，直接把父类的对象复制给子类的构造函数的原型，这样子类的对象就可以访问到父类以及父类构造函数的`protytype`
![这里写图片描述](http://img.blog.csdn.net/20151024131631757)
这种方法的优点就是实现起来比较简单，不需要任何特殊的操作；同时他的缺点也很明显，如果子类需要做跟父类构造函数中相同的初始化动作，那么就得在子类构造函数中再重复一遍父类中的操作：

```
var Parent = function(name){
	this.name = name || 'parent';
};
Parent.prototype.getName = function(){
	return this.name;
};
Parent.prototype.obj = {a:1};

var Child = function(name)
{
	this.name = name || 'child';
};
Child.prototype = new Parent();

var parent = new Parent('myParent');
var child = new Child('myChild');

console.log(parent.getName());//myParent
console.log(child.getName());//myChild
```
上述还只是初始化`name`属性，如果初始化工作不断增加，这种方式也不是很方便。
## 借用构造函数 ##

```
var Parent = function(name){
	this.name = name || 'parent';
};
Parent.prototype.getName = function(){
	return this.name;
}
Parent.prototype.obj = {a:1};

var Child = function(name){
	Parent.apply(this,arguments);
}
Child.prototype = new Parent();

var parent = new Parent('myParent');
var child = new Child('myChild');

console.log(parent.getNmae());//myParent
console.log(child.getName());//myChild
```
上面这种方法在子类构造函数中通过`apply`调用父类的构造函数进行相同的的初始化工作，这样不管负累做了多少初始化工作，子类可以执行同样的初始化工作。但是上面这种实现方法存在一个问题，父类构造函数被执行了两次，一次是在子类构造函数中，椅子是在赋值子类原型的时候，这是多余的，我们可以做以下改进：

```
var Parent = function(name){
	this.name = name || 'parent';
};
Parent.prototypr.getName = function(){
	return this.name;
};
Parent.prototype.obj = {a:1};

var Child = function(name){
	Parent.apply(this,arguments);
｝；
Child.protytype = Parent.protytype;

var parent = new Parent('myParent')
var child = new Child('myChild');

console.log(parent.getName());//myParent
console.log(child.getName());//myChild
```
这样我们只需要在子类构造函数中执行一次父类的构造函数，同时又可以继承父类原型中的属性，这也比较原型的初衷，就是吧需要复用的内容放在原型中，我们可以继承原型中可复用的内容
![这里写图片描述](http://img.blog.csdn.net/20151024140246905)
## 临时构造函数模式 ##
上面借用构造函数模式还是存在问题，它把父类的原型直接赋值给子类的原型，这会造成一个问题，就是如果对子类的原型做了修改，那么这个修改同时也会影响到父类的原型，进而影响父类对象。

```
var Parent = function(name){
	this.name = name || 'parent';
}；
Parent.prototype.getName = function(){
	return this.name;
};
Parent.prototype.obj = {a:1};

var Child = function(name){
	Parent.apply(this,arguments);
};
var F = new function(){};
F.prototype = Parent.prototype;
Child.prototype = new F();

var parent = new Parent('myParent');
var child = new Child('myChild');

console.log(parent.getName());//myParent
console.log(child.getName());/myChild
```
这样做事在子类原型和父类原型之间加入一个临时的构造函数`F`，切断了子类原型和父类原型之间的联系，这样子类原型的修改就不会影响到父类原型。

## 继续讨论 ##
上面可以刻到的我们在Parent的`prototype`属性中加入一个`obj`对象字面量属性，但是一直没有使用

```
var Parent = function(name){
	this.name = name || 'parent';
};
Parent.prototype.getName = function(){
	return this.name;
}；
Parent.prototype.obj = {a:1};

var Child = function(name){
	Parent.aplly(this,arguments);
};
var F = new function(){};
F.prototype = Parent.prototype;
Child.prototype = new F();

var parent = new Parent('myParent');
var child = new Child('myChild');

console.log(child.obj.a);//1
console.log(parent.obj.a);//1
child.obj.a = 2;
console.log(child.obj.a);//2
console.log(parent.obj.a);//2
```
在上面这种情况，当我们把`child`对象`obj.a`修改的时候，同时父类的原型中的`obj.a`也会被修改。原因是因为当访问`child.obj.a`的时候，我们会沿着原型链一直找到父类的`prototype`中，然后找到了`obj`属性，然后对`obj.a`进行修改.

```
var Parent = function(name){
	this.name = name || 'parent';
};
Parent.prototype.getName = function(){
	return this.name;
}；
Parent.prototype.obj = {a:1};

var Child = function(name){
	Parent.aplly(this,arguments);
};
var F = new function(){};
F.prototype = Parent.prototype;
Child.prototype = new F();

var parent = new Parent('myParent');
var child = new Child('myChild');

console.log(child.obj.a);//1
console.log(parent.obj.a);//1
child.obj.a = 2;
console.log(child.obj.a);//2
console.log(parent.obj.a);//2
```