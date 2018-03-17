经常在购物网站，看到那种图片轮滑的效果，所以看到有人实现了，所以我也就学习下了。
首先贴出html代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>document</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="javascript.js"></script>
</head>
<body>
<div id="flash">
    <ul id="pic">
        <li style="display:block"><img src=""></li>
        <li><img src="" ></li>
        <li><img src=""></li>
        <li><img src=""></li>
        <li><img src=""></li>
        <li><img src=""></li>
    </ul>
    <ol id="num">
        <li class="activate">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
    </ol>
    <a href="javascript:;" class="arrow" id="left">&lt;</a>
    <a href="javascript:;" class="arrow" id="right">&gt;</a>
</div>

</body>
</html>
```
图像的原路径我就不制定了，css文件

```
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
a
{
    text-decoration: none;
    color: #fff;
}
#flash
{
    width: 730px;
    height: 454px;
    margin: 100px auto;
    position: relative;
    cursor: pointer;
}
#pic li
{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: none;
}
#num
{
    position: absolute;
    left: 40%;
    bottom: 10px;
    z-index: 2;
    cursor:default;
}
#num li
{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #666;
    margin: 3px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
#num li.active
{
    background: #f00;
}
.arrow{
    height: 60px;
    width: 30px;
    line-height: 60px;
    text-align: center;
    display: block;
    position: absolute;
    top:45%;
    background-color: rgba(0,0,0,0.3);
    z-index: 3;
    display: none;
}
.arrow:hover
{
    background: rgba(0,0,0,0.7);
}
#flash:hover .arrow
{
    display: block;
}
#left
{
    left: 2%;
}
#right
{
    right: 2%;
}
```
js代码：

```
function $(id) {
    return typeof id==='string'?document.getElementById(id):id;
}
window.onload=function(){
    var index=0;
    var timer=null;
    var pic=$("pic").getElementsByTagName("li");
    var num=$("num").getElementsByTagName("li");
    var flash=$("flash");
    var left=$("left");
    var right=$("right");
    //单击左箭头
    left.onclick=function()
    {
        index--;
        if (index<0)
        {index=num.length-1};
        changeOption(index);
    }
    //单击右箭头
    right.onclick=function(){
        index++;
        if (index>=num.length) {index=0};
        changeOption(index);
    }
    //鼠标划在窗口上面，停止计时器
    flash.onmouseover=function(){
        clearInterval(timer);
    }
    //鼠标离开窗口，开启计时器
    flash.onmouseout=function()
    {
        timer=setInterval(run,2000)
    }
    //鼠标划在页签上面，停止计时器，手动切换
    for(var i=0;i<num.length;i++)
    {
        num[i].id=i;
        num[i].onmouseover=function()
        {
            clearInterval(timer);
            changeOption(this.id);
        }
    }
    //定义计时器
    timer=setInterval(run,2000)
    //封装函数run
    function run(){
        index++;
        if (index>=num.length) {index=0};
        changeOption(index);
    }
    //封装函数changeOption
    function changeOption(curindex)
    {
        console.log(index)
        for(var j=0;j<num.length;j++){
            pic[j].style.display="none";
            num[j].className="";
        }
        pic[curindex].style.display="block";
        num[curindex].className="active";
        index=curindex;
    }
}
```
如果想看结果可以上http://neal1991.pythonanywhere.com，这个有实现结果的。