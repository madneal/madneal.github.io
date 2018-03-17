项目中需要用Sftp上传下载文件，通过jsch中的sftp实现。代码上了服务器之后，发觉服务器多了很多进程没有被关闭。
![这里写图片描述](http://img.blog.csdn.net/20160728170459770)
连接sftp代码：
```
 protected boolean connectToServer() {
        try {
            JSch jsch = new JSch();
            jsch.getSession(userName, hostname, port);
            Session sshSession = jsch.getSession(userName, hostname, port);
            logger.debug("HostName:" + hostname + "|Port:" + port);
            logger.debug("Session created");
            sshSession.setPassword(password);
            Properties sshConfig = new Properties();
            sshConfig.put("StrictHostKeyChecking", "no");
            sshSession.setConfig(sshConfig);
            sshSession.setTimeout(TIMEOUT); //ms
            sshSession.connect();
            sftp = (ChannelSftp) sshSession.openChannel("sftp");
            sftp.connect();
            if (!sftp.isConnected()) {
                logger.error("Failed to connect FTP server " + hostname);
                return false;
            }
            logger.debug("Username:" + userName + "|Password:" + password);
        } catch (Exception ex) {
            logger.error(ex);
        }
        return true;
    }
```
 其实每次执行完都会
 ```
 sftp.quit();
 sftp.disconnet();
 ```
 但是进程还是在，后来觉得应该是session没有关闭。后来证明的确是这样的，虽然sftp退出了，但是session还是存在的。解决办法很简单，只要在`sftp.quit()` 之前加上 `sftp.getSession().disconnect()` 就可以了。