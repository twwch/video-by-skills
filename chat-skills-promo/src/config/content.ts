export const CONTENT = {
  // Section 1: Hook
  chaosSnippets: [
    'npm install failed: EACCES permission denied',
    '脚本执行失败：找不到模块',
    'Error: ENOENT: no such file or directory',
    'TypeError: Cannot read properties of undefined',
    'Build failed with 23 errors',
    '依赖冲突：版本不兼容',
    'Segmentation fault (core dumped)',
    'FATAL ERROR: out of memory',
    'Connection refused: ECONNREFUSED',
    '编译超时：任务已取消',
  ],
  theQuestion: '如果 AI 能自己调用工具呢？',

  // Section 2: Product
  productName: 'Next-Chat-Skills',
  tagline: 'AI 驱动的技能集成对话平台',

  // Chat messages with skill invoke cards matching original UI
  chatMessages: [
    {role: 'user' as const, text: '帮我创建一个 React 项目并安装依赖'},
    {role: 'ai' as const, text: '好的，我来为你创建项目并配置开发环境。'},
    {
      role: 'skill-invoke' as const,
      text: '',
      skillName: 'terminal',
      skillStatus: 'success' as const,
      terminalLines: [
        {text: '$ npx create-next-app@latest my-app', type: 'cmd' as const},
        {text: '✓ 创建项目结构', type: 'success' as const},
        {text: '✓ 安装依赖 (react, next, typescript...)', type: 'success' as const},
        {text: '✓ 初始化 Git 仓库', type: 'success' as const},
      ],
      duration: '12.3s',
    },
    {role: 'ai' as const, text: '项目已就绪！我还帮你配置了 TypeScript 和 ESLint。'},
  ],

  // Sidebar conversations
  sidebarConversations: [
    {title: 'React 项目创建', active: true},
    {title: 'API 接口调试', active: false},
    {title: '数据库设计', active: false},
    {title: '部署方案讨论', active: false},
  ],

  // Active skill chips in input area
  activeSkillChips: ['terminal', 'file-gen'],

  // Section 3: Features
  features: [
    {
      title: '自主调用技能',
      subtitle: 'Autonomous Skill Execution',
      description: 'AI 自动选择并执行最合适的技能',
    },
    {
      title: '终端执行',
      subtitle: 'Live Terminal',
      description: '在安全沙箱中执行命令和脚本',
    },
    {
      title: '文件生成',
      subtitle: 'File Generation',
      description: '直接生成代码文件和文档',
    },
    {
      title: '@提及技能',
      subtitle: '@Mention Skills',
      description: '通过 @ 语法精确调用特定技能',
    },
    {
      title: '查找技能',
      subtitle: 'Find Skills',
      description: '智能搜索并发现社区技能',
    },
    {
      title: '创建技能',
      subtitle: 'Create Skills',
      description: '快速创建自定义技能扩展 AI 能力',
    },
    {
      title: '安装技能',
      subtitle: 'Install Skills',
      description: '一键安装社区技能到本地环境',
    },
    {
      title: '错误自动修复',
      subtitle: 'Auto Error Recovery',
      description: 'AI 自动检测并修复运行时错误',
    },
    {
      title: '完整示例',
      subtitle: 'Full Demo',
      description: '从安装到运行的完整技能使用流程',
    },
  ],
  terminalCommands: [
    {cmd: '$ npx create-next-app@latest my-app', delay: 0},
    {cmd: '  ✓ 创建项目结构', delay: 30},
    {cmd: '  ✓ 安装依赖 (react, next, typescript...)', delay: 60},
    {cmd: '  ✓ 配置 TypeScript', delay: 80},
    {cmd: '  ✓ 初始化 Git 仓库', delay: 95},
    {cmd: '  ✅ 项目创建完成!', delay: 110},
  ],
  generatedFiles: [
    {name: 'api-report.tsx', type: 'tsx', lines: 142},
    {name: 'schema.prisma', type: 'prisma', lines: 68},
    {name: 'dashboard.tsx', type: 'tsx', lines: 235},
    {name: 'README.md', type: 'md', lines: 89},
  ],
  skills: [
    {name: 'terminal', icon: '⌨️', desc: '终端执行'},
    {name: 'file-gen', icon: '📄', desc: '文件生成'},
    {name: 'web-search', icon: '🔍', desc: '网页搜索'},
    {name: 'ui-ux-pro-max', icon: '🖥️', desc: 'UI/UX 设计'},
    {name: 'code-review', icon: '🔎', desc: '代码审查'},
  ],

  // Right panel activity timeline
  activityTimeline: [
    {action: '开始对话', type: 'info' as const},
    {action: '调用 terminal 技能', type: 'skill' as const},
    {action: '执行脚本完成', type: 'success' as const},
    {action: '生成文件 3 个', type: 'file' as const},
  ],

  // Section 4: Tech Stack
  techStack: [
    {name: 'Next.js', color: '#ffffff'},
    {name: 'React', color: '#61dafb'},
    {name: 'TypeScript', color: '#3178c6'},
    {name: 'Tailwind', color: '#06b6d4'},
    {name: 'shadcn/ui', color: '#ffffff'},
    {name: 'AI SDK', color: '#22c55e'},
    {name: 'Drizzle', color: '#c5f74f'},
    {name: 'PostgreSQL', color: '#4169e1'},
    {name: 'Docker', color: '#2496ed'},
  ],
  architectureNodes: ['User', 'Chat UI', 'AI Engine', 'Skill Router', 'Sandbox'],

  // Section 5: CTA
  taglineBefore: '让 AI 不只是对话',
  taglineAfter: '让 AI 拥有技能',
  githubUrl: 'github.com/twwch/next-chat-skills',
  badges: ['开源', '免费', '自部署'],
} as const;
