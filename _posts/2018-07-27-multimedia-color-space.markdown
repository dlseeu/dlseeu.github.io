---
layout: post
title:  "色彩空间入门"
date:   2018-07-26 11:55:59 +0800
category: 多媒体开发
---

## 历史

让我们从人类远古的绘画开始。

![绘画](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/%E7%BB%98%E7%94%BB.png)

在绘画的时候，人们常使用三原色，按照不同的比例来调制出其他颜色

后来有了印刷，采用了类似绘画的三原色方法，采用CMYK，也就是洋红色、黄色和青色以及黑色四种油墨，通过控制油墨的使用形成不同的颜色。之所以用这几种颜色，是因为早早期更容易获取，比如人们从煤焦油染料里得到洋红色。

![CYMK](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/CYMK.png)

后来有了显示器，彩色显示管屏幕上的每一个像素点都是由R/G/B三种颜色的涂料组合而成，通过三束电子以不同的强度激活这些磷光涂料就可以得到不同的颜色，和绘画是不是很像。

![CYMK](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/CRT.png)

## 色彩模型和色彩空间

所谓色彩模型，就是指用一定的规则来描述（排列）颜色的方法，比如RGB/CMYK/LAB等。

![色彩模型](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/%E8%89%B2%E5%BD%A9%E6%A8%A1%E5%9E%8B-RGB.png)

色彩模型指规定了方法，但并没有对坐标系的数值做规定，比如RGB(255,0,0)表示为最红的红色，但这个红色如何换算到人类可以感知的波长和亮度，并没有明确。而色彩空间就是对模型进行确切的定义。

一个色彩模型可以有不同的色彩空间，比如RGB色彩模型就有sRGB/AdobeRGB等色彩空间，sRGB规定了最大红色的为CIE XYZ: 0.4360657, 0.2224884, 0.013916。而 CIE XYZ 是一个特殊的色彩空间，根据人眼三刺激值实验测试结果而建立。

不同的色彩空间有不同的覆盖色域，也就是表达的颜色范围不同。比如AdobeRGB的色域比sRGB要大

不同的色彩空间可以相互转换，因为表达的图像是有个绝对值的。

## YUV

黑白电视只有Y，也就是灰度值。当过渡到彩色电视后，就规定用YUV格式来处理电视图像，把UV作为彩度，Y作为灰度，这样就满足了同一个视频信号可以在黑白电视和彩色电视上都能显示的需求。

YUV最大的的好处是节省带宽，RGB三个分量都是同样重要，而YUV色彩空间中，由于人类的视觉系统对亮度更加敏感，对彩度相对不敏感，UV的分量比重可以降低而不会让眼睛察觉出来。

以为了节省空间，一般会进行抽样，常用的的格式有YUV420 YUV422等

数据有了，数据如何存储由形成了不同的格式：

- 紧缩格式(poacket formats): 将Y、U、V值存储成Macro Pixels数组，和RGB的存放方式类似。
- 平面格式(planar formats): 将Y、U、V的三个分量分别存放在不同的矩阵中

紧缩格式（packed format）中的YUV是混合在一起的，对于YUV4:4:4格式而言，用紧缩格式很合适的，因此就有了UYVY、YUYV等。

平面格式（planar formats）是指每Y分量，U分量和V分量都是以独立的平面组织的，也就是说所有的U分量必须在Y分量后面，而V分量在所有的U分量后面，此一格式适用于采样（subsample）。平面格式（planar format）有I420（4:2:0）、YV12、IYUV等

![YUV-Formats](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/YUV-Formats.png)


## YUV和RGB的转换
```
Y = 0.299 ∗ R + 0.587 ∗ G + 0.114 ∗ B	
U = − 0.169 ∗ R − 0.331 ∗ G + 0.5 ∗ B + 128	
V = 0.5 ∗ R − 0.419 ∗ G − 0.081 ∗ B + 128


R & = Y + 1.13983 * (V - 128) 
G & = Y - 0.39465 * (U - 128) - 0.58060 * (V - 128) 
B & = Y + 2.03211 * (U - 128)
```

