# 🎬 Remotion Monorepo 工作区

## 📖 项目简介

这是一个基于 pnpm workspace 的 Remotion Monorepo，用于管理多个独立的视频项目。

---

## 🏗️ 项目结构

```
F:\Remotion\
├── packages/                           # 所有项目包
│   ├── project-remotion-guide/         # Remotion 技能指南项目
│   │   ├── package.json                # 项目依赖配置
│   │   ├── remotion.config.ts          # Remotion 配置
│   │   ├── tsconfig.json               # TypeScript 配置
│   │   └── src/                        # 项目源代码
│   │       ├── index.ts                # 入口文件
│   │       ├── Root.tsx                # 项目根组件
│   │       ├── index.tsx               # 主视频组件
│   │       └── styles.css              # 样式文件
│   │
│   ├── project-tech-grid/              # 科技网格背景项目 🆕
│   │   ├── package.json
│   │   ├── remotion.config.ts
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts                # 入口文件
│   │       ├── Root.tsx                # 项目根组件（5种预设主题）
│   │       ├── index.tsx               # 科技网格组件
│   │       └── styles.css              # 样式文件
│   │
│   ├── project-3d-card/                # 3D卡片旋转动画项目 🆕
│   │   ├── package.json
│   │   ├── remotion.config.ts
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts                # 入口文件
│   │       ├── Root.tsx                # 项目根组件（6种预设主题）
│   │       ├── index.tsx               # 3D卡片组件
│   │       └── styles.css              # 样式文件
│   │
│   ├── shared-config/                  # 共享配置包
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/                        # 共享工具和类型
│   │       ├── index.ts
│   │       ├── project.ts              # 项目类型定义
│   │       └── projectManager.ts       # 项目管理工具
│   │
│   └── shared-components/              # 共享组件库 🆕
│       ├── package.json
│       ├── tsconfig.json
│       └── src/                        # 可复用组件
│           ├── index.ts
│           ├── TechGridBackground.tsx  # 科技网格背景组件
│           └── TechGridBackground.css  # 组件样式
│
├── scripts/                            # 自动化脚本
│   ├── project-manager.js              # 项目管理工具
│   └── render-all.js                   # 批量渲染脚本
│
├── projects/                           # 项目元数据
│   └── projects.json                   # 项目配置数据
│
├── project-management/                 # 项目管理文档
│   ├── README.md
│   ├── 快速开始.md
│   ├── 使用指南.md
│   ├── 架构说明.md
│   └── 项目模板.md
│
├── projects - AI xuanzhuan/            # AI图云动画项目 🆕
│   ├── src/
│   │   ├── index.tsx                   # AI图云主组件
│   │   ├── Root.tsx                    # 项目配置（6种预设）
│   │   ├── index.ts                    # 入口文件
│   │   └── styles.css                  # 样式文件
│   ├── scripts/
│   │   └── render-ai-cloud.js          # 批量渲染脚本
│   ├── package.json
│   ├── tsconfig.json
│   ├── remotion.config.ts
│   └── README.md
│
├── package.json                        # 根配置（workspace）
├── pnpm-workspace.yaml                 # pnpm workspace 配置
├── .gitignore
└── README.md                           # 本文件
```

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm 安装所有依赖
pnpm install
```

### 开发模式

```bash
# 启动 Remotion 技能指南项目
pnpm dev

# 或者明确指定项目
pnpm dev:guide

# 启动科技网格背景项目 🆕
pnpm dev:grid

# 启动3D卡片旋转动画项目 🆕
pnpm dev:card
```

#### 启动AI图云动画项目 🆕
```bash
# 进入AI图云项目目录
cd "F:\Remotion\projects - AI xuanzhuan"

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 渲染视频

```bash
# 渲染默认项目
pnpm render

# 渲染预览版本
pnpm preview
```

---

## 📦 可用命令

### 根级命令

```bash
# 开发
pnpm dev                    # 启动默认项目开发服务器
pnpm dev:guide             # 启动 Remotion 技能指南项目
pnpm dev:grid              # 启动科技网格背景项目 🆕
pnpm dev:card              # 启动3D卡片旋转动画项目 🆕
pnpm build                 # 构建项目

# 渲染
pnpm render                # 渲染默认项目
pnpm preview               # 渲染预览版本
pnpm render:all            # 批量渲染所有活跃项目

# 项目管理
pnpm project               # 交互式项目管理器
pnpm project:list          # 列出所有项目
pnpm project:create        # 创建新项目
pnpm project:delete        # 删除项目

# 类型检查
pnpm typecheck             # TypeScript 类型检查
```

