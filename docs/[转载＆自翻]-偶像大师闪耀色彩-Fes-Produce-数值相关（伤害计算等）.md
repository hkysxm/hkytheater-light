シャニマス已经迎来了一周年，看了下现在的日wiki也算是比较完善了，把略复杂却也相对常用的一些内容搬过来作为参考。



----------
原文地址：[仕様考察 - シャニマス攻略 Wiki*][1]
原文最后更新日期：2019-05-03 (金) 

Header Photo：アイドルマスターシャイニーカラーズ　 お揃いスナップ · 樱木 真乃

日语渣渣，翻译若有不完善/错误，欢迎指出


##各种计算公式

###表现值与基本攻击力

Appeal判定补正
  <table>
                    <tr>
                        <th style="text-align:center; width:60px;">Appeal判定</th>
                        <th style="text-align:center; width:60px;">Bad</th>
                        <th style="text-align:center; width:60px;">Normal</th>
                        <th style="text-align:center; width:60px;">Good</th>
                        <th style="text-align:center; width:60px;">Perfect</th>
                    </tr>
                    <tr>
                        <th style="text-align:center;">倍率</th>
                        <td style="text-align:center; width:60px;">0.5</td>
                        <td style="text-align:center; width:60px;">1.0</td>
                        <td style="text-align:center; width:60px;">1.1</td>
                        <td style="text-align:center; width:60px;">1.5</td>
                    </tr>
                    <tr>
                        <th colspan="5" style="text-align:center;">Excellent（属性一致）</th>
                    </tr>
                    <tr>
                        <th style="text-align:center;">倍率</th>
                        <td colspan="4" style="text-align:center;">2.0</td>
                    </tr>
                    <tr>
                        <th colspan="5" style="text-align:center;">审查员debuff（普通试镜）</th>
                    </tr>
                    <tr>
                        <th style="text-align:center;">倍率</th>
                        <td colspan="4" style="text-align:center;">0.9</td>
                    </tr>
                </table>
以上各项均为乘算。如同属性（excellent）+ perfect 的情况下为 2 × 1.5。

 - 审查员debuff：审查员在FES/普通试镜中某些回合会在造成大量metal伤害的同时给予debuff，同时会显示如[Vi↓]这样的图标。通常情况下效果为该审查员对应属性-10%，在期间限定活动中，限定试镜给予的debuff会有所不同。

[scode type="blue"]wiki上并没有对Produce中的被动技能buff进行说明，不确定是与审查员debuff加算还是乘算[/scode]
###Produce偶像自身攻击力

>[ P × 2 + S × 0.2 × (1 + 0.1 × W) ] × Appeal判定补正 × 技能倍率

 - **P**：Produce偶像的对应属性值
 - **S**：guest偶像（Produce开始界面的最后一位）**除外**的四名Support偶像的对应属性值
 - **W**：经过周数。如Produce开始时第一周为0，WING决胜时为33。

以WING决胜VO流行一位夏叶为例，在无buff的情况下，夏叶的Perfect→Vo攻击力为基础值4636 × 2 × 1.5 = 13908。假设Produce偶像的Vo属性值为600，4名Support偶像的Vo均为200即总和800，那么Perfect2.5倍刀的攻击力为：

` [600 × 2 + 800 × 0.2 × (1 + 0.1 × 33)] × 1.5*Perfect* × 2*Excellent* × 2.5 = 14160`

PS: 然而理想情况并不容易实现。译者的主力Vo Support偶像均为60-65级，目前Vo超过200的只有凛世和SR小学生（←事实上现在已经不会上SR果穗了）。考虑到3回合后对手攻击力上升、审查员debuff、我方血量减少更难Perfect、夏叶不一定Perfect等，相对难度会变高。因此在卡组属性、技能、buff不够强力时，WING优胜并不是特别容易的。

###Support偶像攻击力


> [P × 0.5 + (S + iS × 3) × 0.2 × (1 + 0.1 × W) ] × Appeal判定补正 × 技能倍率

 - **iS**：该Support偶像的对应属性值
 - 其余参数代表的意义同Produce攻击力公式。

