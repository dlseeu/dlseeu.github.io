---
layout: post
title:  "Github搭建个人网站"
date:   2018-07-25
author: "Alex"
header-img: 
tags:
    - 网站开发

---

拥有一个独立域名的博客，是很多IT人员最初的梦想，虽然现在有wordpress等博客框架，但是我们想要一个更加简单和管理，并且可自定义的博客，最重要的是成本要低，所以我们使用Github Pages +独立域名方案。

# 目标

* 独立博客域名
* 成本和难度小
* 支持Makrdown
* 支持图片展示

# 实现

下面就以我自己的www.dlseeu.com网站为例，说明如何完成这个网站的搭建。

## 0. 购买域名

在阿里云注册账户，并购买他们的域名产品。我购买的是dlseeu.cn这个域名，而且进行了实名验证（如果不验证，将无法正常使用）

![]({{ site.url }}/assets/images/aliyun-domain-dlseeu.png)


## 1. 注册Github

在Github注册账户，这个账户自己定义，我这里同样也使用了dlseeu这个用户名

![]({{ site.url }}/assets/images/github-account.png)

## 2. 创建Github Pages

Github Pages这个功能开启非常简单，就是在Github的账户下创建一个特定的仓库，名字为「账户.github.io」，比如我的账户是dlseeu，仓库就是dlseeu.github.io

如果你在dlseeu.github.io的目录下放一个index.html，那么现在你访问www.dlseeu.github.io就可以看到index.html的内容了。但是我们计划使用jekyll来生成静态网站，所以就不纯手工编写网页了。

## 3. 设置DNS解析路径

现在我们来设置DNS解析路径，目的是访问dlseeu.cn或者dlseeu.github.io都是访问的同一个网站，浏览器上显示的地址均为dlseeu.cn

* 设置Github Pages的参数

![]({{ site.url }}/assets/images/github-pages-custom-url.png)

* 设置阿里云的域名管理中的云DNS解析路径

![]({{ site.url }}/assets/images/aliyun-dns.png)

* 等待生效（10分钟左右）

## 4. jkeyll快速搭建网站/博客

* 安装jekyll
> gem install bundler jekyll

* 进入本地的dlseeu.github.io仓库
> cd  dlseeu.github.io

* 创建网站
> jekyll new .

* 将生成的文件提交到远程仓库
> git add .
> git commit -m 'update'
> git push -u origin master

* 刷新网站dlseeu.cn/dlseeu.github.io

* 进一步可以参考http://jekyllcn.com

## 5. 持续定制自己的网站

* 修改**_config.yml**中的一些参数，比如title之类的
* 增加插件，比如支持emoji
* 定义网站的模版和格式
