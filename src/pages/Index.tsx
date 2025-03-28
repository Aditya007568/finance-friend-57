
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserRegistration from "@/components/UserRegistration";
import Dashboard from "@/components/Dashboard";
import { toast } from "sonner";

export type UserType = "Student" | "Employee" | null;
export type ExpenseData = {
  category: string;
  amount: number;
};

export type UserData = {
  name: string;
  phone: string;
  income: number;
  expenses: ExpenseData[];
  userType: UserType;
};

const Index = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (data: UserData) => {
    setUserData(data);
    setIsRegistered(true);
    toast.success("Registration successful!");
  };

  const handleLogout = () => {
    setUserData(null);
    setIsRegistered(false);
    setUserType(null);
    toast.info("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Personal Spend Tracker
        </h1>

        {!userType && !isRegistered ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Choose User Type</h2>
            <div className="flex flex-col gap-4">
              <Button 
                className="py-6 bg-blue-600 hover:bg-blue-700"
                onClick={() => setUserType("Student")}
              >
                I am a Student
              </Button>
              <Button 
                className="py-6 bg-green-600 hover:bg-green-700"
                onClick={() => setUserType("Employee")}
              >
                I am an Employee
              </Button>
            </div>
          </div>
        ) : !isRegistered ? (
          <UserRegistration 
            userType={userType as UserType} 
            onRegister={handleRegister}
            onBack={() => setUserType(null)}
          />
        ) : (
          <Dashboard 
            userData={userData as UserData}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
