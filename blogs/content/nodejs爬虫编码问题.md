最近再做一个nodejs网站爬虫的项目，但是爬一些网站的数据出现了中文字符乱码的问题。查了一下，主要是因为不是所有的网站的编码格式都是utf-8,还有一些网站用的是gb2312或者gbk的编码格式。所以需要做一个处理来进行编码的解码。至于网站的编码怎么看，可以通过去检查中的network去看。
![这里写图片描述](http://img.blog.csdn.net/20160416170259695)
根据相应的编码格式，进行相应的设置。utf-8就不要说了，下面就以gbk为例，说一下解码的方式。

```
var request = require('request');
var cheerio = request('cheerio');
var iconv = require('iconv-lite');

request ({
	url : 'http://www.taobao.com',
	encodeing = null
	},function(err,res,body){
	if (err) throw err;
	// decode the content of the website
	body = iconv.decode(body,'gbk');

	var $ = cheerio.load(body);

	console.log($('head title').text());
}）
```
或者是使用一个gbk包，但我觉得还是上面的方式比较好。