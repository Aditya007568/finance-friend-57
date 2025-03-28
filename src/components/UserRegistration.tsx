
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType, UserData } from "@/pages/Index";
import { ArrowLeft } from "lucide-react";

interface UserRegistrationProps {
  userType: UserType;
  onRegister: (data: UserData) => void;
  onBack: () => void;
}

const UserRegistration = ({ userType, onRegister, onBack }: UserRegistrationProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [income, setIncome] = useState("");
  const [error, setError] = useState({ name: "", phone: "", income: "" });

  const validate = () => {
    let isValid = true;
    const newError = { name: "", phone: "", income: "" };

    if (!name.trim()) {
      newError.name = "Name is required";
      isValid = false;
    }

    if (!phone.trim()) {
      newError.phone = "Phone number is required";
      isValid = false;
    }

    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      newError.income = "Please enter a valid positive amount";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onRegister({
        name,
        phone,
        income: parseFloat(income),
        expenses: [],
        userType,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="p-0 mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold text-center flex-1 pr-6">
          {userType} Registration
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
          {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="income">
            {userType === "Student" ? "Weekly Pocket Money" : "Monthly Salary"} (Rs)
          </Label>
          <Input
            id="income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter amount"
            min="1"
            step="any"
          />
          {error.income && <p className="text-red-500 text-sm">{error.income}</p>}
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Register & Continue
        </Button>
      </form>
    </div>
  );
};

export default UserRegistration;
