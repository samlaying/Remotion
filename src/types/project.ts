import { z } from "zod";

// 项目 Schema 定义
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.enum(["active", "draft", "archived"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  config: z.object({
    durationInFrames: z.number(),
    fps: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  schema: z.record(z.string()),
  defaultProps: z.any(),
});

export type Project = z.infer<typeof projectSchema>;

// 项目模板 Schema
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  config: z.object({
    durationInFrames: z.number(),
    fps: z.number(),
    width: z.number(),
    height: z.number(),
  }),
});

export type Template = z.infer<typeof templateSchema>;

// 项目列表数据结构
export const projectsDataSchema = z.object({
  version: z.string(),
  projects: z.array(projectSchema),
  templates: z.array(templateSchema),
});

export type ProjectsData = z.infer<typeof projectsDataSchema>;
