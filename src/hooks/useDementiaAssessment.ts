
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DementiaQuestion {
  id: number;
  question: string;
}

export interface AssessmentAnswer {
  questionId: number;
  score: number; // 0: 없다, 1: 가끔, 2: 자주
}

export interface AssessmentResult {
  totalScore: number;
  riskLevel: 'normal' | 'caution' | 'high';
  message: string;
  recommendation: string;
  color: string;
  detailedInfo?: {
    nextSteps?: string[];
    hospitalPreparation?: string[];
    familyDiscussion?: string[];
  };
}

export interface UserInfo {
  age?: string;
  gender?: string;
  region?: string;
  longTermCareGrade?: string;
  legalConsultation?: string;
}

export interface UserInfoQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

export const USER_INFO_QUESTIONS: UserInfoQuestion[] = [
  {
    id: 'age',
    question: '환자의 연령대는 어떻게 되시나요?',
    options: [
      { value: '50대', label: '50대' },
      { value: '60대', label: '60대' },
      { value: '70대', label: '70대' },
      { value: '80대 이상', label: '80대 이상' }
    ]
  },
  {
    id: 'gender',
    question: '환자의 성별은 어떻게 되시나요?',
    options: [
      { value: '남성', label: '남성' },
      { value: '여성', label: '여성' }
    ]
  },
  {
    id: 'region',
    question: '현재 거주하고 계신 지역은 어디인가요?',
    options: [
      { value: '서울', label: '서울' },
      { value: '경기', label: '경기' },
      { value: '인천', label: '인천' },
      { value: '기타', label: '기타' }
    ]
  },
  {
    id: 'longTermCareGrade',
    question: '장기요양등급을 받고 계신가요?',
    options: [
      { value: '없음', label: '등급 없음' },
      { value: '1등급', label: '1등급' },
      { value: '2등급', label: '2등급' },
      { value: '3등급', label: '3등급' },
      { value: '4등급', label: '4등급' },
      { value: '5등급', label: '5등급' },
      { value: '인지지원등급', label: '인지지원등급' }
    ]
  },
  {
    id: 'legalConsultation',
    question: '상속이나 후견인 관련 법적 상담을 원하시나요?',
    options: [
      { value: '필요함', label: '네, 필요합니다' },
      { value: '불필요', label: '아니요, 필요하지 않습니다' },
      { value: '나중에', label: '나중에 결정하겠습니다' }
    ]
  }
];

export const DEMENTIA_QUESTIONS: DementiaQuestion[] = [
  { id: 1, question: "오늘이 몇 월이고, 무슨 요일인지를 잘 모른다" },
  { id: 2, question: "자기가 놔둔 물건을 찾지 못한다" },
  { id: 3, question: "같은 질문을 반복해서 한다" },
  { id: 4, question: "약속을 하고서 잊어버린다" },
  { id: 5, question: "물건을 가지러 갔다가 잊어버리고 그냥 온다" },
  { id: 6, question: "물건이나 사람의 이름을 대기가 힘들어 머뭇거린다" },
  { id: 7, question: "대화 중 내용이 이해되지 않아 반복해서 물어본다" },
  { id: 8, question: "길을 잃거나 헤맨 적이 있다" },
  { id: 9, question: "예전에 비해 계산능력이 떨어졌다" },
  { id: 10, question: "예전에 비해 성격이 변했다" },
  { id: 11, question: "이전에 잘 다루던 기구 사용이 서툴러졌다" },
  { id: 12, question: "예전에 비해 방이나 집안 정리정돈을 하지 못한다" },
  { id: 13, question: "상황에 맞게 스스로 옷을 선택하여 입지 못한다" },
  { id: 14, question: "혼자 대중교통으로 목적지에 가기 힘들다" },
  { id: 15, question: "내복이나 옷이 더러워져도 갖아 입지 않으려 한다" }
];

