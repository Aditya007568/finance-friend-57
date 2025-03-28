
import { useState, useEffect } from "react";
import { UserType, ExpenseData } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ExpenseFormProps {
  userType: UserType;
  currentExpenses: ExpenseData[];
  onSubmit: (expenses: ExpenseData[]) => void;
}

const ExpenseForm = ({ userType, onSubmit, currentExpenses }: ExpenseFormProps) => {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  
  const studentCategories = [
    "Food", 
    "Stationary", 
    "Transport", 
    "Entertainment", 
    "Miscellaneous"
  ];
  
  const employeeCategories = [
    "Rent", 
    "Groceries", 
    "Transport", 
    "Utilities", 
    "Dining Out", 
    "Entertainment", 
    "Savings", 
    "Investments"
  ];
  
  const categories = userType === "Student" ? studentCategories : employeeCategories;

  useEffect(() => {
    if (currentExpenses.length > 0) {
      setExpenses(currentExpenses);
    } else {
      // Initialize with empty amounts
      setExpenses(categories.map(category => ({ category, amount: 0 })));
    }
  }, [userType]);

  const handleAmountChange = (category: string, amount: number) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(expense => 
        expense.category === category ? { ...expense, amount } : expense
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredExpenses = expenses.filter(expense => expense.amount > 0);
    onSubmit(filteredExpenses);
    toast.success("Expenses saved successfully!");
  };

  return (
    <div className="bg-white rounded-md">
      <h3 className="text-xl font-medium mb-4">Enter Your Expenses</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const expenseItem = expenses.find(e => e.category === category) || { category, amount: 0 };
            
            return (
              <div key={category} className="space-y-2 p-4 border rounded-md">
                <Label htmlFor={category}>{category} (Rs)</Label>
                <Input
                  id={category}
                  type="number"
                  min="0"
                  step="any"
                  value={expenseItem.amount || ""}
                  onChange={(e) => handleAmountChange(category, parseFloat(e.target.value) || 0)}
                  placeholder={`Enter amount for ${category}`}
                />
              </div>
            );
          })}
        </div>
        
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-6">
          Save All Expenses
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
