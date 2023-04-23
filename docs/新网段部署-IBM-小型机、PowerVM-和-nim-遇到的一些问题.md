近期X行又有一次新环境部署，补充更完整的部署步骤以及一些以前没遇到的问题


------------------



前篇，供参考：[post cid="227" /]

这回的设备是从生产机房搬下来的，并且分配了全新的网段，需要配置连接到新 HMC

## 小型机连接到 HMC

设备为 P780，每台有两个 FSP
### 配置 IP 
到 HMC 服务器使用的是静态 IP，为此需要对 FSP 的 IP 进行手动修改。
1. 确认 FSP IP 地址
使用网线连接到 FSP 上的 HMC 口，即可登录 ASMI。若曾经只连接到一台 HMC，不使用的接口往往还是默认 IP。

默认 IP 请参考：[Default Ethernet Ports for the HMC1 and HMC2 Ports](https://www.ibm.com/support/pages/default-ethernet-ports-hmc1-and-hmc2-ports)

如果 IP 被修改过，则需要通过面板查询 FSP 配置的 IP。

[Panel Function 30](https://www.ibm.com/support/pages/node/720761)
 - 拉出液晶面板
 - 使用方向键调整到 02，按确认
 - 再次按确认，使液晶面板上的 < 指向 N （即显示为 N<）
 - 按 上 键将 N 改为 M
 - 重复按确认，直至屏幕仅显示 02 
 - 使用方向键调整到 30，确认进入
 - 液晶面板显示 30** 后，再确认
 - 3000：主 FSP 的 HMC1 地址，3001：主 FSP HMC2，依此类推
 - 确认 IP 后，返回到 02 界面，按上文步骤**将 M 改回为 N**
 - 调整回 01 界面

2. 连接到 ASMI

PC 端使用 RJ45 连接 FSP HMC 口，配置对应的 IP。以 Windows 为例：
 - 控制面板\网络和 Internet\网络连接
 - 找到对应的网卡 -> 属性 -> IPv4
 - 手动配置 IP 地址为 FSP HMC 口 IP 同网段地址，掩码 255.255.255.0，DNS：127.0.0.1，无需网关。

浏览器打开对应 FSP HMC 地址，即可进入 ASMI

默认帐号密码均为 admin 。 

在 Network Services -> Network Configuration 就可以修改 HMC1 和 HMC2 的地址了。

本文中使用固定 IP。

3. 连接到 HMC 

设定好主备 FSP 的 IP 后，在 HMC 手动认设备。本文使用的 HMC 大版本为 v9。

进入 web 端 HMC，所有系统 -> 连接系统，添加对应 IP 段，扫描。

扫描完成后，服务器列表会显示认到的设备，在单台服务器选项中查看一下 FSP 连接状态，确认双 FSP 的设备的主备卡都在。



## NIM部署的补充

### 配置 NIM NETWORK
在新网段的设备需要先配置 NIM 网络后，再 define machine。
 - `smit nim`
 -  后面的忘了，以后补充

### nim 推送资源出现问题时的解决方法

依次尝试：
 - nim -Fo reset lpar_name
 - 上述 reset 操作无效的情况下，可以尝试在 `smit nim_mac_op`进行 reset，否则跳过此步骤
 - nim -Fo deallocate -a subclass=all lpar_name
 - Nim -o remove lpar_name


### nim 在防火墙下的网络需求
部署的 LPAR 在新网段，然而 nim_master 在旧网段，起初部署时走 SMS 网络启动一直无法收到包，后来联系网络室才发现是防火墙的问题。
NIM 进行部署时，需要**以下端口**进行通信和数据传输等，请务必保证以下端口的连通性：
参考：[NIM Communication within a Firewall Environment](https://www.ibm.com/support/pages/nim-communication-within-firewall-environment)

| Protocol | Port(s) |
| --- | --- |
|nimsh|3901 - 3902|
|icmp|5813|
|rsh|513 - 1023**|
|rlogin*|513|
|shell*|514|
|bootp|67 - 68|
|tftp|69 and 32,768 - 65,535|
|nfs|2049|
|mountd|32,768 - 65,535 or user's choice|
|portmapper|111
|NIM|1058 - 1059|

## 存储＆小型机
### VIOS1 做了 vScsi mapping后，VIOS 2 不能映射

 - `lsattr -El hdiskx` 检查划来的磁盘 `reserve_policy` 属性是否为 **no_reserve**
 - 若不正确，解除 mapping 后修改磁盘属性：`chdev -l hdisk6 -a reserve_policy=no_reserve`
 - 如果已经映射到了运行的 VIOC，重新映射后在 VIOC 仍然显示 path failed，需要在 VIOC `rmdev -Rdl vscsix`移除对应的 vScsi 链路后重认

### VIOS 配置好 NPIV vfchost mapping 后，存储端无法识别到
 - 在 VIOS 执行 `cfgmgr -vl fcsx` 进行存储端 LOG_IN