###Fes攻击力（フェス Appeal值）

截止2018年10月计算出的公式如下（INT为向下取整）：

> Fes攻击力 = INT(基础系数 × Appeal倍率) × Excellent系数

> 基础系数 = INT(Fes Appeal基础值 × 对应属性buff合计值 × Appeal系数)
> Fes Appeal基础值 = 2.0 × 该偶像的对应属性值 + 0.5 × 其他偶像的对应属性值之和



 - 属性值包含了同队bonus，即实际属性值为FES编成页面中的显示值
 - buff合计值为该回合发动的所有对应属性buff/debuff之和（被动buff、主动技能buff、审查员debuff加算）
 - Appeal系数：Perfect**1.5**，Good**1.1**，Normal**1.0**，Bad**0.5**
 - Appeal倍率：技能表示的倍数，如アピールⅣ为2.5
 - Excellent系数：属性一致2.0，不一致1.0

Fes编队页面显示的Vo/Da/Vi值即为Fes Appeal基础值（小数每次计算都向下取整）。
对于多属性技能如Vo/Vi 3倍アピール则分别计算对应属性并求和。

###对手偶像的攻击力

>（基本攻击力）×（Appeal判定补正）×（未知补正）

 - 基本攻击力：根据不同试镜为固定值
 - Appeal判定补正：曾经与玩家判定有关，现在无关
 - 未知补正（待验证）：主要为3回合后，攻击力会变为约1.25倍，对思い出アピール（回忆炸弹）也有影响，具体不明。

[scode type="blue"]wiki的这一部分有待验证，顺便一提使用[283助手][2][（chrome应用商店地址）][3] 可以直接看到Produce中本回合和下回合各位的攻击力[/scode]

###回忆炸弹（思い出アピール）攻击力

回忆炸弹会对在场的所有审查员造成**Vo&Da&Vi k倍**的Appeal攻击力。和通常攻击相比，有以下差别：
 - k的数值随回忆炸弹等级提升而提升。Lv5：k = 2；Lv4：k = 1.4；Lv3：k=1.2。
 - 回忆炸弹等级达到MAX（5级）时追加的攻击会直接加在对应的Appeal系数上。如一常灯织MAX即为Vo2倍&Da2倍&Vi4倍Appeal。
 - 对每位审查员的攻击力均为单独计算*（译注：换句话说放炸弹时显示的Excellent只是该审查员的对应属性部分Excellent了，其他属性还是1.0倍）*
 - Good判定相当于Perfect（1.5倍），Bad还是Bad（0.5倍）
 - 回忆炸弹计算所得的各属性Appeal值，将分别乘以Fes队伍的回忆炸弹系数（Fes编成 思い出Lv 下方）向下取整后相加得到最终攻击力。

[collapse status="false" title="Fes时具体案例（懒癌没翻全折叠了，应该都能看懂"]センターアイドル:【柔らかな微笑み】風野灯織
アピール対象審査員: Vo審査員
思い出アピール: Lv.5 (係数k = 2.0), ユニット係数（炸弹系数）h = 1.09
Visual2倍アピールの追加効果あり
フェスアピール基礎値
 - Vo: 2 * 502 + 0.5 * (258 + 1650 + 512 + 213) = 2320.5
 - Da: 2 * 850 + 0.5 * (587 + 287 + 1980 + 437) = 3345.5
 - Vi: 2 * 1010 + 0.5 * (900 + 600 + 202 + 1760) = 3751.0

发动buff
 - Vo: 无
 - Da: +21%
 - Vi: +61%

针对**Vo审查员**造成的效果中（判定为Good），Vo部分的判定为Excellent（2倍）

