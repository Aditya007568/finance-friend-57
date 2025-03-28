
import { UserData } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, TrendingUp, PiggyBank } from "lucide-react";

interface AnalysisProps {
  userData: UserData;
}

const Analysis = ({ userData }: AnalysisProps) => {
  const { userType, income, expenses } = userData;
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = income - totalExpenses;
  const savingsPercentage = (savings / income) * 100;
  
  // Find highest spending category
  let highestCategory = { category: "", amount: 0 };
  expenses.forEach(expense => {
    if (expense.amount > highestCategory.amount) {
      highestCategory = expense;
    }
  });
  
  // Check if savings/investments exist (for employees)
  const hasSavingsCategory = userType === "Employee" && 
    expenses.some(expense => 
      expense.category === "Savings" || expense.category === "Investments"
    );
  
  // Get a random money-saving quote
  const getRandomQuote = () => {
    const studentQuotes = [
      "A penny saved is a penny earned.",
      "Do not save what is left after spending, but spend what is left after saving.",
      "Beware of little expenses; a small leak will sink a great ship.",
      "Financial freedom is available to those who learn about it and work for it.",
      "The habit of saving is itself an education."
    ];
    
    const employeeQuotes = [
      "The art is not in making money, but in keeping it.",
      "Never spend your money before you have it.",
      "It's not how much money you make, but how much money you keep.",
      "The goal isn't more money. The goal is living life on your terms.",
      "Save a part of your income and begin now, for the man with a surplus controls circumstances and the man without a surplus is controlled by circumstances."
    ];
    
    const quotes = userType === "Student" ? studentQuotes : employeeQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">Financial Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-600 mb-1">
                {userType === "Student" ? "Pocket Money" : "Salary"}
              </p>
              <p className="text-xl font-bold">₹{income.toFixed(2)}</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-600 mb-1">Total Expenses</p>
              <p className="text-xl font-bold">₹{totalExpenses.toFixed(2)}</p>
            </div>
            
            <div className={`p-4 rounded-md ${savings >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-sm mb-1 ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Savings
              </p>
              <p className={`text-xl font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{savings.toFixed(2)}
              </p>
            </div>
          </div>
          
          {/* Spending insights */}
          {expenses.length > 0 && (
            <Alert variant={savingsPercentage >= 20 ? "default" : "destructive"} className="mt-4">
              <div className="flex items-start">
                {savingsPercentage >= 20 ? (
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                ) : savingsPercentage >= 0 ? (
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
                )}
                <div>
                  <AlertTitle>Spending Insight</AlertTitle>
                  <AlertDescription>
                    {savingsPercentage < 0 ? (
                      `Warning: You're spending ${Math.abs(savingsPercentage).toFixed(1)}% more than your ${userType === "Student" ? "pocket money" : "income"}!`
                    ) : savingsPercentage < 20 ? (
                      `You're saving ${savingsPercentage.toFixed(1)}% of your ${userType === "Student" ? "pocket money" : "income"}. Try to save at least 20%.`
                    ) : (
                      `Excellent! You're saving ${savingsPercentage.toFixed(1)}% of your ${userType === "Student" ? "pocket money" : "income"}.`
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
          
          {/* Highest spending category */}
          {highestCategory.category && (
            <Alert className="mt-4">
              <TrendingUp className="h-5 w-5 mr-2" />
              <AlertTitle>Highest Spending Category</AlertTitle>
              <AlertDescription>
                Your highest spending is on <strong>{highestCategory.category}</strong> (₹{highestCategory.amount.toFixed(2)}).
                Consider reducing expenses in this category to save more.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Savings category recommendation for employees */}
          {userType === "Employee" && !hasSavingsCategory && expenses.length > 0 && (
            <Alert className="mt-4">
              <PiggyBank className="h-5 w-5 mr-2" />
              <AlertTitle>Savings Recommendation</AlertTitle>
              <AlertDescription>
                Consider adding a 'Savings' or 'Investments' category to build your financial future.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {/* Money-saving tip */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <PiggyBank className="h-5 w-5 mr-2 text-indigo-600" />
            Money-Saving Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-900 italic">{getRandomQuote()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
