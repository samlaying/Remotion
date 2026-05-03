import { Composition } from "remotion";
import { SignalCraft } from "./SignalCraft";

export const RemotionRoot = () => {
  return (
    <Composition
      id="SignalCraft"
      component={SignalCraft}
      durationInFrames={13050}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