Voフェスアピール値 = INT(INT(2320.5 * 1.00 * 1.5) * 2.0) * 2.0 = 13920
Daフェスアピール値 = INT(INT(3345.5 * 1.20 * 1.5) * 2.0) * 1.0 = 12144
Viフェスアピール値 = INT(INT(3751.0 * 1.61 * 1.5) * (2.0 + **2.0**)) * 1.0  = 36232（一常灯织Lv5额外Vi 2倍Appeal）

接下来将各属性表现值与炸弹系数相乘并取整，相加得出最终结果：

最終アピール値 = INT(13290 * 1.09) + INT(15054 * 1.09) + INT(36232 * 1.09) = 67900
[/collapse]

###Produce中Lesson（レッスン）/工作（お仕事）属性提升

>(Lesson基础值 × (Support偶像补正 × 心情补正 + Excellent补正) + 技能补正) × Perfect补正

 - Lesson基础值：不仅含レッスン，也包含お仕事。见下表
<table>
    <tr>
        <td colspan="4" style="text-align:center;">Vo/Da/Vi Lesson</td>
        <td colspan="5" style="text-align:center">Vo:ラジオ/Da:トーク/Vi:雑誌</td>
    </tr>
    <tr>
        <td style="text-align:center;">レッスン</td>
        <td style="text-align:center;">Vo</td>
        <td style="text-align:center;">SP</td>
        <td style="text-align:center;">粉丝数</td>
        <td style="text-align:center;">お仕事</td>
        <td style="text-align:center;">Vo/Vi/Da</td>
        <td style="text-align:center;">对应属性(除粉丝)</td>
        <td style="text-align:center;">非对应属性</td>
        <td style="text-align:center;">粉丝数/雑誌</td>
    </tr>
    <tr>
        <td style="text-align:center;">Lv.1</td>
        <td style="text-align:center;">19</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">Lv.1</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">15</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">150/250</td>
    </tr>
    <tr>
        <td style="text-align:center;">Lv.2</td>
        <td style="text-align:center;">22</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">120</td>
        <td style="text-align:center;">Lv.2</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">18</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">300/500</td>
    </tr>
    <tr>
        <td style="text-align:center;">Lv.3</td>
        <td style="text-align:center;">26</td>
        <td style="text-align:center;">5</td>
        <td style="text-align:center;">270</td>
        <td style="text-align:center;">Lv.3</td>
        <td style="text-align:center;">5</td>
        <td style="text-align:center;">21</td>
        <td style="text-align:center;">5</td>
        <td style="text-align:center;">600/900</td>
    </tr>
    <tr>
        <td style="text-align:center;">Lv.4</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">6</td>
        <td style="text-align:center;">480</td>
        <td style="text-align:center;">Lv.4</td>
        <td style="text-align:center;">6</td>
        <td style="text-align:center;">24</td>
        <td style="text-align:center;">6</td>
        <td style="text-align:center;">1000/1400</td>
    </tr>
    <tr>
        <td style="text-align:center;">Lv.5</td>
        <td style="text-align:center;">34</td>
        <td style="text-align:center;">7</td>
        <td style="text-align:center;">960</td>
        <td style="text-align:center;">Lv.5</td>
        <td style="; text-align:center;">7</td>
        <td style="; text-align:center;">27</td>
        <td style="; text-align:center;">7</td>
        <td style="; text-align:center;">1500/2000</td>
    </tr>
</table>

 - Support偶像补正
    >（1 + 0.004 × 对应状态） × （1 + 0.001 × 绊） × （1 + 0.01 × 经过周数）

    （译注：没看懂 該当ステータス 是啥？）
    若房间有多个Support偶像时，将多次计算上述算式，最终结果为合计值。
  - 对应状态：Vo/Da/Vi/Me不变，SP为全状态平均值 × 0.525（？待确认）、粉丝数均为0
  - 绊：此Support偶像现在的绊值。在同一房间Lesson/工作一次上升8点（另有说法为5-10点，待验证）
  - 经过周数：Produce开始时第一周为0，Season4最后一周为31

 - 心情补正
最差时为1倍，最好时为1.1倍
 - Excellent补正
Excellent偶像数 × 0.2
 - 技能补正
