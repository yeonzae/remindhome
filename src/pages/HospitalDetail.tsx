
import { ArrowLeft, MapPin, Phone, Clock, Star, Stethoscope, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Hospital = Tables<"hospitals">;

const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: hospital, isLoading, error } = useQuery({
    queryKey: ["hospital", id],
    queryFn: async () => {
      if (!id) throw new Error("Hospital ID is required");
      
      const { data, error } = await supabase
        .from("hospitals")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data as Hospital;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center">
            <Link to="/hospital-map" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">병원 상세정보</h1>
          </div>
        </header>
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center">
            <Link to="/hospital-map" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">병원 상세정보</h1>
          </div>
        </header>
        <div className="max-w-md mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">병원 정보를 찾을 수 없습니다.</p>
          <Link to="/hospital-map">
            <Button className="mt-4">목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const operatingHours = hospital.operating_hours as Record<string, string> || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Link to="/hospital-map" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">병원 상세정보</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* 병원 기본 정보 */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="병원 이미지" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  {hospital.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{hospital.name}</h2>
                
                {hospital.dementia_specialist && (
                  <Badge className="bg-blue-600 text-white text-xs mb-2">
                    치매관리주치의
                  </Badge>
                )}
                
                {hospital.hospital_type && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 mr-2">
                    {hospital.hospital_type}
                  </Badge>
                )}
                
                <div className="flex items-center text-sm mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-gray-900">4.9</span>
                  <span className="ml-1 text-gray-500">(리뷰 245개)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{hospital.address}</span>
              </div>
              
              {hospital.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{hospital.phone}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-green-600">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="font-medium">진료중</span>
                <span className="ml-1 text-gray-500">~18:00</span>
              </div>
            </div>
            
            {/* 액션 버튼들 */}
            <div className="flex space-x-3 mt-6">
              {hospital.phone && (
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => window.open(`tel:${hospital.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  전화
                </Button>
              )}
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <MapPin className="h-4 w-4 mr-2" />
                길찾기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 진료과목 */}
        {hospital.departments && hospital.departments.length > 0 && (
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                진료과목
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {hospital.departments.map((dept, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                    {dept}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 가능한 검사 */}
        {hospital.available_tests && hospital.available_tests.length > 0 && (
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">가능한 검사</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {hospital.available_tests.map((test, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                    {test}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 진료시간 */}
        {Object.keys(operatingHours).length > 0 && (
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                진료시간
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">{day}</span>
                    <span className="text-gray-900">{hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 병원 소개 */}
        {hospital.description && (
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">병원 소개</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 leading-relaxed">{hospital.description}</p>
            </CardContent>
          </Card>
        )}

        {/* 오시는 길 */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">오시는 길</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">지도 API 연동 예정</p>
                <p className="text-sm text-gray-500">상세한 위치 정보</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{hospital.address}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HospitalDetail;
