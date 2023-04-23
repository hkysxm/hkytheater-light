每次重装系统后都会忘掉，记下来



重装系统＆配置好ssh密钥后，git提交更改会遇到如下问题

```
remote: error: GH007: Your push would publish a private email address.
remote: You can make your email public or disable this protection by visiting:
remote: http://github.com/settings/emails
To github.com:000000000000/hkytheater.git
 ! [remote rejected] master -> master (push declined due to email privacy restrictions)
error: failed to push some refs to 'git@github.com:0000000/hkytheater.git'
```

原因是习惯性把`git config --global user.email`设置成了github邮箱，而我们又设置了邮箱隐私，因此必须提交到github提供的noreply.github.com邮箱。
这里有两种不同的选择：一是直接取消该设置，或更改提交到的邮箱地址。配置页面均为https://github.com/settings/emails 。

### 取消邮箱隐私设置（可能会暴露真实邮箱）
找到**Block command line pushes that expose my email**，取消勾选前方复选框即可，如下图。

![email settings][1]

### 使用隐私邮箱进行更改提交
如上图，找到**Keep my email addresses private**，可以提交的邮箱即为下方小字加粗的邮箱地址。在git bash中执行`git config --global user.email "隐私邮箱地址"` 即可。

在git中更改邮箱后，有时仍然会出现提交失败的情况，此时需要刷新一下提交者信息
```
 git commit --amend --reset-author
```
该命令会自动提交当前已经进行的修改，在此之后就可以正常提交了。


  [1]: https://hky.moe/img/191201.png