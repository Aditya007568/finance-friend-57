
import { UserData } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ExpenseSummaryProps {
  userData: UserData;
}

const ExpenseSummary = ({ userData }: ExpenseSummaryProps) => {
  const totalExpenses = userData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = userData.income - totalExpenses;
  const usagePercentage = Math.min(100, (totalExpenses / userData.income) * 100);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
  // Prepare data for pie chart
  const pieData = userData.expenses.map((expense, index) => ({
    name: expense.category,
    value: expense.amount,
    color: COLORS[index % COLORS.length]
  }));
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">Expense Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">
                {userData.userType === "Student" ? "Weekly Pocket Money" : "Monthly Salary"}:
              </span>
              <span className="font-bold">₹{userData.income.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Expenses:</span>
              <span className="font-bold text-red-600">₹{totalExpenses.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="font-medium">Remaining Balance:</span>
              <span className={`font-bold ${remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{remainingBalance.toFixed(2)}
              </span>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Budget Usage</span>
                <span className="text-sm font-medium">{usagePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {userData.expenses.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Detailed breakdown */}
            <div className="mt-4 border-t pt-4">
              <h4 className="font-medium mb-2">Detailed Breakdown</h4>
              <div className="space-y-2">
                {userData.expenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span>{expense.category}</span>
                    </div>
                    <span className="font-medium">₹{expense.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No expenses recorded yet. Add your expenses to see a breakdown.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseSummary;
