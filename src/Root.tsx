import { Composition } from "remotion";
import { RemotionGuide, remotionGuideSchema } from "./projects/RemotionGuide";
import { getActiveProjects } from "./lib/projectManager";

export const RemotionRoot = () => {
  const activeProjects = getActiveProjects();

  return (
    <>
      {/* Remotion 技能指南项目 */}
      <Composition
        id="RemotionGuide"
        component={RemotionGuide}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
        schema={remotionGuideSchema}
        defaultProps={{
          title: "Remotion Skills",
          subtitle: "用 React 把自然语言变成可参数化视频",
          theme: "code-video",
          features: [
            "React 组件化分镜",
            "inputProps 参数化生成",
            "Studio 预览与云端渲染",
          ],
        }}
      />

      {/* 动态加载其他活跃项目 */}
      {activeProjects
        .filter(p => p.id !== "remotion-guide")
        .map(project => (
          <Composition
            key={project.id}
            id={project.id}
            // component={getProjectComponent(project.id)}
            component={RemotionGuide} // 临时使用，实际应根据项目 ID 加载对应组件
            durationInFrames={project.config.durationInFrames}
            fps={project.config.fps}
            width={project.config.width}
            height={project.config.height}
            defaultProps={project.defaultProps}
          />
        ))}
    </>
  );
};
