---
layout: post
title:  "RTMP-V1.0协议规范讲解"
date:   2018-10-29 22:00:00 +0800
author: "Alex"
tags: 
    -多媒体

toc: true
toc_label: "目录"
toc_icon: "cog"

---

RTMP协议，Macrodmedia开发，Adobe收购Macromedia后发布了V1.0版本的[RTMP协议文档](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp_specification_1.0.pdf)

RTMP协议是在TCP/IP协议之上的更高层协议，只规定了封装方法，所以根据使用的通信协议的不同和封装格式的不同，又衍生了其他协议：

* **RTMPS**: 通过TLS/SSL加密链接通信
* **RTMPE**: Adobe私有封装格式，不对外公开，仅仅是Adobe家族的产品使用
* **RTMPT**: 通过HTTP报文的形式传递信息和数据，这样可以更好的穿越防火墙
* **RTMPFP**: 使用UDP代替TCP，实现P2P的的RTMP数据互传

**注意！！！这篇文章，我们重点讲解RTMP协议，而非其他衍生协议**


# RTMP协议

RTMP协议分别定义了了HandShake，RTMP Chunk Stream，RTMP Command Message规范。

**Handshake**是RMTP通信建立的第一步，必须完成握手流程，才能进行数据和命令的交互, 也就是进入Chunking阶段。
**RTMP Chunk Stream**设计了一套协议规则，用于拆分，分发数据或者命令以及响应消息。
**RTMP Command Message**定义了RTMP协议中需要支持的命令以及格式。

## 定义

* Payload: 负载，一个包中的实际承载的数据，可以是音频或者视频数据，负载的格式解释不在本文档中。
* Packet: 包，由包头和负载数据组成
* Port: 端口
* Transport address: 传输地址, 由网络地址和端口共同描述
* Message stream: 消息流, 用于传递消息的逻辑通道
* Message stream ID: 消息流标识，用于区分不同的消息流
* Chunk: 一个消息的切片，一个消息如果太大，会拆分为很多个Chunk有序发送到对方，而且可以多流并发传输
* Chunk Stream: 一个通信通道，可以让很多的Chunks从一端传输到另外一端
* Chunk Stream ID: 每一个Chunk都有一个ID, 用于标识属于哪个Chunk Stream
* Multiplexing: 多路混合，可以让多个音视频数据统一发送到音频/视频流中，实现并行传输。
* DeMultiplexing: 多路解混合，Multiplexing的逆向过程
* Remote Procedure Call(RPC): 远程调用
* Metadata: 关于数据的描述，比如电影的metadata就是标题，时长，创建时间等等
* Application Instance: 服务器上的服务程序，客户端通过发送connect请求和这个服务进行连接
* Action Message Format(AMF): 一种编码格式，用于将ActionScript对象二进制化，有AMF-0和AMF-3两种格式

## RTMP Chunk Stream

**RTMP Chunk Stream**是一种协议规范，提供给更高层次的媒体流协议的并发和打包服务。RTMP Chunk Stream和RTMP一起可以适应很多流媒体应用，比如直播和点播等。

**RTMP Chunk StreamA**包含内置的协议控制消息，同时提供更高的协议用于嵌入用于控制消息

## Message Format

为了消息能够拆分打包为更小的Chunk可以在RTMP Chunk Stream规范下传输，RTMP中的需要消息的格式必须包含以下内容：

* Timestamp: 时间戳，可以占用4个字节
* Length: payload的长度，如果message header存在，在应该包含这个信息，占用3个字节
* Type ID: 有一部分被保留了，用于RTMP Chunk Stream协议和更高层次的协议使用。其他的则可以提供共用户使用。
* Message Stream ID: 由于很多消息都是复合传输在相同的Chunk Stream中，所以解复合需要使用Message Stream ID来区分。

## HandShake

