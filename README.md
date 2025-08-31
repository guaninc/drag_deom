# 基于HTML5 的鼠标事件/手机触摸事件 与 View Transition API实现 拖拽排序demo

## 项目概述

这个项目是一个基于纯HTML、CSS和JavaScript实现的拖拽排序demo。界面由16个可拖拽的方块组成，可以通过拖拽方块来交换它们的位置。项目充分利用了现代浏览器的拖拽API和View Transition API，实现了流畅的交互体验和优雅的动画效果。

## 技术栈

- 纯HTML5语义化标签
- CSS3 Grid布局与动画
- 原生JavaScript（无框架依赖）
- 基于HTML5 的鼠标事件/手机触摸事件 模拟的拖拽排序
- View Transition API（实验性特性）

## 核心功能实现

### 1. 界面布局

界面采用CSS Grid布局，创建了一个4x4的网格容器：

```css
.container {
  margin: 0 auto;
  width: 80vmin;
  height: 80vmin;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
}
```

每个方块具有以下样式特点：
- 圆角设计（border-radius: 25px）
- 固定宽高比（aspect-ratio: 1/1）
- 蓝色背景（royalblue）
- 居中显示（flex布局）
- 平滑过渡动画（transition: all 0.3s ease）

### 2. 初始化游戏

初始化时创建一个包含1-16数字的数组，并渲染到网格容器中：

```javascript
let list = new Array(16).fill(0).map((item, index) => index + 1);
function render(list) {
  document.startViewTransition(() => {
    container.innerHTML = list
      .map(
        (item) => `<div class="item" style="--i: a${item}">${item}</div>`
      )
      .join("");
  });
}
render(list);
```

### 3. 拖拽交互实现

拖拽功能主要通过以下步骤实现：

#### 3.1 拖拽开始

当用户鼠标按下或触摸开始时，检测是否点击到了方块元素：

```javascript
function mousedown(e) {
  if (e.target.className.includes("item")) {
    current = +e.target.innerHTML;
    dragItem = addDragEvent(e.target, e);
    container.appendChild(dragItem);

    // 添加移动和结束事件监听
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("touchmove", mousemove);
    document.addEventListener("mouseup", mouseup);
    document.addEventListener("touchend", mouseup);
  }
}
```

#### 3.2 拖拽中

在拖拽过程中，更新拖拽元素的位置，使其跟随鼠标或触摸点移动：

```javascript
function mousemove(e) {
  if (e.type === "touchmove") {
    e = e.touches[0];
  }
  if (dragItem) {
    dragItem.style.left = e.clientX - dragItem.offsetWidth / 2 + "px";
    dragItem.style.top = e.clientY - dragItem.offsetHeight / 2 + "px";
  }
}
```

#### 3.3 拖拽结束

当用户释放鼠标或结束触摸时，移除拖拽元素，并交换原始方块与目标方块的位置：

```javascript
function mouseup(e) {
  // 移除事件监听
  document.removeEventListener("mousemove", mousemove);
  document.removeEventListener("mouseup", mouseup);
  document.removeEventListener("touchmove", mousemove);
  document.removeEventListener("touchend", mouseup);

  if (dragItem) {
    container.removeChild(dragItem);
    dragItem = null;

    // 获取目标元素
    let targetDom = getElementByPoint(e.clientX, e.clientY, "item");
    if (targetDom) {
      let target = +targetDom.innerHTML;
      let currentLength = list.indexOf(current);
      let targetLength = list.indexOf(target);

      // 交换位置
      list[currentLength] = target;
      list[targetLength] = current;

      // 重新渲染
      render(list);
    }
  }
}
```

### 4. View Transition API应用

项目使用了View Transition API来实现方块位置交换时的平滑过渡效果：

```javascript
function render(list) {
  document.startViewTransition(() => {
    container.innerHTML = list
      .map(
        (item) => `<div class="item" style="--i: a${item}">${item}</div>`
      )
      .join("");
  });
}
```

这个API提供了一个简单的方法来创建页面状态变化时的动画过渡，使得方块交换位置的过程更加流畅自然。

### 5. 响应式设计

游戏界面采用了响应式设计，使用vmin单位确保在不同屏幕尺寸下都能保持良好的显示效果：

```css
.container {
  width: 80vmin;
  height: 80vmin;
}
```

同时，项目支持触摸设备，通过touchstart、touchmove和touchend事件实现了移动端兼容性。


## 扩展思路

基于当前实现，可以考虑以下游戏扩展方向：

1. 添加难度选择功能，支持不同大小的拼图（如3x3、5x5等）
2. 实现打乱算法，确保拼图有解
3. 添加计时功能和步数统计
4. 实现图片拼图模式，使用图片替代数字
5. 添加音效和视觉反馈，增强游戏体验
6. 实现本地存储功能，保存游戏进度
