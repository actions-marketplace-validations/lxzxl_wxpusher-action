# WxPusher

This action is used to send message via WxPusher.

## Inputs

### appToken

**Required** WxPusher App Token

### content

**Required** 消息详细内容

### summary

消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度 100，可以不传，不传默认截取 content 前面的内容。

### contentType

内容类型 1 表示文字 2 表示 html(只发送 body 标签内部的数据即可，不包括 body 标签) 3 表示 markdown. Default `"1"`

### topicIds

发送目标的 topicId，多个用`,`分隔！，也就是群发，使用 uids 单发的时候，可以不传。

### uids

发送目标的 UID，多个用`,`分隔！注意 uids 和 topicIds 可以同时填写，也可以只填写一个

### url

原文链接，可选参数

### wxPusherUrl

api 地址，默认使用官方地址

## Outputs

### `time`

The time we greeted you.

## Example usage

```yml
uses: lxzxl/wxpusher-action@v1.0
with:
  appToken: ${{ secrets.WP_APP_TOKEN }}
  content: "message content"
  summary: "title"
  contentType: ""
  topicIds: "666,777"
  uids: ""
  url: ""
```
