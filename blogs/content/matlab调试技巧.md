Matlab的调试总体分为，直接调试和间接调试。
1.直接调试：
（1）去掉句末的分号；
（2）单独调试一个函数：将第一行的函数声明注释掉，并定义输入量，以脚本方式执行 M 文件；
（3）适当地方添加输出变量值的语句；
（4）添加keyboard命令；

2.工具调试：
1.）以命令行为主的调试：
（1）设置断点：
dbstop in mfile:在文件名为mfile的M文件第一个可执行语句前设断点； 
dbstop in mfile at lineno:在mfile的第lineno行设断点； 
dbstop in mfile at subfun:当程序执行到子程序subfun时，暂时中止执行，并设断点； 
dbstop if error:遇到错误时，终止M文件运行，并停在错误行（不包括try...catch语句中检测到的的错误，不能在错误后重新开始运行）； 
dbstop if all error:遇到任何类型错误均停止（包括try...catch语句中检测到的的错误）； 
dbstop if warning:程序可恢复运行； 
dbstop if caught error:当try...catch检测到运行时间错误是，停止M文件执行，可恢复运行； 
dbstop if naninf 或 dbstop if infnan 
（2）断点清除：
dbclear all:清除所有M文件中的所有断点； 
dbclear all in mfile:清除文件名为mfile的文件中的所有断点； 
dbclear in mfile:清除文件名为mfile中第一个可执行语句前的断点； 
dbclear in mfile at lineno: 
dbclear in mfile at subfun: 
dbclear if error/warning/naninf/infnan: 
（3）恢复运行：
dbcount:从断点处恢复程序的执行，直到下一个断点或错误后返回Matlab基本工作空间； 
（4）调用堆栈：
dbstack： 
1.）dbstack(N) 
2.）dbstack('-completenames') 
（5）列出所有断点：
dbstatus 
s=dbstatus：返回值为M×1结构体
其中字段：
name-函数名；
line-断点行向量；
expression_r-与line中相对应的断点条件表达字符串；
cond-条件字符串，如error，caught error，warning，或naninf；
identifier-当条件字符串是error，caught error，warning，或naninf时，改字段是Matlab的
信息指示字符串；
dbstatus mfile：列车制定M文件中所有断点设置，mfile必须为M文件函数或有效路径； 

（6）执行一行或多行语句：
dbstep：执行下一个可执行语句；
dbstep nlines：执行下nlines行可执行语句；
dbstep in：执行下一行可执行语句，如有子函数，进入；
dbstep out：执行函数剩余部分，离开函数时停止；
注：这四种都返回调试模式，如遇断点，中止；
（7）列出文件内容：
dbtype mfile：列出mfile文件的内容，并在每行语句前加上标号以方便使用者设定断点； 
dbtype mfile start:end：列出mfile文件中指定行号范围的部分 
注：在UNIX和VMS调试模式下，并不现实Matlab的调试器，此时必须使用dbtype来显示源程序代码； 
（8）切换工作空间：
dbdown：遇到断点时，将当前工作空间切换到被调用的M文件的空间； 
dbup：将当前工作空间切换到调用的M文件的空间； 
（9）退出调试模式：
dbquit； 
1.1控制单步运行
step：单步，不进入函数
step in：单步，进入子函数单步
step out：在函数中的话跳出函数，否则直接跳入下个断点处
save and run：存储，运行
go until cursor：运行到光标处
可以看到，以上几个按钮和C编辑器中是基本一样的意思

1.2断点操作
set/clear breakpoint：设置清除断点
set/modify conditional breakpoint：设置或修改条件断点，条件断点可以使程序满足一定条件时停止
enable/diable breakpoints：使断点有效或无效
clear breakpoints in all files：清除所有断点
stop if errors/warnings：程序出现错误或警告时停止运行，进入调试但不包括try...catch中的错误
切换工作空间，结束对程序的调试，打开编辑窗口中的stack列表，选择base，切换到主工作空间。记得要清楚掉断点，红色圆点去掉了，绿色箭头（调试）变为白色，然后选择continue，白色箭头去掉，调试完成。