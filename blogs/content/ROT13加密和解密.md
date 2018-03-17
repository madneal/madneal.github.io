## 问题 ##
ROT13（回转13位）是一种简易的替换式密码算法。它是一种在英文网络论坛用作隐藏八卦、妙句、谜题解答以及某些脏话的工具，目的是逃过版主或管理员的匆匆一瞥。ROT13 也是过去在古罗马开发的凯撒密码的一种变体。ROT13是它自身的逆反，即：要还原成原文只要使用同一算法即可得，故同样的操作可用于加密与解密。该算法并没有提供真正密码学上的保全，故它不应该被用于需要保全的用途上。它常常被当作弱加密示例的典型。

应用ROT13到一段文字上仅仅只需要检查字母顺序并取代它在13位之后的对应字母，有需要超过时则重新绕回26英文字母开头即可。A换成N、B换成O、依此类推到M换成Z，然后串行反转：N换成A、O换成B、最后Z换成M（如图所示）。只有这些出现在英文字母里的字符受影响；数字、符号、空白字符以及所有其他字符都不变。替换后的字母大小写保持不变。

 

例如，下面的英文笑话，精华句被ROT13所隐匿：

How can you tell an extrovert from an

introvert at NSA? Va gur ryringbef,

gur rkgebireg ybbxf ng gur BGURE thl'f fubrf.

通过ROT13转换，该笑话的解答揭露如下：

Ubj pna lbh gryy na rkgebireg sebz na

vagebireg ng AFN? In the elevators,

the extrovert looks at the OTHER guy's shoes.

第二次使用ROT13将恢复为原文。

Input 

第1行：一个整数T（1≤T≤10）为问题数。

接下来共T行。每行为长度不超过1000个字符的一段文字。内含大小写字母、空格、数字和各种符号等。

Output 

对于每个问题，输出一行问题的编号（0开始编号，格式：case #0: 等）。

然后对应每个问题在一行中输出经过ROT13加密后的一段文字。

Sample Input 

3

How can you tell an extrovert from an

introvert at NSA? Va gur ryringbef,

gur rkgebireg ybbxf ng gur BGURE thl'f fubrf.

Sample Output 

case #0:

Ubj pna lbh gryy na rkgebireg sebz na

case #1:

vagebireg ng AFN? In the elevators,

case #2:

the extrovert looks at the OTHER guy's shoes.
## 代码 ##

```
#include<stdio.h>
#include<string.h>
char str[1010];
char tmp[1010];
int Encry(char x)
{
	int a,b;
	char tmp;
	b = x;
	a = x + 13;
	if(b >= 97 && b <= 122)
	{	
		if (a > 122)
		{
		a = a - 26;
		}
	}
	else if (b >= 65 && b <= 90)
	{
		if(a > 90)
		{
			a = a- 26;
		}
	}
	else
	{
	a =b;
	}
	return a;
}
int main()
{
	int cas = 0;
	int T;
	int num[1010];
	scanf("%d",&T);
	strcpy(str,"");
	while(T--)
	{
	while(strcmp(str,"")==0)
	gets(str);
	memset(num,0,sizeof(num[0]));
	int len = strlen(str);
	for(int i = 0;i < len;i ++)
	{
		num[i] = Encry(str[i]);
	}
	printf("case #%d:\n",cas++);
	for(int i = 0;i < len;i ++)
	{
		if(i == len - 1)
	{
		printf("%c\n",num[i]);
	}
	else
	{
		printf("%c",num[i]);
	}
	}
	strcpy(str,"");
}
return 0;
}
```