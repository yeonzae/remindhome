
import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const Layout = ({ children, showBottomNav = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <div className={showBottomNav ? "pb-20" : ""}>
        {children}
      </div>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
