import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import "./styles.css";

export const remotionGuideSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  theme: z.string(),
  features: z.array(z.string()).length(3),
});

export type RemotionGuideProps = z.infer<typeof remotionGuideSchema>;

const palette = {
  ink: "#10131a",
  paper: "#f7f8fb",
  cyan: "#16bfd0",
  lime: "#b8e35a",
  coral: "#ff6b5f",
  violet: "#6f5cff",
};

const fit = (value: number, input: [number, number], output: [number, number]) =>
  interpolate(value, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const SceneShell = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const frame = useCurrentFrame();
  const scan = fit(frame % 120, [0, 120], [-18, 108]);

  return (
    <AbsoluteFill className="scene">
      <div className="grid" />
      <div className="scanline" style={{ top: `${scan}%` }} />
      <div className="topbar">
        <span>{label}</span>
        <span>30 FPS / 1920x1080</span>
      </div>
      {children}
    </AbsoluteFill>
  );
};

const Hero = ({ title, subtitle }: Pick<RemotionGuideProps, "title" | "subtitle">) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const cursor = Math.floor(frame / 10) % 2 === 0 ? 1 : 0;

  return (
    <SceneShell label="Concept">
      <div className="heroLayout">
        <div>
          <div className="eyebrow">VIDEO = REACT OVER TIME</div>
          <h1
            className="heroTitle"
            style={{
              opacity: fit(frame, [0, 24], [0, 1]),
              transform: `translateY(${fit(frame, [0, 32], [48, 0])}px) scale(${0.92 + pop * 0.08})`,
            }}
          >
            {title}
            <span style={{ opacity: cursor }} className="cursor">
              _
            </span>
          </h1>
          <p
            className="heroSubtitle"
            style={{
              opacity: fit(frame, [20, 48], [0, 1]),
              transform: `translateY(${fit(frame, [20, 48], [32, 0])}px)`,
            }}
          >
            {subtitle}
          </p>
        </div>
        <div className="codeWindow" style={{ opacity: fit(frame, [30, 62], [0, 1]) }}>
          <div className="windowDots">
            <i />
            <i />
            <i />
          </div>
          <pre>
            <code>{`<Composition
  id="MyVideo"
  fps={30}
  durationInFrames={150}
/>

const frame = useCurrentFrame();`}</code>
          </pre>
        </div>
      </div>
    </SceneShell>
  );
};

const TimelineScene = () => {
  const frame = useCurrentFrame();
  const playhead = fit(frame, [0, 86], [0, 100]);
  const items = [
    ["Scene 1", palette.cyan, 0, 34],
    ["Scene 2", palette.lime, 31, 68],
    ["Scene 3", palette.coral, 65, 100],
  ] as const;

  return (
    <SceneShell label="Composition / Sequence">
      <div className="timelineScene">
        <h2>把视频拆成可维护的时间轴片段</h2>
        <div className="timeline">
          <div className="playhead" style={{ left: `${playhead}%` }} />
          {items.map(([name, color, left, right], index) => (
            <div
              key={name}
              className="clip"
              style={{
                left: `${left}%`,
                width: `${right - left}%`,
                background: color,
                opacity: fit(frame, [index * 12, index * 12 + 18], [0, 1]),
                transform: `translateY(${fit(frame, [index * 12, index * 12 + 18], [28, 0])}px)`,
              }}
            >
              <strong>{name}</strong>
              <span>{index === 0 ? "Hero" : index === 1 ? "Features" : "Render"}</span>
            </div>
          ))}
        </div>
        <div className="sequenceCode">
          <span>&lt;Sequence from=&#123;0&#125; durationInFrames=&#123;90&#125;&gt;</span>
          <span>&lt;Scene /&gt;</span>
          <span>&lt;/Sequence&gt;</span>
        </div>
      </div>
    </SceneShell>
  );
};

const FeatureScene = ({ features }: Pick<RemotionGuideProps, "features">) => {
  const frame = useCurrentFrame();
  const icons = ["{}", "↔", "▶"];

  return (
    <SceneShell label="Skills Workflow">
      <div className="featureScene">
        <h2>从自然语言到可渲染视频</h2>
        <div className="featureGrid">
          {features.map((feature, index) => {
            const local = frame - index * 16;
            return (
              <div
                key={feature}
                className="featureCard"
                style={{
                  opacity: fit(local, [0, 20], [0, 1]),
                  transform: `translateY(${fit(local, [0, 20], [46, 0])}px)`,
                }}
              >
                <div className="featureIcon">{icons[index]}</div>
                <p>{feature}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};

const PipelineScene = () => {
  const frame = useCurrentFrame();
  const steps = ["Prompt", "Storyboard", "React", "Render", "MP4"];

  return (
    <SceneShell label="AI Pipeline">
      <div className="pipelineScene">
        <h2>AI Agent 的典型执行链路</h2>
        <div className="pipeline">
          {steps.map((step, index) => {
            const local = frame - index * 12;
            return (
              <div
                key={step}
                className="pipeStep"
                style={{
                  opacity: fit(local, [0, 14], [0, 1]),
                  transform: `scale(${fit(local, [0, 18], [0.88, 1])})`,
                }}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};

const Closing = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell label="Summary">
      <div className="closing">
        <div
          className="orbital"
          style={{ transform: `rotate(${frame * 1.8}deg)` }}
        >
          <span />
          <span />
          <span />
        </div>
        <h2 style={{ opacity: fit(frame, [0, 24], [0, 1]) }}>
          Remotion = 用 React 写视频
        </h2>
        <p style={{ opacity: fit(frame, [18, 42], [0, 1]) }}>
          代码即时间轴，参数即批量生产能力。
        </p>
      </div>
    </SceneShell>
  );
};

export const RemotionGuide = ({ title, subtitle, features }: RemotionGuideProps) => {
  return (
    <AbsoluteFill style={{ background: palette.paper, color: palette.ink }}>
      <Sequence from={0} durationInFrames={90}>
        <Hero title={title} subtitle={subtitle} />
      </Sequence>
      <Sequence from={90} durationInFrames={75}>
        <TimelineScene />
      </Sequence>
      <Sequence from={165} durationInFrames={75}>
        <FeatureScene features={features} />
      </Sequence>
      <Sequence from={240} durationInFrames={70}>
        <PipelineScene />
      </Sequence>
      <Sequence from={310} durationInFrames={50}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