该Support偶像的对应房间マスタリース技能值直接加算
 - Perfect补正
通常时为1倍，Perfect为2倍

由上文可以得出以下结论：
 - 建议前期多去Support偶像人数多的房间，高效率提升绊
 - 尽量在早期遵守约定，提升偶像心情
 - 由于レッスン/お仕事存在经过周数补正，而试镜没有，因此提早进行试镜对提升属性更有利。不过提早试镜风险更大，请自行进行权衡

##技能相关

###学习Live Skill所需的SP
4凸卡取得两个主动技能的最短路线所需：
SR : 20+30+40+50 = 140
SSR: 20+30+30+40+50 = 170
第一个主动技能：20+30 = 50

相同的技能无法重复习得，所以如果在单偏的情况下，只学习第一个主动技能会导致技能过少（以SR/SSR为例，只有2倍刀/2.5倍刀）。此外一部分技能需要发生特定剧情才能解锁，并不能直接学习。

###根据Mental(メンタル)改变威力的主动技能

也被称为背水、浑身，根据当前Mental而变化威力的Live Skill。
 - 背水系
  
    > Appeal倍率 = (-0.8 × Mental比例 + 1) × 最大値
  
    - Mental越少Appeal倍率越高的技能。倍率和剩余Metal成反比。
    - 无论当前Metal为多少，判定条始终为第二阶段（即Bad开始出现的第一阶段）。
    - Metal为满时倍率最低，为最大倍率的20%。另一方面Metal为0时倍率方为最高，所以事实上Appeal倍率是不可能达到标称最大值的。

    因此Metal较低时也能轻松打出Perfect且倍率更高，可以更容易地取得Last Appeal。

 - 浑身系
    > Appeal倍率 = 最大値 × (1.6 × Metal比例 - 0.6)

    注：最低不会小于最大倍率的20%。
    
     - Mental越多Appeal倍率越高的技能。和背水系不同，Metal小于**50%**时已经为最低火力。
     - 判定条和通常Live Skill相同。
     - 由于半血以下开始就是最低火力，建议尽早使用。如果要在Fes中较多使用，需要依靠Metal回复和注目度Down的buff维持Appeal的高倍率。

###Produce结束时获得SP

 > 总获得SP = 亲爱度 + 获得粉丝人数SP
 > 获得粉丝人数SP = 3 × （粉丝数 ÷ 10000） ← 向下取整，粉丝人数SP上限为300

 - 只从SP的角度来看，后期某些试镜的SP效率会比トーク更高。如10万人试镜胜利可以得到30SP。
 - 不过试镜获得的SP在Produce结束时方可获得，不能立即用来学习技能，所以在需要学习属性上限技能的场合下要注意。

###体力Support叠加
当体力Support技能重复发动时，效果会进行叠加。如2个-50%消耗的情况下不会消耗体力，レッスン15体力回复和-50%消耗同时发动时可以回复7体力（向下取整，后文有详细说明）。

但是体力少的时候失败率会变高，即使遇到不需要体力的情况也还是尽量休息。

##一些规律和属性

###流行相关
每个季度中，各属性都会有两次流行1位，计6周，剩下两周随机？反过来说，各个属性在每个季度都（至少）有两次流3。

因此就流行而言，没有任何一个属性是非常强势/弱势的。

###亲爱度与回忆炸弹（思い出）等级
只有Produce结束时才能直接在游戏中确认亲爱度。

思い出等级共有0~5(MAX)六个等级，R稀有度的Produce偶像最大等级仅为3（但是事实上R卡的内部统计亲爱度会超过50）。


提升思い出等级所需的亲爱度如下：
0 → 1 → 25 → 50 → 75 → 100

以下条件可以提升亲爱度：
 - 早安事件 - Good Communication： +1
 - 早安时间 - Perfect Communication： +3
 - 遵守约定： +10 （遵守约束和对应的レッスン是否成功无关）

