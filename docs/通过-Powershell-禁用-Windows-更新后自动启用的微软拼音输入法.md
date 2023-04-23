Windows 11 开始系统每次更新后都会启用微软拼音输入法并设置成中文首选输入法，不胜其烦，找了找解决方法




---------------

##  思路

首先想到的肯定是删文件，微软家的输入法文件位于 **C:/\WINDOWS/\System32/\InputMethod** 下，试了试删除要 TrustedInstaller 权限，每次装完后都过来改权限删除也太麻烦了。

---------

接下来能想到的就是直接删除注册表键值。

查询巨硬官网找到微软拼音对应键值（[查询链接](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-input-locales-for-windows-language-packs?view=windows-11)） `0804:{81D4E9C9-1D3B-41BC-9E6C-4B40BF79E35E}{FA550B04-5AD7-411F-A5AC-CA038EC515D7}`，位置 `HKEY_CURRENT_USER\Control Panel\International\User Profile\zh-Hans`

`HKEY_USERS\.DEFAULT\Control Panel\International\User Profile System Backup` 这里也有微软拼音，不知道有啥作用

删完了重启，发现虽然系统设置里显示的变了但是**实际上并没有效果**，外网也有很多做过类似尝试的网友试了发现确实没用

-------------

结果还是要用 Windows 自家的东西来解决，请出 PowerShell

没研究过 PowerShell，翻了微软官网后找到 `Get-WinUserLanguageList` `Set-WinUserLanguageList`，先在终端里试试。


```powershell
PS C:\WINDOWS> $LanguageList = Get-WinUserLanguageList # 获取语言列表
PS C:\WINDOWS> $LanguageList


LanguageTag     : zh-Hans-CN
Autonym         : 中文(中华人民共和国)
EnglishName     : Chinese
LocalizedName   : 中文(简体，中国)
ScriptName      : 中文(简体)
InputMethodTips : {0804:{170462E1-875A-4DC4-A37D-EB3CEFDE9FEF}{A8805AF7-E396-4AC8-B3C6-BA49083B7D22}, 0804:{81D4E9C9-1D3B-41BC-9E6C-4B40BF79E35E}{FA550B04-5AD7-411F-A5AC-CA038EC515D7}}
Spellchecking   : True
Handwriting     : True

LanguageTag     : ja
Autonym         : 日本語
EnglishName     : Japanese
LocalizedName   : 日语
ScriptName      : 日语
InputMethodTips : {0411:{03B5835F-F03C-411B-9CE2-AA23E1171E36}{A76C93D9-5523-4E90-AAFA-4DB112F9AC76}}
Spellchecking   : True
Handwriting     : True

LanguageTag     : en-US
Autonym         : English (United States)
EnglishName     : English
LocalizedName   : 英语(美国)
ScriptName      : 拉丁文
InputMethodTips : {0409:00000409}
Spellchecking   : True
Handwriting     : False

```


很显然在 `InputMethodTips` 有微软拼音，移除掉后重新套用就完事了

## 解决

执行下面三行命令，需要**管理员权限**：
（注意只适用于首选语言为简体中文的情况，否则请酌情修改）

```
$LanguageList = Get-WinUserLanguageList # 获取语言列表
$LanguageList[0].InputMethodTips.Remove("0804:{81D4E9C9-1D3B-41BC-9E6C-4B40BF79E35E}{FA550B04-5AD7-411F-A5AC-CA038EC515D7}") # 移除微软输入法
Set-WinUserLanguageList -LanguageList $LanguageList -Force # 套用移除后的配置，无需确认

```

可以看到托盘区闪了几下，完成。

**PS**: 文章末尾有直接下载执行的脚本

## 扩展：用管理员权限运行 PowerShell (.ps1) 脚本的方法

### 方法 1：创建快捷方式，以管理员运行
适用于单个需要经常执行的脚本，不多说

### 方法 2：注册表添加右键管理员权限运行
网上一搜一堆，我就不污染搜索结果了：）

### 方法 3：编辑脚本添加提权功能

在脚本开头添加以下语句，详细请参考 <https://superuser.com/questions/108207/how-to-run-a-powershell-script-as-administrator>：
```
#### START ELEVATE TO ADMIN #####
param(
    [Parameter(Mandatory=$false)]
    [switch]$shouldAssumeToBeElevated,

    [Parameter(Mandatory=$false)]
    [String]$workingDirOverride
)

# If parameter is not set, we are propably in non-admin execution. We set it to the current working directory so that
#  the working directory of the elevated execution of this script is the current working directory
if(-not($PSBoundParameters.ContainsKey('workingDirOverride')))
{
    $workingDirOverride = (Get-Location).Path
}

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
    $currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

# If we are in a non-admin execution. Execute this script as admin
if ((Test-Admin) -eq $false)  {
    if ($shouldAssumeToBeElevated) {
        Write-Output "Elevating did not work :("

    } else {
        #                                                         vvvvv add `-noexit` here for better debugging vvvvv 
        Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -file "{0}" -shouldAssumeToBeElevated -workingDirOverride "{1}"' -f ($myinvocation.MyCommand.Definition, "$workingDirOverride"))
    }
    exit
}

Set-Location "$workingDirOverride"
##### END ELEVATE TO ADMIN #####

# Add actual commands to be executed in elevated mode here:
Write-Output "I get executed in an admin PowerShell"

```
如果脚本执行完成后需要停留在终端，可在 `Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile` 后添加 `-noexit`参数。


最后发个自用完整版：[蓝奏云](https://wwi.lanzouq.com/iqBey00m31eb) [Google drive](https://drive.google.com/file/d/17GND7hSoH4fC0j1joj-weRYe_-FdDQhV/view?usp=sharing)


### 补充：修改替代默认输入法
参考：<https://docs.microsoft.com/en-us/powershell/module/international/set-windefaultinputmethodoverride?view=windowsserver2022-ps>

```powershell
Set-WinDefaultInputMethodOverride -InputTip "0409:00000409"
# 设置替代默认输入法为英语（美国）
```