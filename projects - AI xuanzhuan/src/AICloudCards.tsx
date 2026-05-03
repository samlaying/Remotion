import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

export const aiCloudCardsSchema = z.object({
  cardCount: z.number().min(16).max(48).step(1),
  orbitSpeed: z.number().min(0.25).max(2).step(0.05),
  containerScale: z.number().min(0.7).max(0.96).step(0.01),
  depthStrength: z.number().min(0.4).max(1.45).step(0.05),
  cardOpacity: z.number().min(0.42).max(0.92).step(0.02),
  glowIntensity: z.number().min(0).max(1).step(0.05),
  showToolNames: z.boolean(),
});

export type AICloudCardsProps = z.infer<typeof aiCloudCardsSchema>;

const tools = [
  {name: 'ChatGPT', file: 'logos/chatgpt.svg', color: '#10a37f'},
  {name: 'Claude', file: 'logos/claude.svg', color: '#d97757'},
  {name: 'Gemini', file: 'logos/gemini.svg', color: '#4f7df3'},
  {name: 'Midjourney', file: 'logos/midjourney.svg', color: '#252a36'},
  {name: 'Runway', file: 'logos/runway.svg', color: '#111827'},
  {name: 'Perplexity', file: 'logos/perplexity.svg', color: '#1aa6a6'},
  {name: 'Copilot', file: 'logos/copilot.svg', color: '#5d5fef'},
  {name: 'Firefly', file: 'logos/firefly.svg', color: '#f59e0b'},
  {name: 'Sora', file: 'logos/sora.svg', color: '#0ea5e9'},
  {name: 'ElevenLabs', file: 'logos/elevenlabs.svg', color: '#171717'},
  {name: 'Notion AI', file: 'logos/notion-ai.svg', color: '#222222'},
  {name: 'Canva AI', file: 'logos/canva-ai.svg', color: '#8b5cf6'},
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const Card: React.FC<{
  index: number;
  total: number;
  frame: number;
  progress: number;
  props: AICloudCardsProps;
}> = ({index, total, frame, progress, props}) => {
  const tool = tools[index % tools.length];
  const phase = (index / total) * Math.PI * 2;
  const turnOffset = (index % 4) * 0.34;
  const angle = phase * 2.15 + progress * Math.PI * 2 * props.orbitSpeed + turnOffset;
  const layer = (Math.sin(angle + index * 0.6) + 1) / 2;
  const spiral = index / Math.max(total - 1, 1);
  const breathing = Math.sin(progress * Math.PI * 2 + index * 0.47);
  const radius = (340 + spiral * 610 + breathing * 28) * props.containerScale;
  const yLift = Math.cos(angle * 1.18 + index * 0.31) * 280 * props.containerScale;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.42 + yLift * 0.34;
  const z = (layer - 0.5) * 820 * props.depthStrength;
  const scale = clamp(0.56 + layer * 0.66 + Math.sin(index * 1.7) * 0.04, 0.5, 1.24);
  const depthOpacity = interpolate(layer, [0, 1], [0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cardW = 220 + (index % 3) * 34;
  const cardH = 124 + (index % 2) * 22;
  const glint = interpolate((frame + index * 7) % 90, [0, 28, 90], [0, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: cardW,
        height: cardH,
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${(layer - 0.5) * -28}deg) rotateX(${Math.sin(angle) * 12}deg) rotateZ(${Math.sin(angle * 0.7) * 6}deg) scale(${scale})`,
        opacity: props.cardOpacity * depthOpacity,
        borderRadius: 32,
        background: `linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.54)), radial-gradient(circle at 20% 16%, ${tool.color}22, transparent 48%)`,
        border: '1px solid rgba(148, 163, 184, 0.28)',
        boxShadow: `0 ${16 + layer * 18}px ${32 + layer * 34}px rgba(15, 23, 42, ${0.07 + layer * 0.08}), inset 0 1px 0 rgba(255,255,255,0.95)`,
        overflow: 'hidden',
        zIndex: Math.round(layer * 1000),
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${108 + index * 9}deg, transparent 20%, rgba(255,255,255,${0.26 * glint}) 48%, transparent 72%)`,
        }}
      />
      <Img
        src={staticFile(tool.file)}
        style={{
          position: 'absolute',
          left: 28,
          top: '50%',
          width: 68,
          height: 68,
          transform: 'translateY(-50%)',
        }}
      />
      {props.showToolNames ? (
        <div
          style={{
            position: 'absolute',
            left: 112,
            right: 22,
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: 24,
            fontWeight: 700,
            color: 'rgba(15,23,42,0.72)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {tool.name}
        </div>
      ) : null}
    </div>
  );
};

export const AICloudCards: React.FC<AICloudCardsProps> = (props) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = frame / durationInFrames;
  const intro = interpolate(frame, [0, 38], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = Math.sin(progress * Math.PI * 2);
  const cards = Array.from({length: props.cardCount});

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 1660 * props.containerScale,
          height: 1660 * props.containerScale,
          borderRadius: 120,
          opacity: intro,
          transform: `translateY(-40px) scale(${0.92 + intro * 0.08}) rotateX(34deg) rotateZ(0deg)`,
          transformStyle: 'preserve-3d',
          perspective: 1800,
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.7)), radial-gradient(circle at 50% 50%, rgba(14,165,233,0.12), transparent 46%)',
          border: '1px solid rgba(203,213,225,0.55)',
          boxShadow: `0 52px 110px rgba(15,23,42,0.12), inset 0 0 0 2px rgba(255,255,255,0.72), inset 0 -40px 78px rgba(14,165,233,${0.05 * props.glowIntensity})`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 92,
            borderRadius: 96,
            border: '1px solid rgba(148,163,184,0.18)',
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            transform: `translateZ(${-220 * props.depthStrength}px)`,
          }}
        />
        {[0, 1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 420 + ring * 260,
              height: 420 + ring * 260,
              borderRadius: '50%',
              border: `2px solid rgba(${ring % 2 ? '99,102,241' : '14,165,233'},${(0.11 - ring * 0.016) * props.glowIntensity})`,
              transform: `translate(-50%, -50%) translateZ(${(-80 + ring * 44) * props.depthStrength}px) rotateZ(${frame * (0.08 + ring * 0.025)}deg)`,
              boxShadow: `0 0 ${28 + ring * 14}px rgba(14,165,233,${0.08 * props.glowIntensity})`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 430,
            height: 430,
            borderRadius: '50%',
            transform: `translate(-50%, -50%) translateZ(${220 * props.depthStrength}px)`,
            background:
              'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.95), rgba(125,211,252,0.4) 35%, rgba(99,102,241,0.18) 62%, rgba(255,255,255,0.18) 100%)',
            boxShadow: `0 28px 80px rgba(14,165,233,${0.22 * props.glowIntensity}), inset 0 2px 8px rgba(255,255,255,0.9)`,
            border: '1px solid rgba(255,255,255,0.72)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map((_, index) => (
            <Card key={index} index={index} total={props.cardCount} frame={frame} progress={progress} props={props} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
