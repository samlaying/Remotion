import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "./styles.css";

type SceneType =
  | "hero"
  | "list"
  | "split"
  | "profile"
  | "point"
  | "progress"
  | "framework"
  | "road"
  | "tags"
  | "quadrants"
  | "loop"
  | "chat"
  | "flow"
  | "handoff"
  | "metrics"
  | "stack"
  | "compare"
  | "questions"
  | "boundary"
  | "cycle"
  | "formula"
  | "crossout"
  | "summary"
  | "final";

type Scene = {
  start: number;
  end: number;
  type: SceneType;
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  items?: string[];
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: string[];
  rightItems?: string[];
  tags?: string[];
};

const fps = 30;
const toFrame = (time: string) => {
  const [minute, second] = time.split(":").map(Number);
  return (minute * 60 + second) * fps;
};

const scenes: Scene[] = [
  {
    start: toFrame("0:00"),
    end: toFrame("0:05"),
    type: "hero",
    title: "AI 会写代码了",
    subtitle: "产品人还重要吗？",
    highlight: "产品人",
  },
  {
    start: toFrame("0:05"),
    end: toFrame("0:12"),
    type: "list",
    title: "真正变化的是稀缺性",
    items: ["代码变便宜", "判断变昂贵", "产品品味变稀缺"],
  },
  {
    start: toFrame("0:12"),
    end: toFrame("0:20"),
    type: "split",
    title: "这期播客回答了两个问题",
    leftTitle: "Lenny's Podcast",
    rightItems: ["AI 时代怎么做产品？", "AI 时代的公司长什么样？"],
  },
  {
    start: toFrame("0:20"),
    end: toFrame("0:30"),
    type: "profile",
    title: "Lenny x Cat Wu",
    subtitle: "Anthropic 产品负责人",
    tags: ["Anthropic", "Claude Code", "Cowork"],
  },
  {
    start: toFrame("0:30"),
    end: toFrame("0:40"),
    type: "point",
    eyebrow: "核心观点 1",
    title: "不要等模型完美",
    subtitle: "才开始做产品",
    highlight: "不要等模型完美",
  },
  {
    start: toFrame("0:40"),
    end: toFrame("0:55"),
    type: "progress",
    title: "常见误区",
    leftTitle: "模型还不够强",
    rightTitle: "所以产品先不做",
  },
  {
    start: toFrame("0:55"),
    end: toFrame("1:10"),
    type: "framework",
    title: "更好的做法",
    subtitle: "先搭产品框架，等模型能力补齐",
    items: ["场景", "交互", "反馈", "预期"],
  },
  {
    start: toFrame("1:10"),
    end: toFrame("1:25"),
    type: "road",
    title: "模型能力 = 车",
    subtitle: "产品框架 = 路",
    highlight: "不要等车变快，才开始修路",
  },
  {
    start: toFrame("1:25"),
    end: toFrame("1:35"),
    type: "tags",
    title: "AI 产品要先搭好",
    items: ["使用场景", "交互方式", "反馈机制", "用户预期"],
  },
  {
    start: toFrame("1:35"),
    end: toFrame("1:45"),
    type: "point",
    eyebrow: "核心观点 2",
    title: "Research Preview",
    subtitle: "不是包装词，而是产品策略",
    highlight: "Research Preview",
  },
  {
    start: toFrame("1:45"),
    end: toFrame("2:00"),
    type: "tags",
    title: "研究预览版意味着",
    items: ["早期", "实验性", "可能出错", "可能变化", "可能被砍"],
    highlight: "可能被砍",
  },
  {
    start: toFrame("2:00"),
    end: toFrame("2:15"),
    type: "quadrants",
    title: "它的好处",
    items: ["更快发布", "更早反馈", "更低承诺", "更轻压力"],
  },
  {
    start: toFrame("2:15"),
    end: toFrame("2:30"),
    type: "loop",
    title: "AI 产品不是憋出完美答案",
    subtitle: "而是在真实用户里快速试错",
  },
  {
    start: toFrame("2:30"),
    end: toFrame("2:40"),
    type: "point",
    eyebrow: "核心观点 3",
    title: "Launch Room",
    subtitle: "是一种新的协作方式",
    highlight: "Launch Room",
  },
  {
    start: toFrame("2:40"),
    end: toFrame("3:00"),
    type: "chat",
    title: "# launch-room",
    items: [
      "Engineer：功能做好了，丢到 Launch Room",
      "Docs：我来补文档",
      "Product：我来准备发布说明",
      "Team：明天发",
    ],
  },
  {
    start: toFrame("3:00"),
    end: toFrame("3:15"),
    type: "flow",
    title: "传统产品流程",
    items: ["调研", "PRD", "排期", "开发", "测试", "发布"],
  },
  {
    start: toFrame("3:15"),
    end: toFrame("3:30"),
    type: "flow",
    title: "AI 产品流程",
    items: ["想法", "Demo", "研究预览版", "用户反馈", "快速迭代"],
    highlight: "快速迭代",
  },
  {
    start: toFrame("3:30"),
    end: toFrame("3:40"),
    type: "handoff",
    title: "不是层层审批",
    subtitle: "而是快速接力",
  },
  {
    start: toFrame("3:40"),
    end: toFrame("3:50"),
    type: "point",
    eyebrow: "核心观点 4",
    title: "最重要的新技能",
    subtitle: "产品品味",
    highlight: "产品品味",
  },
  {
    start: toFrame("3:50"),
    end: toFrame("4:05"),
    type: "metrics",
    title: "为什么产品品味更重要",
    items: ["代码成本 ↓", "想法数量 ↑", "选择难度 ↑", "产品品味 ↑"],
  },
  {
    start: toFrame("4:05"),
    end: toFrame("4:20"),
    type: "stack",
    title: "AI 让你更容易做出",
    subtitle: "看起来能用，但其实不重要的东西",
  },
  {
    start: toFrame("4:20"),
    end: toFrame("4:40"),
    type: "compare",
    title: "产品品味不是审美词",
    leftTitle: "不是",
    leftItems: ["审美", "漂亮", "高级感"],
    rightTitle: "而是",
    rightItems: ["判断力", "取舍能力", "用户理解", "场景判断"],
  },
  {
    start: toFrame("4:40"),
    end: toFrame("5:00"),
    type: "questions",
    title: "产品品味要判断",
    items: ["做什么？", "为什么做？", "为谁做？", "做到什么程度？", "哪些不做？"],
    highlight: "判断力",
  },
  {
    start: toFrame("5:00"),
    end: toFrame("5:10"),
    type: "boundary",
    eyebrow: "核心观点 5",
    title: "产品经理和工程师",
    subtitle: "边界会越来越模糊",
  },
  {
    start: toFrame("5:10"),
    end: toFrame("5:25"),
    type: "flow",
    title: "过去",
    items: ["PM 写需求", "工程师实现", "用户反馈", "再传回来"],
  },
  {
    start: toFrame("5:25"),
    end: toFrame("5:45"),
    type: "cycle",
    title: "AI 时代",
    items: ["看见问题", "形成判断", "快速做出 Demo", "拿到反馈", "继续迭代"],
    highlight: "Product Engineer",
  },
  {
    start: toFrame("5:45"),
    end: toFrame("6:00"),
    type: "formula",
    title: "产品工程师 =",
    items: ["产品判断力", "AI 实现力", "用户反馈意识"],
  },
  {
    start: toFrame("6:00"),
    end: toFrame("6:15"),
    type: "crossout",
    title: "不是只会写 PRD，也不是只会写代码",
    items: ["只会写 PRD", "只会写代码"],
    highlight: "知道什么值得做，并且能快速做出来",
  },
  {
    start: toFrame("6:15"),
    end: toFrame("6:25"),
    type: "summary",
    title: "AI 时代怎么做产品？",
    subtitle: "不是只学工具，而是练判断力",
    highlight: "练判断力",
  },
  {
    start: toFrame("6:25"),
    end: toFrame("6:40"),
    type: "tags",
    title: "3 件事",
    items: ["1. 拆好产品", "2. 做小项目", "3. 接真实反馈"],
  },
  {
    start: toFrame("6:40"),
    end: toFrame("6:55"),
    type: "summary",
    title: "真正稀缺的不是会不会写代码",
    subtitle: "而是能不能判断：什么值得被做出来",
    highlight: "什么值得被做出来",
  },
  {
    start: toFrame("6:55"),
    end: toFrame("7:05"),
    type: "formula",
    title: "AI 时代产品人的新基本功",
    items: ["产品品味", "快速做出来的能力"],
    highlight: "产品工程能力",
  },
  {
    start: toFrame("7:05"),
    end: toFrame("7:15"),
    type: "final",
    title: "产品工程师修炼中",
    subtitle: "保持敬畏，继续做东西",
  },
];

