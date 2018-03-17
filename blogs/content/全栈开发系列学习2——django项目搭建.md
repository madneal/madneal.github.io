项目代码：http://yunpan.cn/cHajgT4HvgHqx （提取码：8350）
配置项目：
1. 首先确保你的机器安装了python和pip，这两种安装比较简单，这里就不说了。
2. 在你的机器上安装mysql服务，这个也不细说了。然后安装Mysql-python,只要输入命令"pip install MySQL-python"就可以了。
3. 解压项目文件代码。
4. 进入src文件夹下，输入"make install"这样会自动安装所有的依赖库。
5. 现在我们可以创建一个数据库：web_dev_tutorial

```
mysql -u <your username> -p<yourpassword>
```
注意用户名前面有空格，而密码前面是没有空格的，这一点格外注意。
在数据库中创建实例：
`create database web_dev_tutorial`
然后将数据库和我们的项目链接在一起，打开`src/web_dev_tutorial/settings.py`找到以下配置
`
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "web_dev_tutorial",
        'USER': 'root',
        'PASSWORD': 'root',
    }
}
`
把相应的用户名密码改成你的数据库的用户名密码就可以了。
6. 现在我们可以载入一些测试数据到数据库。检查data文件夹是否有个叫parse.py的文件，还有一个文件夹是rawdata，里面包含了很多的文本文件。进入文件夹test，打开一个叫做config.py的文件，你会看到以下内容
`
MYSQL_HOST     = '127.0.0.1'
MYSQL_PORT     = 3306 

MYSQL_USERNAME = 'root' 
MYSQL_PASSWORD = 'root' 

MYSQL_DB_NAME  = 'web_dev_tutorial'
`
同样把数据库用户名密码改成你相应的用户名密码就可以了。接着，在文件夹test下，输入`make load`会自动擦除文本文件，并保存结果，这些结果也会被载入到数据库中。
7. 在文件夹src下，输入"make",你将会看到：
｀
MYSQL_HOST     = '127.0.0.1'
MYSQL_PORT     = 3306 

MYSQL_USERNAME = 'root' 
MYSQL_PASSWORD = 'root' 

MYSQL_DB_NAME  = 'web_dev_tutorial'
｀
这样服务器就启动了，你就可以访问试试了。
不过这里有一个问题就是这个服务器只能在本机访问，如果我们想通过ip地址来访问的话，我们可以通过输入`python manage.py runserver 0.0.0.0:8000`来启动服务器，这样我们就可以通过ip地址来访问服务器了。

##一些注意事项##
这个项目是一个博客平台，你访问过后就能够看的出来。为了简化设计它具有以下这些特点：
1. 我们的用户可以对博客进行相应的编辑操作。
2. 所有发表的文章都可以被所有用户看到，用户可以搜索他们感兴趣的博文。
3. 用户可以评论或者点赞。
4. 用户可以订阅其他用户的博文，从而受到更新通知。

##展示代码##
当你解压代码的时候，你应该可以看到以下的基本结构：
![这里写图片描述](http://img.blog.csdn.net/20151010105008694)
这有一些关键部分：
web_dev_tutorial文件夹

 - settings.py 这个文件里面主要是一些基础配置，比如数据库连接，日志配置，模版和静态文件路径等等
 - urls.py 这个文件定义了整个网站的路由。路由可以看作是从任何url到一个指定资源的路径。
 - wsgi.py 这个脚本文件是用来运行服务器。这个文件的内容我们可以暂时忽略。
 
 app文件夹
 这是一个应用。django支持多种应用同时存在一个相同的系统的中，允许他们执行不同的功能。这里我们只会拥有一个应用，所以我们介绍一下下面的文件：
 
 - models.py 这个文件定义了Models.你可以把它们认为是数据库中的表格。一个例子如下所示：
 `
 class User(models.Model):
    ROLE_ADMIN  = 1
    ROLE_AUTHOR = 2

    username = models.CharField(max_length=50)
    email    = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    description = models.CharField(max_length=512, null=True)
    role     = models.SmallIntegerField()
    deleted  = models.BooleanField(default=0)
`
controllers.py 我们曾经说过，controller是为了响应某个动作的。在Django中，一个controller是一个函数响应客户端的请求并且响应一个对象。

urls.py 一个应用可以定义它自己的url路径。如果一个应用中的所有url都是有相同的前缀，那么你就可定义他们在这个应用中。
    