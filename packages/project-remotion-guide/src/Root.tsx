import { Composition } from "remotion";
import { RemotionGuide, remotionGuideSchema } from "./index.tsx";

export const RemotionRoot = () => {
  return (
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
  );
};