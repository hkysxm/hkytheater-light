浪潮 Power E950 安装相关



没啥好说的，公司要写顺便贴过来一份


# 总结

可以写，但没必要，官方文档不知道详细到哪里去了，英文又不是看不懂（

官网，请：<https://www.ibm.com/docs/en/power9/9040-MR9>

顺便一提，相比 x86 服务器，Power 系列的 4U 是真的重

# 关于

实际上也就是以前的 IBM 小型机，型号 9040-MR9，现在国内挂上了浪潮的名，其他的变化不大。

E950 定位中端，单 4U，上面还有个 E980，支持额外的 CEC 柜。

# 准备

本次除了本体外还有如下设备：
 - I/O 节点 3 个
 - 存储节点（磁盘柜） 3 个
 - HMC 7042-CRi 1个
 - 显示终端 7316-TF5一个。

工具：
 - 4mm 内六角工具
 - T25 六角工具
 - 十字螺丝刀
 - 一字螺丝刀
 - 防静电手环等

材料：
 - 标配导轨
 - 材料盒内把手
 - 理线架


# 安装
## 安装导轨
1. 确定导轨左右位置，导轨内侧有标记。
2. 安装导轨前部，如图所示

![前视图](https://hky.moe/img/220714.jpg#vwid=460&vhei=308)

3. 前部安装完成，从机柜后方装好导轨，如图

![后视图](https://hky.moe/img/220704.jpg#vwid=460&vhei=306)

4. 重复上述步骤，安装好另一侧导轨

## 安装服务器本体
1. 取出 K950 背面的橙色金属挡板
2. 给服务器安装上把手
3. 拉出导轨
4. 左右导轨上各有三个卡扣，按从后往前的顺序卡入孔位

![6个卡扣均需要卡入孔位！](https://hky.moe/img/220705.jpg#vwid=424&vhei=424)

5. 确定两侧卡扣都已经卡入后，卸掉把手，拉动导轨中部的闩锁，将服务器推入

## 补充：电源安装相关
为了保持冗余，必须将来自一个 PDU 的电源线插入电源位置 1 和 2，另一个 PDU 插入位置 3 和 4。

![电源连接](https://hky.moe/img/220706.jpg#vwid=460&vhei=460)

## 安装 I/O 节点、存储节点
通常情况下存储节点在 I/O 节点上方，主柜在最下方，安装容易不多说

## 安装 HMC 和显示终端
HMC 和显示终端均为 1U
 - 均通过导轨安装
 - 显示终端和导轨一体，需要将 VGA、USB、网线连接到 HMC 
 - 显示终端提供的线缆长度并不长，这次安装 HMC 和显示终端放在相邻的两 U 上

## 主机连接 HMC

 1. 安装配置完成 HMC，连接 E950 需要 HMC V9 R9.2.0 或以上版本
 2. 连接 HMC 的 Ethernet Connector1 到被管理服务器的 HMC1 (T3)端口
 3. 如有需要，将第二台连接到 HMC2 (T4) 端口

![服务器连接 HMC](https://hky.moe/img/220707.jpg#vwid=413&vhei=413)

# 扩展：Power E950 主柜硬件

## 图例

![前面板](https://hky.moe/img/220708.png#vwid=550&vhei=389)
 
![俯视图](https://hky.moe/img/220709.png#vwid=745&vhei=550)
 
![后面板](https://hky.moe/img/220710.png#vwid=550&vhei=416)

![磁盘背板](https://hky.moe/img/220711.png#vwid=550&vhei=550)

![内存](https://hky.moe/img/220712.png#vwid=550&vhei=457)

![FSP](https://hky.moe/img/220713.png#vwid=236&vhei=495)


## 位置和零件
| 部件名 | 位置号 | 
| -- | -- |
| Fan 1~4 | Un-A1~A4 |
| Power supply 1~4 | Un-E1~E4 | 
| System backplane | Un-P1 |
| Disk drive backplane | Un-P2 |
| Power midplane | Un-P3 |
USB 3.0 port 1 (front) |  Un-P2-T1  
USB 3.0 port 2 (front) |  Un-P2-T2 
USB 3.0 port 1 (rear) | Un-P1-T1 
USB 3.0 port 2 (rear) | Un-P1-T2 
USB 2.0 port 1 (rear) |   Un-P1-C1-T1  
USB 2.0 port 2 (rear) |   Un-P1-C1-T2 
HMC port 1 | Un-P1-C1-T3 
HMC port 2 | Un-P1-C1-T4 
Serial Port |  Un-P1-C1-T5 
SAS Port 1  | Un-P2-T3 
SAS Port 2  | Un-P2-T4 
SAS Port 3  | Un-P2-T5 
SAS Port 4  | Un-P2-T6 
Service processor card assembly | Un-P1-C1  
Time-of-day battery | Un-P1-C1-E1  
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C2  
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C3 
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C4 
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C5 
PCIe x8 adapter | Un-P1-C6 
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C7 
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C8 
PCIe x8 adapter (supports SAS RAID adapters for controlling internal drive bays) | Un-P1-C9 
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C10 
PCIe x16 adapter (supports PCIe cable adapters) | Un-P1-C11 
PCIe x8 adapter (supports SAS RAID adapters for controlling internal drive bays) | Un-P1-C12 
Vital product data card | Un-P1-C24  
Trusted platform module card | Un-P1-C21  
Memory voltage regulator module for memory module riser cards 1 - 4 | Un-P1-C25  
Memory voltage regulator module for memory module riser cards 1 - 4 | Un-P1-C30 
Memory voltage regulator module for memory module riser cards 5 - 8 | Un-P1-C31 
Memory voltage regulator module for memory module riser cards 5 - 8 | Un-P1-C36 
Memory module riser card 1 |  Un-P1-C26   
Memory module riser card 2 |  Un-P1-C27   
Memory module riser card 3 |  Un-P1-C28   
Memory module riser card 4 |  Un-P1-C29   
Memory module riser card 5 |  Un-P1-C32   
Memory module riser card 6 |  Un-P1-C33   
Memory module riser card 7 |  Un-P1-C34   
Memory module riser card 8 |  Un-P1-C35   
System processor module 1 | Un-P1-C14  
System processor module 2 | Un-P1-C15 
System processor module 3 | Un-P1-C18 
System processor module 4 | Un-P1-C19 
Processor voltage regulator module for system processor module 1 | Un-P1-C13  
Processor voltage regulator module for system processor module 2 | Un-P1-C16 
Processor voltage regulator module for system processor module 3 | Un-P1-C17 
Processor voltage regulator module for system processor module 4 | Un-P1-C20 
Standby voltage regulator module | Un-P1-C22  
I/O voltage regulator module | Un-P1-C23  
Drive 1 | Un-P2-D1  
Drive 2 | Un-P2-D2 
Drive 3 | Un-P2-D3 
Drive 4 | Un-P2-D4 
Drive 5 | Un-P2-D5 
Drive 6 | Un-P2-D6 
Drive 7 | Un-P2-D7 
Drive 8 | Un-P2-D8 
NVMe U.2 drive 1 | Un-P2-C1  
NVMe U.2 drive 2 | Un-P2-C2 
NVMe U.2 drive 3 | Un-P2-C3 
NVMe U.2 drive 4 | Un-P2-C4 
Control panel | Un-D1  
Control panel display | Un-D2 

## PN 对应
9040-MR9 System Parts

<https://www.ibm.com/docs/en/power9/9040-MR9?topic=parts-9040-mr9-system>