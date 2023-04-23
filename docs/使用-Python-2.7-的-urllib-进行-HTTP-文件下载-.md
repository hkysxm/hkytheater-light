要啥啥没有，还好 unix 系统里自带 Python



-------------------

某 AIX 分区需要一个文件，FTP 网段不通，同网段的网站上有但是脚本调用的 `wget` `curl` 都没装，`scp` `rcp` `telent` 不合规不准用，Python 版本只有 2.7 还没 request 模块，希望大家永远不会遇到这种情况?



方法是百度来的，AIX 能用就完事了

原地址：<https://www.jb51.net/article/82750.htm>


```python
# python
Python 2.7.5 (default, Aug 16 2013, 14:02:06) [C] on aix6
Type "help", "copyright", "credits" or "license" for more information.
>>> import urllib
>>> import os
>>> url = 'http://10.x.x.x:8080/xx/xxx.tgz'
>>> local = os. path. join('/tmp xxx.tgz')
>>> urllib.urlretrieve(url, local)]
# 返回
  （'/tmp/xxx.tgz', <httplib. HTTPMessage instance at 0x20175ce8>)
```