# 🚀 Monorepo 迁移指南

## 📋 迁移概述

我们已经将项目从单包架构迁移到了 pnpm workspace Monorepo 架构。这个迁移提供了更好的项目隔离、代码共享和依赖管理。

---

## 🔄 主要变更

### 目录结构变化

**旧结构**：
```
F:\Remotion\
├── src/
│   ├── index.ts
│   ├── Root.tsx
│   ├── projects/
│   ├── lib/
│   └── types/
├── package.json
└── remotion.config.ts
```

**新结构**：
```
F:\Remotion\
├── packages/
│   ├── project-remotion-guide/    # 独立的项目包
│   │   ├── package.json
│   │   ├── remotion.config.ts
│   │   └── src/
│   └── shared-config/             # 共享配置包
│       ├── package.json
│       └── src/
├── package.json                   # 根配置
├── pnpm-workspace.yaml           # Workspace 配置
└── README.md
```

---

## 📦 包结构说明

### 1. project-remotion-guide
**作用**：Remotion 技能指南的独立项目包

**包含**：
- 自己的 `package.json` 和依赖配置
- 独立的 `remotion.config.ts`
- 项目源代码（`src/`）
- 独立的 TypeScript 配置

### 2. shared-config
**作用**：所有项目共享的配置和工具

**包含**：
- 项目类型定义（`project.ts`）
- 项目管理工具（`projectManager.ts`）
- 共享的验证逻辑

---

## 🛠️ 迁移步骤

### 第一步：安装 pnpm

如果你还没有安装 pnpm：

```bash
npm install -g pnpm
```

### 第二步：删除旧的依赖

```bash
# 删除旧的 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json
```

### 第三步：安装新依赖

```bash
# 使用 pnpm 安装所有 workspace 依赖
pnpm install
```

### 第四步：更新命令使用

**旧命令**：
```bash
npm run dev
npm run build
npm run render
```

**新命令**：
```bash
pnpm dev                 # 启动默认项目
pnpm dev:guide          # 启动 Remotion 技能指南
pnpm build              # 构建项目
pnpm render             # 渲染视频
```

---

## 🎯 新项目创建流程

### 在旧结构中创建项目
1. 在 `src/projects/` 中创建新目录
2. 创建组件文件
3. 在 `src/Root.tsx` 中注册
4. 更新 `projects.json`

### 在新结构中创建项目
1. **创建项目包目录**
   ```bash
   mkdir -p packages/project-new-name/src
   ```

2. **复制并修改模板**
   ```bash
   # 复制现有项目作为模板
   cp -r packages/project-remotion-guide/* packages/project-new-name/
   ```

3. **修改 package.json**
   ```json
   {
     "name": "project-new-name",
     "description": "新项目描述",
     "scripts": {
       "dev": "remotion studio",
       "build": "remotion bundle",
       "render": "remotion render MyComposition out/video.mp4"
     }
   }
   ```

4. **实现自己的组件**
   - 修改 `src/index.tsx` 中的视频组件
   - 更新 `src/Root.tsx` 中的 Composition 配置

5. **添加到根 package.json**
   ```json
   {
     "scripts": {
       "dev:new": "pnpm --filter project-new-name dev"
     }
   }
   ```

6. **重新安装依赖**
   ```bash
   pnpm install
   ```

---

## 🔧 共享代码使用

### 导入共享配置

在任何项目的组件中，你可以使用共享配置：

```typescript
// 导入项目管理工具
import { 
  getAllProjects,
  getActiveProjects,
  getProjectById 
} from 'shared-config';

// 导入类型定义
import { 
  Project,
  ProjectsData,
  Template 
} from 'shared-config';
```

### 添加新的共享功能

1. 在 `packages/shared-config/src/` 中创建新文件
2. 在 `packages/shared-config/src/index.ts` 中导出
3. 在需要使用的项目中导入

---

## 📊 依赖管理

### Workspace 依赖

在项目包中引用其他包：

```json
{
  "dependencies": {
    "shared-config": "workspace:*"
  }
}
```

### 外部依赖

每个项目可以有自己独立的外部依赖：

```json
{
  "dependencies": {
    "remotion": "^4.0.279",
    "react": "^19.1.1"
  }
}
```

---

## 🚀 开发工作流

### 启动开发服务器

```bash
# 启动特定项目
pnpm --filter project-remotion-guide dev

# 或使用根级脚本
pnpm dev:guide
```

### 渲染项目

```bash
# 在项目目录中渲染
cd packages/project-remotion-guide
pnpm render

# 或从根目录渲染
pnpm render
```

### 批量操作

```bash
# 对所有项目运行命令
pnpm -r build          # 构建所有项目
pnpm -r --filter "project-*" dev  # 启动所有项目
```

---

## 🐛 常见问题

### Q: pnpm install 失败？
**A**: 尝试以下步骤：
```bash
# 清理 pnpm 缓存
pnpm store prune

# 删除所有 node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# 重新安装
pnpm install
```

### Q: 项目找不到共享配置？
**A**: 确保以下几点：
1. `pnpm-workspace.yaml` 配置正确
2. 项目的 `package.json` 中包含 `"shared-config": "workspace:*"`
3. 运行了 `pnpm install`

### Q: 如何切换回旧结构？
**A**: 旧结构的文件已经被删除，建议使用新的 Monorepo 结构。如果确实需要，可以从 git 历史中恢复。

---

## 📚 相关文档

- **[README.md](../README.md)** - 项目总览
- **[快速开始](./快速开始.md)** - 基础使用指南
- **[pnpm Workspace](https://pnpm.io/workspaces)** - pnpm 官方文档

---

## 🎉 迁移完成

迁移完成后，你将获得：

- ✅ 更好的项目隔离
- ✅ 统一的依赖管理
- ✅ 代码共享能力
- ✅ 独立的项目配置
- ✅ 更快的安装速度

---

**迁移日期**: 2026-05-03
**架构版本**: 2.0.0 (Monorepo)
**包管理器**: pnpm
