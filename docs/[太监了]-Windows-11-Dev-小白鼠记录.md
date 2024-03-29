把家里的台式和手上的 Surface Pro 6 都升到了 Win 11。记录自己遇到的 bug、问题、个人认为不好的改动和找到的非第三方解决方案。


> 家里的台式忽然升不上去了，更新半小时自动回滚，重试一样，不愧是阿三搞的系统

Windows 预览体验计划可以在系统自带的反馈中心里进行问题反馈，也可以在官方论坛直接 upvote 遇到同样问题的帖子。
本文按 Dev 版本划分，已解决问题会标记，早期版本预计会折叠。

## 22000.51
### 问题：

 - 任务栏时间不能显示秒了，Win 10 修改注册表的方法已失效，不恢复成默认键值还会导致用不了新版的资源管理器

 - 点击时间日期显示的日历也不显示秒了

 - *已修复*~~显示桌面按钮不在任务栏最右下角，偏了几个像素，且无法预览~~

 - 全屏时左上角返回和右上角关闭距屏幕边缘有几个像素偏差

 - （触控）从屏幕左边缘向内滑动调出的是小组件，目前没有找到新的单指调出进程管理的方法、Surface Pro 6 在系统设置里找不到自定义手势的页面，在 reddit 上看到其他人的带触控板设备有高级选项
  > 目前测试出来的手势
  > - 三指下滑最小化、三指上划最大化、
  > - 三指横滑切换程序
  > - 四指缩小桌面管理、四指放大切换当前进程所在桌面（？）


### BUG：

 - *已修复*~~ALT + TAB 切换程序时一定几率会停留在切换页面，需要再按一次~~

 - 桌面右键菜单闪烁

 - 设置页面文字可能白屏

 - 最大化最小化关闭按钮有时和标题栏同为浅色，不好辨别
  - 临时解决：桌面右键 -> 个性化 -> 在标题栏和窗口边框上显示强调色 -> 关

 - *已修复*~~多显示器下非主显示器任务栏为空~~

 - 任务栏在切换语言时，可能闪烁

 - 资源管理器显示为旧版
  - 取消让任务栏时钟显示秒的注册表修改

 - 禁用了微软拼音在升级到 Win 11 后又重新出现且不能删除
  - 设置 -> Time ＆ Language -> 语言＆区域 -> 中文简体 -> 语言选项 -> Add a keyboard —> 添加微软拼音后再移除

 - 连接到以前连接过显示器后，进程多次闪烁

 - UWP 在连接不同缩放比的屏幕时，UI 元素部分不显示

 - dwm.exe 有内存溢出情况，长时间不关机后提交内存甚至超过了 5 GB

 - GPU 驱动可能有问题，安装了官方驱动后，运行游戏相比 Win 10 会遇到更卡顿的情况

 - Win + S 的搜索功能，部分程序没有使用管理员权限运行选项

 - ~~XBOX 初代 USB 无线适配器驱动异常：该设备无法启动。 (代码 10)~~
   重新插拔适配器、重启之后正常了

### 相比 Windows 10 的改动：

 - 任务管理器必须右击开始图标才有了，以前右键任务栏任意空白处均可

 - **任务栏高度**默认 96 px（200% 缩放），Win 10 上是 75 px？
  - 注册表 `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced` 中添加 DWORD `TaskbarSi` 值 0、1、2 能对任务栏大小进行调整，但是仍然没有以前的 75 px（需重启资源管理器）

 - *方法失效*~~新版开始菜单，不熟悉的可以改回去~~
  - ~~注册表 `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced`中添加 DWORD `Start_ShowClassicMode` 值 1，重启资源管理器~~



## 22000.65
### BUG:
 - 任务栏网络音频时间按钮不在中间了
 - 副屏任务栏颜色不跟随主题色
 - 默认显示所有任务栏图标的设置被取消，且设置中已无此选项
 - *已修复*~~切换输入法时，切换窗口概率不消失~~
 - 从睡眠中唤醒时，任务栏运行的程序图标可能消失

### 可能的问题？
 - 在 Windows 10 上稳定运行的内存频率在 Windows 11 上似乎偶尔会带来卡顿


## 插一条 TF 卡掉卡问题的解决方法
  在 Windows 10 里的掉卡解决方法在升到 11 的时候因驱动全部更新了，需要重新配一下
  PS：个人实测只能降低掉卡几率，不能杜绝掉卡，至于为什么有这种情况就得问巨硬的工程师了

 > 开始菜单右键 -> 设备管理器
 > 通用串行总线控制器 -> Realtek USB 3.0 Card Reader
 > 右键 -> 更新驱动程序 -> 浏览我的电脑以查找驱动程序 -> 让我从计算机上的可用驱动程序列表中选取
 > 选择 USB 大容量存储设备 -> 下一页 -> 完成
 > 在 “此电脑” 确认 TF 卡盘的图标变了，如果对应的盘没了，禁用后再启用或者先自动更新驱动然后再重复上面步骤试试
 > 还是设备管理器，找到刚才的 USB 大容量存储设备 ->　右键属性 -> 电源管理
 > 取消 “允许计算机关闭此设备以节约电源“


