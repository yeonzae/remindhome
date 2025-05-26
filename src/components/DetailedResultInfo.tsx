
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Users } from 'lucide-react';
import { AssessmentResult } from '@/hooks/useDementiaAssessment';

interface DetailedResultInfoProps {
  result: AssessmentResult;
}

const DetailedResultInfo = ({ result }: DetailedResultInfoProps) => {
  if (!result.detailedInfo || result.riskLevel === 'normal') {
    return null;
  }

  return (
    <div className="space-y-4">
      {result.detailedInfo.nextSteps && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              다음 단계로 해야 할 일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.detailedInfo.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 font-semibold">{index + 1}.</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.detailedInfo.hospitalPreparation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-green-600" />
              병원 방문 시 준비사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.detailedInfo.hospitalPreparation.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.detailedInfo.familyDiscussion && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-purple-600" />
              가족과 상의할 내용
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.detailedInfo.familyDiscussion.map((topic, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DetailedResultInfo;
