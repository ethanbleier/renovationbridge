'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  homeValue: string;
  yearlyIncome: string;
  projectType: string;
};

type CalculationResults = {
  low: TierResult;
  middle: TierResult;
  high: TierResult;
};

type TierResult = {
  initialBudget: number;
  contingencyFund: number;
  timeToSave: number;
  monthlySavings: number;
  roi: number;
  totalBudget: number;
  valueIncrease: number;
  updatedHomeValue: number;
  projectType: string;
};

export default function PricingCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const projectTypes = [
    "Bathroom",
    "Kitchen",
    "Roof Replacement",
    "Window Replacement",
    "Garage Door Replacement",
    "Deck Addition",
    "Attic Insulation",
    "Siding Replacement",
    "Room Addition",
    "Accessory Dwelling Unit",
    "ADU",
    "Landscaping",
    "Solar Panel Installation"
  ];

  const onSubmit = (data: FormData) => {
    try {
      const homeValue = Number(data.homeValue);
      const yearlyIncome = Number(data.yearlyIncome);
      const projectType = data.projectType;

      // Validate inputs
      if (!homeValue || !yearlyIncome || !projectType || 
          homeValue < 50000 || yearlyIncome < 8000) {
        alert("Please check your inputs:\n• Home value must be at least $50,000\n• Yearly income must be at least $8,000\n• Project type must be selected");
        return;
      }

      // Calculate for each tier
      const calculatedResults = {
        low: calculateTier(homeValue, yearlyIncome, projectType, 'low'),
        middle: calculateTier(homeValue, yearlyIncome, projectType, 'middle'),
        high: calculateTier(homeValue, yearlyIncome, projectType, 'high')
      };

      setResults(calculatedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Calculation error:', error);
      alert("An error occurred while calculating. Please check your inputs and try again.");
    }
  };

  const onReset = () => {
    reset();
    setResults(null);
    setShowResults(false);
  };

  function calculateTier(homeValue: number, yearlyIncome: number, projectType: string, tier: 'low' | 'middle' | 'high') {
    // Project coefficient
    const coefficient = getProjectCoefficient(projectType, tier);
    
    // Initial Budget
    const initialBudget = homeValue * coefficient;
    
    const contingencyRates = {
      low: 0.1,
      middle: 0.15,
      high: 0.25
    };
    
    const monthlySavingRates = {
      low: 0.2,
      middle: 0.25,
      high: 0.3
    };

    // Calculate contingency fund
    const contingencyFund = initialBudget * contingencyRates[tier];
    
    // Calculate monthly savings
    const monthlyIncome = yearlyIncome / 12;
    const monthlySavings = monthlyIncome * monthlySavingRates[tier];
    
    // Total budget
    const totalBudget = initialBudget + contingencyFund;
    
    // Time to save
    const timeToSave = totalBudget / monthlySavings;
    
    // Get ROI coefficient
    const roiCoefficient = getROICoefficient(projectType, tier);
    
    // Calculate value increase
    const valueIncrease = totalBudget * roiCoefficient;
    
    // Updated home value
    const updatedHomeValue = homeValue + valueIncrease;

    return {
      initialBudget,
      contingencyFund,
      timeToSave,
      monthlySavings,
      roi: roiCoefficient * 100,
      totalBudget,
      valueIncrease,
      updatedHomeValue,
      projectType
    };
  }

  function getProjectCoefficient(projectType: string, tier: 'low' | 'middle' | 'high') {
    const coefficients = {
      low: {
        "Bathroom": 0.025, 
        "Kitchen": 0.05, 
        "Roof Replacement": 0.02, 
        "Window Replacement": 0.015, 
        "Garage Door Replacement": 0.01, 
        "Deck Addition": 0.02, 
        "Attic Insulation": 0.005, 
        "Siding Replacement": 0.02, 
        "Room Addition": 0.1, 
        "Accessory Dwelling Unit": 0.15, 
        "ADU": 0.15, 
        "Landscaping": 0.05, 
        "Solar Panel Installation": 0.05
      },
      middle: {
        "Bathroom": 0.0625, 
        "Kitchen": 0.1, 
        "Roof Replacement": 0.035, 
        "Window Replacement": 0.0325, 
        "Garage Door Replacement": 0.015, 
        "Deck Addition": 0.04, 
        "Attic Insulation": 0.0075, 
        "Siding Replacement": 0.045, 
        "Room Addition": 0.15, 
        "Accessory Dwelling Unit": 0.225, 
        "ADU": 0.225, 
        "Landscaping": 0.075, 
        "Solar Panel Installation": 0.075
      },
      high: {
        "Bathroom": 0.1, 
        "Kitchen": 0.15, 
        "Roof Replacement": 0.05, 
        "Window Replacement": 0.05, 
        "Garage Door Replacement": 0.02, 
        "Deck Addition": 0.06, 
        "Attic Insulation": 0.01, 
        "Siding Replacement": 0.07, 
        "Room Addition": 0.2, 
        "Accessory Dwelling Unit": 0.3, 
        "ADU": 0.3, 
        "Landscaping": 0.1, 
        "Solar Panel Installation": 0.1
      }
    } as const;
    return coefficients[tier][projectType as keyof typeof coefficients[typeof tier]];
  }

  function getROICoefficient(projectType: string, tier: 'low' | 'middle' | 'high') {
    const coefficients = {
      low: {
        "Kitchen": 0.9, 
        "Bathroom": 0.8, 
        "Roof Replacement": 0.75, 
        "Window Replacement": 0.8, 
        "Garage Door Replacement": 0.95, 
        "Deck Addition": 0.8, 
        "Attic Insulation": 0.85, 
        "Siding Replacement": 0.8, 
        "Room Addition": 0.65, 
        "Accessory Dwelling Unit": 1.05, 
        "ADU": 1.05, 
        "Landscaping": 0.85, 
        "Solar Panel Installation": 0.85
      },
      middle: {
        "Kitchen": 1.05, 
        "Bathroom": 0.9, 
        "Roof Replacement": 0.83, 
        "Window Replacement": 0.85, 
        "Garage Door Replacement": 1.1, 
        "Deck Addition": 0.87, 
        "Attic Insulation": 0.92, 
        "Siding Replacement": 0.9, 
        "Room Addition": 0.75, 
        "Accessory Dwelling Unit": 1.05, 
        "ADU": 1.05, 
        "Landscaping": 0.85, 
        "Solar Panel Installation": 0.85
      },
      high: {
        "Kitchen": 1.2, 
        "Bathroom": 1, 
        "Roof Replacement": 0.9, 
        "Window Replacement": 0.95, 
        "Garage Door Replacement": 1.2, 
        "Deck Addition": 0.9, 
        "Attic Insulation": 1, 
        "Siding Replacement": 0.9, 
        "Room Addition": 0.75, 
        "Accessory Dwelling Unit": 1.05, 
        "ADU": 1.05, 
        "Landscaping": 0.85, 
        "Solar Panel Installation": 0.85
      }
    } as const;
    return coefficients[tier][projectType as keyof typeof coefficients[typeof tier]];
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(value);
  }

  function formatMonths(value: number) {
    return Math.round(value) + " months";
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Renovation Budget Calculator</h1>
      
      <div className="max-w-4xl mx-auto bg-lavender/30 p-6 md:p-8 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-lg font-medium mb-2">Estimated Value of your Home ($):</label>
            <input 
              type="text" 
              {...register('homeValue', { required: true })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. 600000"
            />
            {errors.homeValue && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-lg font-medium mb-2">Yearly Income ($):</label>
            <input 
              type="text" 
              {...register('yearlyIncome', { required: true })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. 85000"
            />
            {errors.yearlyIncome && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-lg font-medium mb-2">Project Type:</label>
            <select 
              {...register('projectType', { required: true })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.projectType && <span className="text-red-500">This field is required</span>}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleSubmit(onSubmit)}
            className="btn btn-primary mx-2"
          >
            Calculate
          </button>
          <button 
            onClick={onReset}
            className="btn bg-white text-primary border border-primary hover:bg-lavender mx-2"
          >
            Reset
          </button>
        </div>
      </div>
      
      {showResults && results && (
        <div className="max-w-6xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Renovation Budget Calculation Results</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left"></th>
                  <th className="p-4 text-center font-medium text-lg">Low</th>
                  <th className="p-4 text-center font-medium text-lg">Middle</th>
                  <th className="p-4 text-center font-medium text-lg">High</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Initial Budget</td>
                  <td className="p-4 text-center">{formatCurrency(results.low.initialBudget)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.middle.initialBudget)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.high.initialBudget)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Contingency Fund</td>
                  <td className="p-4 text-center">{formatCurrency(results.low.contingencyFund)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.middle.contingencyFund)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.high.contingencyFund)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Time To Save In Months</td>
                  <td className="p-4 text-center">{formatMonths(results.low.timeToSave)}</td>
                  <td className="p-4 text-center">{formatMonths(results.middle.timeToSave)}</td>
                  <td className="p-4 text-center">{formatMonths(results.high.timeToSave)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">How Much To Save Per Month</td>
                  <td className="p-4 text-center">{formatCurrency(results.low.monthlySavings)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.middle.monthlySavings)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.high.monthlySavings)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Estimated ROI</td>
                  <td className="p-4 text-center">{results.low.roi.toFixed(2)}%</td>
                  <td className="p-4 text-center">{results.middle.roi.toFixed(2)}%</td>
                  <td className="p-4 text-center">{results.high.roi.toFixed(2)}%</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-medium text-lg">Total Budget</td>
                  <td className="p-4 text-center font-bold">{formatCurrency(results.low.totalBudget)}</td>
                  <td className="p-4 text-center font-bold">{formatCurrency(results.middle.totalBudget)}</td>
                  <td className="p-4 text-center font-bold">{formatCurrency(results.high.totalBudget)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Value Increase</td>
                  <td className="p-4 text-center">{formatCurrency(results.low.valueIncrease)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.middle.valueIncrease)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.high.valueIncrease)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Estimated Updated Home Value</td>
                  <td className="p-4 text-center">{formatCurrency(results.low.updatedHomeValue)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.middle.updatedHomeValue)}</td>
                  <td className="p-4 text-center">{formatCurrency(results.high.updatedHomeValue)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-10 p-6 bg-cream rounded-lg">
            <h3 className="text-xl font-bold mb-4">Total Budget</h3>
            <p className="text-gray-700">
              The total budget includes both the initial budget and the contingency fund. The contingency fund is recommended to cover unexpected expenses that may arise during your renovation project.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 