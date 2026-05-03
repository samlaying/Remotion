# Remotion 项目管理系统

## 🎯 项目简介

这是一个基于 Remotion 的视频项目管理系统，旨在提供：
- 📦 **多项目管理**：统一管理多个视频项目
- 🎨 **模板系统**：快速启动新项目
- 🔧 **配置化管理**：集中管理项目配置
- 🚀 **高效渲染**：批量渲染和导出

---

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 访问 Studio
打开浏览器访问：http://localhost:3000

---

## 📁 项目结构

```
F:\Remotion\
├── src/                        # 源代码目录
│   ├── index.ts                # 入口文件
│   ├── Root.tsx                # 项目管理根组件
│   ├── types/                  # 类型定义
│   │   └── project.ts          # 项目类型定义
│   ├── lib/                    # 工具库
│   │   └── projectManager.ts   # 项目管理器
│   ├── projects/               # 各个项目的实现
│   │   └── RemotionGuide/      # Remotion 技能指南项目
│   └── styles.css              # 样式文件
├── projects/                   # 项目数据存储
│   └── projects.json           # 项目配置文件
├── project-management/         # 项目管理文档
│   ├── README.md              # 本文件
│   ├── 使用指南.md            # 详细使用说明
│   ├── 项目模板.md            # 模板库文档
│   └── 架构说明.md            # 架构设计文档
├── remotion.config.ts         # Remotion 配置
└── package.json               # 项目依赖
```

---

## 📚 文档导航

### 核心文档
- **[使用指南](./使用指南.md)** - 详细的使用说明和 API 文档
- **[项目模板](./项目模板.md)** - 可用模板和自定义模板指南
- **[架构说明](./架构说明.md)** - 系统架构和设计原理

### 快速链接
- [Remotion 官方文档](https://www.remotion.dev/)
- [React 文档](https://react.dev/)
- [Zod 验证库](https://zod.dev/)

---

## 🎮 核心功能

### 1. 项目管理
- ✅ 创建新项目
- ✅ 编辑现有项目
- ✅ 删除项目
- ✅ 项目状态管理（active/draft/archived）

### 2. 模板系统
- ✅ 预设模板库
- ✅ 自定义模板创建
- ✅ 从模板快速启动项目

### 3. 类型安全
- ✅ Zod Schema 验证
- ✅ TypeScript 类型推断
- ✅ 运行时类型检查

### 4. 开发工具
- ✅ 热更新预览
- ✅ 实时编辑
- ✅ 参数化测试

---

## 🔧 可用命令

### 开发命令
```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck
```

### 渲染命令
```bash
# 渲染 RemotionGuide 项目（全分辨率）
npm run render

# 渲染预览版本（1280x720）
npm run preview

# 渲染自定义项目
npx remotion render <ProjectId> output/<filename>.mp4
```

### 项目管理命令
```bash
# 查看所有项目
npx remotion compositions

# 查看项目参数
npx remotion props <ProjectId>

# 验证项目配置
npx remotion validate
```

---

## 🎯 当前项目列表

### 活跃项目
1. **RemotionGuide** - Remotion 技能指南
   - 类型：教程视频
   - 时长：12秒 (360帧)
   - 分辨率：1920x1080
   - 状态：Active

### 可用模板
1. **basic-video** - 基础视频模板
2. **tutorial-series** - 教程系列模板

---

## 📝 创建新项目

### 方法一：快速模板
```bash
# 使用基础模板创建新项目
# 1. 复制模板配置
# 2. 在 projects.json 中添加新项目
# 3. 创建项目组件
# 4. 在 Root.tsx 中注册
```

### 方法二：自定义创建
```typescript
import { createProject } from "./src/lib/projectManager";

const newProject = createProject({
  name: "My Project",
  description: "Project description",
  category: "demo",
  status: "active",
  config: {
    durationInFrames: 300,
    fps: 30,
    width: 1920,
    height: 1080,
  },
  schema: {},
  defaultProps: {},
});
```

---

## 🎨 自定义样式

项目使用统一的样式系统，可以在 `src/styles.css` 中修改：

```css
/* 调色板 */
:root {
  --ink: #10131a;
  --paper: #f7f8fb;
  --cyan: #16bfd0;
  --lime: #b8e35a;
  --coral: #ff6b5f;
  --violet: #6f5cff;
}

/* 全局样式 */
.scene {
  /* 场景容器样式 */
}
```

---

## 🔍 调试与开发

### 开发模式
```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开
# http://localhost:3000
```

### 类型检查
```bash
# 运行 TypeScript 类型检查
npm run typecheck
```

### 调试技巧
1. 使用 `console.log` 在组件中调试
2. 检查 Studio 的错误提示
3. 验证 Props Schema 是否正确
4. 确认项目配置参数

---

## ⚠️ 常见问题

### Q: 项目没有在 Studio 中显示？
**A**: 检查以下几点：
1. 项目的 `status` 是否为 `"active"`
2. 是否在 `Root.tsx` 中正确注册
3. 项目配置是否正确

### Q: 修改后没有生效？
**A**: 尝试以下操作：
1. 重启开发服务器
2. 清除浏览器缓存
3. 检查文件保存状态

### Q: 渲染失败怎么办？
**A**: 检查：
1. 项目配置参数是否正确
2. 组件是否正确导出
3. Schema 验证是否通过

---

## 🚀 性能优化建议

### 开发阶段
- 使用较小的分辨率进行预览
- 减少不必要的重渲染
- 优化动画复杂度

### 生产渲染
- 使用合适的帧率（30fps 通常足够）
- 压缩输出文件大小
- 批量渲染时使用脚本

---

## 📞 获取帮助

### 文档资源
- [Remotion 官方文档](https://www.remotion.dev/)
- [项目使用指南](./使用指南.md)
- [架构说明](./架构说明.md)

### 社区支持
- [Remotion Discord](https://discord.gg/6VdNDuwuUH)
- [GitHub Issues](https://github.com/remotion-dev/remotion/issues)

---

## 📄 许可证

本项目基于 MIT 许可证开源。

---

## 🎉 致谢

感谢 Remotion 团队提供优秀的视频生成框架！

---

**最后更新**: 2026-05-03  
**版本**: 1.0.0  
**维护者**: Claude Code Project Manager