早安事件与约定有以下特性（需验证）：
 - 每个偶像的早安事件共计15种
 - 思い出在2，3级分别会解锁5个事件
 - 即使思い出等级提升，低等级未触发的早安事件仍会发生
 - 在单次Produce中，相同的早安时间不会触发第二次
 - 只有在早安事件之后，偶像才会提出约定
 - 已经提出约定且未到约定日期的的情况下，早安事件后不会再提出约定

如果上述特性均正确，那么在未发生/未遵守过约束的情况下，由于初始早安事件仅有5个，所以亲爱度最高仅为15，思い出等级是无法达到2级及以上的。
要想达到思い出アピールMAX，至少要遵守6次约束。每个增加亲爱度的机会都很重要，所以至少请在早安事件中取得Perfect Communication。（译注：满级炸弹还是全看脸，香水面包全是假的（）

###心情相关

Produce中，画面上方的脸标志代表了偶像的心情。
从高到低大致可以分为红/黄/绿/蓝/紫五个阶段。
内部数据可能为0~20的数值，但是没有明确的确认方法，因此只能记录心情的增减（通过图标的颜色）
Produce开始时心情为10（绿色，20%回忆槽）。
根据心情的不同阶段，レッスン和お仕事的效果会提高（需验证）、试镜开始时回忆槽充能百分比会有所不同。
Grade Fes（グレードフェス）开始时的心情判定与回忆槽的关系如下表。
<table>
    <tr>
        <th>心情值</th>
        <td style="text-align:center;">0～4</td>
        <td style="text-align:center;">5～8</td>
        <td style="text-align:center;">9～12</td>
        <td style="text-align:center;">13～16</td>
        <td style="text-align:center;">17～20</td>
    </tr>
    <tr>
        <th>心情图标颜色</th>
        <td style="background-color:#9a50d6; text-align:center;">紫</td>
        <td style="background-color:#3492ce; text-align:center;">蓝</td>
        <td style="background-color:#60b634; text-align:center;">绿</td>
        <td style="background-color:#f6a028; text-align:center;">黄</td>
        <td style="background-color:#f6646c; text-align:center;">红</td>
    </tr>
    <tr>
        <th>回忆槽充能</th>
        <td style="text-align:center;">0</td>
        <td style="text-align:center;">10%</td>
        <td style="text-align:center;">20%</td>
        <td style="text-align:center;">30%</td>
        <td style="text-align:center;">70%</td>
    </tr>
</table>

以下为各种行动对心情（值）造成的影响。
<table>
    <tr>
        <th>行动</th>
        <th style="text-align:center;">增减</th>
    </tr>
    <tr>
        <td>遵守和偶像的约束</td>
        <td style="text-align:center;">+5</td>
    </tr>
    <tr>
        <td>早安事件 - Perfect</td>
        <td style="text-align:center;">+1</td>
    </tr>
    <tr>
        <td>试镜前对话 - Good</td>
        <td style="text-align:center;">+1</td>
    </tr>
    <tr>
        <td>思い出等级3以上 - 触摸互动成功</td>
        <td style="text-align:center;">+1</td>
    </tr>
    <tr>
        <td></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td>试镜前对话 - Bad</td>
        <td style="text-align:center;">-1</td>
    </tr>
    <tr>
        <td>未同意和偶像的约定</td>
        <td style="text-align:center;">-1</td>
    </tr>
    <tr>
        <td>未遵守和偶像的约定</td>
        <td style="text-align:center;">-2</td>
    </tr>
    <tr>
        <td>思い出等级2以下 - 触摸互动失败</td>
        <td style="text-align:center;">-2</td>
    </tr>
    <tr>
        <td>レッスン/お仕事 失败</td>
        <td style="text-align:center;">-4</td>
    </tr>
    <tr>
        <td>レッスン/お仕事 大失败</td>
        <td style="text-align:center;">-20</td>
    </tr>
</table>


另外，在Produce开始前使用以下道具可以增加一定量的心情。

 - プチテンションアロマ： +4
 - テンションアロマ： +12

