#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 读取项目配置
const projectsPath = path.join(__dirname, '../projects/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// 获取活跃项目
const activeProjects = projectsData.projects.filter(p => p.status === 'active');

console.log(`🎬 开始批量渲染 ${activeProjects.length} 个项目...\n`);

// 创建输出目录
const outputDir = path.join(__dirname, '../output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 渲染每个项目
activeProjects.forEach((project, index) => {
  console.log(`[${index + 1}/${activeProjects.length}] 渲染项目: ${project.name}`);
  console.log(`   项目ID: ${project.id}`);
  console.log(`   时长: ${project.config.durationInFrames}帧 (${(project.config.durationInFrames / project.config.fps).toFixed(1)}秒)`);
  console.log(`   分辨率: ${project.config.width}x${project.config.height}`);

  try {
    const outputFile = path.join(outputDir, `${project.id}.mp4`);

    // 构建渲染命令
    const renderCommand = `npx remotion render ${project.id} "${outputFile}" --width=${project.config.width} --height=${project.config.height}`;

    console.log(`   输出文件: ${outputFile}`);
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

console.log('🎉 所有项目渲染完成!');
console.log(`📁 输出目录: ${outputDir}`);
