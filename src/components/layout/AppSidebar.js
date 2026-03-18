'use client';
import LogoutButton from "@/components/buttons/LogoutButton";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faChartLine, faGlobe, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();
  
  const NavItem = ({ href, icon, label, isActive }) => (
    <Link
      href={href}
      className={`
        group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 transform md:hover:scale-[1.02] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${isActive 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
          : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-md'
        }
      `}
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-sm"></div>
      )}
      <FontAwesomeIcon
        fixedWidth={true}
        icon={icon}
        className={`w-4 h-4 transition-all duration-300 relative z-10 ${
          isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
        }`}
      />
      <span className={`font-semibold text-sm relative z-10 ${
        isActive ? 'text-white' : 'text-gray-700 group-hover:text-blue-700'
      }`}>
        {label}
      </span>
      {isActive && (
        <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80 relative z-10"></div>
      )}
    </Link>
  );

  return (
    <nav className="flex flex-col w-full space-y-3">
      {/* Navigation Items */}
      <div className="space-y-2 mb-6">
        <NavItem
          href="/account"
          icon={faFileLines}
          label="Dashboard"
          isActive={path === '/account'}
        />
        <NavItem
          href="/analytics"
          icon={faChartLine}
          label="Analytics"
          isActive={path === '/analytics'}
        />
      </div>

      {/* Logout Section */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <LogoutButton
          iconLeft={true}
          className="w-full flex gap-3 items-center justify-center text-gray-600 bg-gray-50 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-all duration-300 transform md:hover:scale-[1.02] shadow-sm hover:shadow-lg group"
          iconClasses="w-4 h-4 transition-all duration-300"
        />
      </div>
      
      {/* Back to Website Section */}
      <div className="border-t border-gray-100 pt-4">
        <Link 
          href="/" 
          className="group flex items-center justify-center gap-3 text-gray-600 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-600 hover:to-purple-600 hover:text-white p-3 rounded-xl transition-all duration-300 transform md:hover:scale-[1.02] shadow-sm hover:shadow-lg relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <FontAwesomeIcon 
            icon={faGlobe} 
            className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-1 relative z-10" 
          />
          <span className="font-semibold text-sm relative z-10">Back to Website</span>
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-all duration-300 relative z-10" 
          />
        </Link>
      </div>
    </nav>
  );
}
