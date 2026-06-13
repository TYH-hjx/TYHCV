const profile = {
  name: '田雨寒',
  greeting: '你好，我是',
  title: '大数据技术专业学生',
  bio: '专注于大数据技术与 AI 工具应用，擅长 Office 办公套件和各类效率工具，通过 AI 辅助提升学习和工作效率。我相信脚踏实地才能走得更远，正在一步一个脚印地积累自己的专业技能。',
  school: '湖北交通职业技术学院',
  major: '大数据技术',
  grade: '大二',
  gpa: 'GPA 3.2',
  location: '武汉',
  email: 'TYH050828@outlook.com',
  github: 'github.com/TYH-hjx',
  phone: '13554149920',
  stats: [
    { number: '大二', label: '在读年级' },
    { number: 'GPA 3.2', label: '学业成绩' },
    { number: '武汉', label: '所在城市' },
  ],
  skills: [
    {
      category: 'Office 办公软件',
      icon: '📊',
      items: [
        { name: 'PowerPoint（演示文稿）', level: 90 },
        { name: 'Excel（电子表格）', level: 85 },
        { name: 'Word（文档处理）', level: 85 },
      ],
    },
    {
      category: '大数据技术基础',
      icon: '💾',
      items: [
        { name: 'SQL 数据库查询', level: 60 },
        { name: 'Python 基础编程', level: 55 },
        { name: 'Hadoop / Spark 入门', level: 40 },
      ],
    },
    {
      category: '通用能力',
      icon: '🛠️',
      items: [
        { name: '数据分析思维', level: 65 },
        { name: '信息检索与整理', level: 80 },
        { name: '团队沟通协作', level: 75 },
      ],
    },
  ],
  learningPlan: [
    { title: '数据库原理与应用', tags: ['核心课程', '数据库'], desc: '学习关系型数据库设计、SQL 查询优化、数据库管理等核心知识，为数据处理打下坚实基础。', status: '📖 学习中', gradient: 'linear-gradient(135deg, #1a2a30, #1a3a50)', icon: '📊' },
    { title: 'Python 数据处理', tags: ['核心课程', '编程'], desc: '掌握 Python 编程基础，学习使用 Pandas、NumPy 等库进行数据清洗、分析和可视化处理。', status: '📖 学习中', gradient: 'linear-gradient(135deg, #202a35, #303a55)', icon: '🐍' },
    { title: '大数据平台技术', tags: ['专业方向', '大数据'], desc: '学习 Hadoop 生态系统、Spark 分布式计算框架，了解大数据存储与处理的完整技术栈。', status: '📖 学习中', gradient: 'linear-gradient(135deg, #251a35, #352a55)', icon: '☁️' },
    { title: '数据可视化与分析', tags: ['专业方向', '分析'], desc: '学习使用 ECharts、Tableau 等工具进行数据可视化，培养数据分析思维和报告撰写能力。', status: '📖 学习中', gradient: 'linear-gradient(135deg, #1a2530, #2a3540)', icon: '📈' },
    { title: '职业技能证书', tags: ['目标规划', '证书'], desc: '计划考取计算机等级考试、大数据相关职业技能证书，为未来就业增加竞争力。', status: '🎯 备考中', gradient: 'linear-gradient(135deg, #1a3025, #2a4035)', icon: '🎯' },
    { title: '实习与就业准备', tags: ['未来规划', '实习'], desc: '积极准备简历与面试，寻找数据分析或大数据相关的实习机会，积累实际工作经验。', status: '🚀 准备中', gradient: 'linear-gradient(135deg, #302520, #403530)', icon: '🚀' },
  ],
  workExperience: [
    { date: '2024.06 — 2024.08', role: '电话客服', company: '武汉榕霖职业技术学院', desc: '高考结束后负责招生电话客服工作，向家长和学生介绍学院专业设置及就业前景，耐心解答咨询，锻炼了沟通表达能力。' },
    { date: '2022.01 — 2022.02', role: '收银理货员', company: '武汉家乐福超市', desc: '寒假期间负责超市收银、商品理货与陈列，在忙碌的节假日坚守岗位尽职尽责，培养了责任心与服务意识。' },
  ],
  education: [
    { date: '2026 — 2027', title: '大三（即将）· 实习与毕业', sub: '计划寻找大数据相关实习岗位，完成毕业设计，为正式步入职场做最后冲刺。' },
    { date: '2025 — 2026', title: '大二 · 专业深化', sub: '深入学习大数据平台技术（Hadoop/Spark）、Python 数据处理与分析，开始关注行业动态。' },
    { date: '2024 — 2025', title: '大一 · 基础打底', sub: '学习计算机基础、数据库概论、Python 编程入门，打牢专业基础，适应大学生活。' },
    { date: '2024 年 9 月', title: '🎓 入学 · 湖北交通职业技术学院', sub: '进入大数据技术专业学习，开启信息技术领域的探索之旅。' },
  ],
  contact: {
    email: 'TYH050828@outlook.com',
    location: '中国 · 湖北武汉',
    github: 'github.com/TYH-hjx',
    phone: '13554149920',
    school: '湖北交通职业技术学院 · 大数据技术专业',
  },
};
export default profile;
