1 配置问题 2 太菜


---------------------

最近抽空把自用的基于 docker 的 Grafana 从 v7.x 升级到了最新的 v10，结果通过域名就不能访问了。

# 升级流程
Docker 容器升级还是很方便的，只要数据做了持久化处理。
 - 确认数据已经备份，基本上也就是 Grafana.ini 和监控记录
 - 停止容器 `docker stop grafana`
 - 移除容器 `docker rm grafana`
 - 重新拉取新的 Grafana 容器镜像 `docker pull grafana/grafana`
 - 重新启动容器，具体参数需要自行修改

# 反代
新版本引入了 Websocket，配置文件中需要补充 Websocket 相关。
个人用配置文件，仅供参考，和 Grafana 官网提供的略有不同

```nginx
# this is required to proxy Grafana Live WebSocket connections.
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

upstream grafana {
server localhost:3000;
}

server {
listen 443 ssl http2;
#listen [::]:443 ssl http2;
server_name g.hkysxm.com;
ssl_certificate /[证书位置]/hkycom_cf.pem;
ssl_certificate_key /[证书位置]/hkycom_cf.key;
ssl_session_timeout 5m;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers "TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA25613-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-A28-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:E+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES+3DES:!MD5";
ssl_session_cache builtin:1000 shared:SSL:10m;
# openssl dhparam -out /usr/local/nginx/conf/ssl/dhpapem 2048
ssl_dhparam /usr/local/nginx/conf/ssl/dhparam.pem;
ssl_client_certificate /[证书位置]/origin-pull-ca.pem;
ssl_verify_client on;
include rewrite/cloudflare.conf;

location / {
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
proxy_pass http://172.17.0.1:3000;
}

```

# 问题和解决
## 分析

配置修改完后，启动容器发现通过域名不能访问了。Cloudflare 显示错误 HOST HTTP 502。
然而在 Cloudflare 解除 IP 直连限制后直接访问 IP:端口却没有问题。
检查 nginx 日志，无错误，说明反代和容器本身也是正常的。

再查看 `docker ps -a`

```bash
# docker ps -a 
CONTAINER ID   IMAGE                           COMMAND                  CREATED         STATUS                PORTS                      NAMES
52324cb94d33   grafana/grafana                 "/run.sh"                2 weeks ago     Up 3 days             127.0.0.1:3000->3000/tcp     grafana
3b621a7b07b8   louislam/uptime-kuma:1          "/usr/bin/dumb-init …"   3 weeks ago     Up 3 days (healthy)   0.0.0.0:3001->3001/tcp     uptime-kuma
936d01a53581   prom/prometheus:latest          "/bin/prometheus --s…"   5 months ago    Up 3 days             0.0.0.0:9090->9090/tcp     great_hofstadter

```

发现是 docker 的映射 IP 不对。docker 容器内的 127.0.0.1 并不等于宿主机的 localhost，默认是 0.0.0.0，配置不正确导致了反代服务器无法访问。
于是对 Grafana 容器的 IP 进行修改。

## 问题处理

1. 记录 Grafana 容器 ID
`docker ps -a `

2. 停止 Grafana 容器 `docker stop grafana`

3.  **停止 Docker 服务** `systemctl stop docker`，不停止修改没用，请务必确认其他容器上所运行的服务是否可以中断

4. 修改配置文件
位置： /var/lib/docker/containers/[容器 ID]/hostconfig.json

源文件无格式，丢到 vscode 里格式化一下便于各位查看


```json
# cat hostconfig.json 
{
  "Binds": [
    "grafana-storage:/var/lib/grafana",
    "/root/docker/grafana+prometheus/grafana.ini:/etc/grafana/grafana.ini"
  ],
  "ContainerIDFile": "",
  "LogConfig": { "Type": "json-file", "Config": {} },
  "NetworkMode": "default",
  "PortBindings": {
    "3000/tcp": [{ "HostIp": "127.0.0.1", "HostPort": "3000" }]
  },
  "RestartPolicy": { "Name": "always", "MaximumRetryCount": 0 },
  "AutoRemove": false,
  "VolumeDriver": "",
  "VolumesFrom": null,
  "CapAdd": null,
  "CapDrop": null,
  "CgroupnsMode": "host",
  "Dns": [],
  "DnsOptions": [],
  "DnsSearch": [],
  "ExtraHosts": null,
  "GroupAdd": null,
  "IpcMode": "private",
  "Cgroup": "",
  "Links": null,
  "OomScoreAdj": 0,
  "PidMode": "",
  "Privileged": false,
  "PublishAllPorts": false,
  "ReadonlyRootfs": false,
  "SecurityOpt": null,
  "UTSMode": "",
  "UsernsMode": "",
  "ShmSize": 67108864,
  "Runtime": "runc",
  "ConsoleSize": [0, 0],
  "Isolation": "",
  "CpuShares": 0,
  "Memory": 0,
  "NanoCpus": 0,
  "CgroupParent": "",
  "BlkioWeight": 0,
  "BlkioWeightDevice": [],
  "BlkioDeviceReadBps": null,
  "BlkioDeviceWriteBps": null,
  "BlkioDeviceReadIOps": null,
  "BlkioDeviceWriteIOps": null,
  "CpuPeriod": 0,
  "CpuQuota": 0,
  "CpuRealtimePeriod": 0,
  "CpuRealtimeRuntime": 0,
  "CpusetCpus": "",
  "CpusetMems": "",
  "Devices": [],
  "DeviceCgroupRules": null,
  "DeviceRequests": null,
  "KernelMemory": 0,
  "KernelMemoryTCP": 0,
  "MemoryReservation": 0,
  "MemorySwap": 0,
  "MemorySwappiness": null,
  "OomKillDisable": false,
  "PidsLimit": null,
  "Ulimits": null,
  "CpuCount": 0,
  "CpuPercent": 0,
  "IOMaximumIOps": 0,
  "IOMaximumBandwidth": 0,
  "MaskedPaths": [
    "/proc/asound",
    "/proc/acpi",
    "/proc/kcore",
    "/proc/keys",
    "/proc/latency_stats",
    "/proc/timer_list",
    "/proc/timer_stats",
    "/proc/sched_debug",
    "/proc/scsi",
    "/sys/firmware"
  ],
  "ReadonlyPaths": [
    "/proc/bus",
    "/proc/fs",
    "/proc/irq",
    "/proc/sys",
    "/proc/sysrq-trigger"
  ]
}

```

修改宿主机 IP 即 `HostIp`，`0.0.0.0`的情况下无需填写，删掉 IP 就行，修改后的效果。
```
"PortBindings": {"3000/tcp": [{ "HostIp": "", "HostPort": "3000" }]}
```

5. 重启 docker 服务，启动容器，解决。

## 验证
通过域名打开 Grafana，已经可以正常访问了，完事