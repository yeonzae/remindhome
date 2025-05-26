
import { ArrowLeft, MapPin, Phone, Navigation, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useHospitals } from "@/hooks/useHospitals";

const HospitalMap = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const { data: hospitals = [], isLoading, error } = useHospitals({
    specialty: selectedFilter,
  });

  const filters = [
    { value: "all", label: "전체" },
    { value: "dementia-doctor", label: "치매관리주치의" },
    { value: "neurology", label: "신경과" },
    { value: "psychiatry", label: "정신건강의학과" }
  ];

  if (error) {
    console.error("Hospital loading error:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">
            치매 전문병원 찾기
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* 지도 영역 */}
        <div className="px-4 py-4">
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">지도 API 연동 예정</p>
                  <p className="text-sm text-gray-500">현재 위치 기반 검색</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 필터 탭 */}
        <div className="px-4 mb-4">
          <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
              {filters.map((filter) => (
                <TabsTrigger 
                  key={filter.value} 
                  value={filter.value}
                  className="text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* 검색 결과 */}
        <div className="px-4 pb-24">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {isLoading ? "로딩 중..." : `검색 결과 ${hospitals.length}곳`}
            </h2>
          </div>
          
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-32 bg-white">
                  <CardContent className="p-4 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8 text-center">
                <p className="text-red-600 mb-2">데이터를 불러오는 중 오류가 발생했습니다</p>
                <p className="text-sm text-red-500">잠시 후 다시 시도해주세요</p>
              </CardContent>
            </Card>
          )}
          
          {!isLoading && !error && (
            <div className="space-y-3">
              {hospitals.map((hospital) => (
                <Card key={hospital.id} className="bg-white border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      {/* 프로필 이미지 */}
                      <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder.svg" alt="의사 프로필" />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                            {hospital.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      {/* 병원 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {hospital.name}
                            </h3>
                            {hospital.dementia_specialist && (
                              <Badge className="bg-blue-600 text-white text-xs mb-2">
                                치매관리주치의
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-1 mb-3">
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            {hospital.address}
                          </p>
                          
                          <div className="flex items-center text-sm text-green-600">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="font-medium">진료중</span>
                            <span className="ml-1 text-gray-500">~18:00</span>
                          </div>
                          
                          {hospital.specialty && (
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                {hospital.specialty}
                              </Badge>
                            </div>
                          )}
                          
                          <div className="flex items-center text-sm">
                            <div className="flex items-center mr-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 font-medium text-gray-900">4.9</span>
                            </div>
                            <span className="text-gray-500">(리뷰 245개)</span>
                          </div>
                        </div>
                        
                        {/* 액션 버튼들 */}
                        <div className="flex space-x-2">
                          {hospital.phone && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                              onClick={() => window.open(`tel:${hospital.phone}`)}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              전화
                            </Button>
                          )}
                          <Link to={`/hospital/${hospital.id}`} className="flex-1">
                            <Button 
                              size="sm" 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
                            >
                              상세보기
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !error && hospitals.length === 0 && (
            <Card className="bg-white">
              <CardContent className="p-8 text-center">
                <p className="text-gray-600 mb-2">검색 결과가 없습니다</p>
                <p className="text-sm text-gray-500">다른 필터 조건으로 검색해보세요</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default HospitalMap;
