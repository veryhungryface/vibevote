
export interface Project {
  id: number;
  author: string;
  name: string;
  tool: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    author: "박성한",
    name: "내신/수능용 시험지 생성기",
    tool: "미상",
    description: "어떤 지문이든 내신/수능용 시험지 만들어드려요",
    link: "https://07postmath.vercel.app/"
  },
  {
    id: 2,
    author: "남용수(수학서비스팀)",
    name: "AI 기반 수학 학습 플랫폼",
    tool: "미상",
    description: "개인 맞춤형 문제 추천, AI 오답 해설, 실시간 학습 분석",
    link: "https://mathflowai-jikakk8f.manus.space/"
  },
  {
    id: 3,
    author: "남용수(수학서비스팀)",
    name: "ContextFlow",
    tool: "미상",
    description: "지식 graph로 시각화 해주는 AI 기반 지식 통합 플랫폼",
    link: "https://contextflow-iheqhvs3.manus.space/"
  },
  {
    id: 4,
    author: "이승철(NS팀)",
    name: "회사 전결규정 결재경로 자동생성",
    tool: "Claude Code, OpenAI API",
    description: "회사의 바뀐 전결규정으로 결재 경로 확인",
    link: "https://ha-on.com"
  },
  {
    id: 5,
    author: "이승철(NS팀)",
    name: "Rumiword",
    tool: "Claude Code",
    description: "루미워드 영단어 만들기 보드게임 디지털화",
    link: "https://ha-on.com/rumiword"
  },
  {
    id: 6,
    author: "이승철(NS팀)",
    name: "NewNIE (새로운 신문활용교육)",
    tool: "Claude Code, OpenAI API, Naver검색API",
    description: "새로운 신문활용교육 - 신문 읽고 퀴즈풀고 레벨업",
    link: "https://ha-on.com/newnie"
  },
  {
    id: 7,
    author: "이승철(NS팀)",
    name: "운빨존많공",
    tool: "Claude Code, OpenAI API",
    description: "랜덤 단어를 선택해서 운빨이 작용하는 공부, HP가 0이 되면 공부 못함",
    link: "https://ha-on.com/luckystudy"
  },
  {
    id: 8,
    author: "배태영(AI서비스실)",
    name: "shortsNews",
    tool: "oh-my-opencode, glm4.7",
    description: "AI뉴스보기 귀찮으시죠? 모바일용 숏츠스타일 뉴스",
    link: "https://ai-news-neon-gamma.vercel.app"
  },
  {
    id: 9,
    author: "정윤성",
    name: "Crew Tracker",
    tool: "v0, Cursor, Vercel",
    description: "팀원 업무 관리 서비스",
    link: "https://v0-crew-tracker-app.vercel.app/"
  },
  {
    id: 10,
    author: "정윤성",
    name: "스마트 어워드",
    tool: "Google AI Studio, Supabase, Gemini API",
    description: "상장 제작 및 학생 개별 관리",
    link: "https://smart-korean-certificate-generator-966179791641.us-west1.run.app/"
  },
  {
    id: 11,
    author: "정윤성",
    name: "우리반 꽃밭",
    tool: "Google AI Studio",
    description: "우리 반 감정 출석체크",
    link: "https://our-class-garden-966179791641.us-west1.run.app"
  },
  {
    id: 12,
    author: "정윤성",
    name: "노트 아이템 카드 생성기",
    tool: "Figma Make, Gemini API",
    description: "공책 게임 아이템을 디지털 카드로! 이를 판매 및 관리",
    link: "https://cocoa-full-37623911.figma.site/"
  },
  {
    id: 13,
    author: "정윤성",
    name: "AI 시화 엽서 제작소",
    tool: "Google AI Studio, Supabase, Gemini API",
    description: "내가 그린 그림을 4줄 시를 포함한 엽서로 생성",
    link: "https://ai-966179791641.us-west1.run.app"
  },
  {
    id: 14,
    author: "정윤성",
    name: "GeoQuiz Conquer",
    tool: "Google AI Studio, Gemini API",
    description: "국가별 퀴즈를 생성하고 영토 차지하기",
    link: "https://geoquiz-conqueror-966179791641.us-west1.run.app/"
  },
  {
    id: 15,
    author: "이푸른",
    name: "아이스크림 출퇴근 알리미",
    tool: "Windows Application",
    description: "출퇴근 체크 알리미!(윈도우용)",
    link: "/아이스크림 출퇴근 알리미.zip"
  },
  {
    id: 16,
    author: "이소연",
    name: "문해력 향상 프로젝트",
    tool: "Google AI Studio",
    description: "AI 본부 차원에서도 문해력을 놓치지 말자는 취지로 제작",
    link: "https://aistudio.google.com/apps/drive/1QTjHcJKvYkCQt5w9PUGloYKqZCCARgQc"
  },
  {
    id: 17,
    author: "이충원",
    name: "AI 수업자료 생성기",
    tool: "미상",
    description: "과도한 테스트는 제 돈이 녹습니다...ㅠ_ㅠ",
    link: "https://vibe-1-ten.vercel.app/"
  },
  {
    id: 18,
    author: "여승환(전략기획팀)",
    name: "아이스크림 업무 텍스트 도우미",
    tool: "Claude",
    description: "개인적으로 가장 자주 활용하는 AI활용 사례입니다.",
    link: "https://claude.ai/public/artifacts/f78ce74c-794a-40a7-b7ea-2d3a3260d739"
  },
  {
    id: 19,
    author: "김순영",
    name: "직장인을 위한 기술 트렌드 브리핑",
    tool: "Antigravity",
    description: "해외 영어 기사를 한글로 번역하고 핵심만 요약해, 바쁜 직장인들이 4대 주요 트렌드를 쉽고 빠르게 파악하도록 돕는 서비스",
    link: "#" // Link issue in source
  },
  {
    id: 20,
    author: "김순영",
    name: "이미지 업스케일러",
    tool: "마누스",
    description: "AI 기술로 저화질 이미지를 고화질 이미지로 개선하는 도구",
    link: "https://aiupscale-hmb74mjj.manus.space/"
  },
  {
    id: 21,
    author: "김순영",
    name: "수학 풀이 진단 AI 서비스",
    tool: "구글 AI 스튜디오",
    description: "수학 문제를 업로드하면 단계별로 상세한 해설을 제공하며, 학습자가 작성한 풀이 과정을 분석해 오류의 시작점과 원인을 짚어주는 AI 서비스",
    link: "#" // Link issue in source
  },
  {
    id: 22,
    author: "조혜영",
    name: "급식 해결사! (급식 중복 차단 봇)",
    tool: "Antigravity",
    description: "오늘 급식이랑 저녁 메뉴 겹치나? 고민하는 워킹맘/파파를 위해, 중복되지 않는 최적의 '냉장고 털기' 레시피를 제안",
    link: "https://test3-theta-five.vercel.app/"
  },
  {
    id: 23,
    author: "조혜영",
    name: "메타인지 기반 수학 학습 플랫폼",
    tool: "manus",
    description: "학생이 스스로 문제를 해결할 수 있도록 사고의 흐름을 가이드하는 AI 튜터",
    link: "https://thinkmathai-umxskqgv.manus.space/"
  },
  {
    id: 24,
    author: "남용수(수학서비스팀)",
    name: "ContextFlow 2",
    tool: "미상",
    description: "지식 graph로 시각화 해주는 AI 기반 지식 통합 플랫폼 Ver.2",
    link: "https://d1vav1wc0z90-d.space.z.ai/"
  }
];
