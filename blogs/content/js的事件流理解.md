面试问到js的事件流，当时说的不是很清楚，现在觉得有必要把这个弄清楚。
## 事件捕获和事件冒泡 ##
事件流描述的是从页面中接收事件的顺序,也可理解为事件在页面中传播的顺序。
事件流主要分为两种，即事件捕获和事件冒泡，这二者接受事件处理的顺序不同。假设下面的代码：
```
<body>
	<div id="outer">
		<div id="inner"></div>
	</div>
</body>
```
这两个事件流分别的是IE公司和netspace公司提出来的，冒泡事件流支持的浏览器更多。
冒泡事件流中，事件的传递顺序是从子元素向父元素传递。假设我们给div绑定一个click事件。那么在冒泡事件流中，事件的传递顺序是：inner->outer->body。然而捕获事件流的顺序则截然想法：body->outer->innner。
## DOM事件流 ##
DOM2级事件规定事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。还是以上面的代码为例，单击inner则会按照下面的顺序触发事件：document->html->body->outer->ineer->outer->body->html->document。在DOM事件流中，实际的目标inner在捕获阶段不会接受到事件。这意味着在捕获阶段，事件到outer就停止了，下一个阶段是“处于目标”阶段，于是事件在inner 上发生，并在事件处理中呗看成是冒泡阶段的一部分。然后，冒泡阶段发生，事件又传播回文档。
## 事件处理程序 ##
响应某个时间的函数叫做事件处理程序。DOM0级的事件处理程序很简单,onclick就是常用的DOM0级事件处理函数，只会在冒泡阶段被处理。
而DOM2级事件定义了两个方法用于处理置顶和删除事件处理程序的操作addEventListener()和removeEventListener()，所有DOM节点都包含这两个方法，并且它们都接受3个参数：要处理的事件名，作为事件处理的函数和一个布尔值。最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序，反之则是在事件冒泡阶段处理程序。DOM2级方法添加事件处理程序的好处是可以添加多个事件处理程序，会按照添加顺序被处理（无论是捕获还是冒泡）。
而IE不同的它有自己的方法attachEvent()和detachEvent,这两个接受相同的两个参数：事件处理程序名称和事件处理程序函数。
## 跨浏览器的事件处理程序 ##
```
var EventUtil = {
	addHandler: function(element,type,handler) {
		if (element.addEventListener) {
			element.addEventListener(type,handler,false);
		}
		else if (element.attachEvent) {
			element.attachEvent('on'+type,handler);
		}
		else {
			element['on'+type] = handler;
		}
	},

	removeHandler: function(element,type,handler) {
		if (element.removeEventListener)
		{
			element.removeEventListener(type,handler,false);
		}
		else(element.detachEvent) {
			element.detachEvent('on' +type,handler);
		}
		else {
			element['on'+type] = null;
		}
	}
}
```