handsome主题算是一个比较完善的typecho主题了，在设置面板里也提供了诸多功能。不过功能永远赶不上需求，因此笔者会不定期对handsome进行一些改动以满足自己的爱好。


**主题下载（？）**：不存在下载，请支持正版：[handsome][1]

-----

 - 本文会将页面样式和JS分开记录，均按笔者的改造时间新=>旧为序。
 - 会标出大致行数，不过由于可能会有忘记的修改因此行数可能不一致，**请善用搜索功能**
 - JS部分默认读者已有最基础的JS和HTML知识
 - 使用的辅助工具：VSCode、github（现已支持免费私人repo）

## 前端样式

### 修改置顶和目录按钮
typecho的侧边浮动按钮图标比较怪，全屏的按钮竟然是目录，鼠标不悬浮在上面也没有提示；置顶按钮只是个人不喜欢而已。
文件位置：`usr/themes/handsome/component/footer.php `
70行左右
```
      <div class="topButton panel panel-default">
          <button id="goToTop" class="btn btn-default no-shadow pos-abt hide">
              <i class="fontello fontello-chevron-circle-up" aria-hidden="true"></i>
          </button>
      </div>
```
文件位置：`usr/themes/handsome/component/sidebar.php `
130行左右
```
                  <button class="btn btn-default no-shadow pos-abt" data-toggle="tooltip" data-placement="left" data-original-title="<?php _me("目录") ?>" data-toggle-class=".tocify-mobile-panel=active">
                      <i class="glyphicon glyphicon-resize-full"></i>
                  </button>
                  <div class="panel-heading"><?php _me("文章目录") ?></div>
```
修改`<button>`标签内的`<i class>`即可。笔者使用了Bootstrap的自带图标。

### 404页面去除登录注册按钮
个人的博客不需要此功能
文件位置：` usr/themes/handsome/404.php`
删就完了

### 删除时光机右侧联系方式图标下方圆点
文件位置：`usr/themes/handsome/cross.php`
130行左右
```
$contactItemsOutput .= '<li class="list-group-item"><a target="_blank" href="'.$itemLink.'"
        class="pull-left thumb-sm avatar m-r"><img src="'.$itemImg.'" class="img-circle"><i
            class="on b-white bottom"></i></a>
    <div class="clear">
        <div><a target="_blank" href="'.$itemLink.'">'.$itemName.'</a></div><small
            class="text-muted">'.$itemValue.'</small>
    </div>
</li>';
```
删除`<i class="on b-white bottom"></i>`

### 分类开关改为默认打开

 > 新版handsome已经提供此功能，故折叠
[collapse status="false" title="折叠的内容"]
文件位置：`usr/themes/handsome/component/aside.php `
约120行
```
            <!--分类category-->
            <!-- php+jquery展开、收起下拉菜单 -->
            <?php
                  $class = "";
                  if (in_array("openCategory", $this->options->featuresetup)) {
                    $class = "class=\"active\"";
                  }
                  ?>
                  
            <li class="active">
              <a class="auto">
                <span class="pull-right text-muted">
                  <i class="fontello icon-fw fontello-angle-right text"></i>
                  <i class="fontello icon-fw fontello-angle-down text-active"></i>
                </span>
                <i class="glyphicon glyphicon-th"></i>
                <span><?php _me("分类") ?></span>
              </a>
```
添加`<li class="active">`

[/collapse]


###去除左侧栏底部RSS
文件位置：`usr/themes/handsome/component/aside.php `
约200行
```
从
          <!--left_footer-->
         <!-- <?php if (@!in_array('notShowleftBottomMenu',$this->options->indexsetup)): ?>
·
·
·
·
到
                      <a target="_blank" href="<?php $this->options->commentsFeedUrl(); ?>" title="" data-toggle="tooltip" data-placement="top" data-original-title="评论RSS地址">
                          <span class="block"><i class="fontello fontello-rss-square"></i></span>
                          <small class="text-muted"><?php _me("评论") ?></small>
                      </a>
                  </div>
          </div>
          <?php endif; ?>
```
将如上内容全部注释即可

## JavaScript

### 资料页中实现游戏ID等的点击复制
实现方法：使用[Clipboard.js][2]
在handsome设置中在文章末尾加入HTML语句：
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js"></script>
<!--定义监听范围-->
<script>
var copybtn = document.querySelectorAll('.cpbtn');
var clipboard = new ClipboardJS(copyid);    </script>
```
 - 根据[clipboardjs开发者在stackoverflow的回答][3]，clipboardjs出于安全等因素只适用于button按钮
 - 日后可能会考虑使用原生js实现点击非button元素的复制

添加button实现复制功能（暂时放在联系方式下方，以后会放在资料卡/Producer名片旁 ← 现在还没有）
文件位置： `usr/themes/handsome/cross.php`
130行左右
```
<?php echo $contactItemsOutput; ?>
<!-- 添加一行按钮-->
<li class="list-group-item"><button class="btn btn-info btn-sm cpbtn" data-clipboard-text="HFX9WJB5">复制MLTD ID</button><button class="btn btn-info btn-sm cpbtn" data-clipboard-text="358db7fc4f">复制CGSS ID</button></li>
                        </ul>
                    </div>
```

### 404页面定时返回 
文件位置： `usr/themes/handsome/404.php`
功能实现方法：
`setInterval()`：倒计时时间和跳转
`history.go()`：页面前进或后退
核心代码:
```
#html
    <a class="text-muted letterspacing"><b id="sp">4</b>秒后自动返回···</a>

#js
<script type="text/javascript">
    onload = function() {
        setInterval(go, 1000);
    };
    var x = 4; 
    function go() {
        x--;
        if (x > 0) {
            document.getElementById("sp").innerHTML = x; 
        } else {
            history.go(-1);
        }
    }
</script>
```


  [1]: https://www.ihewro.com/archives/489/
  [2]: https://clipboardjs.com/
  [3]: https://stackoverflow.com/questions/43235239/copy-text-to-clipboard-using-clipboard-js-without-button