在大部分情况下，心情的变化会立即反映在图标上，即达到条件颜色会发生改变；但是约定中会有所不同，以下文为例：
 - 心情为10、约束遵守但Lesson失败的情况下，在约束周结束时会显示为10+5的黄脸，而实际为10+5-4，因此下一周开始时心情图标显示为绿色。
 - 约束遵守但是大失败的情况下，首先会将心情清零，而后再增加遵守约束的5点，下周开始时的心情图标为蓝色。

###体力相关
Produce过程中，会在页面上方显示体力槽。最大值为100（游戏内没有确认数值的方法）。
下表为行动/Support偶像技能/物品会对体力造成的影响。
<table>
    <tr>
        <th>行动</th>
        <th>增减</th>
    </tr>
    <tr>
        <td>レッスン</td>
        <td>-15</td>
    </tr>
    <tr>
        <td>お仕事（ラジオ、トーク）</td>
        <td>-20</td>
    </tr>
    <tr>
        <td>お仕事（雑誌の撮影）</td>
        <td>-5</td>
    </tr>
    <tr>
        <td>レッスン・お仕事大失败</td>
        <td>-100（强制0？）</td>
    </tr>
    <tr>
        <td>休息</td>
        <td>随机？（+50,+70确认，译注：有时更少）</td>
    </tr>
    <tr>
        <th>Support Skill</th>
        <th>增减</th>
    </tr>
    <tr>
        <td>体力サポート（１人）</td>
        <td>体力消费量-50%（向下取整）</td>
    </tr>
    <tr>
        <td>体力サポート（两人以上）</td>
        <td>体力消费量-100%</td>
    </tr>
    <tr>
        <td>Vo/Vi/Daマスタリー体力</td>
        <td>+对应技能Lv × 3</td>
    </tr>
    <tr>
        <td>お休みブースト（SSR）</td>
        <td>+15</td>
    </tr>
    <tr>
        <td>お休みブースト（SR）</td>
        <td>+10</td>
    </tr>
    <tr>
        <td>お休みブースト（R）</td>
        <td>+5</td>
    </tr>
    <tr>
        <th>アイテム</th>
        <th>增减</th>
    </tr>
    <tr>
        <td>ヒーリングタルト</td>
        <td>+10</td>
    </tr>
    <tr>
        <td>ヒーリングフルーツタルト</td>
        <td>+20</td>
    </tr>
    <tr>
        <td>高級ヒーリングフルーツタルトを使用</td>
        <td>+30？（未確認）</td>
    </tr>
</table>

根据当前体力，レッスン/お仕事的失败率会发生变化（雑誌の撮影和其他行动不同）。另外在失败率高于一定值的情况下，会发生大失败（待验证）。（译注：个人5%的时候吃过大失败，更低失败率是否还会大失败我暂且蒙在鼓里）
下表以5x体力下的失败率：
<table>
    <tr>
        <th rowspan="2">体力値</th>
        <th colspan="2" style="text-align:center;">失败率</th>
    </tr>
    <tr>
        <th style="text-align:center;">雑誌の撮影</th>
        <th style="text-align:center;">レッスン/其他お仕事</th>
    </tr>
    <tr>
        <td style="text-align:center;">100~70</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">0%</td>
    </tr>
    <tr>
        <td style="text-align:center;">65</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">1%</td>
    </tr>
    <tr>
        <td style="text-align:center;">60</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">1%</td>
    </tr>
    <tr>
        <td style="text-align:center;">55</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">4%</td>
    </tr>
    <tr>
        <td style="text-align:center;">50</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">8%</td>
    </tr>
    <tr>
        <td style="text-align:center;">45</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">16%</td>
    </tr>
    <tr>
        <td style="text-align:center;">40</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">27%</td>
    </tr>
    <tr>
        <td style="text-align:center;">35</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">43%</td>
    </tr>
    <tr>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">64%</td>
    </tr>
    <tr>
        <td style="text-align:center;">25</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">92%</td>
    </tr>
    <tr>
        <td style="text-align:center;">20</td>
        <td style="text-align:center;">0%</td>
        <td style="text-align:center;">99%</td>
    </tr>
    <tr>
        <td style="text-align:center;">15</td>
        <td style="text-align:center;">1%</td>
        <td style="text-align:center;">99%</td>
    </tr>
    <tr>
        <td style="text-align:center;">10</td>
        <td style="text-align:center;">1%</td>
        <td style="text-align:center;">99%</td>
    </tr>
    <tr>
        <td style="text-align:center;">5</td>
        <td style="text-align:center;">4%</td>
        <td style="text-align:center;">99%</td>
    </tr>
    <tr>
        <td style="text-align:center;">0</td>
        <td style="text-align:center;">8%</td>
        <td style="text-align:center;">99%</td>
    </tr>
