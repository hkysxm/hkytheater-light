坏了就是坏了


# 事由
VIOS 系统盘损坏出现问题，计划对一个 VIOS 进行重装，重装前收集一些相关信息。

使用了 HMC 内的 Configuration > Virtual Resources > Virtual Storage Management 查看 VIOS 磁盘链路。
查询命令执行了几分钟还是未完成，由于查询完成前窗口无法关闭（关了会自动重新打开），故直接注销了 HMC 图形界面。
片刻后听到系统发来对应 VIOS file system 满了的消息。


# 分析和解决
登录分区 df 查看，发现根目录已满。

```shell
# df -g
Filesystem  GB blocks    Free %Used   IUsed IUsed% Mounted on
/dev/hd4         2.00    0.00  100%   12800    89% /
...
```

VIOS 的文件系统占用到 100%，会导致不可预知的后果。
根目录（/）满了会导致无法执行 padmin 相关命令、使用 LPM 功能、登录 padmin 用户等。
无法执行 padmin 命令的例子如下：

```shell
$ mkvdev -vdev hdisk100 -vadapter vhost12
Some error messages may contain invalid information
for the Virtual I/O Server environment.
mkdev: 0514-548 Cannot perform the requested function because
    the / filesystem is full or is out of inodes.
```

来源：<https://www.ibm.com/support/pages/diagnosing-full-file-systems-powervm-vios>

解决了文件系统爆满的问题后，继续看是哪些文件占满了根目录。

在 HMC 上执行磁盘查询的当天，根目录下出现了了多个 `.stderr` 标准错误输出，几个文件直接撑爆了根目录。


应急解决方法：root 权限 (padmin) 执行扩容：

`chfs -a size=+ 5G /`

注意：VIOS 的 `/home` 目录不支持扩容。

 `ps aux` 筛选对应时间节点的进程 `kill` 掉。`find /<full_file_system_name> -ctime 1` 亦可查看一天之内发生更改的文件。
`du -sh /var/* | sort -nr` 按大小排序文件。然而 AIX 只能用 `du -sm`

观察空间占用是否还会继续上升。继续上升可能进程是由 hmc 不停尝试发起的，建议在 hmc `kill` 掉对应进程和父进程。

HMC 的查询虚拟存储命令会直接在对应的分区以 root 用户执行 `/usr/ios/cli/ioscli` 系列命令。

这次是因为 VIOS 使用的系统磁盘已经损坏，文件系统出现问题，执行 `/usr/ios/cli/ioscli` 系列命令会不断发生错误。

如果命令不结束（看起来注销掉 HMC 的图形界面并不会结束已经开始执行的命令？）或者不断重试执行，会导致文件系统不断的被填满，最终导致无可用空间，需要结束对应 hmc 命令后重启 VIOS。



hmc 查询执行的命令：
图形界面 > Serviceability > Console Events Logs 

不知道是否可用的：
Users and Security > Users and Roles -> Manage Users and Tasks
Find the task and select it then "Terminate"