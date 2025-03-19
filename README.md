# 趣味英语乐园

一个专为一年级小朋友设计的趣味英语学习平台，通过互动和游戏方式提升英语学习兴趣。

## 功能特点

- **互动学习**：通过点击、拖拽、听音等互动方式学习英语
- **趣味游戏**：包含记忆配对、单词匹配、听力游戏等多种游戏
- **丰富内容**：涵盖字母、数字、颜色、动物等基础英语知识
- **动画效果**：可爱的界面设计和动画效果，吸引小朋友注意力
- **声音反馈**：学习过程中有声音反馈，帮助掌握正确发音

## 技术栈

- React
- React Router
- Styled Components
- Howler.js (音频处理)
- React Confetti (特效)
- React Spring (动画)

## 开发说明

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── assets/         # 静态资源(图片、音频、字体)
├── components/     # 共用组件
├── context/        # React Context
├── games/          # 游戏组件
├── pages/          # 页面组件
├── App.js          # 主应用组件
└── index.js        # 入口文件
```

## 注意事项

1. 请确保在`public/images`、`public/sounds`文件夹中添加相应的图片和音频资源
2. 默认图片命名约定：`/images/words/单词名.png`
3. 默认音频命名约定：
   - 字母发音：`/sounds/letters/字母.mp3`
   - 单词发音：`/sounds/words/单词.mp3`
   - 游戏音效：`/sounds/match.mp3`, `/sounds/fail.mp3`, `/sounds/win.mp3`

## 已实现的页面

- 首页 (HomePage)
- 字母学习页 (AlphabetPage)
- 记忆配对游戏 (MemoryGamePage)
- 数字学习页 (NumbersPage)
- 颜色学习页 (ColorsPage)
- 动物学习页 (AnimalsPage)
- 单词匹配游戏 (WordMatchGamePage)
- 听力游戏 (ListeningGamePage) 
## 待开发页面