客户端和服务器进行RTMP协议通信是从HandShake开始的，HandShake和RTMP协议中的其他信息格式不同，都是静态大小的数据块。 握手顺利完成后，就进入Chunking流程

HandShake的时序图片版：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-handshake-timing%20.png)

### Chunk C0 & S0 Format

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-c0s0-format.png)

* 1字节
* 表示版本号
* C0表示客户端请求的RTMP协议版本
* S0表示服务器选择使用的RTMP协议版本
* **3**是当前使用的版本，其他值用于扩展功能
* 服务器如果不能识别客户端的请求，默认响应为**3**

### Chunk C1 & S1 Format

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-c1s1-format.png)

* 1536字节
* Time: 时间戳，也可以是0
* Zero: 必须为0
* Random data: 随机数，主要是用于区分不同的Handshake，填写任何数字都可以

### Chunk C2 & S2 Format

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-c2s2-format.png)

* 1536字节
* Time: 发送端的时间戳
* Time2: 收到的C1/S1的时间戳
* Random echo: 直接将收到的C1/S1的Random data复制过来，作为响应

## Chunking

客户端和服务器完成握手流程后，就可以进入Chunking阶段。每一个Chunk Stream可以传输一个message stream中的一种message。
每一个Chunk都有一个唯一的Chunk Stream ID, 当这些Chunks传输到接受端后，会根据Chunk Stream ID再次合成Chunk Message

Chunkink可以把大的消息拆分为小的消息，也允许把小的消息一起发送来节省冗余信息。

Chunk的大小可以配置，可以通过发送Set Chunk Size control message来设置。大小需要合适，否则会造成CPU使用率以及带宽使用率不充分。

### Chunk Format

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-format.png)

每一个Chunk包含头和数据两部分，对于头来说，由三部分数据组成:

1. **Basic Header**: 长度是1/2/3字节，包含Chunk Stream ID 和 Chunk Type。Chunk Type决定了后面的Message Header的格式，Chunk Stream ID决定Basic Header的长度, 这个长度是可变的。
2. **Message Header**: 长度是0/3/7/11字节，用来描述被传输的消息或者消息块，长度由Basic Header中的ChunkType来决定
3. **Extend Timestamp**: 长度是0/4字节，绝对时间或者时间差
4. **Chunk Data**: Chunk实际的数据负载，长度可变, 最大不超过设置的ChunkSize

#### Basic Header

Chunk Type由Bit0，Bit1来表示，也是就4种ChunkType, 对于每一种ChunkType对应的MessageHeader格式后面会细说说. 对于StreamID范围不同，使用不同的字节长度来封装，有以下三种版本：

* Stream IDS (2,63], 一个字节, Stream IDS = bis[2:8]
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-basic-header-format.png)

* Stream IDS [64, 319], 两个字节，bits[2:8] = 0
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-basic-header-2.png)

* StreamIDS [64, 65599], 三个字节，bits[2:8] = 1
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-basic-header-3.png)

#### Message Header

根据Basic Header中的fmt不同，Message Header的组织结构也不一样，他们分别是

* Type 0
    * ![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-message-header-0.png)
    * 11字节长度
    * chunk stream第一个必须发送这个类型的chunk
    * message type id
    * message stream id

* Type 1
    * ![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-message-header-1.png)
    * 7字节长度
    * 因为收到Type 1之前会收到Type 0, 所以Type1中省略了message stream id, 使用Type 0中的message stream id


* Type 2
    * ![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-message-header-2.png)
    * 3字节长度
    * stream id 和 stream length都使用之前的Type 0中的
    * 对于定长数据，比如音频，可以发送一个Type 0 的Chunk后，全部使用Type 2来发送数据

* Type 3
    * **0**字节长度
    * 如果是固定长度的数据，而且时间差是第一个Type 0的的时间戳，可以直接在Type 0后面发送Type 3


成员解释：

