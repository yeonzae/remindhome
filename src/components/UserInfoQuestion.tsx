
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface UserInfoQuestionProps {
  question: string;
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

const UserInfoQuestion = ({ question, options, value, onValueChange }: UserInfoQuestionProps) => {
  const handleOptionSelect = (optionValue: string) => {
    onValueChange(optionValue);
    
    // 진동 피드백 (지원되는 경우)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="min-h-[70vh] bg-blue-50 flex flex-col">
      {/* 질문 영역 (40%) */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full bg-white border-2 border-blue-200 p-8 min-h-[25vh] flex items-center justify-center shadow-xl">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-gray-900 leading-relaxed" style={{ lineHeight: '1.6' }}>
              {question}
            </h2>
          </div>
        </Card>
      </div>

      {/* 선택 버튼 영역 (60%) */}
      <div className="flex-1 p-6 flex flex-col justify-center space-y-4">
        {options.map((option, index) => {
          const colors = [
            { bg: 'bg-blue-500 hover:bg-blue-600', selected: 'bg-blue-700' },
            { bg: 'bg-green-500 hover:bg-green-600', selected: 'bg-green-700' },
            { bg: 'bg-purple-500 hover:bg-purple-600', selected: 'bg-purple-700' },
            { bg: 'bg-orange-500 hover:bg-orange-600', selected: 'bg-orange-700' },
            { bg: 'bg-pink-500 hover:bg-pink-600', selected: 'bg-pink-700' },
            { bg: 'bg-cyan-500 hover:bg-cyan-600', selected: 'bg-cyan-700' },
            { bg: 'bg-indigo-500 hover:bg-indigo-600', selected: 'bg-indigo-700' }
          ];
          
          const color = colors[index % colors.length];
          
          return (
            <Button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`
                w-full h-20 text-xl font-bold rounded-2xl border-2 transition-all duration-200 text-white
                ${value === option.value 
                  ? `${color.selected} border-gray-800 scale-105 shadow-lg` 
                  : `${color.bg} border-transparent hover:scale-102 shadow-md`
                }
                touch-manipulation
              `}
              style={{ minHeight: '80px', fontSize: '18px' }}
            >
              <div className="flex items-center justify-center gap-4">
                {value === option.value && (
                  <Check className="h-6 w-6" />
                )}
                <span>{option.label}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default UserInfoQuestion;
