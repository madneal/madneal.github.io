在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都是按照从上到下递增的顺序排序。请设计一个函数，输入这样的一个二维数组和一个整数，判断数组是否含有这个整数。
1		2		8		9
2		4		9		12	
4		7		10		13
6		8		11		15
我们可以发现以下规律：首先选取数组右上角的数字。如果这个数字是要寻找的数字，则返回结果。若这个数字大于我们要寻找的数字，则去除这个数字所在的列；若这个数字小于我们要寻找的数字，则去除这个数字所在的行。也就是说如果查找的数字不在数组的右上角，则每一次都在数组查找范围中剔除一行或者一列，这样每一步都可以缩小查找的范围了，直到找到需要查找的数字或者查找的范围为空。

从另外一个角度看，从左下角的数字来看，如果这个数字大于查找的数字，则剔除该行，若这个数字小于查找的数字，则剔除该列。
```
bool Find(int* matrix,int rows,int cols,int num)
{
	bool found = false;
	if (matrix != null && rows > 0 && cols > 0)
	{
		int row = 0;
		int col = cols - 1;
		while(row < rows && col >= 0)
		{
			if (matrix[row*cols + col] == num)
			{
				found = true;
				break;
			}
			else if(matrix[row*cols + col] > num)
			-- col;
			else
			++ row;
		}
	}
	return found;
}
```

