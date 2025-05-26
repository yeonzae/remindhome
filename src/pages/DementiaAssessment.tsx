import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, MapPin, MessageSquare, Share, RotateCcw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useDementiaAssessment, DEMENTIA_QUESTIONS, USER_INFO_QUESTIONS } from '@/hooks/useDementiaAssessment';
import DetailedResultInfo from '@/components/DetailedResultInfo';
import UserInfoQuestion from '@/components/UserInfoQuestion';
import MobileAssessmentCard from '@/components/MobileAssessmentCard';
import { Progress } from '@/components/ui/progress';

const DementiaAssessment = () => {
  const [step, setStep] = useState<'intro' | 'assessment' | 'userInfo' | 'result'>('intro');
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  
  const {
    currentQuestion,
    currentUserInfoQuestion,
    isLoading,
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
    totalQuestions,
    totalUserInfoQuestions,
    isComplete,
    isUserInfoComplete
  } = useDementiaAssessment();

  const handleStartAssessment = () => {
    setStep('assessment');
  };

  const handleAnswerSelect = (score: number) => {
    answerQuestion(score);
  };

  const handleUserInfoAnswerSelect = (value: string) => {
    answerUserInfoQuestion(value);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      nextQuestion();
    } else {
      setStep('userInfo');
    }
  };

  const handleUserInfoNext = () => {
    if (currentUserInfoQuestion < totalUserInfoQuestions - 1) {
      nextUserInfoQuestion();
    } else {
      const assessmentResult = calculateResult();
      setResult(assessmentResult);
      saveAssessment(assessmentResult);
      setStep('result');
    }
  };

  const handleUserInfoSkip = () => {
    const assessmentResult = calculateResult();
    setResult(assessmentResult);
    saveAssessment(assessmentResult);
    setStep('result');
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleUserInfoPrevious = () => {
    if (currentUserInfoQuestion === 0) {
      setStep('assessment');
    } else {
      previousUserInfoQuestion();
    }
  };

  const handleRestart = () => {
    resetAssessment();
    setStep('intro');
    setResult(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'KDSQ 치매 위험도 평가 결과',
        text: `치매 위험도 평가를 완료했습니다. 총점: ${result.totalScore}점`,
        url: window.location.href
      });
    }
  };

  const currentAnswer = getCurrentAnswer();
  const currentUserInfoAnswer = getCurrentUserInfoAnswer();
  const userInfoProgress = ((currentUserInfoQuestion + 1) / totalUserInfoQuestions) * 100;

  if (step === 'intro') {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-md mx-auto px-5 space-y-6">
            <Link to="/" className="flex items-center text-blue-600 mb-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              홈으로 돌아가기
            </Link>

            <div className="text-center space-y-4">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Brain className="h-10 w-10 text-blue-600" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  KDSQ 치매 위험도 평가
                </h1>
                <p className="text-gray-600">
                  간단한 질문으로 치매 위험도를 확인해보세요
                </p>
              </div>
            </div>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">평가 안내</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 총 15개의 질문으로 구성되어 있습니다</li>
                  <li>• 각 질문은 3점 척도로 평가됩니다</li>
                  <li>• 약 3-5분 정도 소요됩니다</li>
                  <li>• 결과는 즉시 확인할 수 있습니다</li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>주의사항:</strong> 이 검사는 의학적 진단을 대체할 수 없으며, 
                정확한 진단을 위해서는 전문의 상담이 필요합니다.
              </p>
            </div>

            <Button 
              onClick={handleStartAssessment}
              className="w-full h-14 text-lg font-semibold"
            >
              평가 시작하기
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (step === 'assessment') {
    return (
      <Layout>
        <MobileAssessmentCard
          question={DEMENTIA_QUESTIONS[currentQuestion].question}
          questionNumber={currentQuestion + 1}
          totalQuestions={totalQuestions}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoBack={currentQuestion > 0}
          isLastQuestion={currentQuestion === totalQuestions - 1}
        />
      </Layout>
    );
  }

  if (step === 'userInfo') {
    return (
      <Layout>
        <div className="min-h-screen bg-blue-50 flex flex-col">
          {/* 상단 20%: 진행률 + 문항번호 */}
          <div className="h-[20vh] bg-white border-b border-gray-200 p-4 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={handleUserInfoPrevious}
                className="p-3 h-12 w-12"
              >
                <ArrowLeft className="h-8 w-8" />
              </Button>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {currentUserInfoQuestion + 1} / {totalUserInfoQuestions}
                </p>
                <p className="text-sm text-gray-600 mt-1">추가 정보</p>
              </div>
              
              <Button
                variant="ghost"
                onClick={handleUserInfoSkip}
                className="text-sm text-gray-600 px-3"
              >
                건너뛰기
              </Button>
            </div>

            <Progress value={userInfoProgress} className="h-4 transition-all duration-500 ease-out" />
          </div>

          {/* 질문 및 선택 영역 */}
          <div className="flex-1">
            <UserInfoQuestion
              question={USER_INFO_QUESTIONS[currentUserInfoQuestion].question}
              options={USER_INFO_QUESTIONS[currentUserInfoQuestion].options}
              value={currentUserInfoAnswer}
              onValueChange={handleUserInfoAnswerSelect}
            />
          </div>

          {/* 다음 버튼 */}
          <div className="p-6">
            <Button
              onClick={handleUserInfoNext}
              disabled={!currentUserInfoAnswer}
              className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl disabled:opacity-50"
            >
              {currentUserInfoQuestion === totalUserInfoQuestions - 1 ? '결과 보기' : '다음'}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (step === 'result' && result) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-md mx-auto px-5 space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Brain className="h-10 w-10 text-blue-600" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  평가 완료
                </h1>
                <p className="text-gray-600">
                  KDSQ 치매 위험도 평가 결과입니다
                </p>
              </div>
            </div>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-blue-600">
                    {result.totalScore}점
                  </div>
                  
                  <div className={`text-xl font-semibold ${result.color}`}>
                    {result.riskLevel === 'normal' && '정상 범위'}
                    {result.riskLevel === 'caution' && '주의 필요'}
                    {result.riskLevel === 'high' && '전문의 상담 필요'}
                  </div>
                </div>

                <div className="space-y-3 text-center">
                  <p className="text-gray-900 font-medium">
                    {result.message}
                  </p>
                  <p className="text-gray-600">
                    {result.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>

            <DetailedResultInfo result={result} />

            <div className="space-y-3">
              <Link to="/hospital-map">
                <Button className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                  <MapPin className="h-5 w-5 mr-2" />
                  가까운 치매 전문병원 찾기
                </Button>
              </Link>

              <Button 
                onClick={openKakaoInquiry}
                className="w-full h-14 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                카카오톡으로 상세 문의하기
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                  className="h-12"
                >
                  <Share className="h-4 w-4 mr-2" />
                  결과 공유
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleRestart}
                  className="h-12"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  다시 검사
                </Button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>주의사항:</strong> 이 검사는 의학적 진단을 대체할 수 없으며, 
                정확한 진단을 위해서는 전문의 상담이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};

export default DementiaAssessment;
