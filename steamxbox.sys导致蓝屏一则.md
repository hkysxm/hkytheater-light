<!--markdown-->大概是临时解决方案

<!--more-->

-----------------------

# 现象

手上的幻 13 一直用的好好的，今天忽然卡住后蓝屏，强制重启能开机进入桌面，然后又蓝屏

下面是几个蓝屏代码：

 - 终止代码: **SYSTEM_SERVICE_EXCEPTION**   失败的操作: Wdf01000.sys

 - **ATTEMPTED_EXECUTE_OF_NOEXECUTE_MEMORY**

 - **WDF VIOLATION**

 - **KERNEL_SECURITY_CHECK_FAILURE**

# 分析

在网上大概搜了一下，可能是驱动问题，再想到前两天推送了 Windows 更新，怀疑是驱动和新系统冲突。

于是收集数据，因为能进到系统，所以进系统后按住 `Shift` 再按重启就能进到故障诊断启动选项了。注意 Win10 以后开机按 F8 是不行的，具体可以参考此文章 

[在 Windows 中以安全模式启动电脑 - Microsoft 支持](https://support.microsoft.com/zh-cn/windows/%E5%9C%A8-windows-%E4%B8%AD%E4%BB%A5%E5%AE%89%E5%85%A8%E6%A8%A1%E5%BC%8F%E5%90%AF%E5%8A%A8%E7%94%B5%E8%84%91-92c27cff-db89-8644-1ce4-b3e5e56fe234)

带网络的安全模式，`sfc /scannow` 扫描系统文件损坏，没有问题，minidump 有 dump 文件不过安全模式打不开，U 盘拿出来丢在台式上分析。没有两台 Windows 的建议发给朋友帮忙分析?

和之前硬盘坏了没有 dump 不一样，软件问题的故障四次蓝屏，四个 dump。随便分析了两个，结果是一样的




[collapse status="false" title="WinDbg 详细信息"]
```
 !analyze -v
*******************************************************************************
*                                                                             *
*                        Bugcheck Analysis                                    *
*                                                                             *
*******************************************************************************

WDF_VIOLATION (10d)
The Kernel-Mode Driver Framework was notified that Windows detected an error
in a framework-based driver. In general, the dump file will yield additional
information about the driver that caused this BugCheck.
Arguments:
Arg1: 0000000000000005, A framework object handle of the incorrect type was passed to
	a framework object method.
Arg2: 00002a7aaa252dd8, The handle value passed in.
Arg3: 000000000000100a, Reserved.
Arg4: ffffd5854c650230, Reserved.

Debugging Details:
------------------

*** WARNING: Unable to verify timestamp for steamxbox.sys
*** WARNING: Check Image - Checksum mismatch - Dump: 0x2057db, File: 0x205079 - C:\ProgramData\Dbg\sym\BTHport.sys\F50268B7200000\BTHport.sys

KEY_VALUES_STRING: 1

    Key  : Analysis.CPU.mSec
    Value: 983

    Key  : Analysis.Elapsed.mSec
    Value: 2108

    Key  : Analysis.IO.Other.Mb
    Value: 0

    Key  : Analysis.IO.Read.Mb
    Value: 0

    Key  : Analysis.IO.Write.Mb
    Value: 0

    Key  : Analysis.Init.CPU.mSec
    Value: 124

    Key  : Analysis.Init.Elapsed.mSec
    Value: 9584

    Key  : Analysis.Memory.CommitPeak.Mb
    Value: 106

    Key  : Bugcheck.Code.LegacyAPI
    Value: 0x10d

    Key  : Dump.Attributes.AsUlong
    Value: 1808

    Key  : Dump.Attributes.DiagDataWrittenToHeader
    Value: 1

    Key  : Dump.Attributes.ErrorCode
    Value: 0

    Key  : Dump.Attributes.KernelGeneratedTriageDump
    Value: 1

    Key  : Dump.Attributes.LastLine
    Value: Dump completed successfully.

    Key  : Dump.Attributes.ProgressPercentage
    Value: 0

    Key  : Failure.Bucket
    Value: 0x10D_5_steamxbox!unknown_function

    Key  : Failure.Hash
    Value: {a7d4e4f9-4d6e-4013-072c-8f2903e0bca4}

    Key  : Hypervisor.Enlightenments.ValueHex
    Value: 1497cf94

    Key  : Hypervisor.Flags.AnyHypervisorPresent
    Value: 1

    Key  : Hypervisor.Flags.ApicEnlightened
    Value: 1

    Key  : Hypervisor.Flags.ApicVirtualizationAvailable
    Value: 0

    Key  : Hypervisor.Flags.AsyncMemoryHint
    Value: 0

    Key  : Hypervisor.Flags.CoreSchedulerRequested
    Value: 0

    Key  : Hypervisor.Flags.CpuManager
    Value: 1

    Key  : Hypervisor.Flags.DeprecateAutoEoi
    Value: 0

    Key  : Hypervisor.Flags.DynamicCpuDisabled
    Value: 1

    Key  : Hypervisor.Flags.Epf
    Value: 0

    Key  : Hypervisor.Flags.ExtendedProcessorMasks
    Value: 1

    Key  : Hypervisor.Flags.HardwareMbecAvailable
    Value: 1

    Key  : Hypervisor.Flags.MaxBankNumber
    Value: 0

    Key  : Hypervisor.Flags.MemoryZeroingControl
    Value: 0

    Key  : Hypervisor.Flags.NoExtendedRangeFlush
    Value: 0

    Key  : Hypervisor.Flags.NoNonArchCoreSharing
    Value: 1

    Key  : Hypervisor.Flags.Phase0InitDone
    Value: 1

    Key  : Hypervisor.Flags.PowerSchedulerQos
    Value: 0

    Key  : Hypervisor.Flags.RootScheduler
    Value: 0

    Key  : Hypervisor.Flags.SynicAvailable
    Value: 1

    Key  : Hypervisor.Flags.UseQpcBias
    Value: 0

    Key  : Hypervisor.Flags.Value
    Value: 4853999

    Key  : Hypervisor.Flags.ValueHex
    Value: 4a10ef

    Key  : Hypervisor.Flags.VpAssistPage
    Value: 1

    Key  : Hypervisor.Flags.VsmAvailable
    Value: 1

    Key  : Hypervisor.RootFlags.AccessStats
    Value: 1

    Key  : Hypervisor.RootFlags.CrashdumpEnlightened
    Value: 1

    Key  : Hypervisor.RootFlags.CreateVirtualProcessor
    Value: 1

    Key  : Hypervisor.RootFlags.DisableHyperthreading
    Value: 0

    Key  : Hypervisor.RootFlags.HostTimelineSync
    Value: 1

    Key  : Hypervisor.RootFlags.HypervisorDebuggingEnabled
    Value: 0

    Key  : Hypervisor.RootFlags.IsHyperV
    Value: 1

    Key  : Hypervisor.RootFlags.LivedumpEnlightened
    Value: 1

    Key  : Hypervisor.RootFlags.MapDeviceInterrupt
    Value: 1

    Key  : Hypervisor.RootFlags.MceEnlightened
    Value: 1

    Key  : Hypervisor.RootFlags.Nested
    Value: 0

    Key  : Hypervisor.RootFlags.StartLogicalProcessor
    Value: 1

    Key  : Hypervisor.RootFlags.Value
    Value: 1015

    Key  : Hypervisor.RootFlags.ValueHex
    Value: 3f7


BUGCHECK_CODE:  10d

BUGCHECK_P1: 5

BUGCHECK_P2: 2a7aaa252dd8

BUGCHECK_P3: 100a

BUGCHECK_P4: ffffd5854c650230

FILE_IN_CAB:  090223-14015-01.dmp

DUMP_FILE_ATTRIBUTES: 0x1808
  Kernel Generated Triage Dump

BLACKBOXBSD: 1 (!blackboxbsd)


BLACKBOXNTFS: 1 (!blackboxntfs)


BLACKBOXPNP: 1 (!blackboxpnp)


BLACKBOXWINLOGON: 1

CUSTOMER_CRASH_COUNT:  1

PROCESS_NAME:  steam.exe

STACK_TEXT:  
ffff860d`f9847088 fffff805`6f805b90     : 00000000`0000010d 00000000`00000005 00002a7a`aa252dd8 00000000`0000100a : nt!KeBugCheckEx
ffff860d`f9847090 fffff805`6f7d4c2b     : ffffd585`55dad220 ffff860d`f98472b9 00002a7a`aa252dd8 fffff805`6f7c60b3 : Wdf01000!FxVerifierBugCheckWorker+0x24 [minkernel\wdf\framework\shared\object\fxverifierbugcheck.cpp @ 87] 
ffff860d`f98470d0 fffff805`6f7c6277     : ffff860d`f98471e0 00000000`00000000 00000000`00000000 ffffd585`4146f7d0 : Wdf01000!FxObjectHandleGetPtrQI+0xe9a3 [minkernel\wdf\framework\shared\object\handleapi.cpp @ 445] 
ffff860d`f9847140 fffff805`6f7f3c46     : fffff805`abc21350 fffff805`abc1df90 00000000`00000000 fffff805`abc3d21d : Wdf01000!FxObjectHandleGetPtr+0x47 [minkernel\wdf\framework\shared\inc\private\common\fxhandle.h @ 356] 
ffff860d`f9847180 fffff805`abc0a31f     : 00000000`00000000 0000a229`04801c99 ffff860d`f98471d8 00000000`00000018 : Wdf01000!imp_WdfMemoryGetBuffer+0x26 [minkernel\wdf\framework\shared\core\fxmemorybufferapi.cpp @ 200] 
ffff860d`f98471b0 00000000`00000000     : 0000a229`04801c99 ffff860d`f98471d8 00000000`00000018 ffffd585`5c192ac0 : steamxbox+0xa31f


SYMBOL_NAME:  steamxbox+a31f

MODULE_NAME: steamxbox

IMAGE_NAME:  steamxbox.sys

STACK_COMMAND:  .cxr; .ecxr ; kb

BUCKET_ID_FUNC_OFFSET:  a31f

FAILURE_BUCKET_ID:  0x10D_5_steamxbox!unknown_function

OSPLATFORM_TYPE:  x64

OSNAME:  Windows 10

FAILURE_ID_HASH:  {a7d4e4f9-4d6e-4013-072c-8f2903e0bca4}

Followup:     MachineOwner
---------
```
[/collapse]

 ```
SYMBOL_NAME:  steamxbox+a31f

MODULE_NAME: steamxbox

IMAGE_NAME:  steamxbox.sys

STACK_COMMAND:  .cxr; .ecxr ; kb

BUCKET_ID_FUNC_OFFSET:  a31f

FAILURE_BUCKET_ID:  0x10D_5_steamxbox!unknown_function
```

很明显问题出在 **steamxbox.sys**，搜索后发现是 steam 控制器的扩展功能驱动。

# 解决
直接删除 sys 文件显然删不掉，用巨硬官方的 AutoRun 工具先阻止运行一波

Autoruns for Windows - Sysinternals | Microsoft Learn
<https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns>

驱动程序里面找到 steamxbox.sys 取消勾选，成功进入系统并且没有很快蓝屏。不过鼠标键盘触屏又不能用了。

远程桌面连接上，设备管理器里可以看到所有的键鼠和触屏都叹号不能使用了，错误：**这个设备(服务)的驱动程序已被禁用。另一个驱动程序可以提供这个功能。 (代码32) ** 

怀疑是没有卸载扩展驱动导致的后遗症，在 **steam 设置 - 控制器** 里卸载驱动，重启，轻松秒杀。

![卸载，不是安装](https://hky.moe/img/230900.png#vwid=1062&vhei=903)

可能有人就要问了，为什么不在安全模式里卸了，因为安全模式的 steam 设置里点了卸不掉，不相信的可以自己试试?