### 项目级命令

```bash
# 在特定项目中运行命令
pnpm --filter project-remotion-guide dev
pnpm --filter project-remotion-guide build
pnpm --filter project-remotion-guide render

# 科技网格项目 🆕
pnpm --filter project-tech-grid dev
pnpm --filter project-tech-grid render

# 3D卡片项目 🆕
pnpm --filter project-3d-card dev
pnpm --filter project-3d-card render
pnpm --filter project-3d-card render:transparent
```

---

## 🎯 创建新项目

### 方法一：使用项目管理工具

```bash
pnpm project:create
```

按照提示创建新项目后，手动创建对应的包目录：

```bash
# 1. 创建项目目录
mkdir -p packages/project-new-name/src

# 2. 复制模板文件
cp -r packages/project-remotion-guide/* packages/project-new-name/

# 3. 修改新项目的 package.json
# - 修改 name 字段
# - 修改项目描述
# - 调整依赖版本

# 4. 实现自己的视频组件

# 5. 在根 package.json 中添加脚本
# "dev:new-name": "pnpm --filter project-new-name dev"

# 6. 重新安装依赖
pnpm install
```

### 方法二：手动创建

1. **创建项目目录**
   ```bash
   mkdir -p packages/project-new-name/src
   ```

2. **创建 package.json**
   ```json
   {
     "name": "project-new-name",
     "version": "1.0.0",
     "private": true,
     "scripts": {
       "dev": "remotion studio",
       "build": "remotion bundle",
       "render": "remotion render MyComposition out/video.mp4"
     },
     "dependencies": {
       "@remotion/cli": "^4.0.279",
       "remotion": "^4.0.279",
       "react": "^19.1.1",
       "react-dom": "^19.1.1",
       "shared-config": "workspace:*"
     }
   }
   ```

3. **创建项目文件**
   - `src/index.ts` - 入口文件
   - `src/Root.tsx` - 根组件
   - `src/index.tsx` - 主视频组件
   - `remotion.config.ts` - Remotion 配置
   - `tsconfig.json` - TypeScript 配置

4. **更新根 package.json**
   ```json
   {
     "scripts": {
       "dev:new-name": "pnpm --filter project-new-name dev"
     }
   }
   ```

5. **重新安装依赖**
   ```bash
   pnpm install
   ```

---

## 🔧 共享配置

所有项目都可以使用 `shared-config` 包中的共享功能：

```typescript
// 在任何项目中导入
import {
  getAllProjects,
  getActiveProjects,
  getProjectById
} from 'shared-config';
```

## 🎨 共享组件库

新增 `shared-components` 包，包含可在多个项目中复用的组件：

### 当前可用组件

#### 1. TechGridBackground（科技网格背景）
- ✨ 3D 透视网格效果
- 🌟 持续移动动画
- 💫 可调节发光效果
- 🎯 粒子系统
- 🎨 完全可自定义

**使用示例：**
```typescript
import { TechGridBackground } from 'shared-components';

<TechGridBackground
  gridColor="#00ffff"
  glowIntensity={0.8}
  speed={1}
  showParticles={true}
  showTitle={true}
  title="MY TITLE"
/>;
```

**查看详情：**
- **[科技网格组件文档](./project-management/科技网格组件文档.md)** - 组件详细说明
- **[共享组件使用指南](./project-management/共享组件使用指南.md)** - 集成方法
- **示例项目**：`packages/project-tech-grid/`

---

## 🎯 项目列表

### 当前项目

1. **project-remotion-guide** - Remotion 技能指南
   - 类型：教程视频
   - 时长：12秒 (360帧)
   - 分辨率：1920x1080
   - 状态：Active

2. **project-tech-grid** - 科技网格背景 🆕
   - 类型：背景动画
   - 时长：10秒 (300帧)
   - 分辨率：1440x2560 (2K 竖屏)
   - 状态：Active
   - 主题：5种预设颜色主题

