一部分规则改为 github 动态引用，感谢规则更新者们
请注意部分规则不适用于Clash Premium 以外的内核




---------------------

# 概述

自用 Clash 规则，基于几家机场规则和自己之前的规则改善，特性如下：

 - 策略组采用快捷方式，自己调节时效率更高
 - 节点使用 `proxy-providers`，同时使用多家服务时更方便
 - `rule-providers` 提供大部分规则，只要上游源还在就不用手动更新广告拦截规则
 - 本地补充规则，在线规则有不符合自己使用情况的，本地优先级更高可覆盖


# 规则

```
# Clash config by hkyP


port: 20080           
socks-port: 20081     
redir-port: 20082     
mixed-port: 20083     

allow-lan: true      
bind-address: "*"    
mode: rule           
log-level: info      
ipv6: false          

# 外部控制器
external-controller: 127.0.0.1:9090

dns: 
  enable: true      
  ipv6: false        
  listen: 0.0.0.0:53 

# 增强模式:fake-ip或redir-host
  enhanced-mode: fake-ip

# fake-ip:范围和过滤
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - localhost.ptlogin2.qq.com
    - +.srv.nintendo.net
    - +.stun.playstation.net
    - +.msftconnecttest.com
    - +.msftncsi.com
    - +.xboxlive.com
    - msftconnecttest.com
    - xbox.*.microsoft.com
    - "*.battlenet.com.cn"
    - "*.battlenet.com"
    - "*.blzstatic.cn"
    - "*.battle.net"

  nameserver:        # 常规 DNS 服务器
    - 223.5.5.5
    - 119.29.29.29
  fallback:          # 国外 DNS 服务器
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query

  fallback-filter:   # 回退过滤器
    geoip: true      # GEOIP 启用
    geoip-code: CN   # GEOIP 编码
    ipcidr:          # IPCIDR
      - 240.0.0.0/4


# 策略组
pr:   &a3 {type: select,   proxies: [自行选择, DIRECT, 香港节点, 台湾节点, 日本节点, 狮城节点, 美国节点] }
p:    &a1 {type: http,     interval: 86400,  health-check: {enable: true, url: http://www.gstatic.com/generate_204, interval: 1800} }
auto: &a4 {type: url-test, lazy: true,  url: http://www.gstatic.com/generate_204, interval: 1800, use: [Subscribe,hky] }
use:  &a2 {type: select,   use: [Subscribe,hky] }
c:    &a6 {type: http,     behavior: classical, interval: 86400}
d:    &a5 {type: http,     behavior: domain,    interval: 86400}
i:    &a7 {type: http,     behavior: ipcidr,    interval: 86400}
diru: &a8 {type: select,   proxies: [DIRECT, 自行选择] }


# 代理提供商
proxy-providers:
  Subscribe:
    <<: *a1
    url: https://api.nexconvert.com/sub?target=clash&url=https%3A%2F%2Fsupport.tagsssubscribe.com%2F规则
    path: ./proxy_providers/sub.yaml
  hky:
    <<: *a1
    url: https://hky.moe/规则
    path: ./proxy_providers/mysub.yaml

# 代理
proxies:

# 策略组
proxy-groups:
  - {name: 自行选择, <<: *a2}
  # - {name: 自动选择, <<: *a4}
  - {name: Gaming, <<: *a8}
  - {name: Mail, <<: *a8}
  - {name: Apple, <<: *a8}
  - {name: Onedrive, <<: *a8}
  - {name: Speedtest, <<: *a3}
  - {name: bili, <<: *a8}
  - {name: TikTok, <<: *a3}
  - {name: StreamingTW, <<: *a2, filter: "台湾|湾|TW|(?i)Taiwan"}
  - {name: 香港节点, <<: *a4, filter: "香港|港|HK|(?i)HongKong"}
  - {name: 台湾节点, <<: *a4, filter: "台湾|湾|TW|(?i)Taiwan"}
  - {name: 日本节点, <<:  *a4, filter: "日本|日|JP|(?i)Japan"}
  - {name: 狮城节点, <<: *a4, filter: "新加坡|狮|SG|(?i)Singapore"}
  - {name: 美国节点, <<: *a4, filter: "美国|美|US|(?i)UnitedStates"}
  - {name: Others, <<: *a3}


# 规则提供商
rule-providers:
  规则修正: {<<: *a6, url: https://raw.gitmirror.com/Centralmatrix3/Matrix-io/master/Clash/Ruleset/Unbreak.yaml, path: ./Ruleset/Unbreak.yaml}

  广告拦截: {<<: *a5, url: https://raw.gitmirror.com/privacy-protection-tools/anti-AD/master/anti-ad-clash.yaml, path: ./anti-ad-clash.yaml}

  Speedtest: {<<: *a6, url: https://raw.gitmirror.com/Centralmatrix3/Matrix-io/master/Clash/Ruleset/Speedtest.yaml, path: ./Ruleset/Speedtest.yaml}

  TikTok: {<<: *a6, url: https://raw.gitmirror.com/Centralmatrix3/Matrix-io/master/Clash/Ruleset/TikTok.yaml, path: ./Ruleset/TikTok.yaml}

  bili: {<<: *a6, url: https://raw.gitmirror.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBili/BiliBili_No_Resolve.yaml, path: ./Ruleset/Bili.yaml}

  Apple: {<<: *a6, url: https://raw.gitmirror.com/Centralmatrix3/Matrix-io/master/Clash/Ruleset/Apple.yaml, path: ./Ruleset/Apple.yaml}

  局域网络: {<<: *a6, url: https://raw.gitmirror.com/Centralmatrix3/Matrix-io/master/Clash/Ruleset/LAN.yaml, path: ./Ruleset/LAN.yaml}

  China: {<<: *a6, url: https://raw.gitmirror.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMax/ChinaMax_Classical_No_IPv6_No_Resolve.yaml, path: ./Ruleset/China.yaml}
  
  

#mail port
script:
  shortcuts:
    proxymail: (dst_port == 465 or dst_port == 993 or dst_port == 995) and (geoip(resolve_ip(host)) != 'CN' or geoip(dst_ip) != 'CN')



rules:
# Mail Script:no cn+mail port=mail usable proxy
 - SCRIPT,proxymail,Mail
 - DOMAIN,steambroadcast.akamaized.net,Gaming
 - DOMAIN,steamcdn-a.akamaihd.net,Gaming
 - DOMAIN,steamcommunity-a.akamaihd.net,Gaming
 - DOMAIN,steampipe.akamaized.net,Gaming
 - DOMAIN,steamstore-a.akamaihd.net,Gaming
 - DOMAIN,steamusercontent-a.akamaihd.net,Gaming
 - DOMAIN,steamuserimages-a.akamaihd.net,Gaming
 - DOMAIN-SUFFIX,fanatical.com,Gaming
 - DOMAIN-SUFFIX,humblebundle.com,Gaming
 - DOMAIN-SUFFIX,playartifact.com,Gaming
 - DOMAIN-SUFFIX,steam-chat.com,Gaming
 - DOMAIN-SUFFIX,steamgames.com,Gaming
 - DOMAIN-SUFFIX,api.steampowered.com,Gaming
 - DOMAIN-SUFFIX,store.steampowered.com,Gaming
 - DOMAIN-SUFFIX,steamstat.us,Gaming
 - DOMAIN-SUFFIX,steamstatic.com,Gaming
 - DOMAIN-SUFFIX,underlords.com,Gaming
 - DOMAIN-SUFFIX,valvesoftware.com,Gaming
# Kancolle Rules
#  - IP-CIDR,125.6.184.0/24,Kancolle
#  - IP-CIDR,125.6.189.0/24,Kancolle
#  - IP-CIDR,203.104.209.0/24,Kancolle
 - DOMAIN-KEYWORD,ooi.moe,DIRECT
 - DOMAIN,events.gfe.nvidia.com,DIRECT
 # bahamut animate
 - PROCESS-NAME,tw.com.gamer.android.animad,StreamingTW
 - DOMAIN-SUFFIX,bahamut.com.tw,StreamingTW
 - DOMAIN-SUFFIX,gamer.com.tw,StreamingTW
 - DOMAIN,gamer-cds.cdn.hinet.net,StreamingTW
 - DOMAIN,gamer2-cds.cdn.hinet.net,StreamingTW
 - DOMAIN-SUFFIX,bahamut.akamaized.net,StreamingTW
 # bahamut animate over
 # - DOMAIN-SUFFIX,steamstatic.com,DIRECT
 # - DOMAIN-SUFFIX,steampowered.com,DIRECT
 - DOMAIN-SUFFIX,steamcontent.com,DIRECT
 # - DOMAIN-SUFFIX,steamcommunity.com,Proxy
 # - DOMAIN-SUFFIX,ipv6check-http.steamcontent.com,Proxy
 # steam from acl4ssr direct
 - DOMAIN,dl.steam.clngaa.com,DIRECT
 - DOMAIN,dl.steam.ksyna.com,DIRECT
 - DOMAIN,dota2.wmsj.cn,DIRECT
 - DOMAIN,st.dl.bscstorage.net,DIRECT
 - DOMAIN,st.dl.eccdnx.com,DIRECT
 - DOMAIN,st.dl.pinyuncloud.com,DIRECT
 - DOMAIN,steampipe.steamcontent.tnkjmec.com,DIRECT
 - DOMAIN,steampowered.com.8686c.com,DIRECT
 - DOMAIN,steamstatic.com.8686c.com,DIRECT
 - DOMAIN,wmsjsteam.com,DIRECT
 - DOMAIN-SUFFIX,cm.steampowered.com,DIRECT
 - DOMAIN-SUFFIX,steamchina.com,DIRECT
 - DOMAIN-SUFFIX,steamcontent.com,DIRECT
 - DOMAIN-SUFFIX,steamusercontent.com,DIRECT
 - DOMAIN-SUFFIX,steamserver.net,DIRECT
 - DOMAIN-SUFFIX,static3.cdn.ubi.com,DIRECT
 - DOMAIN-SUFFIX,cdn.ubi.com,DIRECT
 - DOMAIN-SUFFIX,azureedge.net,DIRECT
# steam end
#  - 'DOMAIN-SUFFIX,1drv.com,Onedrive'
#  - 'DOMAIN-SUFFIX,1drv.ms,Onedrive'
#  - 'DOMAIN-SUFFIX,livefilestore.com,Onedrive'
#  - 'DOMAIN-SUFFIX,oneclient.sfx.ms,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.co,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.co.uk,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.com,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.eu,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.live.com,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.net,Onedrive'
#  - 'DOMAIN-SUFFIX,onedrive.org,Onedrive'
#  - 'DOMAIN-SUFFIX,photos.live.com,Onedrive'
#  - 'DOMAIN-SUFFIX,sharepoint.com,Onedrive'
#  - 'DOMAIN-SUFFIX,sharepointonline.com,Onedrive'
#  - 'DOMAIN-SUFFIX,skydrive.wns.windows.com,Onedrive'
#  - 'DOMAIN-SUFFIX,spoprod-a.akamaihd.net,Onedrive'
 - 'DOMAIN-SUFFIX,storage.live.com,Onedrive' # Upload domain
#  - 'DOMAIN-SUFFIX,storage.msn.com,Onedrive'
#  - 'DOMAIN-KEYWORD,1drv,Onedrive'
#  - 'DOMAIN-KEYWORD,onedrive,Onedrive'
#  - 'DOMAIN-KEYWORD,skydrive,Onedrive'
 - 'PROCESS-NAME,OneDrive,Onedrive'
 - 'PROCESS-NAME,OneDriveUpdater,Onedrive'
# Wechat Singapore more http://dns.weixin.qq.com/cgi-bin/micromsg-bin/newgetdns & https://raw.gitmirror.com/NobyDa/Script/master/Surge/WeChat.list
 - IP-CIDR,101.32.104.0/24,DIRECT
 - IP-CIDR,101.32.118.0/24,DIRECT
 - IP-CIDR,101.33.110.0/24,DIRECT
 - IP-CIDR,129.226.3.0/24,DIRECT
 - IP-CIDR,43.156.86.0/24,DIRECT
 - IP-CIDR,43.156.222.0/24,DIRECT
 - IP-CIDR,129.226.3.0/24,DIRECT
# steam v4 IP from https://help.steampowered.com/zh-cn/faqs/view/2EA8-4D75-DA21-31EB
 - IP-CIDR,103.10.124.0/24,DIRECT
 - IP-CIDR,103.10.125.0/24,DIRECT
 - IP-CIDR,103.28.54.0/24,DIRECT
 - IP-CIDR,146.66.152.0/24,DIRECT
 - IP-CIDR,146.66.155.0/24,DIRECT
 - IP-CIDR,153.254.86.0/24,DIRECT
 - IP-CIDR,155.133.224.0/23,DIRECT
 - IP-CIDR,155.133.226.0/24,DIRECT
 - IP-CIDR,155.133.227.0/24,DIRECT
 - IP-CIDR,155.133.230.0/24,DIRECT
 - IP-CIDR,155.133.232.0/24,DIRECT
 - IP-CIDR,155.133.233.0/24,DIRECT
 - IP-CIDR,155.133.234.0/24,DIRECT
 - IP-CIDR,155.133.236.0/23,DIRECT
 - IP-CIDR,155.133.238.0/24,DIRECT
 - IP-CIDR,155.133.239.0/24,DIRECT
 - IP-CIDR,155.133.240.0/23,DIRECT
 - IP-CIDR,155.133.245.0/24,DIRECT
 - IP-CIDR,155.133.246.0/24,DIRECT
 - IP-CIDR,155.133.248.0/24,DIRECT
 - IP-CIDR,155.133.249.0/24,DIRECT
 - IP-CIDR,155.133.250.0/24,DIRECT
 - IP-CIDR,155.133.251.0/24,DIRECT
 - IP-CIDR,155.133.252.0/24,DIRECT
 - IP-CIDR,155.133.253.0/24,DIRECT
 - IP-CIDR,155.133.254.0/24,DIRECT
 - IP-CIDR,155.133.255.0/24,DIRECT
 - IP-CIDR,162.254.192.0/24,DIRECT
 - IP-CIDR,162.254.193.0/24,DIRECT
 - IP-CIDR,162.254.194.0/23,DIRECT
 - IP-CIDR,162.254.195.0/24,DIRECT
 - IP-CIDR,162.254.196.0/24,DIRECT
 - IP-CIDR,162.254.197.0/24,DIRECT
 - IP-CIDR,162.254.198.0/24,DIRECT
 - IP-CIDR,162.254.199.0/24,DIRECT
 - IP-CIDR,185.25.182.0/24,DIRECT
 - IP-CIDR,185.25.183.0/24,DIRECT
 - IP-CIDR,190.217.33.0/24,DIRECT
 - IP-CIDR,192.69.96.0/22,DIRECT
 - IP-CIDR,205.185.194.0/24,DIRECT
 - IP-CIDR,205.196.6.0/24,DIRECT
 - IP-CIDR,208.64.200.0/24,DIRECT
 - IP-CIDR,208.64.201.0/24,DIRECT
 - IP-CIDR,208.64.202.0/24,DIRECT
 - IP-CIDR,208.64.203.0/24,DIRECT
 - IP-CIDR,208.78.164.0/22,DIRECT
 # steam end 
 - RULE-SET, 规则修正, DIRECT
 - RULE-SET, 广告拦截, REJECT
 - RULE-SET, TikTok, TikTok
 - RULE-SET, Speedtest, Speedtest
 - RULE-SET, bili, bili
 - RULE-SET, Apple, Apple
 - RULE-SET, 局域网络, DIRECT
 - RULE-SET, China,DIRECT
 - MATCH, Others
```


