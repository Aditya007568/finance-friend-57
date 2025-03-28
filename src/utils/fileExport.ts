
export const saveExpenseData = (userData: {
  name: string;
  phone: string;
  income: number;
  expenses: { category: string; amount: number }[];
  userType: "Student" | "Employee" | null;
}) => {
  // Calculate totals and percentages for analysis
  const totalExpenses = userData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = userData.income - totalExpenses;
  const savingsPercentage = (savings / userData.income) * 100;
  
  // Find highest spending category
  let highestCategory = { category: "", amount: 0 };
  userData.expenses.forEach(expense => {
    if (expense.amount > highestCategory.amount) {
      highestCategory = expense;
    }
  });
  
  // Create formatted content
  let content = "===== USER INFORMATION =====\n";
  content += `Name: ${userData.name}\n`;
  content += `Phone: ${userData.phone}\n`;
  
  if (userData.userType === "Student") {
    content += `Weekly Pocket Money: Rs${userData.income.toFixed(2)}\n`;
  } else {
    content += `Monthly Salary: Rs${userData.income.toFixed(2)}\n`;
  }
  
  content += "\n===== EXPENSE DETAILS =====\n";
  if (userData.expenses.length === 0) {
    content += "No expenses recorded yet.\n";
  } else {
    let total = 0;
    userData.expenses.forEach(expense => {
      content += `${expense.category}: Rs${expense.amount.toFixed(2)}\n`;
      total += expense.amount;
    });
    
    content += "\n===== SUMMARY =====\n";
    content += `Total Expenses: Rs${total.toFixed(2)}\n`;
    content += `Remaining Balance: Rs${(userData.income - total).toFixed(2)}\n`;
    
    // Add analysis section
    content += "\n===== FINANCIAL ANALYSIS =====\n";
    
    // Spending insight
    if (savingsPercentage < 0) {
      content += `WARNING: You're spending ${Math.abs(savingsPercentage).toFixed(1)}% more than your ${userData.userType === "Student" ? "pocket money" : "income"}!\n`;
    } else if (savingsPercentage < 20) {
      content += `NOTE: You're saving ${savingsPercentage.toFixed(1)}% of your ${userData.userType === "Student" ? "pocket money" : "income"}. Try to save at least 20%.\n`;
    } else {
      content += `EXCELLENT: You're saving ${savingsPercentage.toFixed(1)}% of your ${userData.userType === "Student" ? "pocket money" : "income"}.\n`;
    }
    
    // Highest spending category
    if (highestCategory.category) {
      content += `\nHighest Spending Category: ${highestCategory.category} (Rs${highestCategory.amount.toFixed(2)})\n`;
      content += `Consider reducing expenses in this category to save more.\n`;
    }
    
    // Savings recommendation for employees
    const hasSavingsCategory = userData.userType === "Employee" && 
      userData.expenses.some(expense => 
        expense.category === "Savings" || expense.category === "Investments"
      );
    
    if (userData.userType === "Employee" && !hasSavingsCategory) {
      content += `\nRECOMMENDATION: Consider adding a 'Savings' or 'Investments' category to build your financial future.\n`;
    }
    
    // Add a money saving tip
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
    
    const quotes = userData.userType === "Student" ? studentQuotes : employeeQuotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    content += `\nMONEY-SAVING TIP: "${randomQuote}"\n`;
  }
  
  // Create file name with phone number
  const fileName = `${userData.userType}_${userData.name.replace(/\s+/g, '_')}_${userData.phone.replace(/\D/g, '')}.txt`;
  
  // Create a blob and download link
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return fileName;
};
