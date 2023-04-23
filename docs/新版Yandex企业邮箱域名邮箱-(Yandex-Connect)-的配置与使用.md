Yandex企业邮箱是当今为数不多的免费且质量不错的邮箱。在去年下半年Yandex将旗下的企业邮箱等服务合并进了Yandex Connect，笔者在这里会将Yandex Connect配置企业邮箱的方法进行一些整理。


----------

2019.11.20： 更新为当前的版本，步骤更少
2021.1.14: 又换界面了，步骤发生一些变化，有些流程类似，懒得换图片了，后面的一些内容没有验证是否仍然有效，请以 yandex 为准


Yandex邮箱的主要优势：支持SMTP POP3协议（ZOHO不支持）、一个域名下可以有1000个邮箱、送达率高不易进垃圾箱

所需要的：一个域名、梯子（通常不需要）、翻译工具

## 一、申请 Yandex 账户和企业邮箱

直接从申请企业箱页面跳转效率更高。

进入申请页面 <https://business.yandex.ru/mail360>，选择**顶部**的免费试用 **Попробовать бесплатно**。

![Попробовать бесплатно][1]

将会跳转到登录界面，此时我们没有帐号，点击 **зарегистрированный**，结合翻译软件填写信息注册并登录。

登录后，会自动进入 <https://admin.yandex.ru> 管理页面。

 > ↓没有遇到下面问题的可直接无视↓
 > 
 > 如果页面上有一堆需要填写的验证信息，说明注册的帐号默认为俄罗斯地区，我们必须修改帐号地区后才能继续使用域名邮箱。
 > 从右上角默认头像 -> Account Management 进入[个人信息页面](https://passport.yandex.ru/profile)，点击 Edit personal information，将区域改为其他国家，测试改为中国可以使用。
 > 修改完成后，回到[管理页面](https://admin.yandex.ru)。

Accept 同意用户协议继续，显示 You're ready to go! 就可以点击 Set up email 添加域名了。
![ready to go][2]
接下来的步骤和旧版类似，就不换图了。

##二、验证域名所有权
新版会直接跳出需要进行的验证，也可以在左侧栏 **Set up email** 里继续。

目前提供三种验证方法：
 - DNS Record：在域名管理页面将文本框中的内容添加为 TXT Record 记录。正常情况下，最长需要 72 h 才能完成验证，不排除实际时间更长。
 - HTML File：下载提供的文件，放在网站根目录下
 - Meta Tag：在域名主页网站的 <head> 标签内增加 Yandex 所提供的代码行
![pic][3]

选择任意方法进行验证，配置完成后点击 Verify Domain 验证即可。

##三、配置 MX 记录、设置 SPF 记录与 DKIM
验证完成后已经可以添加邮箱了，不过在此之前需要配置 MX, DKIM记录。
SPF 和 cname 记录以前需要添加，现在似乎没有了，可以不添加。


先添加 MX Record 验证。

#### MX记录
Value — `mx.yandex.net.`←- 不要丢了最后的点，虽然某些托管商会将它去掉
Priority — `10`
(Subdomain) Name / Host — `@`←- 不可以的话填写域名

添加好 MX record，点击按钮进行验证

#### DKIM signature
添加一条 TXT 记录
Name / Host — `mail._domainkey`
Value — 复制提供的即可


[collapse status="false" title="现在应该不需要添加了的 CNAME 和 SPF 记录，折叠"]
*CName 记录*
Value — `domain.mail.yandex.net.`←- 不要丢了最后的点，虽然某些托管商会将它去掉
Name / Host: `mail`

*SPF Record*
添加一条 TXT 记录
Value —  `v=spf1 redirect=_spf.yandex.net`
Name / Host — `@`←- 不可以的话填写域名
[/collapse]


如果忘记了添加 Value 值，日后可以需要从[Service-Mail -- DKIM signatures][5]中获取。


##四、添加邮箱帐户
完成上述步骤后，打开侧栏 **Users** ，选择 **Add Users** 添加账户。填写好必填信息，即可使用添加的帐号 ＆ 密码在 Yandex Mail 中登录。
![][6]

最后不要忘记了登陆一下新添加的邮箱，感谢评论区 **woytu** 的提醒：

 > **woytu**：应该还有一个步骤，就是当所有配置完成后，新添加的用户需要去登录一次才能使用，因为首次登陆需要同意一个协议

##五、邮件收发测试和配置到其他邮件服务商

先使用 Yandex Mail 登录刚才的帐号，进行手动收发测试，还可以在 <https://www.mail-tester.com> 检测发件效果。
Yandex 方也对邮件有一定要求，内容文字过少可能仍然会被识别为垃圾邮件。

完成上述步骤后就可以配置 POP3 / IMAP / SMTP 收发邮件了。

| 协议 | SSL端口 | 邮件服务器 |
| :---: | :---: | :---: |
| IMAP | 993 | imap.yandex.com | 
| SMTP | 465 | smtp.yandex.com |
| POP3 | 995 | pop.yandex.com |


PS: QQ 邮箱网页端是不支持 IMAP 收取的，默认情况下发出的邮件会显示由 QQ 邮箱代发，需要在其他邮箱帐户设置中修改为其他邮箱的 SMTP 服务器发送，如下图。个人更推荐直接使用其他第三方客户端。
![][7]


  [1]: https://hky.moe/img/210100.jpg#vwid=1165&vhei=745
  [2]: https://hky.moe/img/210101.jpg#vwid=1567&vhei=866
  [3]: https://hky.moe/img/190304.png#vwid=590&vhei=244
  [4]: https://hky.moe/img/191102.png
  [5]: https://connect.yandex.com/portal/services/mail
  [6]: https://hky.moe/img/190305.png#vwid=459&vhei=742
  [7]: https://hky.moe/img/190306.png#vwid=526&vhei=243