3. **project-3d-card** - 3D卡片旋转动画 🆕
   - 类型：产品展示/图标动画
   - 时长：10秒 (300帧)
   - 分辨率：1080x1080 (正方形)
   - 状态：Active
   - 特性：支持透明背景导出 ⭐
   - 主题：6种预设动画效果

4. **projects - AI xuanzhuan** - AI图云动画 🆕
   - 类型：浅色图云动画
   - 时长：10秒 (300帧)
   - 分辨率：1080x1080 / 2048x2048
   - 状态：Active
   - 特性：透明背景 + 螺旋旋转 ⭐
   - 主题：6种预设配置
   - 风格：浅色科技感

---

## 📊 项目元数据

项目的基本信息和配置存储在 `projects/projects.json` 中：

```json
{
  "version": "1.0.0",
  "projects": [
    {
      "id": "remotion-guide",
      "name": "Remotion 技能指南",
      "description": "介绍 Remotion 的核心概念和工作流程",
      "category": "tutorial",
      "status": "active",
      "config": {
        "durationInFrames": 360,
        "fps": 30,
        "width": 1920,
        "height": 1080
      }
    }
  ],
  "templates": []
}
```

---

## 🎨 Monorepo 优势

### 1. **独立管理**
- 每个项目有自己的 `package.json`
- 独立的依赖版本管理
- 独立的构建配置

### 2. **代码共享**
- 通过 `shared-config` 包共享工具函数
- 共享类型定义
- 统一的项目管理逻辑

### 3. **统一工具**
- 统一的脚本命令
- 批量操作支持
- 一致的开发体验

### 4. **依赖优化**
- pnpm workspace 自动处理链接
- 减少重复依赖安装
- 更快的安装速度

---

## 📚 文档导航

- **[快速开始](./project-management/快速开始.md)** - 5分钟上手指南
- **[使用指南](./project-management/使用指南.md)** - 详细功能说明
- **[项目模板](./project-management/项目模板.md)** - 模板库和自定义
- **[架构说明](./project-management/架构说明.md)** - 系统设计详解
- **[科技网格组件文档](./project-management/科技网格组件文档.md)** - 科技网格背景组件详解 🆕
- **[共享组件使用指南](./project-management/共享组件使用指南.md)** - 共享组件库使用方法 🆕
- **[3D卡片动画组件文档](./project-management/3D卡片动画组件文档.md)** - 3D卡片旋转动画组件详解 🆕
- **[AI图云动画文档](./projects - AI xuanzhuan/README.md)** - AI工具图云动画使用指南 🆕

---

## 🛠️ 开发工作流

### 典型开发流程

1. **启动开发服务器**
   ```bash
   pnpm dev
   ```

2. **在浏览器中编辑**
   - 打开 http://localhost:3000
   - 选择项目进行编辑
   - 实时预览效果

3. **测试参数**
   - 在右侧面板修改参数
   - 查看实时效果

4. **类型检查**
   ```bash
   pnpm typecheck
   ```

5. **渲染最终视频**
   ```bash
   pnpm render
   ```

---

## 🐛 故障排除

### pnpm 安装失败

```bash
# 清理缓存
pnpm store prune

# 删除 node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# 重新安装
pnpm install
```

### 项目无法启动

1. 检查 pnpm workspace 配置
2. 确认依赖已正确安装
3. 检查项目的 `package.json` 配置

---

## 🚀 性能优化

### 开发模式
- 使用较小的分辨率进行预览
- 减少不必要的重渲染
- 优化动画复杂度

### 生产渲染
- 使用合适的帧率（30fps 通常足够）
- 压缩输出文件大小
- 使用批量渲染脚本

---

## 📞 获取帮助

- 📚 [Remotion 官方文档](https://www.remotion.dev/)
- 💬 [Remotion Discord 社区](https://discord.gg/6VdNDuwuUH)
- 🐛 [GitHub Issues](https://github.com/remotion-dev/remotion/issues)
- 📖 [pnpm Workspace 文档](https://pnpm.io/workspaces)

---

## 📄 许可证

本项目基于 MIT 许可证开源。

---

**最后更新**: 2026-05-03  
**版本**: 2.0.0 (Monorepo)  
**包管理器**: pnpm  
**Workspace**: pnpm-workspace.yaml
