import { ArrowLeft, MessageSquare, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const QnA = () => {
  const questions = [
    {
      id: 1,
      title: "치매 초기 증상은 어떤 것들이 있나요?",
      content: "어머니가 최근 들어 자꾸 같은 말을 반복하시고...",
      author: "김**",
      date: "2024-01-20",
      replies: 3,
      category: "증상"
    },
    {
      id: 2,
      title: "장기요양보험 신청 절차가 궁금합니다",
      content: "아버지 치매 진단을 받았는데 장기요양보험...",
      author: "이**",
      date: "2024-01-19",
      replies: 5,
      category: "제도"
    },
    {
      id: 3,
      title: "치매 환자 배회 방지 방법 있을까요?",
      content: "밤에 자꾸 나가려고 해서 걱정이 많습니다...",
      author: "박**",
      date: "2024-01-18",
      replies: 8,
      category: "돌봄"
    },
    {
      id: 4,
      title: "좋은 요양원 선택 기준이 있나요?",
      content: "어머니를 모실 요양원을 찾고 있는데...",
      author: "최**",
      date: "2024-01-17",
      replies: 12,
      category: "시설"
    }
  ];

  const categories = ["전체", "증상", "돌봄", "제도", "시설", "기타"];

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
              보호자 QnA
            </h1>
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 py-8 space-y-8">
          {/* 검색 및 글쓰기 */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="궁금한 내용을 검색해보세요"
                  className="pl-12"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                <Plus className="h-5 w-5 mr-2" />
                질문하기
              </Button>
            </CardContent>
          </Card>

          {/* 카테고리 */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "전체" ? "default" : "outline"}
                className={`px-4 py-2 whitespace-nowrap cursor-pointer font-medium transition-all duration-200 ${
                  category === "전체" 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* 인기 질문 */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-orange-800 text-lg font-bold">
                🔥 이번 주 인기 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-orange-700 font-medium mb-2">
                "치매 환자 목욕시키는 방법이 궁금해요"
              </p>
              <p className="text-xs text-orange-600 font-medium">답변 15개</p>
            </CardContent>
          </Card>

          {/* 질문 목록 */}
          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id} className="cursor-pointer group">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge 
                        variant="outline" 
                        className="text-xs border-blue-300 text-blue-600 font-medium"
                      >
                        {question.category}
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium">{question.date}</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 leading-6 group-hover:text-blue-600 transition-colors duration-200">
                      {question.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 font-medium">
                      {question.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">
                        작성자: {question.author}
                      </span>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm text-emerald-600 font-semibold">
                          {question.replies}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 공지사항 */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-blue-800 text-lg font-bold">
                📢 공지사항
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-blue-700 space-y-2 font-medium">
                <li>• QnA 게시판 이용 규칙을 확인해주세요</li>
                <li>• 의료 상담은 전문의와 상담받으시기 바랍니다</li>
                <li>• 개인정보 보호를 위해 실명 공개는 삼가해주세요</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </Layout>
  );
};

export default QnA;
