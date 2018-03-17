

visual studio崩溃
---------------

你是不是经常会遇到一编辑combox，visual studio就会立马崩溃。一直都无法理解是什么原因，然后后来发现居然是因为有道的截屏翻译，关掉截屏翻译就好了。

combox绑定数据源
-----------

 

```
            SqliteDataReader dr;
            if (dr.Read())
            {
                this.comboBox1.Items.Add(dr[0]);
            }
```

自动补全的功能
-------

 我们希望在combox中实现输入的时候，有推荐的文本自动补全功能。我们主要只需要设置AutoCompleteMode和AutoCompleteSource这两个属性就可以了。
 
## 模糊查询 ##
上面那个自动补全的功能只能实现从左到右进行匹配，而不能进行模糊匹配。假设我们的combobox里面有“张三“，如果输入”张“可以进行匹配，但是我们如果输入”三“的话就无法实现匹配，而combobox自身并没有这个属性，所以我们需要自己写一个方法来实现。

```
        List<string> listOnit = new List<string>();
        List<string> listNew = new List<string>();
        
        //用于模糊查询
        private void BindComboBox()
        {
            string str = "select License from tb_drug";
            SQLiteDataReader sdr = sh.getcom(str);
            while (sdr.Read())
            {
                if (sdr[0].ToString() != " " && sdr[0].ToString() != null)
                    listOnit.Add(sdr[0].ToString());               
            }
            sdr.Close();
            this.comboBox1.Items.AddRange(listOnit.ToArray());
        }

        private void comboBox1_TextUpdate(object sender, EventArgs e)
        {
            this.comboBox1.Items.Clear();
            listNew.Clear();
            foreach (var item in listOnit)
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