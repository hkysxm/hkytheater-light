自己懒得写，AI 代写然后我再改改吧，AI 的时代或许真的要来力


每次换了新小鸡都要手动配置一番，于是准备写一个一键配置脚本。然而我并不会写 Shell，现在正好有 AI 可以生成脚本，试试效果。

工具：new Bing，ChatGPT

# 步骤
## 拟订需求
先定一个需求，我的需求如下：
 - 打印整机配置信息，磁盘，内存，CPU，系统版本，登录用户
 - 配置当前用户和root用户的history无限，输出1000行，包含日期时间；
 - 时区设定，自选当地or中国；
 - `ls` 颜色设为auto,`cp` `mv` `rm` 操作前确认；
 - ~~互信~~这个还是选择单独配置；
 - 修改hostname为指定名
 - 修改root密码，ssh禁止密码远程登录；
 - 修改 vim 配置，增加行数显示
 - 安装 docker, docker-compose, htop, curl, git 等

 > 额外的个人建议：能用英文完善表达的话，建议用英文，虽然 new Bing 会自动翻译，但首先不能保证翻译的准确性，其次英文社区采集到的代码完善度会比国内更佳。ChatGPT 不知道会不会自己翻译？应该会吧（？）

## 交给 AI

生成的脚本完成度并不会太高。所以需要慢慢进行调♂教

### 初稿
给出需求生成的第一版。AI 通常不能完美理解我们的需求，所以问题会比较大，还有不小概率不能运行或不能达成想要的效果。

### 功能细化
在测试环境进行测试，当然也可以让 AI 自己测试。进一步完善功能需求。

### 单独模块完善
这一步完善后的代码往往能正常运行了。但是仍然可能有一部分功能不能实现或者错误。我们可以让 AI 自行进行纠错，也可以一遍针对对应功能进行咨询一遍自己修改。不确定的话可以丢回去让 AI 试试单个功能有没有问题。

### 测试
放在自己的测试环境实际进行测试。先按功能模块测试，再整个测。我的测试环境是多个发行版本的 Linux，包括 Ubuntu，CentOS，Debian。要注意代码中重复添加可能会出现问题的片段。有问题继续丢给 AI 纠正，可以多生成几次。
其实这一部也可以优化一下，防止多次执行出现问题，不过我懒得搞了 ˋ( ° ▽、° ) 

### 优化
把上一部的脚本再扔给 AI，询问如何优化。


# 成品
功能算是达到了我自己的需求，不过肯定没有 dalao 自己写的完善，又不是不能用（

