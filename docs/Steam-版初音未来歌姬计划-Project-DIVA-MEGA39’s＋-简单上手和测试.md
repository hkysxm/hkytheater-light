SEGA 又炒冷饭了，让我们看看冷饭的制作情况（PlayStation 独占 -1）




# 简介
看起来像是 PS 端 Future Tone + Switch 版本的融合，PV 画风可以在 FT 和 MEGA39s 之间切换，注意仅限 PV 喔，其他界面始终是 MEGA39s 风格。

推荐配置要求 750 Ti，占用空间约 33 G。后面会有简单的性能测试。目前游戏有 D 加密。

歌曲数量：250，其中一部分在追加乐曲包里。相比 FTDX + DLC：
缺少：【初音ミク】甩葱歌、ネコミミアーカイブ、ハト
追加：【鏡音リン&鏡音レン】鏡音八八花合戦

-------------------------

# 画面和性能
## 关于截图
 - PlayStation 版在播放 PV 时按 △ 可以进行截图，截图瞬间歌词和 Project DIVA 水印消失，右下角添加世嘉 C 社 piapro 的水印，截取出的画面质量略低于实际所见
 - PlayStation 版同样可以用主机原生的截图功能，此时歌词、Project DIVA 水印都保留，右下角添加水印，所见即所得
 - Steam 版截图方式和主机原生相同，不会截取外来内容如 Msi Afterburner 的帧数显示，水印歌词保留，右下角同样有水印

## 画面表现（流量杀手注意）
PC 版**只支持 16:9** 画面比例，帧数**锁 60 fps**。同样支持 4K 分辨率（角色材质），相比 PS4 Pro 和 PS5 上的画面，在 PV 鉴赏中可以看出抗锯齿的画面观感比 PS5 上更好。MLAA 和 FXAA 个人一眼没看出差距，就用默认的 MLAA 了。

 > PS 的水印比 PC 的大。点击查看原图，保存到本地打开更方便比较

