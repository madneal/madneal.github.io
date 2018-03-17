读过很多道路追踪的论文，经常都需要道路模型的建模。我不知道是不是因为自己太笨还是怎样，好多人建的模型我实在无法理解他的用意何在，而且我真的深刻怀疑他们那些模型的参数是不是真的可以求出来。就比如这篇文章“lane detection and tracking using a new lane model and distance transform",我实在无法理解他的建模，还有他的建模参数到底如何求解：
![这里写图片描述](http://img.blog.csdn.net/20150518190431697)
我无法理解他为什么要设置那个角度，我也不知道那个顶点的位置如何获取，如果有大神知道的，还望告知一下。
好，说完不好的，我就要说个我觉得很通俗易懂的模型，这是我第一个遇到一个我能看的懂，而且我又觉得具有实用意义的道路模型，首先如图所示：
![这里写图片描述](http://img.blog.csdn.net/20150518190804313)
这个图片被xm分成为了两个部分，一个部分我们称为far feild,一个部分我们称为near feild，对于这两个部分采用了不同的建模方法。道路模型f(x)由这两个部分组成，near feild线性的，而far feild是抛物线的，定义如下：
![这里写图片描述](http://img.blog.csdn.net/20150518191415641)
这里的xm就是代表了原图中的边界线，同时我们根据道路模型的连续性，可以得出
![这里写图片描述](http://img.blog.csdn.net/20150518191648626)
因为在xm两边的函数值是相等的，并且导数也是相等的。
从而我们就能得到下面的公式：
![这里写图片描述](http://img.blog.csdn.net/20150518191843692)
这样我们可以把c和e用别的变量来表达
![这里写图片描述](http://img.blog.csdn.net/20150518192033598)
因此我们可以把最终的道路模型参数用下面的函数来表达
![这里写图片描述](http://img.blog.csdn.net/20150518192128183)
这就是这个论文提出的道路模型，这样是不是很好理解，而且很有根据。
Reference
Jung C R, Kelber C R. A robust linear-parabolic model for lane following[C]//Computer Graphics and Image Processing, 2004. Proceedings. 17th Brazilian Symposium on. IEEE, 2004: 72-79.