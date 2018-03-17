因为要对combobox实现模糊查询，因为系统实现的匹配只能从左到右进行匹配，所以利用两个list来进行模糊匹配，主要代码如下：

```
        List<string> listOnit = new List<string>(); //绑定原始数据源
        List<string> listNew = new List<string>(); 

        private void comboBox1_TextUpdate(object sender, EventArgs e)
        {
                this.comboBox1.Items.Clear();
                listNew.Clear();
                //在原始数据源中遍历，把包含当前输入的内容添加到listNew中
                foreach (string item in listOnit)
                {
                    if (item.Contains(this.comboBox1.Text))
                    {
                        listNew.Add(item);
                    }
                }
                    this.comboBox1.Items.AddRange(listNew.ToArray());
                    this.comboBox1.SelectionStart = this.comboBox1.Text.Length;
                    Cursor = Cursors.Default;
                    this.comboBox1.DroppedDown = true;
        }
```
这个代码可以实现模糊匹配，但是有个诡异的错误，就是当你输入某些内容先匹配到，但是最后却没有匹配项就会报错。打个比方，你想输入“张四”，数据源中有“张三”，你先输入“张”，然后出现所有带有“张”的匹配项，然后你在输入“四”，则没有了匹配项，则会出现报错，报错信息如下:

```
************** 异常文本 **************
System.ArgumentOutOfRangeException: InvalidArgument=“0”的值对于“index”无效。
参数名: index
   在 System.Windows.Forms.ComboBox.ObjectCollection.get_Item(Int32 index)
   在 System.Windows.Forms.ComboBox.get_Text()
   在 System.Windows.Forms.ComboBox.WmReflectCommand(Message& m)
   在 System.Windows.Forms.ComboBox.WndProc(Message& m)
   在 System.Windows.Forms.NativeWindow.Callback(IntPtr hWnd, Int32 msg, IntPtr wparam, IntPtr lparam)
```
我在网上找，一直找不到原因，我也找不到这个问题具体错在什么地方。要吐槽的是这个Textupdate事件根本没办法调试，因为当你输入第一个字匹配之后，他就会默认选择第一项从而进入selectchange事件，也就没办法调试了，后来苦苦思索终于想到一个解决方法，虽然不知道原因，但终究还是解决了。就是当combobox没有匹配项的时候，就在它的下拉框添加空字符串，这样就能组织报错了，稍微改了一下代码就可以了。

```
        private void comboBox1_TextUpdate(object sender, EventArgs e)
        {
                this.comboBox1.Items.Clear();
                listNew.Clear();
                foreach (string item in listOnit)
                {
                    if (item.Contains(this.comboBox1.Text))
                    {
                        listNew.Add(item);
                    }
                }
                if (listNew.Count != 0)
                {
                    this.comboBox1.Items.AddRange(listNew.ToArray());
                    this.comboBox1.SelectionStart = this.comboBox1.Text.Length;
                    Cursor = Cursors.Default;
                    this.comboBox1.DroppedDown = true;
                }
                else
                {
                    this.comboBox1.Items.Add("");
                    this.comboBox1.SelectionStart = this.comboBox1.Text.Length;
                }
        }
```