</table>

###Mental和回忆槽、判定条的关系
每回合开始时，当前Mental决定了本回合回忆槽的充能比例和判定条的形态。
<table>
    <tr>
        <th>メンタル比例</th>
        <td style="text-align:center;">100%</td>
        <td style="text-align:center;">75%～</td>
        <td style="text-align:center;">50%～</td>
        <td style="text-align:center;">25%～</td>
        <td style="text-align:center;">5%～</td>
        <td style="text-align:center;">～5%</td>
    </tr>
    <tr>
        <th>思い出ゲージ</th>
        <td style="text-align:center; width:50px;">1.0</td>
        <td style="text-align:center; width:50px;">1.5</td>
        <td style="text-align:center; width:50px;">1.75</td>
        <td style="text-align:center; width:50px;">2.0</td>
        <td style="text-align:center; width:50px;">2.25</td>
        <td style="text-align:center; width:50px;">10.0</td>
    </tr>
</table>
（上表需要进一步验证）

<table cellspacing="1">
    <thead>
        <tr>
            <td style="text-align:center;">Appeal判定条</td>
            <td style="text-align:center;">メンタル范围</td>
            <td style="text-align:center;">备注</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;">![Appeal1][4]</td>
            <td style="text-align:center;">100%～91%</td>
            <td style="text-align:center;">无Bad，想要故意打Bad也打不了</td>
        </tr>
        <tr>
            <td style="text-align:center;">![Appeal2][5]</td>
            <td style="text-align:center;">90.99%～71%</td>
            <td style="text-align:center;">
                背水系Live Skill始终为此判定条</td>
        </tr>
        <tr>
            <td style="text-align:center;">![Appeal3][6]</td>
            <td style="text-align:center;">70.99%～51%</td>
            <td style="text-align:center;"></td>
        </tr>
        <tr>
            <td style="text-align:center;">![Appeal4][7]</td>
            <td style="text-align:center;">50.99%～？%</td>
            <td style="text-align:center;"></td>
        </tr>
        <tr>
            <td style="text-align:center;">![Appeal5][8]</td>
            <td style="text-align:center;">？%～0%</td>
            <td style="text-align:center;">在Fes中以此状态打出Perfect会获得「プロ根性」的行动评价奖励</td>
        </tr>
    </tbody>
</table>
在试镜中，对手也会根据血量而改变打出不同判定的比例。另外，随着Mental减少，思い出槽充能会更快，濒死（5%以下）甚至会进行连续回忆炸弹攻击（译注：实际上偶尔不会）

###Fes偶像诞生时的Rank判定
Fes偶像诞生时，会显示Rank等级。
页面左下方的槽到达最右端，即可提升一个等级。
Rank判定仍需要进一步的验证，思い出等级（或是亲密度）也会对Rank判定产生较大的影响？
另外，诞生时的判定即使为A而粉丝数量不足时，也不能达成True End。

