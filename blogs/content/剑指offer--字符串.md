C/C++中每个字符串都以字符'\0'作为结尾，这样我们就可以很方便的找到字符串最后的尾部。由于这个特点，每个字符串中都有一个额外字符的开销，稍不留神就会造成字符串的越界。
为了节省内存，C/C++把常量字符串放到单独的一个内存取余。当几个指针赋值给相同的常量字符串时，它们实际上会指向相同的内存地址。

```
int main()
{
	char str1[] = "hello world";
	char str2[] = "hello world";

	char* str3 = "hello world";
	char* str4 = "hello world";

	if(str1 == str2)
		printf("str1 and str2 are same.\n");
	else
		printf("str1 and str2 are not same.\n");

	if(str3 == str4)
		printf("str3 and str4 are same.\n");
	else
		printf("str3 and str4 are not same.\n");

	return 0;
}
```
str1和str2是两个字符串数组，我们会为它们分配两个长度为12个字节的空间，并把"hello world"的内容复制上去。这是两个初始地址不同的数组，因此str1和str2的值也不相同。
str3和str4是两个指针，我们无须为它们分配内存以存储字符串的内容，而只需要把它们指向"hello world"在内存中的地址就可以了。由于"hello world"是常量字符串，它在内存中只有一个拷贝，因此str3和str4指向的是同一个地址。

在C#中，封装字符串的类型System.String有一个非常特殊的性质：String中的内容是不能改变的。一旦试图改变String的内容，就会产生一个新的实例。

```
String str = "hello";
str.ToUpper();
str.Inser(0,"world");
```
虽然我们对str做了ToUpper和Insert两个操作，但操作的结果都是生一个新的String实例并在返回值中返回，str本身的内容都不会发生改变，因此str最终的内容不变。由此可见，试图多次改变String的内容，改变之后的值只可以通过返回值得到。用String做连续多次修改，每一次修改都会产生一个临时对象，这样开销太大。为此C#定义一个新的与字符串相关的类型StringBuilder，它能容纳修改后的结果。