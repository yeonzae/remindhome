
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UserInfo } from '@/hooks/useDementiaAssessment';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  onSkip: () => void;
}

const UserInfoForm = ({ onSubmit, onSkip }: UserInfoFormProps) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = () => {
    onSubmit({ age, gender, region });
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          추가 정보 (선택사항)
        </CardTitle>
        <p className="text-sm text-gray-600">
          더 정확한 분석을 위해 기본 정보를 입력해주세요
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">연령대</Label>
          <RadioGroup value={age} onValueChange={setAge}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50대" id="50s" />
              <Label htmlFor="50s">50대</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60대" id="60s" />
              <Label htmlFor="60s">60대</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="70대" id="70s" />
              <Label htmlFor="70s">70대</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="80대 이상" id="80s" />
              <Label htmlFor="80s">80대 이상</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">성별</Label>
          <RadioGroup value={gender} onValueChange={setGender}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="남성" id="male" />
              <Label htmlFor="male">남성</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="여성" id="female" />
              <Label htmlFor="female">여성</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">거주 지역</Label>
          <RadioGroup value={region} onValueChange={setRegion}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="서울" id="seoul" />
              <Label htmlFor="seoul">서울</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="경기" id="gyeonggi" />
              <Label htmlFor="gyeonggi">경기</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="기타" id="others" />
              <Label htmlFor="others">기타</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" onClick={onSkip} className="h-12">
            건너뛰기
          </Button>
          <Button onClick={handleSubmit} className="h-12">
            완료
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