# yaml 说明

说一下自己需求情况下修改的几个

## `proxy-providers`
虽然已经脱敏处理不过还是能很明显看出来用了订阅转换。原因是个人现在主要使用的梯子 [TAG](https://tagss03.pro/#/auth/ncTo0jbp) 节点数量非常多并且保持一定的更新频率，但官方又没有提供单独的 node-list，需要调用订阅转换。理论上来说是纯前端转换只要不用短链生成不会泄露，在这方面有担忧的可以本地自建订阅转换服务

## `proxy-groups`
注释了自动选择，因为节点数量太多，个人也就用日本节点为主，没必要给全部节点定期测 ping

## `script`
大部分服务商和 VPS 都对邮件协议进行了限制，故邮件改为端口区分

## `rules`
已经有注释的部分内容如舰C，巴哈姆特（動畫瘋）不多解释

### steam（存在问题）
steam 的得单独拎出来说一下。
steam 的区域判断规则困扰我很久，之前 steampowered.com 访问正常时自己编写了一部分，现在有问题了 :( 

一部分来自 steam 官方: <https://help.steampowered.com/zh-cn/faqs/view/2EA8-4D75-DA21-31EB>
把官方提供的地址全部加入代理会导致 steam 客户端定位到游戏走代理下载，消耗巨量流量；
全部走直连在当今网络环境下又会导致多家运营商环境下应用商店概率打不开，不能愉快喜 +1。

~~目前使用的规则自测商店社区使用正常，下载不会走代理，但控制台可以查询到 `user_info` 中 `IPCountry` 为代理节点地区。手动修改下载节点到大陆后下载走香港，速度还是比大陆节点慢一些。~~
直接打开 Steam 控制台：开始-运行 或 浏览器输入 `steam://open/console` [点击打开](steam://open/console)

~~目前还在寻找能正常使用商店社区的情况下又能自动调用大陆下载节点的方法，有知道的朋友求规则?~~

24.1.27 更新：自行测试后已解决 80 %，区域定位还是代理地址但是下载正常走大陆节点了。
`store.steampowered.com`，`api.steampowered.com` 通过代理连接
`steamserver.net`，`steamcontent.com` 直连，即可在正常浏览商店的情况下用大陆节点进行游戏下载，`IPCountry` 显示的不是 `CN` 但当前看来没有其他问题。

### 其他
 - Wechat 我只引用了新加坡的规则，根据微信账号所属国家的不同数据存放的机房也有区别。不同区域的地址信息在微信官方可以找到，都加入直连即可。
 - Onedrive 我的移动端备份量少，全程代理备份；桌面端上传下载直连，访问网页或者 Onedrive 相关其他服务走代理。通过 Clash 连接信息目前找到的一个传输地址为 storage.live.com，单独去掉这一行的注释使用
 ` - 'DOMAIN-SUFFIX,storage.live.com,Onedrive' # Upload domain`
 - ` - DOMAIN,events.gfe.nvidia.com,DIRECT` 广告屏蔽里屏蔽了这个域名，但是在启用 Geforce OSD 的情况下如果无法访问该地址，程序会以每 2 秒 N 次的频率发送请求，在 log 界面刷屏，所以用本地规则覆盖了去广告规则里的这条

# 恰梯子
TAG 应该也算是知名机场了，除去节点多以外个人发现的是地址段比较干净，至少日本 IP 可以让我流畅访问 e-hentai，舰队 Collection，Project Sekai 等 IP 要求较高的网站，之前用的另一家同样是 Kirino 机房但是 PJSK 就是打不开啊?

网站审查的规则相对好一些，当然有几个网站还是进不去的，TOS 上直接提供了规则，可自行查看。

不足的地方就是不提供高位端口（个人 SSH 都使用随机高位端口，用代理不能连接直连非常卡）有需求的需要用其他服务商的补足；
另外邮件相关的端口都被封闭，使用邮箱客户端 + 大陆无法连接邮箱的需要注意。
个人桌面端用 Foxmail 有 Gmail 代收；移动端 Spark 通过 FCM 推送都是秒收也能打开，目前还没搞懂是什么机制。

每月重置套餐价格不低，最低季付不过季付半年付年付价格差不多，个人认为目前跑路几率不大；还有 154 一年 200G 的备胎套餐，主要使用其他服务商或者自建的可以拿来备用。

因为价格很贵所以恰一点返利（仅首笔 10 %），快买（
<https://tagss.pro/#/auth/ncTo0jbp>