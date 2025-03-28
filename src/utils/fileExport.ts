
export const saveExpenseData = (userData: {
  name: string;
  phone: string;
  income: number;
  expenses: { category: string; amount: number }[];
  userType: "Student" | "Employee" | null;
}) => {
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
  }
  
  // Create file name
  const fileName = `${userData.userType}_${userData.name.replace(/\s+/g, '_')}.txt`;
  
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
