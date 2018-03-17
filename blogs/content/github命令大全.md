github是一种开源的版本控制工具，现在已经得到很多人的应用。所以想介绍一下github的一些使用。
## github安装 ##
github提供了桌面客户端，我们也可以通过命令行的方式来进行控制。
windows
https://windows.github.com
mac
https://mac.github.com
## 配置工具 ##
对于本地版本配置用户信息
```
git config --global user.name "username"
git config --global user.email "email"
```
上面的分别是设置用户名和邮箱
## 建立版本库 ##
```
git init project-name
//create a new local repost with the specified name
git clone url
//download a project and its entire version history
```
## 提交变化版本 ##

```
git status
// list all new of modified files to be committed
git diff
//show file differences not yet staged
git add file
//snapshot the file in preparation for versioning
git diff --staged
//show file difference between staging and the last file version
git reset file
//unstage the file, but preserve its contents
git commit -m "description message"

```
## 群组版本控制 ##
```
git branch
//list all local branches in the current respority
git branch branch-name
//create a new branch
git checkout branch-name
//switch to the specific branch and update the working directory
git merge branch
//combine the specified branch's history into the current branch
git branch -d branch-name
//delete the specified branch
```
## 重构文件名 ##
```
git rm [file]
//delete the file from the working directory and stage the deletion
git rm --cached [file]
//remove the file from version control but pressure the file locally
git mv [file-origin] [file-renamed]
//change the file name and prepare it for commit
```
## 排除版本控制 ##

```
*.log
build/
temp-*
```
以.log为结尾的文件都不会被进行版本控制
```
git ls-files --other --ignored --exclude-standard
//list all ignored files in the project
```

```
git stash
//temprarily store all modified tracked files
git stash pop
//restore the most recently stashed files
git stash list 
//list all stashed changesets
git stash drop
//discard the most recently stashed changeset
```

```
git log
//list version history for the current branch
git log --follow [file]
list version history for a file
git diff [first-branch]...[second-branch]
//show content differences between two branches
git showw [commit]
//output metadata and content change of the specified commit
```

```
git reset [commit]
//undo all commits after[commit],preserve changes locally
git reset --hard [commit]
//discard all history and changes back to the specified commit
```

```
git fetch [bookmark]
//download all history from the respority bookmark
git merge ［bookmark]
```