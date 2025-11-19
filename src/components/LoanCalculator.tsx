import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [results, setResults] = useState<{
    monthly: number;
    total: number;
    interest: number;
  } | null>(null);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanPeriod);

    if (!P || !rate || !years || P <= 0 || rate < 0 || years <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthly = (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const total = monthly * n;
    const interest = total - P;

    setResults({
      monthly: Math.round(monthly),
      total: Math.round(total),
      interest: Math.round(interest),
    });
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanPeriod("");
    setResults(null);
  };

  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Loan Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount" className="text-foreground">Loan Amount (Tk.)</Label>
            <Input
              id="amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="2000000"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="rate" className="text-foreground">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="10.5"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="period" className="text-foreground">Loan Period (Years)</Label>
            <Input
              id="period"
              type="number"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
              placeholder="5"
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculateLoan} className="flex-1">
              Calculate
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>

        {results && (
          <div className="bg-secondary/50 rounded-lg p-6 space-y-4 animate-fade-in">
            <h3 className="font-semibold text-lg text-foreground mb-4">Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Installment:</span>
                <span className="text-2xl font-bold text-primary">
                  Tk. {results.monthly.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Payment:</span>
                <span className="text-lg font-semibold text-foreground">
                  Tk. {results.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Interest:</span>
                <span className="text-lg font-semibold text-foreground">
                  Tk. {results.interest.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoanCalculator;
