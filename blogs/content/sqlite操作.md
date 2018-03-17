## 导入excel到表格 ##
本来想使用sqlite expert personal导入表格的，后来发现软件里面没有import/export菜单，后来问只有professional版本才有这个菜单的，我晕，穷人那只能敲命令行了。
注意导入的excel表格是要把表头给去掉的，然后按照sqlite表格里面标头的顺序进行导入，excel的表格用csv的格式来保存。

```
sqlite3
.separator ','
.import filename tablename
```
## 导入文件乱码 ##
经常会出现导入的文件的中文出现乱码的情况，建议就是把文件用记事本打开，然后用UTF-8的格式另存为csv的文件。
## datatime()函数时间出错 ##
使用sqlite数据库时，使用datatime函数获取当前时间的时候，时间总是错误的，总是晚了好几个小时，结果在datatime()函数里面加上参数就好了，datetime('now','localtime')。
## database is locked ##
读完数据库一定要关闭，无论是reader还是dataset，必须统统都要close