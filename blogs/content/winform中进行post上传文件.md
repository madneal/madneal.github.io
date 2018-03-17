winform中要上传文件到远程的服务器上面，我在本地用的是post方式传递数据，用的是HTTP协议，具体代码如下：
下面的代码就是一个上传的方法，参数需要路径和文件路径就可以了，我本地winform只需要提交post请求就可以了，止于对于post请求如何处理，那就是远程服务端的事情了。

```
        private string uploadFile(string uriAddress, string uploadfilePath)
        {
            HxSpecCore.SpectrumSet ss = new SpectrumSet();
            try
            {
                // 设置提交的相关参数 
                HttpWebRequest request = WebRequest.Create(uriAddress) as HttpWebRequest;
                Encoding myEncoding = Encoding.UTF8;
                request.Method = "POST";
                WebHeaderCollection headers = request.Headers;
  

                //提交请求数据
                FileInfo fi = new FileInfo(uploadfilePath);
                FileStream fs = new FileStream(uploadfilePath, FileMode.Open, FileAccess.Read);
                byte[] postData = new byte[(int)fs.Length];
                request.Headers.Set("md5data", Convert.ToBase64String(GetMD5(Convert.ToBase64String(GetMD5(Encoding.Default.GetString(postData))) )));
                fs.Read(postData, 0, Convert.ToInt32(fs.Length));
                fs.Close();
                System.IO.Stream outputStream = request.GetRequestStream();
                outputStream.Write(postData, 0, postData.Length);
                outputStream.Close();
                HttpWebResponse response;
                Stream responseStream;
                response = request.GetResponse() as HttpWebResponse;
                responseStream = response.GetResponseStream();
                System.IO.StreamReader reader = new System.IO.StreamReader(responseStream, Encoding.GetEncoding("UTF-8"));
                string result = reader.ReadToEnd();
                reader.Close();
                return result;
            }
            catch (Exception ex)
            {
                return " ";
            }
        }

```