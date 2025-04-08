'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="absolute left-4 top-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 mt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Renovation Budget Calculator
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          Plan your perfect renovation with our budget calculator. Estimate costs, ROI, and savings timeline.
        </p>
      </div>

      {/* Calculator Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 mb-16">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <h2 className="text-2xl font-bold text-gray-800">Enter Your Details</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in the details below to calculate your renovation budget</p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Estimated Home Value</label>
              <div className="relative rounded-md shadow-sm">
                <input 
                  type="text" 
                  {...homeValueRef}
                  className="block w-full pl-3 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all"
                  placeholder="$0"
                  value={homeValueFormatted}
                  onChange={handleHomeValueChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              {errors.homeValue && <p className="text-red-500 text-xs italic mt-1">This field is required</p>}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Income</label>
              <div className="relative rounded-md shadow-sm">
                <input 
                  type="text" 
                  {...yearlyIncomeRef}
                  className="block w-full pl-3 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all"
                  placeholder="$0"
                  value={yearlyIncomeFormatted}
                  onChange={handleYearlyIncomeChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              {errors.yearlyIncome && <p className="text-red-500 text-xs italic mt-1">This field is required</p>}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <select 
                {...register('projectType', { required: true })}
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-all"
              >
                <option value="">Select a project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.projectType && <p className="text-red-500 text-xs italic mt-1">This field is required</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-105"
            >
              Calculate
            </button>
            <button 
              onClick={onReset}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {showResults && results && (
        <div className="max-w-6xl mx-auto transition-all duration-500 animate-fadeIn">
          {/* Results Header */}
          <div className="bg-white rounded-t-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Renovation Budget Results</h2>
              <p className="text-gray-500">Based on your {results.low.projectType.toLowerCase()} project</p>
            </div>
            <button 
              disabled
              className="mt-4 md:mt-0 flex items-center gap-2 bg-gray-200 text-gray-500 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed relative group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </span>
            </button>
          </div>

          {/* Results Table */}
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-5 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"></th>
                    <th scope="col" className="px-6 py-5 bg-blue-50 text-center text-sm font-medium text-blue-700 uppercase tracking-wider">Low Tier</th>
                    <th scope="col" className="px-6 py-5 bg-purple-50 text-center text-sm font-medium text-purple-700 uppercase tracking-wider">Middle Tier</th>
                    <th scope="col" className="px-6 py-5 bg-indigo-50 text-center text-sm font-medium text-indigo-700 uppercase tracking-wider">High Tier</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Initial Budget</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.low.initialBudget)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.middle.initialBudget)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.high.initialBudget)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Contingency Fund</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.low.contingencyFund)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.middle.contingencyFund)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.high.contingencyFund)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Time To Save</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatMonths(results.low.timeToSave)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatMonths(results.middle.timeToSave)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatMonths(results.high.timeToSave)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Savings</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.low.monthlySavings)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.middle.monthlySavings)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.high.monthlySavings)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Estimated ROI</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{results.low.roi.toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{results.middle.roi.toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{results.high.roi.toFixed(2)}%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Value Increase</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.low.valueIncrease)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.middle.valueIncrease)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.high.valueIncrease)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Updated Home Value</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.low.updatedHomeValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.middle.updatedHomeValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{formatCurrency(results.high.updatedHomeValue)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-5 whitespace-nowrap text-base font-bold text-gray-900">Total Budget</td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg font-bold text-center text-blue-600 bg-blue-50">{formatCurrency(results.low.totalBudget)}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg font-bold text-center text-purple-600 bg-purple-50">{formatCurrency(results.middle.totalBudget)}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg font-bold text-center text-indigo-600 bg-indigo-50">{formatCurrency(results.high.totalBudget)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Understanding Your Budget */}
          <div className="bg-white rounded-lg shadow-lg mt-8 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Understanding Your Budget</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-transform hover:transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Total Budget</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Includes both initial budget and contingency fund to cover unexpected expenses during your renovation.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-transform hover:transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Monthly Savings</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Recommended amount to set aside each month based on your income to reach your renovation goal.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-transform hover:transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-100 p-3 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Return on Investment</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Estimated percentage of your investment that may be recouped through increased home value.
                </p>
              </div>
            </div>
          </div>

          {/* Save Results */}
          <div className="bg-white rounded-lg shadow-lg mt-8 mb-8 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Save Your Results</h3>
              <p className="mt-1 text-sm text-gray-500">Enter your contact information to save these results and receive additional renovation insights.</p>
            </div>
            <div className="p-6">
              {leadSubmitted ? (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700">Thank you! Your results have been saved.</p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
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
                        className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  <button
                    onClick={captureLeadData}
                    disabled={!email || !phone || isLeadSubmitting}
                    className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLeadSubmitting ? 'Saving...' : 'Save My Results'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 