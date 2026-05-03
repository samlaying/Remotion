#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const projectsPath = path.join(__dirname, '../projects/projects.json');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 读取项目数据
function loadProjects() {
  if (!fs.existsSync(projectsPath)) {
    return {
      version: "1.0.0",
      projects: [],
      templates: [
        {
          id: "basic-video",
          name: "基础视频模板",
          description: "简单的基础视频项目模板",
          config: {
            durationInFrames: 300,
            fps: 30,
            width: 1920,
            height: 1080
          }
        }
      ]
    };
  }
  return JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
}

// 保存项目数据
function saveProjects(data) {
  fs.writeFileSync(projectsPath, JSON.stringify(data, null, 2));
}

// 列出所有项目
function listProjects() {
  const data = loadProjects();
  console.log('\n📋 所有项目列表:');
  console.log('━'.repeat(60));

  if (data.projects.length === 0) {
    console.log('暂无项目');
  } else {
    data.projects.forEach((project, index) => {
      const statusIcon = project.status === 'active' ? '✅' : project.status === 'draft' ? '📝' : '📦';
      console.log(`${index + 1}. ${statusIcon} ${project.name}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   描述: ${project.description}`);
      console.log(`   分类: ${project.category}`);
      console.log(`   时长: ${project.config.durationInFrames}帧 (${(project.config.durationInFrames / project.config.fps).toFixed(1)}秒)`);
      console.log(`   分辨率: ${project.config.width}x${project.config.height}`);
      console.log(`   创建时间: ${project.createdAt}`);
      console.log('   ' + '━'.repeat(56));
    });
  }
  console.log(`\n总计: ${data.projects.length} 个项目\n`);
}

// 创建新项目
function createProject() {
  rl.question('项目名称: ', (name) => {
    rl.question('项目描述: ', (description) => {
      rl.question('项目分类 (tutorial/demo/promo/social): ', (category) => {
        rl.question('使用模板? (y/n): ', (useTemplate) => {
          const data = loadProjects();

          let config = {
            durationInFrames: 300,
            fps: 30,
            width: 1920,
            height: 1080
          };

          if (useTemplate.toLowerCase() === 'y' && data.templates.length > 0) {
            console.log('\n可用模板:');
            data.templates.forEach((template, index) => {
              console.log(`${index + 1}. ${template.name} - ${template.description}`);
            });

            rl.question('选择模板编号: ', (templateIndex) => {
              const template = data.templates[parseInt(templateIndex) - 1];
              if (template) {
                config = { ...template.config };
                createProjectWithData(name, description, category, config);
              } else {
                console.log('无效的模板选择，使用默认配置');
                createProjectWithData(name, description, category, config);
              }
            });
          } else {
            rl.question('时长(秒): ', (duration) => {
              rl.question('宽度: ', (width) => {
                rl.question('高度: ', (height) => {
                  config.durationInFrames = parseInt(duration) * 30;
                  config.width = parseInt(width) || 1920;
                  config.height = parseInt(height) || 1080;
                  createProjectWithData(name, description, category, config);
                });
              });
            });
          }
        });
      });
    });
  });
}

function createProjectWithData(name, description, category, config) {
  const data = loadProjects();

  const newProject = {
    id: `project-${Date.now()}`,
    name: name,
    description: description,
    category: category || 'demo',
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    config: config,
    schema: {},
    defaultProps: {}
  };

  data.projects.push(newProject);
  saveProjects(data);

  console.log(`\n✅ 项目 "${name}" 创建成功!`);
  console.log(`   项目ID: ${newProject.id}`);
  console.log(`   下一步: 在 src/projects/${newProject.id}/ 中创建项目组件\n`);

  rl.close();
}

// 删除项目
function deleteProject() {
  const data = loadProjects();
  const activeProjects = data.projects.filter(p => p.status === 'active');

  if (activeProjects.length === 0) {
    console.log('没有可删除的项目\n');
    rl.close();
    return;
  }

  console.log('\n活跃项目列表:');
  activeProjects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.name} (ID: ${project.id})`);
  });

  rl.question('\n选择要删除的项目编号: ', (index) => {
    const projectToDelete = activeProjects[parseInt(index) - 1];

    if (projectToDelete) {
      rl.question(`确认删除 "${projectToDelete.name}"? (y/n): `, (confirm) => {
        if (confirm.toLowerCase() === 'y') {
          const projectIndex = data.projects.findIndex(p => p.id === projectToDelete.id);
          if (projectIndex !== -1) {
            data.projects.splice(projectIndex, 1);
            saveProjects(data);
            console.log(`✅ 项目 "${projectToDelete.name}" 已删除\n`);
          }
        } else {
          console.log('取消删除\n');
        }
        rl.close();
      });
    } else {
      console.log('无效的选择\n');
      rl.close();
    }
  });
}

// 主菜单
function showMenu() {
  console.log('\n🎬 Remotion 项目管理器');
  console.log('━'.repeat(30));
  console.log('1. 列出所有项目');
  console.log('2. 创建新项目');
  console.log('3. 删除项目');
  console.log('4. 退出');
  console.log('━'.repeat(30));

  rl.question('请选择操作 (1-4): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        listProjects();
        showMenu();
        break;
      case '2':
        createProject();
        break;
      case '3':
        deleteProject();
        showMenu();
        break;
      case '4':
        console.log('再见! 👋\n');
        rl.close();
        break;
      default:
        console.log('无效选择，请重试\n');
        showMenu();
        break;
    }
  });
}

// 启动程序
if (process.argv.length > 2) {
  const command = process.argv[2];
  switch (command) {
    case 'list':
      listProjects();
      process.exit(0);
      break;
    case 'create':
      createProject();
      break;
    case 'delete':
      deleteProject();
      process.exit(0);
      break;
    default:
      console.log('用法: node project-manager.js [list|create|delete]');
      process.exit(1);
  }
} else {
  showMenu();
}
