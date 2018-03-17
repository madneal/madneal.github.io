突然对Django热情似火，所以就开学习了，我是根据官方文档学习的，所以我打算把官方文档翻译一遍，全当学习，首先贴官方文档的地址：https://docs.djangoproject.com/en/1.8/intro/tutorial01/。我是根据我自己的理解翻译，可能和官方有一些差入，如有不当之处，还望指正。
首先请确保你已经安装了python,Django是建立在python的基础之上，所以首先要安装python,mac上面的这些安装都比较简单，用pip 就可以了。下面就开始来创建项目吧
## 创建一个项目 ##
进入到一个文件件下来创建你自己的项目，文件夹路径看你自己喜欢了，运行以下命令
`django-admin statrtproject mysite`
这就将会产生一个mysite文件夹，这个文件夹的名字可以随便定义的，没有什么影响。让我们一起看看产生了什么：
`mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py `
关于这些文件的详细内容我就不一一介绍了，可以进入文件夹看看，下面还会提到这些文件的用法。
## 建立数据库 ##
好现在打开`mysite/settings.py`。默认来说的配置是使用SQLite数据库，这是一种轻量级的数据库，在手机上面使用的还是蛮多的，感兴趣的同学可以去查一查。SQLite是包括在python之中的，所以你也不需要另外去安装了，同时你也可以使用其他的数据库，不过要改一下配置文件。如果对数据库有更多的想法可以去https://docs.djangoproject.com/en/1.8/ref/settings/#std:setting-DATABASES里 main有关于数据库配置更为详细的介绍。
同时注意INSTALLED_APPS设置这个文件的顶层。一般来说INSTALLED_APPS 包含一下apps:
 - django.contrib.admin
 - django.contrib.auth
 - django.contrib.contenttypes
 - django.contrib.sessions
 - django.contrib.messages
 - django.contrib.staticfiles
 这些应用的具体功能我就不一一介绍，反正就是为了配置更方便，到时还会用到。上面的这些应用可能会用到数据库中的表格，所以在应用他们以前我们要创建这些表格：
 `python manage.py migrate`
 ## 开发服务器 ##
 让我们看一下我们的项目能否正常工作，切换到mysite文件夹下，运行命令行：
 `python manage.py runserver`
 然后就可以看到服务器正常运行的一些提示信息了
 ## 创建模型 ##
 创建你自己的应用，确定你是在和`manage.py`同一及的文件路径下，运行命令行：
 `python manage.py startapp polls`
 这回创建一个`polls`文件件：
 `polls/
    __init__.py
    admin.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py `
    在web应用中创建数据库的第一步是定义你自己的模型。
 在我们这个简单的应用中，我们会创建两个模型`Question Choice`
 编辑`polls/models.py`文件：
```
from django.db import models
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
class Choice(models.Model):
    question = models.ForeignKey(Question)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

 以上代码很直接明了，python的代码还是比较容易理解的。
 
 ##激活模型##
 下面我们就要为我们的应用创建数据库表格了。创建根python相关的API。首先我们需要告诉我们的项目polls应用已经安装了，打开`mysite/settings.py`你将会看到
 `
 INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls',
)
`
最后一行将我们的应用添加进去就可以了。现在让我们运行另外一个命令：
`python manage.py makemigrations poll`
你将会看到以下内容：
`
Migrations for 'polls':
  0001_initial.py:
    - Create model Question
    - Create model Choice
    - Add field question to choice
  `
  通过运行`migrations`你是在告诉Django你对模型做了一些改变。Migrations 是将这些改变存储到模型之中。如果你运行`migrate`就会将这模型表存到数据库中：
  `
   python manage.py migrate
Operations to perform:
  Synchronize unmigrated apps: staticfiles, messages
  Apply all migrations: admin, contenttypes, polls, auth, sessions
Synchronizing apps without migrations:
  Creating tables...
    Running deferred SQL...
  Installing custom SQL...
Running migrations:
  Rendering model states... DONE
  Applying <migration name>... OK
  `
  这样相应的数据表就会在数据库中创建了。
##使用api##
如果想调用python的脚本时，运行：
`python manage.py shell`
一旦你进入这个shell
![这里写图片描述](http://img.blog.csdn.net/20151010164951130)


但是我们会发现Question的对象是无意义的，我们还需要再做一些改变，打开`polls/models.py`，添加一个'_str_()`方法。
```
from django.db import models

class Question(models.Model):
    # ...
    def __str__(self):              # __unicode__ on Python 2
        return self.question_text

class Choice(models.Model):
    # ...
    def __str__(self):              # __unicode__ on Python 2
        return self.choice_text
```

还有下面的脚本改变
```
import datetime

from django.db import models
from django.utils import timezone


class Question(models.Model):
    # ...
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
```

 好，以上就是官方课程的第一节，写的好累。。。。