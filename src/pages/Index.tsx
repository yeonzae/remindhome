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
        <header className="bg-white py-4 border-b border-gray-100">
          <div className="max-w-md mx-auto px-5 h-[52px] flex items-center justify-between">
            <h1 className="text-[17px] font-semibold text-gray-900">
              치매케어
            </h1>
            <button className="text-[15px] text-gray-500 font-medium">
              로그인
            </button>
          </div>
        </header>

        <main className="max-w-md mx-auto px-5 pb-8">
          {/* 메인 섹션 */}
          <div className="mt-12 mb-10 space-y-3">
            <h2 className="text-[22px] font-semibold text-gray-900 leading-tight">
              치매 걱정 없이{"\n"}
              건강한 노후를 준비하세요
            </h2>
            <p className="text-[15px] text-gray-500">
              간단한 체크부터 병원 찾기까지 한번에
            </p>
          </div>

          {/* 메인 CTA */}
          <div className="space-y-2">
            <Link to="/dementia-assessment">
              <Button className="w-full h-[52px] bg-blue-500 hover:bg-blue-600 text-[17px] font-medium rounded-xl transition-colors">
                치매 위험도 체크하기
              </Button>
            </Link>
            <p className="text-[13px] text-gray-400 text-center">
              무료 · 3분 소요
            </p>
          </div>

          {/* 퀵 메뉴 */}
          <div className="mt-16 space-y-3">
            <h3 className="text-[15px] font-medium text-gray-500 mb-4">
              빠른 메뉴
            </h3>
            
            <Link to="/hospital-map">
              <Card className="bg-white hover:bg-gray-50 transition-colors border-gray-100">
                <CardContent className="flex items-center p-5">
                  <div className="mr-4 p-2.5 bg-blue-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium text-gray-900">병원찾기</h4>
                    <p className="text-[13px] text-gray-500">가까운 치매 전문병원 찾기</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/cost-calculator">
              <Card className="bg-white hover:bg-gray-50 transition-colors border-gray-100">
                <CardContent className="flex items-center p-5">
                  <div className="mr-4 p-2.5 bg-blue-50 rounded-lg">
                    <Calculator className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium text-gray-900">비용계산</h4>
                    <p className="text-[13px] text-gray-500">장기요양보험 비용 계산하기</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/care-guide">
              <Card className="bg-white hover:bg-gray-50 transition-colors border-gray-100">
                <CardContent className="flex items-center p-5">
                  <div className="mr-4 p-2.5 bg-blue-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium text-gray-900">가이드</h4>
                    <p className="text-[13px] text-gray-500">단계별 치매 돌봄 가이드</p>
                  </div>
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