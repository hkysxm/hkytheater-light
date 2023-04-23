解决主机场封掉某些端口导致的问题



---------------------
# 遇到的问题
## 场景
鉴于以前用的机场最近打不开舰c，换了一家机场，各方面使用都不错，然而**邮件端口**，993 465等都被封了导致用邮件客户端不能正常收发同步 Gmail 等海外邮箱，而先前用的机场没有这个问题。

手上还有之前那一家的保号套餐可用。决定改一下规则继续跑。

## 需求
使用的规则为 Clash 规则，在当前机场作为主力的情况下，邮件相关端口走之前的梯子。 

对应端口上的判断规则除了不用新机场以外和其他分流模式一致。

# 解决方法
## 端口判断
第一个想到的就是指定端口走代理，Clash 有 `DST-PORT` 参数，能匹配目标端口。

邮箱所使用的端口，我只加了 SSL 的：465 993 995

```
DST-PORT,465,mail
DST-PORT,993,mail
DST-PORT,995,mail
```

编写对应策略组，测试能用，然而发现对应端口的所有流量都会走固定的连接方式，如全部 Proxy 或全部 DIRECT，需要再进行一次套娃把大陆 IP 和非大陆的区分开。

## Script
查了一下在 Clash Premium 内核有提供对脚本的支持，更有更简单的 Script Shortcuts，来自官方文档的例子：
>   ** Script Shortcut ** 
>
>   use script on `rules`
>
>   **NOTE: `src_port` and `dst_port` are number**
>
>   ```yaml
>   script:
>     shortcuts:
>       quic: network == 'udp' and dst_port == 443
>   
>   rules:
>     - SCRIPT,quic,REJECT
>   ```
>
>   ### Functions
>
>   ```python
>   type resolve_ip = (host: string) => string // ip string
>   type in_cidr = (ip: string, cidr: string) => boolean // ip in cidr
>   type geoip = (ip: string) => string // country code
>   type match_provider = (name: string) => boolean // in rule provider
>   ```


检查了手机端 CFA、PC 端 CFW、iOS 端 Stash，都使用 Clash Premium 内核，兼容 Script 功能，开搞~

## 规则

- 个人使用的策略组，脱敏，fallback 模式

   ```yaml
   - name: ? MAIL
       type: fallback
       proxies:
         - ?? 旧机场节点 
         - ?? 旧机场节点
         - ?? 自搭节点
       url: 'https://www.google.com/'
       interval: 360
   ```

- Script，放在了策略组后

  ```yaml
  # 简单的匹配，端口符合且非 GEOCN 的走代理，有需可进一步修改
  script:
    shortcuts:
      mail: (dst_port == 465 or dst_port == 993 or dst_port == 995) and (geoip(resolve_ip(host)) != 'CN' or geoip(dst_ip) != 'CN')
  ```

- 分流规则，我摆在广告拦截和直连规则后，走代理的规则前，能拦截掉广告就已经符合我的需求了

  ```
  - SCRIPT,mail,? MAIL
  ```

# 总结

同步修改到规则服务器，重新启用配置文件，用 Outlook 桌面端同步 Gmail，成功。

Script 功能可以同时叠加多个规则进行匹配，挺好，就是不知道是不是每一个连接过去都会跑一次脚本，这样可能会带来额外的耗电，待我先观察观察（