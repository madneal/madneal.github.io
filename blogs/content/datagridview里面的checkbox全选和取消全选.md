## 全选 ##
设置全选button，选中所有的checkbox

```
        private void selectAll_Click(object sender, EventArgs e)
        {
        //遍历datagridview中的每一行，判断是否选中，若为选中，则选中
            for (int i = 0; i < dataGridView1.Rows.Count; i++)
            {
                if ((Convert.ToBoolean(dataGridView1.Rows[i].Cells[0].Value) == false))
                {
                    dataGridView1.Rows[i].Cells[0].Value = "True";
                }
                else
                    continue;
            }
        }
```

## 取消全选 ##
设置取消全选button，取消选中的所有checkbox

```
        private void cancelAll_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < dataGridView1.Rows.Count; i++)
            {
                if ((Convert.ToBoolean(dataGridView1.Rows[i].Cells[0].Value) == true))
                {
                    dataGridView1.Rows[i].Cells[0].Value = "False";
                }
                else
                    continue;
            }
        }
```