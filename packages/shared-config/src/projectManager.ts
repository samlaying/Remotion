import { Project, ProjectsData, Template } from "../types/project";

// 从 JSON 加载项目数据
export const loadProjectsData = (): ProjectsData => {
  // 在实际应用中，这里应该从文件系统或 API 加载
  // 目前返回硬编码的数据
  return {
    version: "1.0.0",
    projects: [
      {
        id: "remotion-guide",
        name: "Remotion 技能指南",
        description: "介绍 Remotion 的核心概念和工作流程",
        category: "tutorial",
        status: "active",
        createdAt: "2026-05-02",
        updatedAt: "2026-05-03",
        config: {
          durationInFrames: 360,
          fps: 30,
          width: 1920,
          height: 1080,
        },
        schema: {
          title: "string",
          subtitle: "string",
          theme: "string",
          features: "array<string, length: 3>",
        },
        defaultProps: {
          title: "Remotion Skills",
          subtitle: "用 React 把自然语言变成可参数化视频",
          theme: "code-video",
          features: [
            "React 组件化分镜",
            "inputProps 参数化生成",
            "Studio 预览与云端渲染",
          ],
        },
      },
    ],
    templates: [
      {
        id: "basic-video",
        name: "基础视频模板",
        description: "简单的基础视频项目模板",
        config: {
          durationInFrames: 300,
          fps: 30,
          width: 1920,
          height: 1080,
        },
      },
      {
        id: "tutorial-series",
        name: "教程系列模板",
        description: "适合制作教程类视频",
        config: {
          durationInFrames: 600,
          fps: 30,
          width: 1920,
          height: 1080,
        },
      },
    ],
  };
};

// 获取所有项目
export const getAllProjects = (): Project[] => {
  const data = loadProjectsData();
  return data.projects;
};

// 获取活跃项目
export const getActiveProjects = (): Project[] => {
  const projects = getAllProjects();
  return projects.filter((p) => p.status === "active");
};

// 根据 ID 获取项目
export const getProjectById = (id: string): Project | undefined => {
  const projects = getAllProjects();
  return projects.find((p) => p.id === id);
};

// 获取所有模板
export const getAllTemplates = (): Template[] => {
  const data = loadProjectsData();
  return data.templates;
};

// 创建新项目
export const createProject = (
  projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
): Project => {
  const newProject: Project = {
    ...projectData,
    id: `project-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };
  return newProject;
};

// 更新项目
export const updateProject = (
  id: string,
  updates: Partial<Project>
): Project | null => {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) return null;

  const updatedProject: Project = {
    ...projects[index],
    ...updates,
    id, // 确保 ID 不被覆盖
    updatedAt: new Date().toISOString().split("T")[0],
  };

  return updatedProject;
};

// 删除项目
export const deleteProject = (id: string): boolean => {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  return index !== -1;
};

// 从模板创建项目
export const createProjectFromTemplate = (
  templateId: string,
  projectInfo: { name: string; description: string; category: string }
): Project | null => {
  const templates = getAllTemplates();
  const template = templates.find((t) => t.id === templateId);

  if (!template) return null;

  return createProject({
    name: projectInfo.name,
    description: projectInfo.description,
    category: projectInfo.category,
    status: "draft",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    config: template.config,
    schema: {},
    defaultProps: {},
  });
};
