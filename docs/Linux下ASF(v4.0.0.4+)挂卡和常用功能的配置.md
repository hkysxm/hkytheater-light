这几天服务器上的旧版ASF(v3.0+)忽然登不上帐号了，正好steam涤尘送春活动需要，因此重新配置一下新版的ASF。



----------
新版ASF特性：支持命令、可以通过steam组远程控制linux主机上ASF的行为，不需要登录终端进行操作了

[scode type="yellow"]由于大家都懂的原因，steam社区功能在国内使用不畅，因此推荐使用非大陆的主机。[/scode]

本文操作环境：CentOS7，其他Linux系统请自行替换部分命令

##安装依赖

解压ASF需要unzip，断开SSH保持程序活动需要screen，没有装的同学需要先安装
```yum -y install unzip screen```

ASF需要.NET运行环境，不过.NET也需要一些依赖，这里使用.NET官方提供的一键安装脚本安装最新的稳定版本
```
# 下载脚本
wget https://dot.net/v1/dotnet-install.sh

# 下载完成后执行安装
./dotnet-install.sh --channel LTS
```
[scode type="blue"]注意：曾经巨硬官方并不是这样安装的，所以上面的方法我没试过，不能保证直接成功，遇到问题就善用百度吧（雾）[/scode]


##下载安装ASF

###下载

 [点击前往github寻找目前最新版本的ASF][1]，通常为ASF-linux-x64.zip，复制链接地址。

将对应版本的ASF下载到服务器上(以4.0.1.9的64位版本为例）
```
wget https://github.com/JustArchiNET/ArchiSteamFarm/releases/download/4.0.1.9/ASF-linux-x64.zip
```

###安装并进入程序文件夹
根据官方文档，每次更新时均会删除ASF所在目录下的所有文件，所以需要将ASF放在单独的文件夹中。

```
mkdir ASF
unzip ASF-linux-x64.zip -d ASF
chmod +x ArchiSteamFarm
cd ASF
```


##配置steam组控制
steam曾经只提供IPC控制方法，需要telegram帐号或steam小号，有诸多不便。现在使用steam组控制，不需要额外的帐号，更加便捷。

在steam个人资料中，找到组-创建组。记得不要勾选“公共组”。
![创建组][2]
![caution][3]
进入创建的steam组，此时地址栏应该是这样的：

`https://steamcommunity.com/groups/<GroupName>`

在上述地址后加上`/memberslistxml/?xml=1`，打开这个地址，会显示类似下图的界面：
![XML][4]
`<groupid64> </groupid64>`内即为组的64位ID；`<steamID64> </steamID64>`内即为你的steam帐户64位ID。

PS：64位ID**并不是64位数**

保存你的组ID和帐户ID，用来配置文件。


##设置配置文件

###生成主程序和BOT配置文件

前往[ASF配置文件生成器][5]，先生成主程序配置文件，输入64位ID即可。

接下来生成BOT（机器人）配置文件，输入BOT名、steam登录帐号、密码。SteamParentalCode不需要填。

下载会得到两个文件：ASF.json和 你的BOT名.json，为了支持通过steam组控制，需要对两个文件进行修改。

在ASF.json文末增加一行，让ASF支持执行命令
```
SteamOwnerID:【你的64位ID】
```

复制ID，编辑 你的BOT名.json，在文末加入下面两行：
```
  "ShutdownOnFarmingFinished":false,
  "SteamMasterClanID":【你的组64位ID，不需要加引号】
```
保存文件退出，将两个文件都放进ASF的config文件夹中。

现在可以运行你的ASF了。


##运行＆功能测试

为了使ASF不在断开SSH连接时自动关闭，需要将ASF运行在screen中。

在ASF主目录下建立新screen，运行：
```
screen -R asf
./ArchiSteamFarm
```
打开ASF，待登录上steam帐号后，按**c**可以唤出命令行。

 > ASF支持的命令：https://github.com/JustArchiNET/ArchiSteamFarm/wiki/Commands-zh-CN#命令-1

常用命令：

 - `addlicense <Bots> <GameIDs>` ：为指定机器人激活给定的 AppIDs（Steam 网络）或 SubIDs（Steam 商店），仅免费游戏有效。
 - `play <Bots> <AppIDs,GameName>`：切换到手动挂卡——使指定机器人运行给定的 AppIDs，并且可选自定义 GameName 为游戏名称。 使用 resume 以返回自动挂卡模式。
 - `redeem <Bots> <Keys>`：为指定机器人激活给定的游戏序列号或钱包充值码。
 - `restart`：重新启动 ASF 进程。
 - `resume <Bots>`：恢复指定机器人的自动挂卡进程。


按Ctrl+A，再按D，即可将当前screen挂在后台。

测试完Linux端，断开SSH连接，我们再来测试一下通过组发送命令。
[scode type="blue"]注意：组命令需要加上叹号 **！** [/scode]
![组][6]
运行指定游戏、恢复挂卡均正常，以后只要服务器端不出问题，就能通过组聊天控制ASF了。
 


----------


本文参考了steamcn的帖子：[【教程向】使用ASF完成“涤尘送春”活动][7],感谢社区dalao的教程


  [1]: https://github.com/JustArchiNET/ArchiSteamFarm/releases/latest
  [2]: /img/190506.png
  [3]: /img/190507.png
  [4]: /img/190508.png
  [5]: https://justarchinet.github.io/ASF-WebConfigGenerator/#/asf
  [6]: /img/190509.png
  [7]: https://steamcn.com/t390645-1-1