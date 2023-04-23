网上教程烂大街了，不过还是整理个自用版本，机器 K30S 至尊版，近年其他小米设备差别不大



---------------------

## 事前准备
 
 - 申请过解锁权限，安装小米官方解锁工具

 - PC 端 [ADB Tools](https://developer.android.com/studio/releases/platform-tools)

 - MIUI 欧版系统卡刷包：[MIUI ROM Releases | Xiaomi European Community | MIUI ROM Since 2010](https://xiaomi.eu/community/forums/miui-rom-releases.103/) 
   本文使用的欧版稳定版 MIUI 12: <https://sourceforge.net/projects/xiaomi-eu-multilang-miui-roms/files/xiaomi.eu/MIUI-STABLE-RELEASES/MIUIv12/>

 - recovery：[TWRP](https://twrp.me/Devices/)
   因为 TWRP 官网没找到 K30S Ultra，所以用了 xda 上找到的第三方修改版，同机型的可以用这个，亲测有效：[\[RECOVERY\]\[UNOFFICIAL\]\[3.5.2\]\[apollo\]TWRP for Mi 10T/Mi 10T Pro/Redmi K30S Ultra | XDA Forums](https://forum.xda-developers.com/t/recovery-unofficial-3-5-2-apollo-twrp-for-mi-10t-mi-10t-pro-redmi-k30s-ultra.4319809/)

 - magisk：[Releases · topjohnwu/Magisk](https://github.com/topjohnwu/Magisk/releases) 找最新版本的下载 **magisk.apk**，下载完后文件名改为 **magisk.zip**。只刷欧版系统不 root 的不用下这个

 - boot.img，root 用，提取自上面下载的系统卡刷包 zip 

## 解锁设备
请注意和部分厂商不同，小米手机只要解锁后就会清除所有数据

 1. 开发者选项 —— **OEM 解锁**打开 

 2. 开发者选项 —— **系统解锁状态**中绑定帐号和手机，手机里必须有 SIM 卡

 3. 手机关机，以 **FastBoot** 模式启动

 4. 打开 PC 端解锁工具，手机连接电脑进行解锁

## 刷入第三方 recovery

 1. **FastBoot** 模式启动手机，连接电脑

 2. 在 ADB 文件夹下启动 **cmd**，执行 `.\fastboot boot <twrp.img>`，配置过环境变量则不需要 `.\`，直接执行命令即可，下同。Win 11 默认是 Windows Terminal，进去先敲个 `cmd` （和刷入 AOSP 类系统不同，AOSP 类 ROM 执行的是 `fastboot flash recovery <twrp.img>`）

 3. `.\fastboot reboot recovery` 重启到 recovery

## 刷入欧版系统和magisk

 1. 进入 TWRP，**Wipe** 一次清手机数据以防出现其他问题，只 root 的不用清数据后面也不用刷 magisk.zip
 
 2. 把下载好的欧版 ROM 包和 magisk 复制到手机

 3. **Install** 依次刷入欧版 ROM 和 magisk.zip

 4. 安装完成后正常启动进入系统

别急，magisk 刷好了系统还没有拿到 root 权限，后面还有，不 root 的到这里就完事了

## magisk root 设备

magisk 原版安装教程，适用于所有设备：[Installation - Magisk](https://topjohnwu.github.io/Magisk/install.html)

 1. 从下载的欧版 zip 卡刷包里提取出 **boot.img**，复制到手机

 2. 进入系统后会看到已经安装上了 Magisk 程序，打开后提示需要更新，可能需要科学上网才能下载
 
 3. 进入更新后的 Magisk App，点击 Magisk 右边的安装

 4. **初次安装请务必不要选择直接安装（推荐），没用**，点选 **选择并修补一个文件**，找到刚才复制到手机的 boot.img ，开始，几行输出后会显示 DONE，此时新的 img 文件已经保存到了 **/Download/** 目录下，文件名magisk_patched_xxxx.img，把这个文件复制到电脑
 
 5. 重启到 **FastBoot** 模式，`.\fastboot flash boot /path/to/magisk_patched_xxxx.img`

 6. 大功告成，以后系统 OTA 后 root 权限掉了就可以用上面的直接安装重新获取权限了