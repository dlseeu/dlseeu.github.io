---
title:  "10 LDFLAGS I Love"
date:   2019-02-21 09:00:00 +0800
category: Compile
---

### 1) -static

> 使用静态库而非动态库

### 2）--export-dynamic

> 让linker将所有符号都加入到动态符号表中，在使用dlopen打开的时候会用到

### 3) --whole-archive

> 当使用dlopen打开自己的时候，需要指定这个标志告诉linker打包所有的东西

### 4) --no-whole-archive

> 当你只需要一个库，不包括该库链接的库和内容，可以使用该标志

### 5) --print-map

> 在终端打印所有的obj的信息和符号

### 6) --strip-all

> 丢弃掉所有人为加入的信息，可以节省二进制的占用空间

### 7) --strip-debug

> 类似--strip-all，但是只是丢弃所有调试相关的信息

### 8) --strace

> 调试的时候很有用，会打印ld处理哪些文件

### 9) -nostdlib

> 强制linker使用-L指定的库

### 10) --unresolved-symbols=ignore-all

> 忽略所有无法解析的符号


* * *
原文: https://blog.jessfraz.com/post/top-10-favorite-ldflags/

