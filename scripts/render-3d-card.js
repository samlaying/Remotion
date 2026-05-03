#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 定义所有要渲染的配置
const renders = [
  {
    name: 'BasicRotationTransparent',
    output: 'output/basic-rotation-transparent.mp4',
    description: '基础旋转 - 透明背景'
  },
  {
    name: 'DualAxisDarkBg',
    output: 'output/dual-axis-dark-bg.mp4',
    description: '双轴旋转 - 黑色背景'
  },
  {
    name: 'FastRotationGradient',
    output: 'output/fast-rotation-gradient.mp4',
    description: '快速旋转 - 渐变背景'
  },
  {
    name: 'GentleSwayClean',
    output: 'output/gentle-sway-clean.mp4',
    description: '轻微摆动 - 透明背景'
  },
  {
    name: 'StrongEffectsDark',
    output: 'output/strong-effects-dark.mp4',
    description: '强烈光效 - 深色背景'
  },
  {
    name: 'SlowShowcaseTransparent',
    output: 'output/slow-showcase-transparent.mp4',
    description: '慢速展示 - 透明背景'
  }
];

console.log('🎬 开始批量渲染3D卡片动画...\n');

// 创建输出目录
const outputDir = path.join(__dirname, '../packages/project-3d-card/output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 渲染每个配置
renders.forEach((render, index) => {
  console.log(`[${index + 1}/${renders.length}] 渲染: ${render.description}`);
  console.log(`   Composition: ${render.name}`);
  console.log(`   输出文件: ${render.output}`);

  try {
    const projectDir = path.join(__dirname, '../packages/project-3d-card');
    const outputFile = path.join(projectDir, render.output);

    // 构建渲染命令
    const renderCommand = `cd "${projectDir}" && npx remotion render ${render.name} "${outputFile}"`;

    console.log(`   开始渲染...`);

    // 执行渲染
    execSync(renderCommand, {
      stdio: 'inherit',
      timeout: 300000 // 5分钟超时
    });

    console.log(`   ✅ 渲染完成!\n`);

  } catch (error) {
    console.error(`   ❌ 渲染失败: ${error.message}\n`);
  }
});

console.log('🎉 所有3D卡片动画渲染完成!');
console.log(`📁 输出目录: ${outputDir}`);