命令都没记住，死ね






----------------

> 其实还有环境变量没配置也会导致这种问题？

试图使用 `docker exec` 进入容器时遇到错误：
```
OCI runtime exec failed: exec failed: container_linux.go:370: starting container process caused: exec: "-it": executable file not found in $PATH: unknown

```
查阅 Google 无果，看起来是个很复杂的问题？

重新打开一个终端，再敲一遍:

```
docker exec -it grafana /bin/bash
```

...成功进入？

回去翻历史命令，发现敲的是 `docker -exec grafana -it /bin/bash`，破案了


总结：?