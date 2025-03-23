'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Format currency input with $ and commas
const formatCurrencyInput = (value: string): string => {
  // If we're clearing the input, just return the dollar sign
  if (value === '' || value === '$') return '$';
  
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Return just $ if no digits
  if (!digits) return '$';
  
  // Format with commas
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(digits));
  
  return formatted;
};

declare module 'jspdf' {
  interface jsPDF {
    autoTable: {
      previous: {
        finalY: number;
      };
    };
  }
}

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
  const [homeValueFormatted, setHomeValueFormatted] = useState('$');
  const [yearlyIncomeFormatted, setYearlyIncomeFormatted] = useState('$');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      homeValue: '',
      yearlyIncome: '',
      projectType: 'Kitchen Renovation'
    }
  });

  // Initialize form values
  useEffect(() => {
    setValue('homeValue', '$');
    setValue('yearlyIncome', '$');
  }, [setValue]);

  const projectTypes = [
    "Kitchen Renovation",
    "Bathroom Renovation",
    "Deck or Patio Addition",
    "Whole House Remodel",
    "Window Replacement",
    "Garage Door Replacement",
    "Deck Addition",
    "Siding Replacement",
    "Room Addition",
    "Accessory Dwelling Unit (ADU)",
    "Landscaping",
    "Solar Panel Installation"
  ];

  // Register inputs with react-hook-form
  const homeValueRef = register('homeValue', { required: true });
  const yearlyIncomeRef = register('yearlyIncome', { required: true });

  // Update input handlers for currency formatting
  const handleHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setHomeValueFormatted(formatted);
    setValue('homeValue', formatted);
  };

  const handleYearlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setYearlyIncomeFormatted(formatted);
    setValue('yearlyIncome', formatted);
  };

  const onSubmit = (data: FormData) => {
    try {
      // Clean the input values by removing currency symbols and commas
      const cleanHomeValue = data.homeValue.replace(/[$,]/g, '');
      const cleanYearlyIncome = data.yearlyIncome.replace(/[$,]/g, '');
      
      const homeValue = Number(cleanHomeValue);
      const yearlyIncome = Number(cleanYearlyIncome);
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
    setHomeValueFormatted('$');
    setYearlyIncomeFormatted('$');
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
        "Kitchen Renovation": 0.085,
        "Bathroom Renovation": 0.025,
        "Deck or Patio Addition": 0.02,
        "Whole House Remodel": 0.0625,
        "Window Replacement": 0.0325,
        "Garage Door Replacement": 0.015,
        "Deck Addition": 0.02,
        "Siding Replacement": 0.045,
        "Room Addition": 0.15,
        "Accessory Dwelling Unit (ADU)": 0.225,
        "Landscaping": 0.075,
        "Solar Panel Installation": 0.075
      },
      middle: {
        "Kitchen Renovation": 0.135,
        "Bathroom Renovation": 0.0625,
        "Deck or Patio Addition": 0.04,
        "Whole House Remodel": 0.1,
        "Window Replacement": 0.0325,
        "Garage Door Replacement": 0.015,
        "Deck Addition": 0.04,
        "Siding Replacement": 0.045,
        "Room Addition": 0.15,
        "Accessory Dwelling Unit (ADU)": 0.225,
        "Landscaping": 0.075,
        "Solar Panel Installation": 0.075
      },
      high: {
        "Kitchen Renovation": 0.18,
        "Bathroom Renovation": 0.1,
        "Deck or Patio Addition": 0.06,
        "Whole House Remodel": 0.15,
        "Window Replacement": 0.05,
        "Garage Door Replacement": 0.02,
        "Deck Addition": 0.06,
        "Siding Replacement": 0.07,
        "Room Addition": 0.2,
        "Accessory Dwelling Unit (ADU)": 0.3,
        "Landscaping": 0.1,
        "Solar Panel Installation": 0.1
      }
    } as const;
    return coefficients[tier][projectType as keyof typeof coefficients[typeof tier]];
  }

  function getROICoefficient(projectType: string, tier: 'low' | 'middle' | 'high') {
    const coefficients = {
      low: {
        "Kitchen Renovation": 0.9,
        "Bathroom Renovation": 0.8,
        "Deck or Patio Addition": 0.95,
        "Whole House Remodel": 0.8,
        "Window Replacement": 0.8,
        "Garage Door Replacement": 0.95,
        "Deck Addition": 0.8,
        "Siding Replacement": 0.8,
        "Room Addition": 0.65,
        "Accessory Dwelling Unit (ADU)": 1.05,
        "Landscaping": 0.85,
        "Solar Panel Installation": 0.85
      },
      middle: {
        "Kitchen Renovation": 1.05,
        "Bathroom Renovation": 0.9,
        "Deck or Patio Addition": 1.1,
        "Whole House Remodel": 0.85,
        "Window Replacement": 0.85,
        "Garage Door Replacement": 1.1,
        "Deck Addition": 0.87,
        "Siding Replacement": 0.9,
        "Room Addition": 0.75,
        "Accessory Dwelling Unit (ADU)": 1.05,
        "Landscaping": 0.85,
        "Solar Panel Installation": 0.85
      },
      high: {
        "Kitchen Renovation": 1.2,
        "Bathroom Renovation": 1,
        "Deck or Patio Addition": 1.2,
        "Whole House Remodel": 0.95,
        "Window Replacement": 0.95,
        "Garage Door Replacement": 1.2,
        "Deck Addition": 0.9,
        "Siding Replacement": 0.9,
        "Room Addition": 0.75,
        "Accessory Dwelling Unit (ADU)": 1.05,
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

  // Function for future use
  // const downloadPDF = () => {
  //   if (!results) return;
    
  //   const doc = new jsPDF();
    
  //   // Add title
  //   doc.setFontSize(20);
  //   doc.setTextColor(60, 60, 60);
  //   doc.text("Renovation Budget Calculation Results", 20, 20);
    
  //   // Add project type
  //   doc.setFontSize(14);
  //   doc.text(`Project: ${results.low.projectType}`, 20, 30);
    
  //   // Add date
  // }

  const captureLeadData = async () => {
    if (email && phone && results) {  // Only if user provided contact info
      try {
        setIsLeadSubmitting(true);
        
        const response = await fetch('/api/submit-calculator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            homeValue: homeValueFormatted,
            yearlyIncome: yearlyIncomeFormatted,
            projectType: results.low.projectType,
            results: {
              lowBudget: results.low.totalBudget,
              middleBudget: results.middle.totalBudget,
              highBudget: results.high.totalBudget
            },
            email,
            phone
          }),
        });
        
        if (response.ok) {
          setLeadSubmitted(true);
        }
      } catch (error) {
        console.error('Error capturing lead:', error);
      } finally {
        setIsLeadSubmitting(false);
      }
    }
  };

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-primary/10 rounded-3xl transform -rotate-1 scale-105"></div>
        <h1 className="relative text-3xl md:text-4xl font-bold text-center mb-6 pt-8 text-primary">
          Renovation Budget Calculator
        </h1>
        <p className="relative text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Plan your perfect renovation with our budget calculator. Estimate costs, ROI, and savings timeline.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-lg border border-lavender/20 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-lavender/10 rounded-full transform translate-x-16 -translate-y-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="md:col-span-1">
            <label className="block text-lg font-medium mb-2 text-gray-700">Estimated Home Value:</label>
            <input 
              type="text" 
              {...homeValueRef}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 shadow-sm"
              placeholder="$0"
              value={homeValueFormatted}
              onChange={handleHomeValueChange}
            />
            {errors.homeValue && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-lg font-medium mb-2 text-gray-700">Annual Income:</label>
            <input 
              type="text" 
              {...yearlyIncomeRef}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 shadow-sm"
              placeholder="$0"
              value={yearlyIncomeFormatted}
              onChange={handleYearlyIncomeChange}
            />
            {errors.yearlyIncome && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-lg font-medium mb-2 text-gray-700">Project Type:</label>
            <select 
              {...register('projectType', { required: true })}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 shadow-sm"
            >
              <option value="">Select</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.projectType && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            onClick={handleSubmit(onSubmit)}
            className="btn btn-primary mx-2 px-8 py-3 font-semibold rounded-lg shadow-md transform transition-transform hover:scale-105"
          >
            Calculate
          </button>
          <button 
            onClick={onReset}
            className="btn bg-white text-primary border border-primary hover:bg-lavender/20 mx-2 px-8 py-3 font-semibold rounded-lg shadow-sm"
          >
            Reset
          </button>
        </div>
      </div>
      
      {showResults && results && (
        <div className="max-w-6xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg border border-lavender/20 relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-secondary/5 to-primary/10 rounded-full transform -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-lavender/10 to-primary/5 rounded-full transform translate-x-24 translate-y-24"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Renovation Budget Calculation Results</h2>
            <button 
              disabled
              className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md transition-all cursor-not-allowed relative group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </span>
            </button>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
                  <th className="p-5 text-left rounded-tl-lg"></th>
                  <th className="p-5 text-center font-medium text-lg">Low</th>
                  <th className="p-5 text-center font-medium text-lg">Middle</th>
                  <th className="p-5 text-center font-medium text-lg rounded-tr-lg">High</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">Initial Budget</td>
                  <td className="p-5 text-center">{formatCurrency(results.low.initialBudget)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.middle.initialBudget)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.high.initialBudget)}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">Contingency Fund</td>
                  <td className="p-5 text-center">{formatCurrency(results.low.contingencyFund)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.middle.contingencyFund)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.high.contingencyFund)}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">Time To Save In Months</td>
                  <td className="p-5 text-center">{formatMonths(results.low.timeToSave)}</td>
                  <td className="p-5 text-center">{formatMonths(results.middle.timeToSave)}</td>
                  <td className="p-5 text-center">{formatMonths(results.high.timeToSave)}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">How Much To Save Per Month</td>
                  <td className="p-5 text-center">{formatCurrency(results.low.monthlySavings)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.middle.monthlySavings)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.high.monthlySavings)}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">Estimated ROI</td>
                  <td className="p-5 text-center">{results.low.roi.toFixed(2)}%</td>
                  <td className="p-5 text-center">{results.middle.roi.toFixed(2)}%</td>
                  <td className="p-5 text-center">{results.high.roi.toFixed(2)}%</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">Value Increase</td>
                  <td className="p-5 text-center">{formatCurrency(results.low.valueIncrease)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.middle.valueIncrease)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.high.valueIncrease)}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium">Estimated Updated Home Value</td>
                  <td className="p-5 text-center">{formatCurrency(results.low.updatedHomeValue)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.middle.updatedHomeValue)}</td>
                  <td className="p-5 text-center">{formatCurrency(results.high.updatedHomeValue)}</td>
                </tr>
                <tr className="border-b bg-primary/5 font-semibold">
                  <td className="p-5 text-lg">Total Budget</td>
                  <td className="p-5 text-center text-primary font-bold text-xl">{formatCurrency(results.low.totalBudget)}</td>
                  <td className="p-5 text-center text-primary font-bold text-xl">{formatCurrency(results.middle.totalBudget)}</td>
                  <td className="p-5 text-center text-primary font-bold text-xl">{formatCurrency(results.high.totalBudget)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-10 p-8 bg-gradient-to-r from-lavender/20 to-cream rounded-lg shadow-inner relative z-10">
            <h3 className="text-xl font-bold mb-4 text-primary">Understanding Your Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Total Budget</h4>
                <p className="text-gray-700">
                  Includes both initial budget and contingency fund to cover unexpected expenses during your renovation.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Monthly Savings</h4>
                <p className="text-gray-700">
                  Recommended amount to set aside each month based on your income to reach your renovation goal.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Return on Investment</h4>
                <p className="text-gray-700">
                  Estimated percentage of your investment that may be recouped through increased home value.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">Save Your Results</h3>
            <p className="text-gray-700 mb-4">
              Enter your contact information to save these results and receive additional renovation insights.
            </p>
            
            {leadSubmitted ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6 border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Thank you! Your results have been saved.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    onClick={captureLeadData}
                    disabled={!email || !phone || isLeadSubmitting}
                    className="btn btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLeadSubmitting ? 'Saving...' : 'Save My Results'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 