###Produce终了报酬
Produce结束时，达成指定的条件可以获得相对应的报酬，已经确认的报酬数量如下。可能还存在其他的报酬（待验证）。
 - アイドル Rank
     - F Rank只有一件奖励
     - E Rank及以上为两件
         - 第二奖励的价值小于等于第一件（可能为相同的奖励）
 - WING通过准决胜、决胜各一件
 - True End一件
 - 特殊试镜合格（每种试镜一件）
 - 随机掉落（0~？件）
    - 随机掉落中不含训练券。

报酬的详细信息如下表。
アイドル Rank 栏中、上面一行为第一格可能获得的报酬，下面一行为第二格可能的报酬。
目前收集的样本不足，需要一步完善数据。

**期间限定的特别试镜奖励，可以在活动进行时在 お知らせ 中查看。**

<table>
    <tr>
        <th colspan="2" style="text-align:center;"></th>
        <th style="text-align:center;">铜券</th>
        <th style="text-align:center;">银券</th>
        <th style="text-align:center;">金券</th>
        <th style="text-align:center;">备注</th>
    </tr>
    <tr>
        <td rowspan="13" style="text-align:center;">アイドル<br class="spacer">Rank</td>
        <td rowspan="2" style="text-align:center;">S</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="2" style="text-align:center;">A</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">3</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="2" style="text-align:center;">B</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">2/3</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="2" style="text-align:center;">C</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">2/3</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="2" style="text-align:center;">D</td>
        <td style="text-align:center;">2/3</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">1/2/3</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="2" style="text-align:center;">E</td>
        <td style="text-align:center;">2</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">1/2</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">F</td>
        <td style="text-align:center;">1/2/3</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <th colspan="2" style="text-align:center;"></th>
        <th style="text-align:center;">铜券</th>
        <th style="text-align:center;">银券</th>
        <th style="text-align:center;">金券</th>
        <th style="text-align:center;">备注</th>
    </tr>
    <tr>
        <td rowspan="2" style="text-align:center;">WING</td>
        <td style="text-align:center;">決勝進出</td>
        <td style="text-align:center;">1/2/3</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">優勝</td>
        <td style="text-align:center;">1/3</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td colspan="2" style="text-align:center;">True End</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="6" style="text-align:center;">试镜</td>
        <td style="text-align:center;">今がキラキラ……</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">HOPPING JAM</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">踊っていいとも</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">THE LEGEND</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">七彩メモリーズ</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">歌姫楽宴</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td rowspan="7" style="text-align:center;">随机<br class="spacer">掉落</td>
        <td style="text-align:center;">アイドル Rank B</td>
        <td colspan="3" style="text-align:center;">ジュエル30</td>
        <td style="text-align:center;">準決勝敗退、優勝で確認</td>
    </tr>
    <tr>
        <td style="text-align:center;">アイドル Rank A</td>
        <td colspan="3" style="text-align:center;">ジュエル50</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">アイドル Rank S</td>
        <td colspan="3" style="text-align:center;">ジュエル10/100</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">優勝</td>
        <td colspan="3" style="text-align:center;">ジュエル50</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">True End</td>
        <td colspan="3" style="text-align:center;">ジュエル100</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">歌姫楽宴</td>
        <td colspan="3" style="text-align:center;">ジュエル100</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:center;">無表記</td>
        <td colspan="3" style="text-align:center;">フェスチケ1 / 秘密のメモ帳1</td>
        <td style="text-align:center;"></td>
    </tr>
</table>


###物品相关

Produce中使用的约束类道具（コロン、トワレ、パルファム等）同时使用时，效果会重复。生效次数将会同时被消耗，且四次约束发生后两者将同时失效。



  [1]: https://wikiwiki.jp/shinycolors/%E4%BB%95%E6%A7%98%E8%80%83%E5%AF%9F
  [2]: https://tieba.baidu.com/p/5778415132?red_tag=2263884692
  [3]: https://chrome.google.com/webstore/detail/283%E5%8A%A9%E6%89%8B/lhicfemmcebmcljnnmbhkojiflocadia
  [4]: /img/190501.png
  [5]: /img/190502.png
  [6]: /img/190503.png
  [7]: /img/190504.png
  [8]: /img/190505.png