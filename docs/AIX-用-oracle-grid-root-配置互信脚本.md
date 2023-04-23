不会写脚本，但是云平台翻车，手工配也太慢了所以还是糊了个



------------------

DBA：需要配置 oracle root grid 三个用户的相互互信，包括自身
也就是整合了一下命令。虽然也加进去了 Linux 的，但是接触不到 Linux Oracle 环境没试过效果

```shell
#!/bin/ksh
# AIX

# if [[ "$OSTYPE" == "linux-gnu"* ]]; then
#     # for Linux
#     su - root
#     ssh-keygen -t rsa -f "test_rsa" -N ""

#     runuser -l oracle -c 'ssh-keygen -t rsa -f "test_rsa" -N ""'
#     runuser -l grid -c 'ssh-keygen -t rsa -f "test_rsa" -N ""'

# else
#     # for aix, more
#     su - root -c 'ssh-keygen -t rsa -f "test_rsa" -N ""'
#     su - oracle -c 'ssh-keygen -t rsa -f "test_rsa" -N ""'
#     su - grid -c 'ssh-keygen -t rsa -f "test_rsa" -N ""'

# fi

cat .ssh/id_rsa.pub /home/oracle/.ssh/id_rsa.pub >>/.ssh/authorized_keys

cat .ssh/id_rsa.pub /home/oracle/.ssh/id_rsa.pub /home/grid/.ssh/id_rsa.pub >>/home/oracle/.ssh/authorized_keys

cat .ssh/id_rsa.pub /home/oracle/.ssh/id_rsa.pub /home/grid/.ssh/id_rsa.pub >>/home/grid/.ssh/authorized_keys

chown oracle /home/oracle/.ssh/authorized_keys &&
    chown grid /home/grid/.ssh/authorized_keys

ls -l /home/oracle/.ssh/authorized_keys && ls -l /home/grid/.ssh/authorized_keys

cat /.ssh/authorized_keys && echo && /home/oracle/.ssh/authorized_keys && echo && /home/grid/.ssh/authorized_keys

who am i
# should be root
ssh -o StrictHostKeyChecking=no oracle
who am i
# root -> oracle
ssh -o StrictHostKeyChecking=no grid
who am i
# oracle -> grid
ssh -o StrictHostKeyChecking=no root
who am i
# oracle -> root
ssh -o StrictHostKeyChecking=no grid
who am i
# root -> grid
ssh -o StrictHostKeyChecking=no oracle
who am i
# grid -> oracle

# ssh -q -o BatchMode=yes user@remote.com exit
# if [ $? != "0" ]; then
#     echo "Connection failed"
# fi

```