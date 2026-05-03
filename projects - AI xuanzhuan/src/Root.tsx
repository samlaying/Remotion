import {CalculateMetadataFunction, Composition} from 'remotion';
import {AICloudCards, AICloudCardsProps, aiCloudCardsSchema} from './AICloudCards';

const calculateAICloudCardsMetadata: CalculateMetadataFunction<AICloudCardsProps> = async () => {
  return {
    defaultCodec: 'vp9',
    defaultVideoImageFormat: 'png',
    defaultPixelFormat: 'yuva420p',
  };
};

export const RemotionRoot = () => {
  return (
    <Composition
      id="AICloudCards"
      component={AICloudCards}
      durationInFrames={120}
      fps={30}
      width={2048}
      height={2048}
      schema={aiCloudCardsSchema}
      defaultProps={{
        cardCount: 30,
        orbitSpeed: 1,
        containerScale: 0.78,
        depthStrength: 1,
        cardOpacity: 0.74,
        glowIntensity: 0.72,
        showToolNames: true,
      }}
      calculateMetadata={calculateAICloudCardsMetadata}
    />
  );
};
