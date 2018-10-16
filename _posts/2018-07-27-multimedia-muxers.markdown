---
title:  "常见多媒体文件格式介绍"
date:   2018-07-26 11:55:59 +0800
category: multimedia

toc: true
toc_label: "My Table of Contents"
toc_icon: "cog"

---

## 几个问题

* 什么是文件格式？

> 文件格式也称为文件容器，又叫封装格式，主要是将音视频以及其他信息（比如字幕）按照既定的规则放到文件中，从而可以让播放器快速获取重要信息以及跳转。

* 为什么有的视频文件不完整无法播放
> 这里主要有两个原因:
>       一是有的视频文件格式按要求一些重要的信息是放在文件的末尾的，所以没有这些重要信息播放器是不知道如何解码播放的
>       另外一个原因就是播放器的优化程度问题，好的播放器会尝试着对不完整的媒体文件进行探测，推导出实际的解码相关参数，一般的播放器就只能干瞪眼了。
 

## 主流文件格式对比

| 文件格式 | 开发机构 | 视频编码 | 音频编码 | 是否支持流媒体| 其他 |
| -------- | -------- | -------------- | -------------- | -------------- | ------------ | ----- |
| AVI | Microsoft | 除了H.265几乎所有 | 几乎所有 | 不支持 | AVI-1 AVI-2两种|
| MP4 | MPEG | MPEG4 MPEG2 H.264 H.265 | AAC AC-3 MPEG-1 Layers I,II,III等 | 支持 | |
| MKV | CoreCodec | 几乎所有 | 几乎所有 | 支持| MKV几乎覆盖了封装格式全部特性 | 
| PS/TS | MPEG | MPEG4 MPEG2 VC-1 H.264 | AAC AC-3 DTS | 支持 | 常见DVD |
| QuickTime | APPLE | 几乎所有 | 几乎所有 | 支持 | 覆盖特性堪比MKV | 
| FLV | Adobe | Sorenson VP6  H.264/MPEG-4 AVC | MP3 Nellymoser ADPCM LPCM AAC Speex | 支持 | 网页直播视频用的很多 |

## AVI

微软公司在1992年为了对抗苹果的QuickTime技术开发出来的一种多媒体封装格式

AVI已经属于很古老的技术了，但是由于是Microsoft的亲儿子，通用性很好，加之API简单易用，现在依然很流行

AVI最大的缺点是索引在文件末尾，所以在文件传输过程中，在播放视频文件的时候是无法跳转的。

AVI还有一个缺点是无法支持流传输，所以在互联网时代已经被嫌弃了。

* [参考资料](https://zh.wikipedia.org/wiki/AVI格式)

## MP4

MPEG-4 Part14，简称为MP4。 一种标准的数字多媒体封装格式

MPEG是一个标准化的国际组织，MPEG-4是这个组织的产物，所以大部分播放器都支持。

MP4对先进的视频编码支持很及时，比如现在的HEVC
 
* [参考资料](https://zh.wikipedia.org/wiki/MP4)

## Matroska

老毛子开发的完全免费封装格式，常说的MKV只是Matroska的一种类型，用于存视频（可以包含音频），还有MKA以及MKS两种类型

Matroska非常强悍，能支持多种不同类型的视频编码，音频编码以及字幕流，而且由于是完全免费，所以很多播放器都支持该封装格式。

* [参考资料](https://zh.wikipedia.org/wiki/Matroska)

## MPEG program stream

简称为PS, 是在MPEG-1 Part1 和 MPEG-2 Part1中定义的，在DVD时代，PS是存在在碟片中的常用格式，使用VOB作为后缀。

在监控领域，海康的前端设备录像就是使用PS流作为默认存储格式

## MPEG transport stream

简称为TS， 和PS差别是在于，后者是面向可靠媒体介质，比如光盘；而前者是面向不可靠传输，比如卫星电视等。

TS使用固定为188字节长度的Packet, 由于没有采用PS或者MP4，AVI这种一帧视频一个Packet的方式，而是更小的Packet，所以对于丢包和出错容忍度更好，适用于不可靠传输。

## QuickTime

苹果公司在1991年推出的文件格式，这之前微软还没有自己的文件格式，直到1992年发布AVI。

QuickTime对于视频和音频以及字幕的支持非常好，堪比Matroska。

QuickTime也表示Player，是MacOS自带的播放器，由于严格遵守协议，有的非标准AVI无法播放。


## Flash Video

简称FLV，是一种网络视频格式，用作流媒体格式。


