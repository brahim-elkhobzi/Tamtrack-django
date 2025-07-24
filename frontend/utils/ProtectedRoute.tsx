"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton"

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "president" | "manager" | "hr" | "head_department" | "collaborator"; // Define role explicitly
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if authentication is completed
    if (!loading) {
      if (!user) {
        console.log("Protected route: User not authenticated, redirecting to login");
        router.push("/login");
      } else if (user.role !== role) {
        console.log("Protected route: User does not have the correct role, redirecting");
        router.push("/login"); // Redirect to unauthorized or appropriate page
      } else {
        console.log("Protected route: User authenticated with correct role", user);
      }
    }
  }, [user, loading, router, role]);

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex h-screen">
    {/* Left Sidebar - using the blue color scheme from Tamtech Edu */}
    <div className="w-64  text-white">
      <div className="space-y-3 p-4"> 
        <Skeleton className="h-8 w-[200px]" /> 
      </div>
      <Skeleton className="h-full w-full " /> 
    </div>
    
    {/* Main Content Area */}
    <div className="flex flex-col flex-grow">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        <Skeleton className="h-8 w-[250px]" />
        <div className="flex space-x-8">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="p-6 bg-gray-50 flex-grow">
        <div className="mb-6">
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  </div>;
  }

  // If the user is authenticated and has the correct role, render the children
  return user && user.role === role ? <>{children}</> : null;
};

export default ProtectedRoute;