const icons = ["</>", "⚖", "✦", "◎", "↗"];

const fit = (
  value: number,
  input: [number, number],
  output: [number, number],
  easing = Easing.out(Easing.cubic),
) =>
  interpolate(value, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

const splitHighlight = (text: string, highlight?: string) => {
  if (!highlight || !text.includes(highlight)) {
    return text;
  }

  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <mark>{highlight}</mark>
      {after}
    </>
  );
};

const Texture = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <div className="paperGrid" />
      <div className="paperNoise" style={{ opacity: 0.18 + (frame % 18) * 0.002 }} />
      <div className="cornerTag">Signal Craft / AI Product</div>
    </>
  );
};

const Shell = ({ scene, children }: { scene: Scene; children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const progress = fit(frame, [scene.start, scene.end], [0, 100], Easing.linear);
  return (
    <AbsoluteFill className="canvas">
      <Texture />
      <div className="timelineBar">
        <span style={{ width: `${progress}%` }} />
      </div>
      {children}
    </AbsoluteFill>
  );
};

const TitleBlock = ({
  scene,
  local,
  compact = false,
}: {
  scene: Scene;
  local: number;
  compact?: boolean;
}) => (
  <div className={compact ? "titleBlock compact" : "titleBlock"}>
    {scene.eyebrow ? <div className="eyebrow">{scene.eyebrow}</div> : null}
    <h1
      style={{
        opacity: fit(local, [0, 20], [0, 1]),
        transform: `translateY(${fit(local, [0, 24], [36, 0])}px)`,
      }}
    >
      {splitHighlight(scene.title, scene.highlight)}
    </h1>
    {scene.subtitle ? (
      <p
        style={{
          opacity: fit(local, [14, 34], [0, 1]),
          transform: `translateY(${fit(local, [14, 34], [24, 0])}px)`,
        }}
      >
        {splitHighlight(scene.subtitle, scene.highlight)}
      </p>
    ) : null}
  </div>
);

const HeroScene = ({ scene, local }: { scene: Scene; local: number }) => {
  const { fps: videoFps } = useVideoConfig();
  const pop = spring({ frame: local, fps: videoFps, config: { damping: 18, stiffness: 95 } });
  return (
    <div className="heroScene">
      <h1 style={{ transform: `scale(${0.94 + pop * 0.06})` }}>{scene.title}</h1>
      <h2>
        <mark>产品人</mark>还重要吗？
      </h2>
    </div>
  );
};

const ListScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="centerStack">
    <TitleBlock scene={scene} local={local} compact />
    <div className="largeList">
      {scene.items?.map((item, index) => {
        const itemFrame = local - index * 14;
        return (
          <div
            className="listRow"
            key={item}
            style={{
              opacity: fit(itemFrame, [0, 16], [0, 1]),
              transform: `translateX(${fit(itemFrame, [0, 18], [-42, 0])}px)`,
            }}
          >
            <span>{icons[index]}</span>
            <strong>{item}</strong>
          </div>
        );
      })}
    </div>
  </div>
);

const SplitScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="splitScene">
    <div className="podcastCard" style={{ opacity: fit(local, [8, 28], [0, 1]) }}>
      <div className="podcastTop">PODCAST NOTE</div>
      <h2>{scene.leftTitle}</h2>
      <p>Lenny x Cat Wu</p>
    </div>
    <div className="questionColumn">
      <TitleBlock scene={scene} local={local} compact />
      {scene.rightItems?.map((item, index) => (
        <div
          className="questionCard"
          key={item}
          style={{
            opacity: fit(local - index * 12, [20, 38], [0, 1]),
            transform: `translateY(${fit(local - index * 12, [20, 38], [28, 0])}px)`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

const ProfileScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="profileScene">
    <div className="avatar" style={{ transform: `rotate(${fit(local, [0, 80], [-8, 0])}deg)` }}>
      CW
    </div>
    <div className="profileCard">
      <TitleBlock scene={scene} local={local} compact />
      <div className="tagRow">
        {scene.tags?.map((tag, index) => (
          <span key={tag} style={{ opacity: fit(local - index * 8, [24, 40], [0, 1]) }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const PointScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="pointScene">
    <div className="loaderWrap">
      <div className="loader" />
      <div className="slash" style={{ transform: `scaleX(${fit(local, [34, 48], [0, 1])})` }} />
    </div>
    <TitleBlock scene={scene} local={local} />
    {scene.tags ? <div className="tagRow">{scene.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
  </div>
);

const ProgressScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="twoPanel">
    <div className="panel">
      <h2>{scene.leftTitle}</h2>
      <div className="meter">
        <span style={{ width: `${fit(local, [20, 48], [0, 60])}%` }} />
      </div>
      <p>模型能力 60%</p>
    </div>
    <div className="panel disabledPanel">
      <h2>{scene.rightTitle}</h2>
      <button>发布产品</button>
      <p>等模型好了再说</p>
    </div>
  </div>
);

const FrameworkScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="frameworkScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="frameworkGrid">
      {scene.items?.map((item, index) => (
        <div className="miniCard" key={item} style={{ opacity: fit(local - index * 8, [28, 44], [0, 1]) }}>
          {item}
        </div>
      ))}
    </div>
    <div className="modelBar">
      <span style={{ width: `${fit(local, [80, 230], [35, 100])}%` }} />
    </div>
  </div>
);

const RoadScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="roadScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="roadWrap">
      <div className="road" />
      <div className="car" style={{ left: `${fit(local, [38, 330], [14, 70])}%` }}>
        <span />
      </div>
    </div>
    <div className="quote">{scene.highlight}</div>
  </div>
);

const TagsScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="tagsScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="tagGrid">
      {scene.items?.map((item, index) => {
        const itemFrame = local - index * 10;
        return (
          <div
            className={item === scene.highlight ? "tagCard struck" : "tagCard"}
            key={item}
            style={{
              opacity: fit(itemFrame, [22, 38], [0, 1]),
              transform: `translateY(${fit(itemFrame, [22, 42], [34, 0])}px)`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  </div>
);

const QuadrantsScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="quadrantsScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="quadGrid">
      {scene.items?.map((item, index) => (
        <div className="quadCard" key={item} style={{ opacity: fit(local - index * 10, [24, 42], [0, 1]) }}>
          <span>{["↗", "💬", "▣", "〰"][index]}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  </div>
);

const LoopScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="loopScene">
    <div className="sealedBox">
      <span>完美答案</span>
    </div>
    <div className="loopPanel">
      <TitleBlock scene={scene} local={local} compact />
      <div className="loopSteps">
        {["发布", "反馈", "修改", "再发布"].map((item, index) => (
          <span key={item} style={{ opacity: fit(local - index * 10, [42, 56], [0, 1]) }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ChatScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="chatScene">
    <div className="channelHeader">{scene.title}</div>
    {scene.items?.map((item, index) => (
      <div
        className="message"
        key={item}
        style={{
          opacity: fit(local - index * 22, [18, 36], [0, 1]),
          transform: `translateY(${fit(local - index * 22, [18, 36], [22, 0])}px)`,
        }}
      >
        <i style={{ background: ["#f0b84f", "#6d72f6", "#6ebd95", "#2f2f33"][index] }} />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const FlowScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className={scene.highlight ? "flowScene fast" : "flowScene"}>
    <TitleBlock scene={scene} local={local} compact />
    <div className="flowTrack">
      {scene.items?.map((item, index) => (
        <div className="flowStep" key={item} style={{ opacity: fit(local - index * 8, [26, 42], [0, 1]) }}>
          {item}
        </div>
      ))}
    </div>
  </div>
);

const HandoffScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="handoffScene">
    <div className="stampStack" style={{ opacity: fit(local, [14, 36], [1, 0.25]) }}>
      <span>审批</span>
      <span>审批</span>
      <span>审批</span>
    </div>
    <TitleBlock scene={scene} local={local} compact />
    <div className="baton" style={{ transform: `translateX(${fit(local, [44, 120], [-140, 160])}px)` }} />
  </div>
);

const MetricsScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="metricsScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="metricGrid">
      {scene.items?.map((item, index) => (
        <div className="metricCard" key={item} style={{ opacity: fit(local - index * 10, [24, 40], [0, 1]) }}>
          {item}
        </div>
      ))}
    </div>
  </div>
);

const StackScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="stackScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="featurePile">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          className={index === 3 || index === 9 ? "pileCard active" : "pileCard"}
          key={index}
          style={{
            opacity: fit(local - index * 3, [42, 52], [0, 1]),
            transform: `translate(${(index % 4) * 66}px, ${Math.floor(index / 4) * 42}px) rotate(${(index % 5) - 2}deg)`,
          }}
        />
      ))}
    </div>
  </div>
);

const CompareScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="compareScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="compareGrid">
      <div className="compareCard muted">
        <h2>{scene.leftTitle}</h2>
        {scene.leftItems?.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="compareCard bright">
        <h2>{scene.rightTitle}</h2>
        {scene.rightItems?.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  </div>
);

const QuestionsScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="questionsScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="questionOrbit">
      {scene.items?.map((item, index) => (
        <span className={`q${index}`} key={item} style={{ opacity: fit(local - index * 10, [28, 44], [0, 1]) }}>
          {item}
        </span>
      ))}
      <strong style={{ opacity: fit(local, [120, 160], [0, 1]) }}>{scene.highlight}</strong>
    </div>
  </div>
);

const BoundaryScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="boundaryScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="roleCards">
      <div>PM</div>
      <span style={{ opacity: fit(local, [40, 120], [1, 0.08]) }} />
      <div>Engineer</div>
    </div>
  </div>
);

const CycleScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="cycleScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="cycle">
      {scene.items?.map((item, index) => (
        <span className={`c${index}`} key={item} style={{ opacity: fit(local - index * 12, [36, 52], [0, 1]) }}>
          {item}
        </span>
      ))}
      <strong>{scene.highlight}</strong>
    </div>
  </div>
);

const FormulaScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="formulaScene">
    <TitleBlock scene={scene} local={local} compact />
    <div className="formula">
      {scene.items?.map((item, index) => (
        <span key={item} style={{ opacity: fit(local - index * 14, [34, 52], [0, 1]) }}>
          {item}
        </span>
      ))}
    </div>
    {scene.highlight ? <div className="result">{scene.highlight}</div> : null}
  </div>
);

const CrossoutScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="crossoutScene">
    <div className="crossItems">
      {scene.items?.map((item, index) => (
        <div key={item}>
          {item}
          <span style={{ transform: `scaleX(${fit(local - index * 14, [32, 48], [0, 1])})` }} />
        </div>
      ))}
    </div>
    <strong>{scene.highlight}</strong>
  </div>
);

const SummaryScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="summaryScene">
    <TitleBlock scene={scene} local={local} />
  </div>
);

const FinalScene = ({ scene, local }: { scene: Scene; local: number }) => (
  <div className="finalScene">
    <div className="noteCard" style={{ transform: `translateY(${fit(local, [0, 32], [38, 0])}px)` }}>
      <h1>{scene.title}</h1>
      <p>{scene.subtitle}</p>
      <span>Bilibili / @你的昵称</span>
    </div>
  </div>
);

const RenderScene = ({ scene }: { scene: Scene }) => {
  const frame = useCurrentFrame();
  const local = frame - scene.start;
  switch (scene.type) {
    case "hero":
      return <HeroScene scene={scene} local={local} />;
    case "list":
      return <ListScene scene={scene} local={local} />;
    case "split":
      return <SplitScene scene={scene} local={local} />;
    case "profile":
      return <ProfileScene scene={scene} local={local} />;
    case "point":
      return <PointScene scene={scene} local={local} />;
    case "progress":
      return <ProgressScene scene={scene} local={local} />;
    case "framework":
      return <FrameworkScene scene={scene} local={local} />;
    case "road":
      return <RoadScene scene={scene} local={local} />;
    case "tags":
      return <TagsScene scene={scene} local={local} />;
    case "quadrants":
      return <QuadrantsScene scene={scene} local={local} />;
    case "loop":
      return <LoopScene scene={scene} local={local} />;
    case "chat":
      return <ChatScene scene={scene} local={local} />;
    case "flow":
      return <FlowScene scene={scene} local={local} />;
    case "handoff":
      return <HandoffScene scene={scene} local={local} />;
    case "metrics":
      return <MetricsScene scene={scene} local={local} />;
    case "stack":
      return <StackScene scene={scene} local={local} />;
    case "compare":
      return <CompareScene scene={scene} local={local} />;
    case "questions":
      return <QuestionsScene scene={scene} local={local} />;
    case "boundary":
      return <BoundaryScene scene={scene} local={local} />;
    case "cycle":
      return <CycleScene scene={scene} local={local} />;
    case "formula":
      return <FormulaScene scene={scene} local={local} />;
    case "crossout":
      return <CrossoutScene scene={scene} local={local} />;
    case "summary":
      return <SummaryScene scene={scene} local={local} />;
    case "final":
      return <FinalScene scene={scene} local={local} />;
    default:
      return <SummaryScene scene={scene} local={local} />;
  }
};

export const SignalCraft = () => {
  return (
    <AbsoluteFill>
      {scenes.map((scene) => (
        <Sequence key={`${scene.start}-${scene.title}`} from={scene.start} durationInFrames={scene.end - scene.start}>
          <Shell scene={scene}>
            <RenderScene scene={scene} />
          </Shell>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
