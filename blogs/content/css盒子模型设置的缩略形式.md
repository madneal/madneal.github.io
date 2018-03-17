css里面的盒子模型里面设置padding,margin的上下或者左右的大小有很多方式，下面说说两种不同的方式：
original method:

```
padding-top:0px
padding-right:20px
padding-bottom:30px
padding-left:10px
```
new method:

```
padding:0px 20px 30px 10px
// top right bottom left respectively
```
同理：

```
margin-top:0px
margin-right:20px
margin-bottom:30px
margin-left:10px
```

```
margin:0px 20px 30px 10px
```
如果上下左右的值都是一样的话，那我们可以这样设置：
the old method:
```
padding-top:20px
padding-right:20px
padding-bottom:20px
padding-left:20px
```
the new method:

```
padding:20px
```
如果上下值和左右值分别一样呢：
the old method:
```
margin-top:0px
margin-right:20px
margin-bottom:0px
margin-left:20px
```
the new method
```
margin:0px 20px
// top and bottom right and left respectively
```
border的属性设置:
the old method
```
border-width:thin
border-style:solid
boder-color black
```
the new method:
```
border:thin solid black
//width style color respectively
```
border的属性设置更加灵活多变：
```
boder:solid thin black
border:blcak solid thin
border:solid
boder:blcak solid
```
还有很多其他的简写方式，我就不一一阐述了。

