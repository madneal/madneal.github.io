接着上一节的内容来说。我们将继续关注与上一节制作的polls应用以及Django自动产生额度管理网站。
## 产生一个管理员用户 ##
首先我们需要产生一个管理员用户，运行如下命令；
`python manage.py createsuperuser`
下面会让你输入用户名，邮箱以及用户密码，按照要求填写就可以了，这样我们就产生了一个管理员账户了。

## 开发服务器 ##
Django的管理员网站是默认激活的，我们可以通过上节讲到的方式激活服务器：
`python manage.py runserver`
现在打开浏览器，输入http://localhost:8000/admin/你就可进入管理员登录界面了，输入用户名和密码就可以登录了。

## 进入管理员网站 ##
当你以超级管理员的身份进去管理员网站，你就可以看到管理员的默认界面了。

## 在管理员中修改poll应用 ##
在默认管理员界面中我们看不到我们的poll应用。我们需要高速管理员Question对象具有一个管理员接口，打开`polls/admin.py`
```
from django.contrid import admin
from .models import Question
admin.site.register(Question)
```

## 定制管理员表单 ##
现在我们来开始定制管理员表单，打卡`polls/admin.py`
```
from django.contrib import admin
from .models import Question,Choice
//Register your models here.

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    #fields = ['pub_date','question_text']
    list_display = ('question_text','pub_date','was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']
    fieldsets = [
        (None,{'fields':['question_text']}),
        ('Date information',{'fields':['pub_date'],'classes':['collapse']}),
    ]
    inlines = [ChoiceInline]

admin.site.register(Question,QuestionAdmin)
```

这里面他做了很多细节的改变，他是一个个的加进去，好麻烦，我这给的就是最终的一个版本，主要里面增加一个收缩的功能。
