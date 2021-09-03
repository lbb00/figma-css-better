# Figma CSS Better

> Figma CSS 转换为微信小程序的样式

- 使用 postcss px-to-viewport 将 375px to 750rpx
- 仅保留 Figma css 中有用的样式（Figma 中生成的 position、top、left 等属性大多数情况下都是不需要的）

## Install

安装点这里: [Figma Css Better](https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js)

## Example

如下图中的`🔥复制小程序样式`按钮，点击后拷贝下来的内容为：

```css
.foo {
  font-weight: normal;
  font-size: 24rpx;
  line-height: 36rpx;
  color: #202426;
}
```

![示例图](https://i.loli.net/2021/07/17/Fv4NCPAZsyXbr9w.png)