* timestamp delta: 存在Type 1 或者 Type 2，就是当前的Chunk和之前的Chunk时间差
* message length: 存在Type 0 或者 Type 1 Chunk，用于描述消息的长度，注意，不是chunk的负载长度
* message type id: 存在Type 0 或者 Type 1， 用于描述消息的类型
* message stream id: 只存在Type 0, 用于描述消息流ID，典型的来说，相同的Chunk Stream ID拥有相同的Message Stream ID

#### Extend Timestamp

当时间戳或者时间差超过0xFFFFFF时候，使用该区域存储完成的时间值

#### Chunk Data

负载数据

### Chunk示例

#### 音频

* 音频不需要拆分原始数据包，因为每一包的音频大小比ChunkSize小
* 音频需要Type 1，用于计算两个包之间的Delta Timestamp

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-audio-example1.png)
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-audio-example2.png)


#### 视频

* 视频需要拆包，因为超过ChunkSize
* 对于同一个包，不需要Type1来表示Delta Timestamp
* 除了最后一个包，其他包的大小都是ChunkSize

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-video-example1.png)
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-chunk-video-example2.png)


## Protcol Control Messagee

RTMP Chunk Stream 使用保留的Message Type ID (1, 2, 3, 5, 6)用于协议控制消息，这些消息的Stream ID **必须** 为0，Chunk Stream ID **必须**为2。

### Type 1 - Set Chunk Size

用于设置通信过程中的块大小

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-set-chunksize.png)

* RTMP默认Chunk Size是128Bytes

### Type 2 - Abort Message

用于告诉另外一端，该Chunk负载中的Chunk Stream ID流不在被处理，可以不用再发送了。

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-abort-message.png)

### Type 3 - Acknowledgement

当客户端或者服务端在收到设定的窗口大小数据后，**必须**发送一个Acknowledgement给对方，告诉对方目前已经收到的数据长度。窗口大小是指在收到Acknowledgement之前一直可以发送的最大数据长度

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-acknowledge.png)

* sequence number: 截止当前收到的数据数量

### Type 5 - Window Acknowledge Size

用于设置发送确认包之前可以发送最大的数据量

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-window-acknowledge-size.png)


### Type 6 - Set Peer Bandwidth

用于设置对端的输出数据带宽

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-set-peer-bandwidth.png)

Limit Type 可以是以下三种：
1. Hard: 对端应该限制输出带宽为指定的窗口大小
2. Soft: 对端应该限制输出带宽为该命令中的窗口大小或者已经生效的窗口大小，以最小的为准
3. Dynamic: 如果之前设置的是Hard模式，这个就可以理解为Hard模式，如果是其他的，则可以忽略这条消息

## RTMP Message Formats

RTMP Message是可以通过RTMP Stream Chunk来传输的消息。

RTMP Message由两部分组成，分别是消息头和数据负载。

### RTMP Message Header

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-command-message-header-format.png)

* **Message Type**: 消息类型，[1,6]为RTMP Protocol Message Control保留
* **Length**: 负载长度，big-endian格式
* **Timestamp**: 时间戳，big-endian格式
* **Message Stream ID**: 消息流ID，big-endian格式

### RTMP Message Payload

消息中的实际数据负载，可以用来承载编码视频或者音频采样数据，数据的封装格式是用户选择和定义的，可以是标准的，也可以是私有的。


### User Control Message

RTMP Message 使用Type ID 4 和Message Stream ID 0的Message作为User Control Messages，主要用来描述RTMP streaming layer的信息。

如果使用RTMP Chunk Stream来传输，则Chunk Stream ID应该设置为2, Payload的格式如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-command-user-control-format.png)

Event Types 和 Event Data Format 在这里介绍

对于Type ID 1/2/3/5/6 则用来作为RTMP Chunk Stream Protocol使用，参考[这里]()

## RTMP Command Messages

