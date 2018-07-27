---
layout: post
title:  "音视频开发基础教程-本地播放"
date:   2018-07-26 11:55:59 +0800
category: 多媒体开发
---

# 前言

音视频是个古老的行业，从最早的广播到电视到互联网媒体，再到现在火的一塌糊涂，让很多青年自甘堕落的网络直播，音视频在感官上满足着人类对这个世界的信息接收。

音视频牵涉的技术非常多，从采集，编码，封装以及传播，覆盖了很多知识，通过本教程目的在于让大家入门，了解一些音视频行业的最基本的技术和实现方式，让你再次用眼耳感受刺激的时候，知道背后的技术流程。


# 准备工作

* 安装FFMPEG, 可以参考 [FFMPEG-安装](http://dlseeu/ffmpeg-install.html)
* 下载专用原始视频文件 [raw_cif.yuv](https://pan.baidu.com/s/1GiJ6tUAnxSTj7g9hYxIH9w)
* 下载专用原始音频文件 [点击此处下载]()

# 初探视频文件

拿到一个视频文件，最重要的是能播放出来视频画面。对于我们下载的raw_cif.yuv来说，你必须使用一些高端专业的播放器才能播放出来，所以我们安装了ffmpeg工具，附送的ffplay播放器十分强大

## 播放文件

![播放画面](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/raw_cif.png)

```
ffplay -f rawvideo -pixel_format yuv422p -video_size cif raw_cif.yuv
```

## 播放信息

```
ffplay version N-86712-g1fe40e73a6 Copyright (c) 2003-2017 the FFmpeg developers
  built with Apple LLVM version 8.1.0 (clang-802.0.42)
  configuration: --disable-asm --enable-decoders
  libavutil      55. 67.100 / 55. 67.100
  libavcodec     57.100.103 / 57.100.103
  libavformat    57. 75.100 / 57. 75.100
  libavdevice    57.  7.100 / 57.  7.100
  libavfilter     6. 94.100 /  6. 94.100
  libswscale      4.  7.101 /  4.  7.101
  libswresample   2.  8.100 /  2.  8.100
[rawvideo @ 0x7f8ab3831800] Estimating duration from bitrate, this may be inaccurate
Input #0, rawvideo, from 'https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/raw_cif.yuv':
  Duration: 00:00:12.00, start: 0.000000, bitrate: 30412 kb/s
    Stream #0:0: Video: rawvideo (I420 / 0x30323449), yuv420p, 352x288, 30412 kb/s, 25 tbr, 25 tbn, 25 tbc
```
播放信息中的几个关键词语，对于非专业人来说肯定是一头雾水，看完本系列教程希望你能掌握词语代表的含义, 这里先简单的罗列下：

- rawvideo: 文件格式
- I420/yuv420p: 图像格式
- 352x288: 图像分辨率


## 你的疑惑

1. 什么是rawvideo？
    > rawvideo就是指原始视频流，和rawdata是一个概念范畴，就是指采集完后存储的图像文件格式。
    > 由于rawvideo是简单的把一张张YUV图片按顺序存储的视频文件，所以如果ffplay播放rawvideo，除了告诉ffplay这是个rawvideo这个信息外，还需要告诉图像格式（决定如何）以及分辨率大小。
    
    - 常见的多媒体封装格式介绍和对比

2. 什么是yuv420p?
    > yuv420p是用于描述一帧原始图像的YUV三个分量的存储格式，这样播放器才能把YUV分量正确的解析出来。YUV420P是隶属于YUV色彩空间中的一种，RGB是另外一种色彩空间，包含了比如RGB888等
    
    - 色彩空间介绍

3. cif是啥？
    > cif是一种图像分辨率大小的称谓，实际上代表着数值为宽352高2888的分辨率
    
    - 常见视频分辨率名称和大小


# 再进一步

- 写一个YUV图片查看器
- 写一个自己的播放器
