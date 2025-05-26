
import { ArrowLeft, MessageSquare, Search, Plus, Heart, MessageCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const Community = () => {
  const posts = [
    {
      id: 1,
      title: "어머니 치매 진단 받고 처음 글 올립니다",
      content: "벌써 3개월째인데 아직도 받아들이기가 힘드네요. 다른 분들은 어떻게 마음을 다잡으셨는지...",
      author: "김**",
      date: "2시간 전",
      likes: 12,
      comments: 8,
      isPopular: true
    },
    {
      id: 2,
      title: "아버지가 자꾸 밖으로 나가려고 해요",
      content: "요즘 들어 밤낮 가리지 않고 나가려고 하셔서 잠을 제대로 못 자겠어요. 좋은 방법 없을까요?",
      author: "박**",
      date: "5시간 전",
      likes: 8,
      comments: 15,
      isPopular: false
    },
    {
      id: 3,
      title: "데이케어센터 추천해주세요 (서울 강남)",
      content: "집 근처에 좋은 데이케어센터를 찾고 있습니다. 직접 이용해보신 분들의 후기가 궁금해요.",
      author: "이**",
      date: "1일 전",
      likes: 5,
      comments: 12,
      isPopular: false
    },
    {
      id: 4,
      title: "치매 진행 속도가 너무 빨라요",
      content: "올해 초에 경증으로 진단받았는데 벌써 중등도까지 진행됐다고 하네요. 이런 경우가 많나요?",
      author: "최**",
      date: "2일 전",
      likes: 18,
      comments: 23,
      isPopular: true
    },
    {
      id: 5,
      title: "보호자 모임 참여하고 싶어요",
      content: "혼자서는 너무 힘든 것 같아서 같은 상황의 보호자분들과 만나고 싶습니다.",
      author: "정**",
      date: "3일 전",
      likes: 22,
      comments: 19,
      isPopular: true
    }
  ];

  const categories = ["전체", "일상돌봄", "의료정보", "제도안내", "감정나눔", "자유주제"];

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
              보호자 커뮤니티
            </h1>
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 py-8 space-y-6">
          {/* 검색 및 글쓰기 */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="검색어를 입력하세요"
                  className="pl-12"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <Plus className="h-5 w-5 mr-2" />
                새 글 쓰기
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
                    ? "bg-purple-600 text-white hover:bg-purple-700" 
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* 인기글 안내 */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-800 text-lg font-bold flex items-center">
                🔥 <span className="ml-2">인기글</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-orange-700 font-medium">
                따뜻한 응원과 유용한 정보가 가득한 글들이에요
              </p>
            </CardContent>
          </Card>

          {/* 게시글 목록 */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="cursor-pointer group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {post.isPopular && (
                          <Badge className="bg-red-100 text-red-600 border-red-200 text-xs">
                            인기
                          </Badge>
                        )}
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 leading-6 group-hover:text-purple-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 font-medium">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-600 font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600 font-medium">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 커뮤니티 가이드 */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 text-lg font-bold">
                💙 커뮤니티 가이드
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-blue-700 space-y-2 font-medium">
                <li>• 서로를 존중하며 따뜻한 마음으로 소통해요</li>
                <li>• 개인정보 보호를 위해 실명은 사용하지 마세요</li>
                <li>• 의료 상담은 전문의와 상담받으시기 바랍니다</li>
                <li>• 광고성 글이나 부적절한 내용은 삭제됩니다</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </Layout>
  );
};

export default Community;
