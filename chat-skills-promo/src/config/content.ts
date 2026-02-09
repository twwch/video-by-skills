import type {Language} from './i18n';
import {L} from './i18n';

export function getContent(lang: Language) {
  return {
    // Section 1: Hook
    chaosSnippets: [
      'npm install failed: EACCES permission denied',
      L(lang, '脚本执行失败：找不到模块', 'Script failed: module not found'),
      'Error: ENOENT: no such file or directory',
      'TypeError: Cannot read properties of undefined',
      'Build failed with 23 errors',
      L(lang, '依赖冲突：版本不兼容', 'Dependency conflict: version incompatible'),
      'Segmentation fault (core dumped)',
      'FATAL ERROR: out of memory',
      'Connection refused: ECONNREFUSED',
      L(lang, '编译超时：任务已取消', 'Compile timeout: task cancelled'),
    ],
    theQuestion: L(lang, '如果 AI 能自己调用工具呢？', 'What if AI could invoke tools on its own?'),

    // Section 2: Product
    productName: 'Next-Chat-Skills',
    tagline: L(lang, 'AI 驱动的技能集成对话平台', 'AI-Powered Skill-Integrated Chat Platform'),

    // Chat messages with skill invoke cards matching original UI
    chatMessages: [
      {role: 'user' as const, text: L(lang, '帮我创建一个 React 项目并安装依赖', 'Create a React project and install dependencies')},
      {role: 'ai' as const, text: L(lang, '好的，我来为你创建项目并配置开发环境。', 'Sure, I\'ll create the project and set up the dev environment.')},
      {
        role: 'skill-invoke' as const,
        text: '',
        skillName: 'terminal',
        skillStatus: 'success' as const,
        terminalLines: [
          {text: '$ npx create-next-app@latest my-app', type: 'cmd' as const},
          {text: L(lang, '✓ 创建项目结构', '✓ Project structure created'), type: 'success' as const},
          {text: L(lang, '✓ 安装依赖 (react, next, typescript...)', '✓ Dependencies installed (react, next, typescript...)'), type: 'success' as const},
          {text: L(lang, '✓ 初始化 Git 仓库', '✓ Git repository initialized'), type: 'success' as const},
        ],
        duration: '12.3s',
      },
      {role: 'ai' as const, text: L(lang, '项目已就绪！我还帮你配置了 TypeScript 和 ESLint。', 'Project is ready! I\'ve also configured TypeScript and ESLint for you.')},
    ],

    // Sidebar conversations
    sidebarConversations: [
      {title: L(lang, 'React 项目创建', 'React Project Setup'), active: true},
      {title: L(lang, 'API 接口调试', 'API Debugging'), active: false},
      {title: L(lang, '数据库设计', 'Database Design'), active: false},
      {title: L(lang, '部署方案讨论', 'Deployment Planning'), active: false},
    ],

    // Active skill chips in input area
    activeSkillChips: ['terminal', 'file-gen'],

    // Section 3: Features
    features: [
      {
        title: L(lang, '自主调用技能', 'Autonomous Skill Execution'),
        subtitle: 'Autonomous Skill Execution',
        description: L(lang, 'AI 自动选择并执行最合适的技能', 'AI automatically selects and executes the best skill'),
      },
      {
        title: L(lang, '终端执行', 'Live Terminal'),
        subtitle: 'Live Terminal',
        description: L(lang, '在安全沙箱中执行命令和脚本', 'Execute commands and scripts in a secure sandbox'),
      },
      {
        title: L(lang, '文件生成', 'File Generation'),
        subtitle: 'File Generation',
        description: L(lang, '直接生成代码文件和文档', 'Generate code files and documentation directly'),
      },
      {
        title: L(lang, '@提及技能', '@Mention Skills'),
        subtitle: '@Mention Skills',
        description: L(lang, '通过 @ 语法精确调用特定技能', 'Precisely invoke specific skills using @ syntax'),
      },
      {
        title: L(lang, '查找技能', 'Find Skills'),
        subtitle: 'Find Skills',
        description: L(lang, '智能搜索并发现社区技能', 'Intelligently search and discover community skills'),
      },
      {
        title: L(lang, '创建技能', 'Create Skills'),
        subtitle: 'Create Skills',
        description: L(lang, '快速创建自定义技能扩展 AI 能力', 'Quickly create custom skills to extend AI capabilities'),
      },
      {
        title: L(lang, '安装技能', 'Install Skills'),
        subtitle: 'Install Skills',
        description: L(lang, '一键安装社区技能到本地环境', 'One-click install community skills locally'),
      },
      {
        title: L(lang, '错误自动修复', 'Auto Error Recovery'),
        subtitle: 'Auto Error Recovery',
        description: L(lang, 'AI 自动检测并修复运行时错误', 'AI automatically detects and fixes runtime errors'),
      },
      {
        title: L(lang, '完整示例', 'Full Demo'),
        subtitle: 'Full Demo',
        description: L(lang, '从安装到运行的完整技能使用流程', 'Complete skill workflow from install to execution'),
      },
    ],
    terminalCommands: [
      {cmd: '$ npx create-next-app@latest my-app', delay: 0},
      {cmd: L(lang, '  ✓ 创建项目结构', '  ✓ Project structure created'), delay: 30},
      {cmd: L(lang, '  ✓ 安装依赖 (react, next, typescript...)', '  ✓ Dependencies installed (react, next, typescript...)'), delay: 60},
      {cmd: L(lang, '  ✓ 配置 TypeScript', '  ✓ TypeScript configured'), delay: 80},
      {cmd: L(lang, '  ✓ 初始化 Git 仓库', '  ✓ Git repository initialized'), delay: 95},
      {cmd: L(lang, '  ✅ 项目创建完成!', '  ✅ Project created successfully!'), delay: 110},
    ],
    generatedFiles: [
      {name: 'api-report.tsx', type: 'tsx', lines: 142},
      {name: 'schema.prisma', type: 'prisma', lines: 68},
      {name: 'dashboard.tsx', type: 'tsx', lines: 235},
      {name: 'README.md', type: 'md', lines: 89},
    ],
    skills: [
      {name: 'terminal', icon: '⌨️', desc: L(lang, '终端执行', 'Terminal')},
      {name: 'file-gen', icon: '📄', desc: L(lang, '文件生成', 'File Gen')},
      {name: 'web-search', icon: '🔍', desc: L(lang, '网页搜索', 'Web Search')},
      {name: 'ui-ux-pro-max', icon: '🖥️', desc: L(lang, 'UI/UX 设计', 'UI/UX Design')},
      {name: 'code-review', icon: '🔎', desc: L(lang, '代码审查', 'Code Review')},
    ],

    // Right panel activity timeline
    activityTimeline: [
      {action: L(lang, '开始对话', 'Conversation started'), type: 'info' as const},
      {action: L(lang, '调用 terminal 技能', 'Invoked terminal skill'), type: 'skill' as const},
      {action: L(lang, '执行脚本完成', 'Script execution complete'), type: 'success' as const},
      {action: L(lang, '生成文件 3 个', '3 files generated'), type: 'file' as const},
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
    taglineBefore: L(lang, '让 AI 不只是对话', 'AI Beyond Conversation'),
    taglineAfter: L(lang, '让 AI 拥有技能', 'AI With Skills'),
    githubUrl: 'github.com/twwch/next-chat-skills',
    badges: L(lang,
      ['开源', '免费', '自部署'] as readonly string[],
      ['Open Source', 'Free', 'Self-Host'] as readonly string[],
    ),
  } as const;
}

/** Backward-compatible default export — Chinese */
export const CONTENT = getContent('zh');
