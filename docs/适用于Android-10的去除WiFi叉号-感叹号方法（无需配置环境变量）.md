老生常谈，新手机重新配置用，不去掉部分情况下在有无线网的时间仍然会跑移动数据；旧方法在Android10上同样生效。
环境：Windows


参考：[原生安卓WiFi信号去叹号去叉教程5.0-Android P][1] 

###事前准备
### 下载adb
[scode type="blue"]在有root权限的手机上也可以进行文中的操作，去掉每一句前的`adb shell`，打开终端（3c toolbox等软件里有）直接从settings开始输入即可；不过有root直接找相关软件不是更方便吗（[/scode]

https://developer.android.com/studio/releases/platform-tools
（可能无法访问，有空附上云盘链接）

### 手机打开USB调试并授权

开发者选项里，不了解请自行百度，打开后连接电脑并同意USB调试。

### 启动ADB

由于大部分人很少使用ADB，就不进行PATH配置了。解压下载好的压缩包，在根目录**shift+右击**选择“在此处打开Powershell窗口”即可，如图。
![adb][2]
因为未配置环境变量，所以每条命令前需要加上 `.\` 。

### 需要的命令
[scode type="blue"]如果您已经配置了adb环境变量或是安装了Android Studio，无需在每条命令前加上`.\`[/scode]

#### 删除变量＆关闭检测
```
.\adb shell settings delete global captive_portal_mode
.\adb shell settings put global captive_portal_mode 0 （注：Android 8 不需要执行这一条）
```
 > 执行上述两条命令中，可能会出现
 > ** *daemon not running; starting now at tcp:5037 **
 > ** *daemon started successfully **
 > 证明adb已经成功连接上手机（TCP端口不一定相同），无影响。

执行`.\adb shell settings get global captive_portal_mode`，返回结果应为`0`。


#### 删除并修改验证服务器

这里修改为小米的验证服务器，在国内应该是延迟最低的。另有其他选择，可自行替换：

华为： connectivitycheck.platform.hicloud.com/generate_204
Vivo： wifi.vivo.com.cn/generate_204
Google 大陆： g.cn/generate_204 
Cloudflare： cp.cloudflare.com/generate_204

> 评论区提供的其他验证服务器，应该也是有效的
> 曦醬：安卓有国内网站的，只要把**com改成cn**就是安卓中国了
> maidmeow4：国内还可以用 **connectivitycheck.gstatic.com / www.gstatic.com / ssl.gstatic.com** ，国内会自动解析到北京Google那边，在境外的话又能解析到Google全球网络去。



```
.\adb shell settings delete global captive_portal_https_url
.\adb shell settings delete global captive_portal_http_url

.\adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
.\adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204

```

### 测试

```
>adb shell settings get global captive_portal_mode
高版本 Android：null
低版本 Android 未执行 `adb shell settings put global captive_portal_mode 0` 的，应为 1
> adb shell settings get global captive_portal_http_url
返回上面设置的 http 验证地址
>adb shell settings get global captive_portal_https_url
返回上面设置的 https 验证地址
```


完成后，断开手机和计算机的连接，打开飞行模式稍等后关闭，WiFi图标上的叹号/叉号即消失。


  [1]: https://www.evil42.com/index.php/archives/17/
  [2]: https://hky.moe/img/200101.png#vwid=1824&vhei=1189