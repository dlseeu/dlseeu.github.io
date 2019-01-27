---
title:  "Google高阶搜索技巧"
date:   2019-01-27 09:00:00 +0800
category: Tools
---

如何更加高效的找到自己想要的东西，Google提供了一些高级搜索操作，通过特定语法来限定搜索条件。

### 1."search term"

强制进行精确匹配搜索，通过精简模糊搜索结果和排除同义项来搜索一个独立词语

> "steve jobs"

### 2. OR

搜索X或者Y相关结果，或者和两者都相关的结果。注意：可以使用管道符号\|来代替"OR"

> jobs OR gates

> jobs | gates

### 3. AND

只搜索同时与X和Y有关的信息。注意：这个和默认的搜索结果没有多大差别，因为Goole默认的搜索方式就是AND。联合其他操作符，AND就会变得非常有用。

> jobs AND gates

### 4. -

排除一个搜索条件，比如例子中的结果是所有和jobs相关但不包括Apple（公司名字）这个关键词

> jobs - apple

### 5. *

模糊匹配符，可以匹配任意词语

> steve * apple

### 6. ()

用于组合搜索操作符，用于控制搜索如何执行

> (ipad OR iphone) apple

### 7. $

搜索价格，也可使用英镑符号

> ipad $329

### 8. define:

Goolge内建的词典查询，会使用一个卡片来展示词条的意思

> define:entrepreneur

### 9. cache:

搜索最新缓存的网页内容信息

> cache:apple.com

### 10. filetype:

指定搜索到额文件类型，比如PDF,DOCX,TXT,PPT等等。注意："ext:"也可以这样用

> 例子：apple filetype:pdf

### 11. site:

限制搜索范围是一个指定的网站

> site:apple.com

### 12. related:

搜索给定域名的相关站点

> related:apple.com

### 13. intitle:

只提供那些Title中含有关键词的结果，比如例子中的索索结果为所有tilte含有apple的信息

> intitle:apple

### 14. alintitle:

类似于intitle,但是要求title含有所有指定的关键词

> allintitle:apple iphone

### 15. inurl:

找到那些url中含有特定词条的网页

> inrul:apple

### 16. allinurl:

类似inurl, 但是要求包含所有的指定词语

> allinurl:apple iphone

### 17. intext:

找到那些内容含有特定词语的网页，比如例子的结果是返回所有含有apple的网页

> intext:apple

### 18. allintext

类似intext,但是要求包含所有的指定词语

> allintext:apple iphone

### 19. AROUND(X)

定义指定的相邻的两个词条中间不能超过多少个单词，比如例子中要求，apple后面最多不能超过4个单词就需要出现iphone, 否则就不符合要求

> apple AROUND(4) iphone

### 20. weather:

返回指定位置的天气情况

> 例子：weather: san francisco

### 21. stocks: 

查看股票价格

> 例子：stocks:appl

### 22. map:

强制Google展示指定位置的地图搜索结果

> maps:silicon valley

### 23. movie:

查找电影的信息和附近上映时间

> movies:steve jobs

### 24. in

单位转换

> $329 in GBP