RTMP 使用不同的Message Type和Command Type来完成端到端的数据交换，包括视频，音频，共享信息等。Commmand messages使用AMF编码格式来编码命令消息。客户端或者服务器可以通过RPC来完成命令请求。

### Command Message (Message Type: 20-AMF0/17-AMF3)

用于请求远端操作和响应,包括命令有connect/createstream/publish/play/pause，对应的响应有onstatus/result等

### Data Message (Message Type: 18-AMF0/15-AMF3)

用于发送元数据，包括音视频数据等。包括createion time/duration/theme等信息

### Shared Object Message (Message Type: 19-AMF0/16-AMF3)

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-shared-objects-format.png)

用于发送和接受共享对象（一组name-value)，Event Type支持如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-shared-objects-type.png)

### Audio Message (Message Type: 8)

### Video Message (Message Type: 9)

### Aggregate Message (Message Type: 22)

聚合消息用于将很多RTMP sub-messsage放在一起，格式如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-aggregate-format.png)

### User Control Message Events

用户通知对端用户控制，支持如下:
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-user-control-type1.png)
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-user-control-type2.png)


## RTMP Commands 介绍

客户端和服务器通过AMF编码消息来进行交互，发送端通过发送一个包含command name, transaction ID 以及 command object（包含相关参数）的command message到接收端，接受端处理并通过_result/_error等名称来响应该命令。

### NetConnection Commands

NetConnection是对服务器和客户端之间的链接的更高层的解释, 包括有connect/call/close/createStreanm。NetConnection是默认通信通道，Stream ID为0.

#### connnect

送该命令来请求连接到具体的服务, 格式如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-connect-format.png)

附带的参数有：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-connect-param.png)

参数中的audioCodecs如下:

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-audio-codecs.png)

参数中的videoCodecs如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-video-codecs.png)

参数中的videoFunction如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-video-functions.png)

参数中的objectEncoding如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-connect-amf.png)


该命令的响应格式如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-connect-response.png)


connect的典型交互时序图下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-connect-flow.png)

#### call

发送该命令来请求RPC

命令&响应格式如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-call-command-response.png)

#### close

发送该命令来请求关闭服务

#### createStream

发送该命令来创建到服务器的一个逻辑通道，来进行音频，视频以及metadata的传递

命令&响应格式如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-createStream-command-response.png)

###  NetStream Commands

NetStream 定义用于音频，视频以及metadata数据u 传递的通道，这个通道是通过NetConnection中的createStream创建的，一个NetConnection可以拥有多个NetStreams。

以下命令可以在NetStream上由客户端发送给服务器:

#### play

客户端发送这个命令给服务器，来申请播放一路流。可以多次发送这个命令可以创建播放列表

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-play1.png)
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-play2.png)
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-play3.png)

典型的play时序图如下：

![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-play-flow.png)

#### play2

不同于play命令，play2可以切换到不同的码率流上进行播放。服务器需要针对不同的码率有不同的流输出。

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-command-play2.png)

典型的play2时序图如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-command-play2-flow.png)

#### deleteStream

NetStream销毁时，需要发送这个命令告知服务器

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-deleteStream.png)

#### receiveAudio

NetStream通过发送这条命令，告知服务器是否发送音频数据到客户端

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-recieveAudio.png)

#### recieveVideo

NetStream通过发送这个命令，告知服务器是否发送视频数据到客户端

命令格式如下:
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-recieveVideo.png)

#### publish

客户端发送该命令到服务器，来发布一条带有名字的流到服务器，使用这个名字任何客户端都可以播放和接收流

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-publish.png)

#### seek

客户端发送这个命令来跳转到指文件指定位置或者播放列表中的文件

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-seek.png)

#### pause

客户端发送这个命令来暂停服务器发送数据

命令格式如下：
![](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp-pause.png)

> 参考资料来自:
> * [RTMP协议文档](https://dlseeu-website.oss-cn-hangzhou.aliyuncs.com/rtmp/rtmp_specification_1.0.pdf)
