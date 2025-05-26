
import { ArrowLeft, Calculator, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CostCalculator = () => {
  const [grade, setGrade] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const serviceOptions = [
    { id: "home-care", label: "방문요양", hourlyRate: 25000 },
    { id: "day-care", label: "주간보호", dailyRate: 45000 },
    { id: "bath-service", label: "방문목욕", perVisit: 85000 },
    { id: "nursing-care", label: "방문간호", perVisit: 55000 },
    { id: "facility-care", label: "시설급여 (요양원)", monthlyRate: 820000 }
  ];

  const gradeInfo: any = {
    "1": { monthlyLimit: 1810700, name: "1등급 (가장 중증)" },
    "2": { monthlyLimit: 1596300, name: "2등급" },
    "3": { monthlyLimit: 1384900, name: "3등급" },
    "4": { monthlyLimit: 1173500, name: "4등급" },
    "5": { monthlyLimit: 962100, name: "5등급" },
    "cognitive": { monthlyLimit: 576600, name: "인지지원등급" }
  };

  const calculateCost = () => {
    if (!grade || selectedServices.length === 0) return;

    let totalMonthlyCost = 0;
    const serviceBreakdown: any[] = [];

    selectedServices.forEach(serviceId => {
      const service = serviceOptions.find(s => s.id === serviceId);
      if (!service) return;

      let serviceCost = 0;
      let description = "";

      switch (serviceId) {
        case "home-care":
          serviceCost = service.hourlyRate * 20 * 4; // 20시간/주 * 4주
          description = "월 80시간 기준";
          break;
        case "day-care":
          serviceCost = service.dailyRate * 20; // 월 20일 이용
          description = "월 20일 이용 기준";
          break;
        case "bath-service":
          serviceCost = service.perVisit * 4; // 주 1회
          description = "주 1회 이용 기준";
          break;
        case "nursing-care":
          serviceCost = service.perVisit * 8; // 월 8회
          description = "월 8회 이용 기준";
          break;
        case "facility-care":
          serviceCost = service.monthlyRate;
          description = "월 이용료";
          break;
      }

      totalMonthlyCost += serviceCost;
      serviceBreakdown.push({
        name: service.label,
        cost: serviceCost,
        description
      });
    });

    const monthlyLimit = gradeInfo[grade].monthlyLimit;
    const finalCost = Math.min(totalMonthlyCost, monthlyLimit);
    const userPayment = Math.floor(finalCost * 0.15); // 15% 본인부담
    const insurancePayment = finalCost - userPayment;

    setResult({
      total: finalCost,
      user: userPayment,
      insurance: insurancePayment,
      monthlyLimit,
      services: serviceBreakdown,
      isOverLimit: totalMonthlyCost > monthlyLimit
    });
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">
            돌봄비용 계산기
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="shadow-lg border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Calculator className="h-6 w-6 mr-2" />
              장기요양보험 비용 계산
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                장기요양등급
              </label>
              <Select onValueChange={setGrade}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="등급을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1등급 (가장 중증)</SelectItem>
                  <SelectItem value="2">2등급</SelectItem>
                  <SelectItem value="3">3등급</SelectItem>
                  <SelectItem value="4">4등급</SelectItem>
                  <SelectItem value="5">5등급</SelectItem>
                  <SelectItem value="cognitive">인지지원등급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                이용하고 싶은 서비스 (복수 선택 가능)
              </label>
              <div className="space-y-3">
                {serviceOptions.map((service) => (
                  <div key={service.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => 
                        handleServiceChange(service.id, !!checked)
                      }
                      className="h-5 w-5"
                    />
                    <label 
                      htmlFor={service.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                    >
                      {service.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={calculateCost}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg"
              disabled={!grade || selectedServices.length === 0}
            >
              비용 계산하기
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="shadow-lg border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">월간 예상 비용</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="mb-4">
                    <span className="text-sm text-gray-600 block mb-1">총 예상 비용</span>
                    <span className="text-3xl font-bold text-blue-800">
                      {result.total.toLocaleString()}원
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-3 rounded">
                      <span className="text-xs text-gray-600 block">본인부담금 (15%)</span>
                      <span className="text-xl font-bold text-red-600">
                        {result.user.toLocaleString()}원
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="text-xs text-gray-600 block">보험지원금</span>
                      <span className="text-xl font-bold text-green-600">
                        {result.insurance.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                {result.isOverLimit && (
                  <div className="bg-orange-50 p-3 rounded text-center">
                    <p className="text-sm text-orange-700">
                      선택한 서비스의 총 비용이 등급별 한도를 초과했습니다.
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      월 한도액: {result.monthlyLimit.toLocaleString()}원
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">선택한 서비스</h4>
                  {result.services.map((service: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium">{service.name}</span>
                        <span className="text-gray-500 text-xs block">{service.description}</span>
                      </div>
                      <span className="font-medium">{service.cost.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-green-200">
              <CardContent className="p-4">
                <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  이 비용으로 이용가능한 서비스 찾기
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        <Card className="shadow-md border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">
              💡 알아두세요
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 장기요양등급 판정은 국민건강보험공단에서 받으실 수 있습니다</li>
              <li>• 등급 판정 신청: ☎ 1577-1000</li>
              <li>• 온라인 신청: www.longtermcare.or.kr</li>
              <li>• 실제 비용은 지역과 기관에 따라 차이가 있을 수 있습니다</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CostCalculator;
