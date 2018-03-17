我们可能经常面临这样的困惑，Iplimage和Mat这两种数据结构，我们应该用哪一种数据结构。
Iplimage一开始就存在opencv库之中，他来源于Intel的另外一个函数库Intel Image Processing Library(IPL)，这是一种非常重要的数据结构。在经典书籍<learning opencv>里面的sample用的基本都是Iplimage这个数据结构。但是这是一种C风格的数据结构，你必须为他分配以及释放内存。
Mat则是一种新的数据结构，越来越多的人也在使用这种数据结构了，因为它是面向对象的。所以我们不需要自己来为它管理内存。它是通过计数的方式来进行引用，如果它的引用计数为0的话，那么它就会自动释放内存。
老实说，用什么数据结构，我也不知道。因为我觉得有些方法，Mat数据结构还不具备，有的方法只有运用Iplimage才可以。
## 将Iplimage转化为Mat ##

```
IplImage* ipl;
Mat m = cvarrToMat(ipl);
```