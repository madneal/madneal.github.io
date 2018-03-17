pythonanywhere是一个免费的托管python的代码，可以测试你的web应用，用起来还是比较方便的，现在就来介绍如何在pythonanywhere部署你的应用。
下载你的代码
我的代码是托管在github，我们首先从github下代码：

```
git clone https://github.com/<username>/my-first-blog.git
```

产生一个virtualenv

```
cd my-first-blog
// create virtualenv
virtualenv myvenv
// activate vitalness
. myvenv/bin/activate

```
数据库什么的我就不说了，pythonanywhere支持两种数据库，另外由于django本身就是支持sqlite数据库的，所以这里我们就不说了。
这里讲一下如何发布你的应用：
在他那个dashboard里面的vitualenv里面设置路径：
/home/<your-username>/my-first-blog/myvenv/.
配置wsgi文件：

```
import os
import sys

path = '/home/<your-username>/my-first-blog'  # use your own username here
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise
application = DjangoWhiteNoise(get_wsgi_application())
```
ok,可以访问你的网站了，网站地址：http://neal1991.pythonanywhere.com。那个是我的用户名，你可以设置成你自己的用户名。