export const useDementiaAssessment = () => {
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentUserInfoQuestion, setCurrentUserInfoQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const { toast } = useToast();

  const answerQuestion = (score: number) => {
    const newAnswer: AssessmentAnswer = {
      questionId: DEMENTIA_QUESTIONS[currentQuestion].id,
      score
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== newAnswer.questionId);
      return [...filtered, newAnswer];
    });
  };

  const answerUserInfoQuestion = (value: string) => {
    const questionId = USER_INFO_QUESTIONS[currentUserInfoQuestion].id;
    setUserInfo(prev => ({ ...prev, [questionId]: value }));
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === DEMENTIA_QUESTIONS[currentQuestion].id)?.score;
  };

  const getCurrentUserInfoAnswer = () => {
    const questionId = USER_INFO_QUESTIONS[currentUserInfoQuestion].id;
    return userInfo[questionId as keyof UserInfo] || '';
  };

  const nextQuestion = () => {
    if (currentQuestion < DEMENTIA_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const nextUserInfoQuestion = () => {
    if (currentUserInfoQuestion < USER_INFO_QUESTIONS.length - 1) {
      setCurrentUserInfoQuestion(prev => prev + 1);
    }
  };

  const previousUserInfoQuestion = () => {
    if (currentUserInfoQuestion > 0) {
      setCurrentUserInfoQuestion(prev => prev - 1);
    }
  };

  const calculateResult = (): AssessmentResult => {
    // 모든 질문에 대한 답변이 있는지 확인하고 점수 계산
    const totalScore = answers.reduce((sum, answer) => {
      const score = Number(answer.score);
      return sum + (isNaN(score) ? 0 : score);
    }, 0);
    
    let riskLevel: 'normal' | 'caution' | 'high';
    let message: string;
    let recommendation: string;
    let color: string;
    let detailedInfo: AssessmentResult['detailedInfo'];

    if (totalScore <= 5) {
      riskLevel = 'normal';
      message = '현재 인지기능이 양호합니다';
      recommendation = '건강한 생활습관을 유지하세요';
      color = 'text-green-600';
    } else if (totalScore <= 15) {
      riskLevel = 'caution';
      message = '경도인지장애 또는 치매 초기 의심';
      recommendation = '전문의 상담을 받아보시는 것을 권합니다';
      color = 'text-yellow-600';
      detailedInfo = {
        nextSteps: [
          '가까운 신경과 또는 정신건강의학과 방문 예약',
          '가족력 및 복용 중인 약물 정보 정리',
          '최근 인지기능 변화 관련 증상 기록',
          '치매 전문 병원에서 정밀 검사 받기'
        ],
        hospitalPreparation: [
          '건강보험증, 신분증 지참',
          '복용 중인 약물 리스트 작성',
          '가족력 정보 (부모, 형제자매 인지장애 여부)',
          '최근 6개월간 증상 변화 일지'
        ],
        familyDiscussion: [
          '검사 결과 및 향후 계획 공유',
          '일상생활 지원 방안 논의',
          '정기적인 모니터링 계획 수립',
          '응급상황 대응 방법 정하기'
        ]
      };
    } else {
      riskLevel = 'high';
      message = '인지기능 저하가 의심됩니다';
      recommendation = '즉시 전문의 진료를 받으시기 바랍니다';
      color = 'text-red-600';
      detailedInfo = {
        nextSteps: [
          '즉시 치매 전문 병원 방문 예약',
          '신경심리검사 및 뇌영상검사 준비',
          '가족 동반 진료 권장',
          '치매 관련 사회복지 서비스 정보 수집'
        ],
        hospitalPreparation: [
          '건강보험증, 신분증 지참',
          '기존 건강검진 결과지',
          '복용 중인 모든 약물 정보',
          '보호자 동반 (가능한 경우)'
        ],
        familyDiscussion: [
          '진단 결과에 따른 치료 계획 상의',
          '일상생활 안전 대책 마련',
          '경제적 지원 방안 검토',
          '장기요양보험 신청 고려'
        ]
      };
    }

    return { totalScore, riskLevel, message, recommendation, color, detailedInfo };
  };

  const saveAssessment = async (result: AssessmentResult) => {
    setIsLoading(true);
    try {
      const sessionId = crypto.randomUUID();
      
      const answersJson = answers.map(answer => ({
        questionId: Number(answer.questionId),
        score: Number(answer.score)
      }));
      
      const { error } = await supabase
        .from('dementia_assessments')
        .insert({
          session_id: sessionId,
          total_score: result.totalScore,
          risk_level: result.riskLevel,
          answers: answersJson as any
        });

      if (error) throw error;

      toast({
        title: "평가 완료",
        description: "평가 결과가 저장되었습니다.",
      });

      return true;
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "저장 실패",
        description: "평가 결과 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const openKakaoInquiry = () => {
    window.open('https://pf.kakao.com/_kmUKn/chat', '_blank');
  };

  const resetAssessment = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setCurrentUserInfoQuestion(0);
    setUserInfo({});
  };

  const updateUserInfo = (info: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...info }));
  };

  return {
    answers,
    currentQuestion,
    currentUserInfoQuestion,
    isLoading,
    userInfo,
    answerQuestion,
    answerUserInfoQuestion,
    getCurrentAnswer,
    getCurrentUserInfoAnswer,
    nextQuestion,
    previousQuestion,
    nextUserInfoQuestion,
    previousUserInfoQuestion,
    calculateResult,
    saveAssessment,
    openKakaoInquiry,
    resetAssessment,
    updateUserInfo,
    totalQuestions: DEMENTIA_QUESTIONS.length,
    totalUserInfoQuestions: USER_INFO_QUESTIONS.length,
    isComplete: answers.length === DEMENTIA_QUESTIONS.length,
    isUserInfoComplete: currentUserInfoQuestion >= USER_INFO_QUESTIONS.length
  };
};
