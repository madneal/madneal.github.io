latex毫无疑问是一个十分强大的论文写作工具，所以掌握它就显得非常有意义，讲一下如何画一个简单的表格，代码如下：
\begin{table}
\centering
\begin{tabular}{||c|c||}
\hline
algorithm & time complexity\\
\hline
RM-MEDA & O(NM)\\
\hline
IRM-MEDA & O(NK)\\
\hline
\end{tabular}
\caption{The time complexity comparing result}
\label{TAB1}
\end{table}
呈现的效果如下：
![这里写图片描述](http://img.blog.csdn.net/20150926083944494)
是不是很简单