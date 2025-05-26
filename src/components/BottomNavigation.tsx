
import { Home, Users, Calculator, BookOpen, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: Home,
      label: "홈",
      path: "/",
    },
    {
      icon: MessageSquare,
      label: "병원",
      path: "/hospital-map",
    },
    {
      icon: Calculator,
      label: "계산",
      path: "/cost-calculator",
    },
    {
      icon: BookOpen,
      label: "가이드",
      path: "/care-guide",
    },
    {
      icon: Users,
      label: "커뮤니티",
      path: "/community",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[64px]",
                  isActive 
                    ? "text-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <IconComponent 
                  className={cn(
                    "h-6 w-6 mb-1 transition-all duration-200",
                    isActive && "scale-110"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs font-medium transition-all duration-200",
                    isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