```bash
#!/bin/bash
# 检查是否以root身份运行
if [ $(id -u) != 0 ]; then
    echo "This script must be run as root" >&2
    exit 1
fi

# 获取当前登录用户的用户名
current_user=$(whoami)

echo "Current user is: $current_user"

user=$(who am i | awk '{print $1}')

echo -e "\n************* DO NOT RUN THIS SCRIPT IN PRODUCTION ENVIRONMENT!!! *************\n"

#打印整机配置信息
echo -e "\n************* System Configuration *************\n"
echo -e "Disk\n"
lsblk
echo -e "\nMemory\n"
free -h
echo -e "\nCPU\n"
cat /proc/cpuinfo | grep "model name"
echo "\nSystem Version"
cat /proc/version
echo "\nDefault user： $user"

#配置当前用户和 root 用户的 history 无限，打印 1000 行，包含日期时间，ls 带颜色
echo -e "\n************* Bash Configuration *************\n"
# root 用户修改/home/"$user"/.bashrc即可，非root用户要多修改 /root/.bashrc
# AI优化，不用写重复片段了，但是它又忘了加转义符了，手动加上
BASH_CONFIG="
unset HISTFILESIZE
unset HISTSIZE
export HISTSIZE=1000
export HISTFILESIZE=-1
export HISTTIMEFORMAT=\"%F %T \"
export PROMPT_COMMAND=\"history -a;$PROMPT_COMMAND\"
unset HISTCONTROL
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias ls='ls --color=auto'
"

echo "$BASH_CONFIG" >> /home/"$user"/.bashrc
echo "$BASH_CONFIG" >> /root/.bashrc

#时区设定，自选当地、中国、UTC
echo -e "\n************* Timezone Configuration *************\n"
while true; do
    read -p "Select Timezone：1. Local 2.CST 3. UTC " timezone_choice
    case $timezone_choice in
    1)
        /usr/bin/timedatectl set-timezone "$(timedatectl list-timezones | grep $(curl -s ipinfo.io/timezone) | head -n 1)"
        break;
        ;;
    2)
        /usr/bin/timedatectl set-timezone Asia/Shanghai
        break;
        ;;
    3)
        /usr/bin/timedatectl set-timezone UTC
        break;
        ;;
    *) echo "Invalid input, please try again." ;;
    esac
done

# #互信
# echo -e "\n************* SSH Trust Configuration *************\n"
# 这一步需要在两台主机之间进行操作，请参考以下步骤：
# 在主机A上执行以下命令：
# ssh-keygen -t rsa -P '' # 生成密钥对，并设置空密码[^6^][8]
# ssh-copy-id 主机B的用户名@主机B的IP地址或域名 # 将公钥复制到主机B上，并添加到authorized_keys文件中
# 在主机B上执行以下命令：
# ssh-keygen -t rsa -P '' # 生成密钥对，并设置空密码
# ssh-copy-id 主机A的用户名@主机A的IP地址或域名 # 将公钥复制到主机A上，并添加到authorized_keys文件中
# read -p "请输入目标主机的IP地址：" target_ip
# ssh-copy-id $target_ip

#修改hostname为输入的内容，同时修改/etc/hosts 
echo -e "\n************* Hostname Configuration *************\n"
read -p "Enter new hostname: " new_hostname
hostnamectl set-hostname $new_hostname
sed -i "s/127.0.1.1.*/127.0.1.1\t$new_hostname/" /etc/hosts

echo "Hostname has been changed to $new_hostname."

#修改root密码，ssh禁止密码远程登录
echo -e "\n************* Root Password & SSH Configuration *************\n"
read -p "Enter new root password：" rootpass
echo "root:$rootpass" | chpasswd                                                      # 修改root密码为输入的值
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config # 修改sshd配置文件禁止密码远程登录
systemctl restart sshd.service                                                          # 重启sshd服务使配置生效

#修改 vim 配置，增加行数显示
echo -e "\n************* Vim Configuration *************\n"

echo 'set number' >>/home/"$user"/.vimrc

echo 'set number' >>/root/.vimrc

#安装 docker,docker-compose,htop,screen，epel-release，只要给centos安装就可以，其他系统自带
echo -e "\n************* Package Installation *************\n"
if [ -f /etc/os-release ]; then
    # source the /etc/os-release file to get the distribution name
    . /etc/os-release
fi
distro=$ID
# Install Required packages
case "$distro" in
"ubuntu")
    apt-get update
    apt-get install -y docker.io htop git
    ;;

"centos")
    yum update -y
    yum install -y epel-release
    yum install -y yum-utils device-mapper-persistent-data lvm2 htop screen git
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    yum install -y docker-ce docker-ce-cli containerd.io
    ;;

"debian")
    apt-get update
    apt-get install -y apt-transport-https ca-certificates gnupg lsb-release git
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo \
        "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
            $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list >/dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
    ;;

*)
    echo "Unsupported Linux distribution"
    exit 1
    ;;
esac

# Starting and enabling Docker service
systemctl start docker
systemctl enable docker

# Displaying Docker version
echo -e "\n \n \n \n "
echo "Docker installed successfully"
docker version

```
# 总结
## 学习到的
会的少，能学的就多?
 - echo "export "123" " 要加转义符 `\`
 - chpasswd 语法和 Aix 不一样，不用加乱七八糟的后缀也有加密密码
 - shell 的 case 中的 `;;` 不能完全替代 `break` （？）
 - `/etc/os-release` 里的系统版本比 `/proc/version` 准确度更高
 - `/etc/profile`, `~/.bashrc` 等配置的优先级，同一个文件里多次出现取前者，也可以用unset？
 - `who am i` `who -m` 
 - 删除指定 history

## 关于 AI
 - AI 不能做到需求分析一步到位，还要慢慢进行引导
 - 建议保持同一个窗口内的会话，否则纠正了 AI 的错误后，新开窗口它全忘了:(
 - AI 只会检查代码是否能正常运行，遇到描述写错的情况判断不出来，比如 `read -p "Select Timezone：1. Local 2.CST 3. UTC " timezone_choice` 中一开始我把 CST 和 UTC 颠倒了，问了很多次 AI 为什么脚本运行后不能修改都没有发现这个问题。
 - 单次结果不满意，多次生成找更满意的结果（new Bing 就比较难受了）