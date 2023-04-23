自行翻日志是吧，不愧是 Dev 频道



------------------
台式机一直在 Win 11 Dev 频道，今年开始就间歇出现更新失败回滚的情况，目前是 22563 版本，升级均显示错误代码0xC1900101，无后缀，切成 beta 频道升级也无效。

![0xC1900101][1]

本来准备持续更新的小白鼠文章还因此鸽了，同样在 Dev 频道的 Surface 反而一路升上去了。

现在被封在小区正好捞出来研究研究，虽然最后没有解决问题，但是方法姑且可以拿来参考

------------------
### 常用方法
`sfc /scannow`，`DISM.exe /Online /Cleanup-image /Restorehealth` 删除更新包重新下载等，百度一堆


### 微软官方工具 **SetupDiag**

 获取地址：<https://docs.microsoft.com/en-us/windows/deployment/upgrade/setupdiag>

 运行后，在工具所在目录下会生成 SetupDiagResults.log 文件和 log.zip，看起来比较简洁


### `Get-WindowsUpdateLog` 获取 WindowsUpdate.log
 整合后的文件位于桌面。发生回滚的情况下，这个文档只记录了回滚后的内容，似乎用处不大？
 ```powershell
PS C:\Users\hky> Get-WindowsUpdateLog                                                                                                                                                                                                      

Please wait for all of conversions to complete...


================ Results from WULog_0 ================

输入
----------------
文件:
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.19.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.20.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.21.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.22.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.23.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.24.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.222611.216.25.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.231510.917.1.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.233712.941.1.etl
     C:\WINDOWS\logs\WindowsUpdate\WindowsUpdate.20220408.234727.537.1.etl

100.00%

输出
----------------
转储文件:        C:\Users\a3132\AppData\Local\Temp\WindowsUpdateLog\wuetl.XML.tmp.68fb7f8e-d26a-4557-b919-8fa50c0a9832.00000
警告:
某些事件与架构不匹配。
请使用 -lr 重新运行此命令以得到较少限制的 XML 转储
命令成功结束。

==================================================


WindowsUpdate.log written to D:\OneDrive\桌面\WindowsUpdate.log
 ```

### OTA 更新日志

 位于 **C:\$WINDOWS.~BT\Sources\Panther**

 `WinSetupMon.log` `setupact.log`(`setuperr.log`)  `diagwrn.xml` `diagerr.xml` 等

 C:\$Windows.~WS\Sources\Panther 文件夹内保留了先前一次的更新日志

### 下载完整镜像，重新安装

 完整镜像可以避免在线下载文件异常问题，并且安装失败的错误说明更详细。

 这次通过出现的 0xC1900101 - 0x4001C 终于 Google 到 Microsoft Techcommunity 上的相同事例，官方人员表示一部分用户会遇到升级不上去的问题，还没修，继续等新版本?


### 结论
闲着没事不要当小白鼠

  [1]: https://hky.moe/img/220400.jpg#vwid=753&vhei=221