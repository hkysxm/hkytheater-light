Sony的Android9.0越来越接近原生，且删除了隐藏状态栏图标功能，导致蓝牙、闹钟等图标占据了状态栏不少空间，加上笔者的XZ1 Compact分辨率只有1280*720，通知一多状态栏就显得十分拥挤。于是就找到了SystemUI Tuner这款软件。

----------

**注意：不适用于MIUI EMUI等国产系统！**

> 2020.9更新：SystemUI Tuner升级了新的界面，下文的相关内容现在位于**Home-Interaction-Status bar-Icon Blacklist**中

##下载地址
GitHub：[SystemUITunerRedesign][1] 
Google Play链接：[SystemUI Tuner][2]
Apk Mirror：[SystemUI Tuner][3]
蓝奏云：[SystemUI Tuner 318][4]

##关于使用：
软件有两种使用方式：通过root权限（授权后即可直接使用）或在PC上使用adb指令激活。这里介绍一下adb方式。
手机打开USB调试，连接电脑，在ADB下输入如下指令：（没有安装ADB的请看后文。）

     adb shell pm grant com.zacharee1.systemuituner android.permission.WRITE_SECURE_SETTINGS
     adb shell pm grant com.zacharee1.systemuituner android.permission.PACKAGE_USAGE_STATS
     adb shell pm grant com.zacharee1.systemuituner android.permission.DUMP



###ADB的使用（Windows）：
[Google官方][5]/[v30.0（蓝奏云）][6]
（理论上安装了Android Studio的各位无需安装，可以直接在cmd测试adb指令是否有效。）
下载解压后可以选择配置环境变量或直接运行。
-直接运行：在文件夹内打开命令行（shift+右键→在此处打开cmd/Powershell窗口），在上文的每条命令前加上`.\`执行[[方法来源][7]]
-配置环境变量：右击计算机→属性→高级系统设置→环境变量
在系统变量中新建/编辑Path变量，值为ADB所在文件夹，如下图：![系统变量][8]![编辑环境变量][9]
配置完成后点击确定即可。

配置完后，就可以在APP内设置隐藏图标了。

##功能
点击***TO THE TWEAKS!*** 进入主界面（欢迎页可以在设置里取消）：
<img max src="/img/190205.png" title="点击查看完整图片">
在Status Bar中即可编辑状态栏上显示的图标。↑点击查看完整图片↓
<img max src="/img/190206.png" title="点击查看完整图片">

*PS:在某些设备上显示/隐藏图标时会出现旋转幕锁定图标（见下图），点击红字即可解决。*
![][10]


  [1]: https://github.com/zacharee/SystemUITunerRedesign
  [2]: https://play.google.com/store/apps/details?id=com.zacharee1.systemuituner
  [3]: https://www.apkmirror.com/apk/zachary-wander/systemui-tuner/
  [4]: https://wwa.lanzous.com/imygxgwv37e
  [5]: https://dl.google.com/android/repository/platform-tools-latest-windows.zip
  [6]: https://lanzous.com/ic2gpqb
  [7]: https://www.xda-developers.com/install-adb-windows-macos-linux/
  [8]: /img/190202.jpg
  [9]: /img/190203.jpg
  [10]: /img/190204.png