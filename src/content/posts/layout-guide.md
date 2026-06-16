---
title: 布局自定义指南
date: 2026-06-13T00:30:30+08:00
updated: 2026-06-12
categories: [tech]
tags: [astro, 指南, 自定义]
description: 如何自定义这个博客的布局和样式。
---

## 侧边栏配置

编辑 `src/consts.ts` 文件可以自定义：

- **分类列表**：修改 `CATEGORIES` 数组，添加或删除分类
- **导航链接**：修改 `NAV_LINKS`，添加上方导航项
- **社交链接**：修改 `SOCIAL_LINKS`，添加 GitHub、Twitter 等链接

## 内容类型

本博客支持三种内容类型：

| 类型 | 目录 | 用途 |
|------|------|------|
| `posts` | `src/content/posts/` | 正式博客文章 |
| `notes` | `src/content/notes/` | Obsidian 长笔记 |
| `moments` | `src/content/moments/` | 朋友圈/flomo 片段 |

> [!info] 发布流程
> 1. 在 Obsidian 中写完笔记
> 2. 复制 `.md` 文件到对应的 content 目录
> 3. 添加 frontmatter（标题、日期、分类等）
> 4. `git push` 即可自动部署

## 样式调整

全局样式在 `src/styles/global.css` 中。主要 CSS 变量：

- `--color-bg` / `--color-text`：背景和文字颜色
- `--font-sans` / `--font-mono`：字体
- `--max-width`：内容最大宽度

修改这些变量即可快速调整整体风格。
