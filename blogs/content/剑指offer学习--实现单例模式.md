只能生成一个实例的类是为了实现单例模式的类型。
## 加同步锁前后两次判断实例是否已存在 ##
我们只是在实例还没有创建之前加锁操作，以保证只有一个线程创建出实例。而当实例已经创建之后，我们已经不需要再做加锁操作了。

```
public sealed class Singleton
{
	private Singelton()
	{
	}
private static object syncObj = new object();

private static Singleton instance = null;
public static Singleton Instance
{
	get
	{
		if (instance == null)
		{
			locak(syncObj)
			{
				if (instance == null)
					instance = new Singleton();				
			}
		}
		return instance;
	}
}
}
```
## 利用静态构造函数 ##

```
public seled class Singleton
{
	private Singelton()
	{
	}

	private static Singleton instance = new Singleton();
	public static Singleton Instance
	{
		get
		{
			return instance;
		}
	}
}
```
由于C#中调用静态构造函数时初始化静态变量，.NET运行时能够保证只调用一次静态构造函数，这样我们就能够保证只初始化一次instance。C#中调用静态构造函数的时机不是由程序员掌控的，而是当.NET运行时发现第一使用一个类型的时候自动调用该类型的静态构造函数。在Singleton中，实例instance并不是第一次调用属性Singleton.Instance的时候创建的，而是在第一次用到Singleton的时候就会被创建。
## 实现按需创建实例 ##

```
public sealed class Singleton
{
	Singleton()
	{
	}

	public static Singleton Instance;
	{
		get
		{
			return Nested.instance;
		}
	}

	class Nested
	{
		static Nested()
		{
		}
		internal static readonly Singleton instance = new Singleton();
	}
}
```