39 Music!
![客串：PS 游戏内截图](https://hky.moe/img/220500.jpeg#vwid=3840&vhei=2160)
![PS 主机截图](https://hky.moe/img/220501.png#vwid=3840&vhei=2160)
![PC](https://hky.moe/img/220502.png#vwid=3840&vhei=2160)
VOCALOID 胸章、piapro 标

---------------

![PS 主机截图](https://hky.moe/img/220504.png#vwid=3840&vhei=2160)
![PC](https://hky.moe/img/220503.png#vwid=3840&vhei=2160)
这个画面很明显了

--------------------

ロミオとシンデレラ
![PS 主机截图](https://hky.moe/img/220505.png#vwid=3840&vhei=2160)
![PC](https://hky.moe/img/220506.png#vwid=3840&vhei=2160)

-------------------

![PS 主机截图](https://hky.moe/img/220507.png#vwid=3840&vhei=2160)
![PC](https://hky.moe/img/220508.png#vwid=3840&vhei=2160)

## 性能实测
游戏放在 SN750 里，读取用时体感和 PS5 放在内置存储接近。

公版 1070 显卡，FT 画风，3840 x 2160 无边框全屏播放 DECORATOR、千本樱 F edition，六人同时在场的情况下，全程 60 帧，帧生成时间十分稳定，游戏最高 GPU 占用不超过 50 %。

幻 13 6800HS 核显，1920 x 1080，其他同上，带上常驻通讯软件等后台，游戏最高 GPU 占用同样不超过 50 %，CPU Package 功耗在 30 ~ 45 W 波动。可怜的幻 13 温度上升到了接近 80 ，C 面顶部温度感人。
幻 13 上的一些表现图，因 Windows 11 的缘故部分参数显示不准确，占用率以 Xbox Gamebar 为准。台式 1070 带起来太轻松了，而且也不在乎功耗就不上图了。
![DECORATOR，Afterburner 显示的占用率和 GPU 核心频率不准确，实际保持在 2.2 GHz](https://hky.moe/img/220509.png#vwid=1920&vhei=1200)
![DECORATOR](https://hky.moe/img/220510.png#vwid=1920&vhei=1200)

根据上述情况个人猜测 1060 以上就可以轻松 4K 60；当代笔记本的核显（Xe 80EU 核显以上，11 代 1135G7、12 代 12500H；AMD 5800H、5800U 以上）刚好能达到 1080P 下较为流畅运行的门槛？12 CU 的 RDNA2 核显理论接近 1050ti 是毫无压力的

--------------------------

# 音游部分
## 音质
带上耳机听了一下，相同的音频设备，游戏内音源比起 YouTube 原 PV、PlayStation 版本有劣化，一耳朵闷，不知道是哪里出的问题，另外如果在声音选项里设置了更高的音质，游戏会产生巨大的延迟， COOL 直接变成 SAFE 的程度，需要将音质调到 16 位才能解决。

## 按键
游戏支持按键样式和键位调整，默认音符显示的是 XBOX 的 ABXY，在游戏选单 - 自定义可以调成 PlayStation 的 ○×△□ 
PS：插上 PS 手柄默认键位是反的，一定要记得去修改

键位分配部分出现了一个严重的问题：相比 PS 版可以自由指定，PC 版本**单个音符只能指定两个键位**，在 HARD 难度以上严重影响游戏体验。
~~目前我的临时解决方法是用 Steam 控制器布局调整把十字键映射到肩键，连接手柄后 Steam 内右键游戏 - 管理 - 控制器布局。~~
现在有相关脚本解决这个问题，可以直接跳转到 Mods 部分

Steam 控制器配置，请根据个人习惯进一步修改：
![控制器布局](https://hky.moe/img/220511.jpg#vwid=2564&vhei=1504)

游戏内配置，请根据个人习惯进一步修改：：
![游戏内](https://hky.moe/img/220512.jpg#vwid=2023&vhei=1159)

然而这样又会出现一个问题。相同映射的按键在按下状态时再按一次是没反应的，表现在游戏里就是长押后**漏键**，而主机版没有这种问题，只能等待官方更新修复。

## 分数
长押最大分从 3300 变成了 3000，BONUS 从 1650 降低到 1500，当然需要按住的时长没有变化。因为上面长押漏键的问题，一些比较极限的 MAXIMUM HOLD BONUS 拿不到了

--------------------------

# Steam 卡牌
背景会被个人资料挡住，我觉得不行，Steam Card Exchange 链接：<https://www.steamcardexchange.net/index.php?gamepage-appid-1761390>

# Steam 成就
买了 VIP 版本进游戏就会跳 20 多个成就，P 曲 100 首没有难度限制，也是白给，唯一一个有门槛的成就可能就是 100 首 EX / EXEX 吧

----------------------------

# Mod 等
游戏可以通过 DivaModLoader 加载 mod，我目前用了下面这些 mod 
 - Chinese lyrics：中文歌词，<https://steamcommunity.com/sharedfiles/filedetails/?id=2815556247>
 - 以下 mod 找自 Gamebanana：<https://gamebanana.com/mods/games/16522>
 - PS4 Module Icons：换衣服显示的图片改为 FT 样式
 - Remove Watermarks：不要水印，没有水印的老婆太棒啦
 - Restore Cut Songs：添加相比 FT 版本删去的几首歌，包含 PV
 - Very Cool：更精确的显示判定，FINE -> SLOW FAST，COOL 添加更精准的虹色 COOL

另外还有一个 Steam 社区指南里的 [肩键脚本](https://steamcommunity.com/sharedfiles/filedetails/?id=2815556247)，不过等 SBGA 修了 BUG 后就用不上了吧

# 其他问题
 - 上面提到的音质似乎变差了
 - 设置音响设备更高音质会导致延迟
 - 我的台式第一次启动游戏会失败，要在 Steam 里二次启动，幻 13 反而没有问题，事件查看器里没有报错，没辙了等修复

# 碎碎念
基本是从其他平台照搬的移植，画面略有提升，但是宽屏、高刷都没有支持，还有 D 加密；除去键位的问题待修复外目前 Steam 评论区能看到其他的几个 bug，这些还需要等待进一步修复。BUG 都修好之后我玩 PS5 的理由就又少了一个咯

购买建议 VIP 版本，歌曲和装扮都能直接补齐，否则衣服要刷到吐。
没有在其他平台买过的可以考虑入手，也可以等到 Steam 夏促看看有没有折扣；其他平台买过的建议三思；不怕社死想上班、出差玩也可以买，已经有了其他平台版本的情况下，其实 PC 端还有街机移植破解的 PDAFT，打上 mod 能做的事很多 ：）当然如果您和我一样是初音未来的提款机那...

SEGA 这几年 Project Sekai 搞的风生水起，有不少新 V 曲；反观 Project DIVA 是不是放弃了，上各种平台炒冷饭，啤酒烧烤赚来的什么时候能给 DIVA 加点新歌啊（做梦