import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  DocumentTextIcon,
  CogIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
  XMarkIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userRole = "user";

  const navItems = [
    { path: "/dashboard/user/my-reviews", label: "My Reviews", icon: DocumentTextIcon },
    { path: "/dashboard/user/my-services", label: "My Services", icon: CogIcon },
    { path: "/dashboard/user/add-service", label: "Add Service", icon: PlusCircleIcon },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg border-r border-gray-200">
        <SidebarContent navItems={navItems} isActiveLink={isActiveLink} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar panel */}
        <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col z-50">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          <SidebarContent navItems={navItems} isActiveLink={isActiveLink} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">User Dashboard</h1>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Sidebar component
function SidebarContent({ navItems, isActiveLink }) {
  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        <div className="flex items-center mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Online</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActiveLink(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-5 w-5 mr-3 ${
                  active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
    </>
  );
}
