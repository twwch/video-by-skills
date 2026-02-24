export type Language = 'zh' | 'en';

export const L = (lang: Language, zh: string, en: string) =>
  lang === 'zh' ? zh : en;

export const content = {
  opening: {
    painPoint: { zh: '制作简历不应该这么痛苦', en: "Building a resume shouldn't be this painful" },
    fragments: {
      zh: ['个人信息', '工作经历', '教育背景', '专业技能', '项目经验', '自我评价'],
      en: ['Personal Info', 'Work Experience', 'Education', 'Skills', 'Projects', 'Summary'],
    },
  },
  logo: {
    name: 'JadeAI',
    tagline: { zh: 'AI 重塑你的简历', en: 'Your Resume, Reimagined by AI' },
  },
  dashboard: {
    title: { zh: '我的简历', en: 'My Resumes' },
    createBtn: { zh: '+ 新建简历', en: '+ New Resume' },
    cards: [
      {
        title: { zh: '前端工程师简历', en: 'Frontend Engineer Resume' },
        template: { zh: '现代模板', en: 'Modern' },
        date: '2024-01-15',
      },
      {
        title: { zh: '全栈开发简历', en: 'Full-Stack Developer Resume' },
        template: { zh: '经典模板', en: 'Classic' },
        date: '2024-01-10',
      },
      {
        title: { zh: '技术主管简历', en: 'Tech Lead Resume' },
        template: { zh: '简约模板', en: 'Minimal' },
        date: '2024-01-05',
      },
    ],
  },
  editor: {
    sections: {
      zh: ['个人信息', '个人总结', '工作经历', '教育背景', '专业技能', '项目经验'],
      en: ['Personal Info', 'Summary', 'Work Experience', 'Education', 'Skills', 'Projects'],
    },
    sectionIcons: ['👤', '📝', '💼', '🎓', '⚡', '🚀'],
  },
  ai: {
    userMsg: {
      zh: '帮我优化工作经历描述',
      en: 'Help me improve my work experience descriptions',
    },
    aiResponse: {
      zh: '我已经优化了您的工作经历描述，使用了更具影响力的动词和量化指标。主要改进包括：\n\n✅ 添加了具体的量化成果\n✅ 使用了更专业的动词\n✅ 突出了技术影响力',
      en: "I've enhanced your work experience with stronger action verbs and quantified metrics. Key improvements:\n\n✅ Added specific quantified results\n✅ Used more impactful verbs\n✅ Highlighted technical impact",
    },
    beforeText: {
      zh: '负责前端开发工作，参与多个项目',
      en: 'Responsible for frontend development, participated in multiple projects',
    },
    afterText: {
      zh: '主导 3 个核心前端项目，优化性能提升 40%，日活用户增长 25 万',
      en: 'Led 3 core frontend projects, improved performance by 40%, grew DAU by 250K',
    },
  },
  templates: {
    names: {
      zh: ['经典', '现代', '简约'],
      en: ['Classic', 'Modern', 'Minimal'],
    },
  },
  features: [
    {
      icon: '✋',
      title: { zh: '拖放式编辑', en: 'Drag & Drop Editor' },
      desc: { zh: '直觉式操作，轻松排版', en: 'Intuitive layout, easy formatting' },
    },
    {
      icon: '🤖',
      title: { zh: 'AI 对话助手', en: 'AI Chat Assistant' },
      desc: { zh: '智能优化简历内容', en: 'Smart content optimization' },
    },
    {
      icon: '🎨',
      title: { zh: '3 套专业模板', en: '3 Pro Templates' },
      desc: { zh: '经典、现代、简约', en: 'Classic, Modern, Minimal' },
    },
    {
      icon: '📄',
      title: { zh: 'PDF 导出', en: 'PDF Export' },
      desc: { zh: '一键导出高质量 PDF', en: 'One-click high-quality PDF' },
    },
    {
      icon: '🌐',
      title: { zh: '双语支持', en: 'Bilingual' },
      desc: { zh: '中英文自由切换', en: 'Chinese & English support' },
    },
    {
      icon: '🔒',
      title: { zh: '隐私优先', en: 'Privacy First' },
      desc: { zh: '数据安全，本地存储', en: 'Secure data, local storage' },
    },
  ],
  closing: {
    tagline: { zh: 'AI 驱动的智能简历构建器', en: 'AI-Powered Smart Resume Builder' },
    cta: { zh: '立即体验', en: 'Try it now' },
    github: 'github.com/twwch/JadeAI',
  },
  resume: {
    name: { zh: '陈思远', en: 'Siyuan Chen' },
    title: { zh: '高级前端工程师', en: 'Senior Frontend Engineer' },
    email: 'siyuan.chen@email.com',
    phone: '+86 138-0000-0000',
    summary: {
      zh: '8 年前端开发经验，专注于 React 生态系统和性能优化。',
      en: '8 years of frontend experience, specializing in React ecosystem and performance optimization.',
    },
    experience: [
      {
        company: { zh: '字节跳动', en: 'ByteDance' },
        role: { zh: '高级前端工程师', en: 'Senior Frontend Engineer' },
        period: '2022 - Present',
      },
      {
        company: { zh: '蚂蚁集团', en: 'Ant Group' },
        role: { zh: '前端工程师', en: 'Frontend Engineer' },
        period: '2019 - 2022',
      },
      {
        company: { zh: '美团', en: 'Meituan' },
        role: { zh: '初级前端工程师', en: 'Junior Frontend Engineer' },
        period: '2017 - 2019',
      },
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Vue 3', 'Node.js', 'Tailwind CSS'],
    education: {
      school: { zh: '清华大学', en: 'Tsinghua University' },
      degree: { zh: '计算机科学学士', en: 'B.S. Computer Science' },
      period: '2013 - 2017',
    },
  },
};
