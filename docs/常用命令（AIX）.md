工作原因需要进一步了解AIX操作系统，记点基础的


## 文件管理

### 文件系统

- 查询使用状态`df`
  - `-g` `-k`显示单位
  - `iused`
- 配置文件系统
  - `smitty crjfs`创建
  - `smitty chjfs`修改
- 检查文件系统
  - `fcsk`
  - **危险操作**

### 页面文件（虚拟内存）

- 查询`lsps`

  - `-a`详情
  - `-s`概况

- 增加页面文件`smitty mkps`

### 磁盘及分区

- `lsvg`查询 Volume Group
  - `-l` Logical Volume 信息
  - `-p` Physical Volume 信息
- `lspv` 查询 Physical Volume 信息
  - `-l` Logical Volume 信息
  - `-p` Physical Volume 信息
- `lslv` 查询 Logical Volume 信息
- `lspath`链路信息
- `bootinfo -s hdisk*`磁盘容量

### dump

- `sysdumpdev -l` 概况
  - dump 文件位置、dump 属性
- dump 可用情况(estimated)
  - 预估大小`sysdumpdev -e`
  - 通常预留空间为双倍？
- 不够时，使用`extendlv lg_dumplv 2`(2 为 PP 数)进行扩容

### 数据库

- 需要定时进行备份
- `crontab -e`
  - `55 23 1 * * \oracle\backup\backup.sh`1 号 23:55 备份

## 系统信息

### AIX 系统版本

- `oslevel -s`

### 详情

- `prtconf`
  - 系统底层、磁盘文件、网络、安装设备信息
- `prtconf -v`
  - VPD 信息

### 监控

- `topas`

### 运行时间

- `uptime`

### 时区

- `date`
- `smitty chtz`修改时区
- `ntpq -p`查询

### 网络

- `smitty mktcpip`配置网卡 IP
- `netstat`网络信息
  - `-rn`路由表
  - `-i`已配置的端口
  - `-v`显示每个网络物理端口的情况，可以通过关键词**VLAN**筛选出VLAN信息
- `ifconfig`
  - `-a`网口配置详情

### 用户

- 创建修改用户等`smit user`
- 修改用户密码`echo "user:passwd"| chpasswd -c`
  - 加密后的本地密码位于*/etc/security/passwd*中，若只有加密后密码的情况下要将对端修改为相同密码，可以在`chpasswd`后使用`-e`参数

### 启动引导相关

- `bosboot`创建引导映像
  - `bosboot -ad` `hdisk*`指定设备创建完整映像，镜像过的多个盘都需要加入
- `bootlist`显示/修改引导顺序
  - 通常使用 normal 模式`bootlist -om -normal`
  - `bootlist -om -normal`查看当前引导列表
  - `bootlist -om -normal hdisk0 hdisk1`更改引导顺序为 hdisk0 hdisk1

### 终端

- 防止会话过期：TMOUT=0

## AIX 硬件信息

### 微码版本
 
- `lsmcode -c`
- VIOS 环境下，`lsfware`

- AIX 环境下，`prtconf`

### 报错信息

- `errpt`

  - `-a`详情
  - `-j`指定错误 ID 信息

- `errclear`删除 error
  - `*`指定日期前，常用 0

### 设备信息

- `lsdev`列出所有设备

  - `-Cc`按设备类型

- `lscfg`设备信息

  - `-vpl`设备名称和 VPD

- `lsattr`设备属性
  - `-El` 指定设备详细属性

#### 网卡

- `ent`以太网卡：`entstat -d`详情
- `fcs`光纤网卡：`fcstat -d`详情

## 软件

### EMC powerpath 

是否有 error 和 died

- powermt display

- powermt display dev=all

- powermt display dev=all|grep -p hdiskpower\*

- 清理died链路`powermt check` -> `a`

- 清除error`powermt restore`后`powermt save`

### gunzip

解压**tar.gz**为**.tar**，和linux直接可以解压tar.gz不同

- `gunzip -c file.tar.gz`
### ifix
- `emgr -l` 查看安装的ifix补丁
- `emgr -e`安装 

### PowerHA

- 查询HA集群是否存在
  - 通过查询vg`lspv |grep caavg`，`lsvg -o`是否激活（通常激活的为当前主节点）
  - 查询集群状态`lscluster -i`，root权限下`clstat`
  - `/usr/es/sbin/cluster/utilities/clRGinfo`