## 22000.71
### BUG
 - *已修复*~~dwm.exe 崩溃更频繁了，尤其打开通知时~~

## 22000.100
## BUG
 - *已修复*~~UAC 弹出窗口文字异常，o、C 和中间的 yes 是啥情况？~~
 - *已修复*~~Windows Hello 不可用了，需要卸载设备后重启~~
 - 任务栏运行的程序预览标题字体变成了宋体
 - 通知中心可能卡住，一段时间后才出现
 - 资源管理器有时反应速度非常慢

## 22000.120
 - 任务栏图标闪烁时，系统占用会上升，在低配置设备上明显
 - 第三方中文输入法几率失效，切成其他输入法再切回来才可以解决
 - 续航相比上个版本有明显下降


## 22000.132
 - DWM.exe 闪退的几率更高了
 - 输入法切换时，键盘布局可能需要等待一秒后才消失


## 22000.160
 - 更新后，显示网络连接正常但是无法联网，驱动为微软提供的默认驱动，ping 测试一般故障，去主板厂商官网安装驱动后有线网络连接恢复，主板微星 B450M 迫击炮，网卡：Realtek® RTL8111H-CG Gigabit
- 在网卡流量大的时候？DWM.EXE 崩溃

## 22000.176/22499.1000
 - 疑似巨硬 NTP 服务器出现问题导致所有 Windows 11 测试用户出现任务栏问题，包括没升级的
 - 地址：[Win11 测试/预览版出现严重 Bug，任务栏没有响应、部分区域无法加载，微软称正在调查（附解决方法）](https://www.ithome.com/0/573/181.htm)

## 22454.1000
 - 此版本和上一版本，都出现了更新系统后自动关闭 OpenSSH SSH Server 服务且被切换成手动启动的情况，需要再跑到服务里去打开 
 - 索引被重建了，Surface 使用中发热严重，禁用了

## 22458.1000
 - SSH 服务又被关了
 - 修复了上个版本开始图标居中情况下不居中的问题
 - **从 Windows 10 开始，多年以来从未修复的 BUG：不同缩放比双屏下，UWP 软件 UI 组件显示缺失 的问题被解决了，可喜可贺**
 - 计算器等应用程序适配了新版的 Fluent Design 设计
 - 通知中心经常无法弹

## 22463.1000
 - 从前几个版本开始至今，每次都需要长时间等待重装，同时每次安装完之后被禁用的微软拼音又会重新被启用

##  22471.1000
 - 也是老问题，如果多显示器设置了不同的壁纸，更新后壁纸会恢复成和主屏幕一致
 - 休眠状态下，Windows 资源管理器不会停止运行且耗电严重
 - 在无线设备上，出现了 Wi-Fi 不定时自动断开的情况
 > 上面情况的原因是巨硬的网络连通性验证地址 <http://www.msftconnecttest.com/redirect> 被墻，连上网络后系统认为该网络不可用主动断开了网络。可以添加如下 `.reg` 格式文件并导入，重启后解决
 > ```
 > Windows Registry Editor Version 5.00
 > 
 > [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet]
 > "ActiveDnsProbeContent"="131.107.255.255"
 > "ActiveDnsProbeContentV6"="fd3e:4f5a:5b81::1"
 > "ActiveDnsProbeHost"="dns.msftncsi.com"
 > "ActiveDnsProbeHostV6"="dns.msftncsi.com"
 > "ActiveWebProbeContent"="Microsoft NCSI"
 > "ActiveWebProbeContentV6"="Microsoft NCSI"
 > "ActiveWebProbeHost"="www.msftncsi.com"
 > "ActiveWebProbeHostV6"="ipv6.msftncsi.com"
 > "ActiveWebProbePath"="ncsi.txt"
 > "ActiveWebProbePathV6"="ncsi.txt"
 > "EnableActiveProbing"=dword:00000001
 > "PassivePollPeriod"=dword:0000000f
 > "StaleThreshold"=dword:0000001e
 > "WebTimeout"=dword:00000023
 > 
 > [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet\ManualProxies]
 > ```


## 22478.1012
 - 需要进行 UAC 授权的程序，启动时间非常长（约 10 秒）
 - 任务管理器里，很多程进程不显示了，只能在详细信息看到，梦回 Win 7 
 - 任务栏图标偶尔会出现错位的情况

## 22483.1011
 - 似乎没有更新任何东西
 - DWM.EXE 长时间使用后提交的内存量过高
 - 开始菜单的搜索栏点了会卡住，无法输入
 - WSA 已经可以使用了

## 22489.1000
 - 待机掉电严重，原因不明
 - UAC 授权超级慢的现象不再发生

## 22494.1000
 - 一部分 UWP 软件在某些情况下会自动崩溃，如 TranslucentTB，Snipaste
 - display fusion 也会发生崩溃，导致任务栏重载

## 22499.1000
 - 看了下个版本的修复日志才发现大写锁定键盘灯不亮是 bug，我还以为是键盘出问题了，吔屎啦巨硬