
import { Search, MapPin, Calculator, BookOpen, MessageSquare, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* 헤더 */}
        <header className="bg-white py-4">
          <div className="max-w-md mx-auto px-4 h-[60px] flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900">
              치매케어
            </h1>
            <button className="text-base text-gray-600">
              로그인
            </button>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 pb-8 space-y-8">
          {/* 메인 섹션 */}
          <div className="text-center space-y-2 mt-6">
            <h2 className="text-2xl font-bold text-gray-900">
              치매 걱정, 이제 혼자 하지 마세요
            </h2>
            <p className="text-base text-gray-600">
              간단한 체크부터 병원 찾기까지
            </p>
          </div>

          {/* 메인 CTA */}
          <div className="mt-10">
            <Link to="/dementia-assessment" className="block">
              <Button className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:from-blue-600 hover:to-blue-700 transition-all duration-200 active:scale-95">
                3분 치매 위험도 체크하기
              </Button>
            </Link>
          </div>

          {/* 퀵 메뉴 - 1x3 가로 배치 */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Link to="/hospital-map">
              <Card className="aspect-square bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-all duration-200 active:scale-95">
                <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center space-y-2">
                  <div className="text-3xl">🏥</div>
                  <h4 className="text-sm font-bold text-gray-900">병원 찾기</h4>
                </CardContent>
              </Card>
            </Link>

            <Link to="/cost-calculator">
              <Card className="aspect-square bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-all duration-200 active:scale-95">
                <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center space-y-2">
                  <div className="text-3xl">💰</div>
                  <h4 className="text-sm font-bold text-gray-900">돌봄비용 계산</h4>
                </CardContent>
              </Card>
            </Link>

            <Link to="/care-guide">
              <Card className="aspect-square bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-all duration-200 active:scale-95">
                <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center space-y-2">
                  <div className="text-3xl">📋</div>
                  <h4 className="text-sm font-bold text-gray-900">보호자 가이드</h4>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Index;
