
import { useState } from "react";
import { UserData } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseForm from "./ExpenseForm";
import ExpenseSummary from "./ExpenseSummary";
import Analysis from "./Analysis";
import { LogOut } from "lucide-react";

interface DashboardProps {
  userData: UserData;
  onLogout: () => void;
}

const Dashboard = ({ userData, onLogout }: DashboardProps) => {
  const [currentData, setCurrentData] = useState(userData);
  
  const updateExpenses = (expenses: { category: string; amount: number }[]) => {
    setCurrentData({ ...currentData, expenses });
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{currentData.userType} Dashboard</h2>
          <p className="text-blue-100">{currentData.name} | {currentData.phone}</p>
        </div>
        <Button variant="outline" onClick={onLogout} className="text-white border-white hover:bg-blue-700">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
      
      <div className="p-6">
        <div className="mb-6 bg-blue-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-800">
            {currentData.userType === "Student" ? "Weekly Pocket Money" : "Monthly Salary"}:
            <span className="ml-2 font-bold">₹{currentData.income.toFixed(2)}</span>
          </h3>
        </div>
        
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="expenses">Add Expenses</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses">
            <ExpenseForm 
              userType={currentData.userType} 
              onSubmit={updateExpenses}
              currentExpenses={currentData.expenses}
            />
          </TabsContent>
          
          <TabsContent value="summary">
            <ExpenseSummary userData={currentData} />
          </TabsContent>
          
          <TabsContent value="analysis">
            <Analysis userData={currentData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
