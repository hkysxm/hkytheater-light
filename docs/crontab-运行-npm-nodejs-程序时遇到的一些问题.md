在服务器上配置 crontab 不执行、执行失败的问题

-------------------

买了个大盘鸡存 pixiv 的图，计划每天用 crontab 运行基于 nodejs 的程式来自动更新图片，结果第二天发现任务跑不起来。

插一个工具原地址，不过此工具已经不怎么更新了：[pxder](https://github.com/Tsuk1ko/pxder)

crontab 已经加上了完整地址：

`29 16 * * * /opt/nodejs/lib/node_modules/pxder/bin/pxder -f`

检查 root 下的 mail 有如下内容，位置 `var/spool/mail/root`：
```
# 去掉了一些无关内容
From root@Server  Thu Jan 21 03:29:01 2021
Received: (from root@localhost)
        by Server (8.14.7/8.14.7/Submit) id ;
        Thu, 21 Jan 2021 03:29:01 -0500
Date: Thu, 21 Jan 2021 03:29:01 -0500
Subject: Cron <root@Server> /opt/nodejs/lib/node_modules/pxder/bin/pxder -f
Auto-Submitted: auto-generated
X-Cron-Env: <XDG_SESSION_ID=62>
X-Cron-Env: <XDG_RUNTIME_DIR=/run/user/0>
X-Cron-Env: <LANG=en_US.UTF-8>
X-Cron-Env: <SHELL=/bin/sh>
X-Cron-Env: <HOME=/root>
X-Cron-Env: <PATH=/usr/bin:/bin>
X-Cron-Env: <LOGNAME=root>
X-Cron-Env: <USER=root>

/usr/bin/env: node: No such file or directory
```

两个问题：
 - 调整过时区但是执行时间仍然不对
 - 找不到 `node`

### 时间异常
`date` 命令返回正常 CST 时间，这时候想到了另一个 `timedatectl`，发现输出结果不对，crontab 以这个时间为准，需要修改。（注：环境为 CentOS）
```
[root@Server ~]# ls -l /etc/localtime
/etc/localtime -> ../usr/share/zoneinfo/America/New_York
# 修改软链接，改为中国时间
[root@Server ~]# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
[root@Server ~]# ls -l /etc/localtime
/etc/localtime -> /usr/share/zoneinfo/Asia/Shanghai

# 另一个方法，Debian 测试有效，CentOS 似乎也能用？
timedatectl set-timezone Asia/Shanghai
```
crontab 执行时间不一致的问题解决。

### `node` 找不到
在 mail 中的输出可以发现环境变量 `PATH=/usr/bin:/bin`，查阅了 stackoverflow 和国内一些论坛，结果最简单暴力的方法是直接在 crontab 里添加。
下面添加了所有常用的环境变量，环境也顺便换成了 bash，所以完整路径也可以不要了。
```
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin

55 1 * * * pxder -f >> /var/log/test.log
```
次日检查 log 文件，测试有效。