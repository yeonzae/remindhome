import { ArrowLeft, BookOpen, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";

const CareGuide = () => {
  const stages = [
    {
      id: "early",
      title: "초기 단계",
      icon: Heart,
      color: "green",
      description: "가벼운 기억력 장애가 나타나는 시기",
      tips: [
        "규칙적인 생활 패턴 유지하기",
        "친숙한 환경에서 생활하도록 돕기",
        "간단한 메모나 일정표 활용하기",
        "사회활동과 취미생활 지속하기",
        "가족과의 대화 시간 늘리기"
      ]
    },
    {
      id: "middle",
      title: "중기 단계",
      icon: Shield,
      color: "blue",
      description: "일상생활에 도움이 필요한 시기",
      tips: [
        "안전한 환경 조성하기 (미끄럼 방지, 문단속)",
        "간단하고 명확한 의사소통하기",
        "일상생활 도구에 라벨 붙이기",
        "배회 방지를 위한 안전장치 설치",
        "정기적인 의료진 상담받기"
      ]
    },
    {
      id: "late",
      title: "말기 단계",
      icon: Users,
      color: "purple",
      description: "전면적인 돌봄이 필요한 시기",
      tips: [
        "욕창 예방을 위한 체위 변경",
        "영양 상태 관리 및 연하곤란 주의",
        "감염 예방 및 위생 관리",
        "편안한 환경 조성",
        "가족과 보호자의 심리적 지원"
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-md mx-auto px-6 py-5 flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900">
              치매 돌봄 가이드
            </h1>
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 py-8 space-y-8">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 text-xl">
                <BookOpen className="h-7 w-7 mr-3" />
                단계별 돌봄 가이드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 text-sm font-medium leading-relaxed">
                치매는 진행 단계에 따라 필요한 돌봄 방법이 달라집니다. 
                각 단계별 특징과 돌봄 요령을 확인해보세요.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="space-y-5">
            {stages.map((stage) => {
              const IconComponent = stage.icon;
              const colorClasses = {
                green: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50",
                blue: "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50",
                purple: "border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50"
              };
              
              return (
                <AccordionItem key={stage.id} value={stage.id} className="border-none">
                  <Card className={`${colorClasses[stage.color as keyof typeof colorClasses]} transition-all duration-300`}>
                    <AccordionTrigger className="px-6 py-5 hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          stage.color === 'green' ? 'from-emerald-500 to-emerald-600' :
                          stage.color === 'blue' ? 'from-blue-500 to-blue-600' :
                          'from-purple-500 to-purple-600'
                        } shadow-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {stage.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-2">
                        <h4 className="font-bold text-gray-900 text-base">
                          돌봄 요령
                        </h4>
                        <ul className="space-y-3">
                          {stage.tips.map((tip, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <span className="text-blue-600 mt-1 font-bold">•</span>
                              <span className="text-sm text-gray-700 font-medium leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* 응급상황 대응 */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
            <CardHeader>
              <CardTitle className="text-red-800 text-xl font-bold">응급상황 대응</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h4 className="font-bold text-red-800 mb-3 text-base">환자 실종 시</h4>
                <ul className="text-sm text-red-700 space-y-2 font-medium">
                  <li>• 즉시 112 신고</li>
                  <li>• 최근 사진과 신상정보 준비</li>
                  <li>• 평소 자주 가던 장소 확인</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-800 mb-3 text-base">의료 응급상황</h4>
                <ul className="text-sm text-red-700 space-y-2 font-medium">
                  <li>• 의식 잃음: 즉시 119 신고</li>
                  <li>• 심한 낙상: 함부로 움직이지 말고 전문의 상담</li>
                  <li>• 복용 약물 정보 항상 준비</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 유용한 연락처 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800 text-xl font-bold">유용한 연락처</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-900">치매상담콜센터</span>
                <span className="text-blue-600 font-bold">1899-9988</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-900">장기요양보험</span>
                <span className="text-blue-600 font-bold">1577-1000</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-bold text-gray-900">응급실종신고</span>
                <span className="text-red-600 font-bold">112</span>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </Layout>
  );
};

export default CareGuide;
