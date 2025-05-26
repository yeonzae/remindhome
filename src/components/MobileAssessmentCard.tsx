
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check } from 'lucide-react';

interface MobileAssessmentCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer?: number;
  onAnswer: (score: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
}

const MobileAssessmentCard = ({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuestion
}: MobileAssessmentCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(currentAnswer);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setSelectedAnswer(currentAnswer);
  }, [currentAnswer]);

  const handleAnswerSelect = (score: number) => {
    setSelectedAnswer(score);
    onAnswer(score);
    
    // 진동 피드백 (지원되는 경우)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      onNext();
      setIsAnimating(false);
    }, 500);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  const buttonOptions = [
    { 
      score: 0, 
      label: '없어요', 
      bgColor: 'bg-green-500 hover:bg-green-600', 
      selectedColor: 'bg-green-700',
      textColor: 'text-white' 
    },
    { 
      score: 1, 
      label: '가끔 있어요', 
      bgColor: 'bg-orange-500 hover:bg-orange-600', 
      selectedColor: 'bg-orange-700',
      textColor: 'text-white' 
    },
    { 
      score: 2, 
      label: '자주 있어요', 
      bgColor: 'bg-red-500 hover:bg-red-600', 
      selectedColor: 'bg-red-700',
      textColor: 'text-white' 
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* 상단 20%: 진행률 + 문항번호 */}
      <div className="h-[20vh] bg-white border-b border-gray-200 p-4 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="p-3 h-12 w-12"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {questionNumber} / {totalQuestions}
            </p>
            <p className="text-sm text-gray-600 mt-1">문항</p>
          </div>
          
          <div className="w-12" />
        </div>

        <Progress 
          value={progress} 
          className="h-4 transition-all duration-500 ease-out" 
        />
      </div>

      {/* 중간 40%: 질문 영역 */}
      <div className="h-[40vh] p-6 flex items-center justify-center">
        <Card 
          className={`
            w-full bg-white border-2 border-blue-200 p-8 min-h-[30vh] flex items-center justify-center
            transition-all duration-500 ease-out shadow-xl
            ${isAnimating ? 'transform -translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'}
          `}
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🤔</div>
            <h2 className="text-xl font-bold text-gray-900 leading-relaxed" style={{ lineHeight: '1.6' }}>
              {question}
            </h2>
          </div>
        </Card>
      </div>

      {/* 하단 40%: 선택 버튼 영역 */}
      <div className="h-[40vh] p-6 flex flex-col justify-center space-y-4">
        {buttonOptions.map(({ score, label, bgColor, selectedColor, textColor }) => (
          <Button
            key={score}
            onClick={() => handleAnswerSelect(score)}
            className={`
              w-full h-20 text-xl font-bold rounded-2xl border-2 transition-all duration-200
              ${selectedAnswer === score 
                ? `${selectedColor} border-gray-800 scale-105 shadow-lg` 
                : `${bgColor} border-transparent hover:scale-102 shadow-md`
              }
              ${textColor}
              touch-manipulation
            `}
            style={{ minHeight: '80px', fontSize: '18px' }}
          >
            <div className="flex items-center justify-center gap-4">
              {selectedAnswer === score && (
                <Check className="h-6 w-6" />
              )}
              <span>{label}</span>
            </div>
          </Button>
        ))}

        {/* 마지막 문항에서 추가 정보 입력 버튼 */}
        {selectedAnswer !== undefined && isLastQuestion && (
          <div className="mt-6">
            <Button
              onClick={onNext}
              className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl"
            >
              추가 정보 입력
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAssessmentCard;
