'use client';

import React, { useCallback, useRef } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import 'charts.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { track } from '@vercel/analytics';

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
  const [homeValueNumber, setHomeValueNumber] = useState(300000); // Default for slider
  const [yearlyIncomeNumber, setYearlyIncomeNumber] = useState(80000); // Default for slider
  const [homeValueFormatted, setHomeValueFormatted] = useState(formatCurrencyInput(`$${homeValueNumber}`));
  const [yearlyIncomeFormatted, setYearlyIncomeFormatted] = useState(formatCurrencyInput(`$${yearlyIncomeNumber}`));
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false); // State for the toggle
  const [initialCalculationDone, setInitialCalculationDone] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [isLabelCollapsed, setIsLabelCollapsed] = useState(false); // State for chart Y-axis label collapse
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for chart scroll container
  const [isMetricColumnCollapsed, setIsMetricColumnCollapsed] = useState(false); // State for table metric column collapse
  const tableScrollContainerRef = useRef<HTMLDivElement>(null); // Ref for table scroll container

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      homeValue: '',
      yearlyIncome: '',
      projectType: 'Kitchen Renovation'
    }
  });

  // Move calculateTier declaration here, before it's used in useEffect
  const calculateTier = useCallback((homeValue: number, yearlyIncome: number, projectType: string, tier: 'low' | 'middle' | 'high') => {
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
  }, []);

  // Watch for form value changes to enable real-time calculation
  const watchHomeValue = watch('homeValue');
  const watchYearlyIncome = watch('yearlyIncome');
  const watchProjectType = watch('projectType');

  // Initialize form values with defaults
  useEffect(() => {
    setValue('homeValue', homeValueFormatted);
    setValue('yearlyIncome', yearlyIncomeFormatted);
  }, [setValue, homeValueFormatted, yearlyIncomeFormatted]);

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

  // Handlers for input focus
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  // Update input handlers for currency formatting
  const handleHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setHomeValueFormatted(formatted);
    setValue('homeValue', formatted);
    
    // Extract numeric value for the slider
    const numericValue = Number(formatted.replace(/[^0-9]/g, ''));
    if (numericValue) {
      setHomeValueNumber(numericValue);
    }
  };

  const handleYearlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setYearlyIncomeFormatted(formatted);
    setValue('yearlyIncome', formatted);
    
    // Extract numeric value for the slider
    const numericValue = Number(formatted.replace(/[^0-9]/g, ''));
    if (numericValue) {
      setYearlyIncomeNumber(numericValue);
    }
  };

  // Slider handlers
  const handleHomeValueSlider = (value: number) => {
    setHomeValueNumber(value);
    const formatted = formatCurrencyInput(`$${value}`);
    setHomeValueFormatted(formatted);
    setValue('homeValue', formatted);
  };

  const handleIncomeSlider = (value: number) => {
    setYearlyIncomeNumber(value);
    const formatted = formatCurrencyInput(`$${value}`);
    setYearlyIncomeFormatted(formatted);
    setValue('yearlyIncome', formatted);
  };

  // Real-time calculations when values change
  useEffect(() => {
    if (autoUpdateEnabled && initialCalculationDone && homeValueNumber >= 50000 && yearlyIncomeNumber >= 8000 && watchProjectType) {
      try {
        const calculatedResults = {
          low: calculateTier(homeValueNumber, yearlyIncomeNumber, watchProjectType, 'low'),
          middle: calculateTier(homeValueNumber, yearlyIncomeNumber, watchProjectType, 'middle'),
          high: calculateTier(homeValueNumber, yearlyIncomeNumber, watchProjectType, 'high')
        };
        
        setResults(calculatedResults);
        setShowResults(true);
      } catch (error) {
        console.error('Calculation error:', error);
      }
    }
  }, [autoUpdateEnabled, homeValueNumber, yearlyIncomeNumber, watchProjectType, calculateTier, initialCalculationDone]);

  useEffect(() => {
    if (results && showResults) {
      // Find all bar elements
      const chartContainer = document.getElementById('chart-container');
      const chartLegend = document.querySelector('.chart-legend');
      
      if (chartContainer && chartLegend) {
        const lowTierBars = chartContainer.querySelectorAll('.tier-low');
        const middleTierBars = chartContainer.querySelectorAll('.tier-middle');
        const highTierBars = chartContainer.querySelectorAll('.tier-high');
        const allBars = chartContainer.querySelectorAll('.bar-tier');
        
        const lowLegendItem = chartLegend.querySelector('.low');
        const middleLegendItem = chartLegend.querySelector('.middle');
        const highLegendItem = chartLegend.querySelector('.high');
        
        // Function to handle mouseover for a specific tier
        const handleTierMouseOver = (activeTierBars: Element[]) => {
          // Fade out all bars
          allBars.forEach(bar => {
            bar.classList.add('opacity-40');
          });
          
          // Show only the active tier
          activeTierBars.forEach(bar => {
            bar.classList.remove('opacity-40');
            bar.classList.add('opacity-100');
          });
        };
        
        // Function to reset all bars opacity
        const resetBars = () => {
          allBars.forEach(bar => {
            bar.classList.remove('opacity-40', 'opacity-100');
          });
        };
        
        // Add event listeners to bars
        lowTierBars.forEach(bar => {
          bar.addEventListener('mouseover', () => handleTierMouseOver(Array.from(lowTierBars)));
          bar.addEventListener('mouseout', resetBars);
        });
        
        middleTierBars.forEach(bar => {
          bar.addEventListener('mouseover', () => handleTierMouseOver(Array.from(middleTierBars)));
          bar.addEventListener('mouseout', resetBars);
        });
        
        highTierBars.forEach(bar => {
          bar.addEventListener('mouseover', () => handleTierMouseOver(Array.from(highTierBars)));
          bar.addEventListener('mouseout', resetBars);
        });
        
        // Add event listeners to legend items
        if (lowLegendItem) {
          lowLegendItem.addEventListener('mouseover', () => handleTierMouseOver(Array.from(lowTierBars)));
          lowLegendItem.addEventListener('mouseout', resetBars);
        }
        
        if (middleLegendItem) {
          middleLegendItem.addEventListener('mouseover', () => handleTierMouseOver(Array.from(middleTierBars)));
          middleLegendItem.addEventListener('mouseout', resetBars);
        }
        
        if (highLegendItem) {
          highLegendItem.addEventListener('mouseover', () => handleTierMouseOver(Array.from(highTierBars)));
          highLegendItem.addEventListener('mouseout', resetBars);
        }
        
        // Clean up event listeners
        return () => {
          // Remove event listeners from bars
          lowTierBars.forEach(bar => {
            bar.removeEventListener('mouseover', () => handleTierMouseOver(Array.from(lowTierBars)));
            bar.removeEventListener('mouseout', resetBars);
          });
          
          middleTierBars.forEach(bar => {
            bar.removeEventListener('mouseover', () => handleTierMouseOver(Array.from(middleTierBars)));
            bar.removeEventListener('mouseout', resetBars);
          });
          
          highTierBars.forEach(bar => {
            bar.removeEventListener('mouseover', () => handleTierMouseOver(Array.from(highTierBars)));
            bar.removeEventListener('mouseout', resetBars);
          });
          
          // Remove event listeners from legend items
          if (lowLegendItem) {
            lowLegendItem.removeEventListener('mouseover', () => handleTierMouseOver(Array.from(lowTierBars)));
            lowLegendItem.removeEventListener('mouseout', resetBars);
          }
          
          if (middleLegendItem) {
            middleLegendItem.removeEventListener('mouseover', () => handleTierMouseOver(Array.from(middleTierBars)));
            middleLegendItem.removeEventListener('mouseout', resetBars);
          }
          
          if (highLegendItem) {
            highLegendItem.removeEventListener('mouseover', () => handleTierMouseOver(Array.from(highTierBars)));
            highLegendItem.removeEventListener('mouseout', resetBars);
          }
        };
      }
    }
  }, [results, showResults]);

  const onSubmit = (data: FormData) => {
    try {
      // Clean the input values by removing currency symbols and commas
      const cleanHomeValue = data.homeValue.replace(/[$,]/g, '');
      const cleanYearlyIncome = data.yearlyIncome.replace(/[$,]/g, '');
      
      // Use the numeric state values if the inputs are empty, otherwise parse the input values
      const homeValue = cleanHomeValue ? Number(cleanHomeValue) : homeValueNumber;
      const yearlyIncome = cleanYearlyIncome ? Number(cleanYearlyIncome) : yearlyIncomeNumber;
      const projectType = data.projectType || 'Kitchen Renovation';

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
      setInitialCalculationDone(true);
    } catch (error) {
      console.error('Calculation error:', error);
      alert("An error occurred while calculating. Please check your inputs and try again.");
    }
  };

  const onReset = () => {
    reset();
    setResults(null);
    setShowResults(false);
    setHomeValueFormatted(formatCurrencyInput(`$${homeValueNumber}`));
    setYearlyIncomeFormatted(formatCurrencyInput(`$${yearlyIncomeNumber}`));
    setHomeValueNumber(300000);
    setYearlyIncomeNumber(80000);
    setAutoUpdateEnabled(false); // Reset toggle on form reset
    setInitialCalculationDone(false); // Reset initial calculation state
  };

  // Format chart data from results
  const chartData = useMemo(() => {
    if (!results) return [];
    
    // Generate 12 months of ROI data
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      // Calculate partial ROI based on month (linear progression)
      const lowROI = (results.low.valueIncrease / 12) * month;
      const middleROI = (results.middle.valueIncrease / 12) * month;
      const highROI = (results.high.valueIncrease / 12) * month;
      
      return {
        month: `Month ${month}`,
        "Low Tier": Math.round(lowROI),
        "Middle Tier": Math.round(middleROI),
        "High Tier": Math.round(highROI)
      };
    }).sort((a, b) => {
      // Extract month numbers for sorting
      const monthA = parseInt(a.month.split(' ')[1]);
      const monthB = parseInt(b.month.split(' ')[1]);
      return monthA - monthB;
    });
  }, [results]);

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
        "Garage Door Replacement": 0.005,
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
        "Garage Door Replacement": 0.0085,
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
        "Garage Door Replacement": 0.01,
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

  const generatePDF = async () => {
    if (!results || !resultsRef.current) return;
    
    try {
      setIsPdfGenerating(true);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      
      // Add title and project info
      pdf.setFontSize(18);
      pdf.setTextColor(33, 33, 33);
      pdf.text('Renovation Budget Calculator Results', pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Project Type: ${results.low.projectType}`, pageWidth / 2, 30, { align: 'center' });
      pdf.text(`Home Value: ${homeValueFormatted}`, pageWidth / 2, 38, { align: 'center' });
      pdf.text(`Annual Income: ${yearlyIncomeFormatted}`, pageWidth / 2, 46, { align: 'center' });
      
      // Capture results table as image
      const tableElement = resultsRef.current.querySelector('table');
      if (tableElement) {
        const canvas = await html2canvas(tableElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        // Calculate image dimensions to fit in PDF
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', margin, 55, imgWidth, imgHeight);
        
        // Add explanation for tiers
        let yPos = 55 + imgHeight + 10;
        
        pdf.setFontSize(14);
        pdf.setTextColor(33, 33, 33);
        pdf.text('Investment Options Explained', margin, yPos);
        yPos += 10;
        
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        
        // Basic Investment
        pdf.setTextColor(49, 59, 192); // Primary color
        pdf.text('Basic Investment:', margin, yPos);
        pdf.setTextColor(80, 80, 80);
        pdf.text(`Total Budget: ${formatCurrency(results.low.totalBudget)}`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`Monthly Savings: ${formatCurrency(results.low.monthlySavings)}`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`ROI: ${results.low.roi.toFixed(1)}%`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`Value Increase: ${formatCurrency(results.low.valueIncrease)}`, margin + 40, yPos);
        yPos += 10;
        
        // Standard Investment
        pdf.setTextColor(0, 44, 102); // Secondary color
        pdf.text('Standard Investment:', margin, yPos);
        pdf.setTextColor(80, 80, 80);
        pdf.text(`Total Budget: ${formatCurrency(results.middle.totalBudget)}`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`Monthly Savings: ${formatCurrency(results.middle.monthlySavings)}`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`ROI: ${results.middle.roi.toFixed(1)}%`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`Value Increase: ${formatCurrency(results.middle.valueIncrease)}`, margin + 40, yPos);
        yPos += 10;
        
        // Extensive Budget
        pdf.setTextColor(59, 130, 246); // Blue-500
        pdf.text('Extensive Budget:', margin, yPos);
        pdf.setTextColor(80, 80, 80);
        pdf.text(`Total Budget: ${formatCurrency(results.high.totalBudget)}`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`Monthly Savings: ${formatCurrency(results.high.monthlySavings)}`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`ROI: ${results.high.roi.toFixed(1)}%`, margin + 40, yPos);
        yPos += 6;
        pdf.text(`Value Increase: ${formatCurrency(results.high.valueIncrease)}`, margin + 40, yPos);
        yPos += 15;
        
        // Footer
        pdf.setFontSize(9);
        pdf.setTextColor(130, 130, 130);
        pdf.text('Generated by Renovation Bridge - renovationbridge.com', pageWidth / 2, 280, { align: 'center' });
        
        // Download the PDF
        pdf.save(`${results.low.projectType.replace(/\s+/g, '-')}-budget-plan.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsPdfGenerating(false);
    }
  };

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

  // Effect to handle scroll-based label collapsing
  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      if (container) {
        if (container.scrollLeft > 10) {
          setIsLabelCollapsed(true);
        } else {
          setIsLabelCollapsed(false);
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    // Cleanup listener on component unmount
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showResults]); // Re-run if results visibility changes

  // Effect to handle table metric column collapsing
  useEffect(() => {
    const container = tableScrollContainerRef.current;

    const handleTableScroll = () => {
      if (container) {
        if (container.scrollLeft > 10) {
          setIsMetricColumnCollapsed(true);
        } else {
          setIsMetricColumnCollapsed(false);
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', handleTableScroll);
    }

    // Cleanup listener on component unmount or when results hide
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleTableScroll);
      }
      // Reset collapse state when results hide
      setIsMetricColumnCollapsed(false);
    };
  }, [showResults]); // Re-run if results visibility changes

  // Format phone number input
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const trimmedDigits = digits.slice(0, 10);
    
    // Apply formatting based on the number of digits
    const match = trimmedDigits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      let formatted = '';
      if (match[1]) {
        formatted += `(${match[1]}`;
      }
      if (match[2]) {
        formatted += `) ${match[2]}`;
      }
      if (match[3]) {
        formatted += `-${match[3]}`;
      }
      return formatted;
    }
    
    // Return raw digits if regex fails (shouldn't happen)
    return trimmedDigits;
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
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 sm:p-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Calculate Your Investment Options</h2>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xl">
                Enter your home value and annual income directly or use the sliders to estimate your renovation budget.
              </p>
            </div>
            
            {/* Auto-Update Toggle - Now in header */}            <div className="md:min-w-[220px]">
              <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 transform hover:scale-102`}>
                <div className="flex items-center justify-between gap-3 px-2 py-1">
                  <div>
                    <h3 className="font-medium text-sm text-gray-800">{autoUpdateEnabled ? 'Live Updates On' : 'Enable Live Updates'}</h3>
                    <p className="text-xs text-gray-500">See results instantly</p>
                  </div>
                  
                  <button
                    onClick={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
                    className={`flex items-center justify-center p-2 rounded-full focus:outline-none transition-all duration-300 hover:scale-110 ${
                      autoUpdateEnabled 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-white text-gray-500 border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${autoUpdateEnabled ? 'animate-spin-slow' : 'animate-spin-very-slow'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5">
          {/* Add custom animation class to tailwind styles */}
          <style jsx global>{`
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }
            .animate-spin-very-slow {
              animation: spin-slow 12s linear infinite;
            }
            
            /* Slider styles */
            input[type="range"] {
              -webkit-appearance: none;
              height: 7px;
              border-radius: 5px;
              outline: none;
            }
            
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 18px;
              height: 18px;
              background-color: rgb(99, 102, 241);
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.2s ease;
              border: 2px solid white;
              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 18px;
              height: 18px;
              background-color: rgb(99, 102, 241);
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.2s ease;
              border: 2px solid white;
              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            
            input[type="range"]:hover::-webkit-slider-thumb {
              transform: scale(1.2);
            }
            
            input[type="range"]:hover::-moz-range-thumb {
              transform: scale(1.2);
            }
            
            /* Show tooltip on hover */
            input[type="range"]:hover + .slider-tooltip {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-5">
              {/* Home Value Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Estimated Home Value</label>
                <div className="relative rounded-md shadow-sm">
                  <input 
                    type="text" 
                    {...homeValueRef}
                    className="block w-full pl-3 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400"
                    placeholder="$0"
                    value={homeValueFormatted}
                    onChange={handleHomeValueChange}
                    onFocus={handleInputFocus}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={50000}
                    max={4000000}
                    step={10000}
                    value={homeValueNumber}
                    onChange={(e) => handleHomeValueSlider(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${((homeValueNumber - 50000) / (4000000 - 50000)) * 100}%, rgb(229, 231, 235) ${((homeValueNumber - 50000) / (4000000 - 50000)) * 100}%)`,
                    }}
                  />
                  <div className="slider-tooltip absolute -top-10 left-0 bg-gray-800 text-white px-2 py-1 rounded text-xs transition-all duration-200 opacity-0 transform translate-x-0 pointer-events-none" style={{ left: `calc(${((homeValueNumber - 50000) / (4000000 - 50000)) * 100}% - 20px)` }}>
                    {formatCurrencyInput(`$${homeValueNumber}`)}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$50K</span>
                    <span>$4M</span>
                  </div>
                </div>
                {errors.homeValue && <p className="text-red-500 text-xs italic">This field is required</p>}
              </div>

              {/* Annual Income Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Annual Income</label>
                <div className="relative rounded-md shadow-sm">
                  <input 
                    type="text" 
                    {...yearlyIncomeRef}
                    className="block w-full pl-3 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400"
                    placeholder="$0"
                    value={yearlyIncomeFormatted}
                    onChange={handleYearlyIncomeChange}
                    onFocus={handleInputFocus}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={8000}
                    max={1000000}
                    step={1000}
                    value={yearlyIncomeNumber}
                    onChange={(e) => handleIncomeSlider(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${((yearlyIncomeNumber - 8000) / (1000000 - 8000)) * 100}%, rgb(229, 231, 235) ${((yearlyIncomeNumber - 8000) / (1000000 - 8000)) * 100}%)`,
                    }}
                  />
                  <div className="slider-tooltip absolute -top-10 left-0 bg-gray-800 text-white px-2 py-1 rounded text-xs transition-all duration-200 opacity-0 transform translate-x-0 pointer-events-none" style={{ left: `calc(${((yearlyIncomeNumber - 8000) / (1000000 - 8000)) * 100}% - 20px)` }}>
                    {formatCurrencyInput(`$${yearlyIncomeNumber}`)}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$8K</span>
                    <span>$1M</span>
                  </div>
                </div>
                {errors.yearlyIncome && <p className="text-red-500 text-xs italic">This field is required</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 md:space-y-5">
              {/* Project Type Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Project Type</label>
                <select 
                  {...register('projectType', { required: true })}
                  className="form-select w-full pl-3 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.projectType && <p className="text-red-500 text-xs italic">This field is required</p>}
              </div>

              {/* Action Buttons - Now in the right column for better balance */}
              <div className="flex flex-col gap-4 mt-6">
                <button 
                  onClick={handleSubmit(onSubmit)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Calculate Budget
                </button>
                <button 
                  onClick={onReset}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-300 hover:border-gray-400"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {showResults && results && (
        <div className="max-w-6xl mx-auto transition-all duration-500 animate-fadeIn" ref={resultsRef}>
          {/* Results Header */}
          <div className="bg-white rounded-t-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Renovation Budget Results</h2>
              <p className="text-gray-500">Based on your {results.low.projectType.toLowerCase()} project</p>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white shadow-lg rounded-b-2xl overflow-hidden">
            <div ref={tableScrollContainerRef} className="overflow-x-auto relative"> {/* Added ref and relative positioning */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-indigo-800 uppercase tracking-wider bg-indigo-100/50 whitespace-nowrap">Basic Investment</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-blue-900 uppercase tracking-wider bg-blue-200/50 whitespace-nowrap">Standard Investment</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-sky-800 uppercase tracking-wider bg-sky-100/50 whitespace-nowrap">Extensive Budget</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Moved hover effect to tr */}
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Initial Budget
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.low.initialBudget)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.middle.initialBudget)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.high.initialBudget)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Contingency Fund
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.low.contingencyFund)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.middle.contingencyFund)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.high.contingencyFund)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Time To Save
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatMonths(results.low.timeToSave)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatMonths(results.middle.timeToSave)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatMonths(results.high.timeToSave)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Monthly Savings
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.low.monthlySavings)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.middle.monthlySavings)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.high.monthlySavings)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-semibold text-gray-800 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Estimated ROI
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{results.low.roi.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{results.middle.roi.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{results.high.roi.toFixed(1)}%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Value Increase
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.low.valueIncrease)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.middle.valueIncrease)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">{formatCurrency(results.high.valueIncrease)}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-4 text-sm font-semibold text-gray-800 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Updated Home Value
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{formatCurrency(results.low.updatedHomeValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{formatCurrency(results.middle.updatedHomeValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{formatCurrency(results.high.updatedHomeValue)}</td>
                  </tr>
                  <tr className="border-t border-gray-300 hover:bg-gray-50/70 transition-colors duration-150">
                    <td 
                      className={`px-6 py-5 text-base font-bold text-gray-900 sticky left-0 bg-white z-10 transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isMetricColumnCollapsed ? 'w-0 opacity-0 scale-x-0 px-0' : 'w-1/4'
                      }`}
                    >
                      Total Budget
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg font-bold text-right text-primary bg-indigo-100/50">{formatCurrency(results.low.totalBudget)}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg font-bold text-right text-secondary bg-blue-200/50">{formatCurrency(results.middle.totalBudget)}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg font-bold text-right text-blue-600 bg-sky-100/50">{formatCurrency(results.high.totalBudget)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ROI over time */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 mt-8 relative"> {/* Added relative */} 
            <h3 className="text-xl font-bold text-gray-800 mb-4">ROI Over Time</h3>

            {/* Moved Y-axis Label outside the scrollable div and positioned absolutely */}
            <div className={`absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center pointer-events-none z-10 transition-all duration-300 ease-in-out overflow-hidden ${isLabelCollapsed ? 'w-0 opacity-0 scale-x-0' : 'w-auto opacity-100 scale-x-100'}`}> {/* Animated collapse */}
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">ROI ($)</span>
            </div>

            <div ref={scrollContainerRef} className="w-full overflow-x-auto pl-8"> {/* Added pl-8 for label space AND ref */} 
              <style jsx>{`
                .charts-css {
                  height: 300px;
                  max-width: 100%;
                  margin: 0 auto;
                  --color-1: rgba(49, 59, 192, 0.5); /* Primary */
                  --color-2: rgba(0, 44, 102, 0.5); /* Secondary */
                  --color-3: rgba(59, 130, 246, 0.5); /* Blue-500 */
                }
                
                .charts-css caption {
                  margin-bottom: 1rem;
                  font-weight: 500;
                  color: #4b5563;
                }
                
                .charts-css.column tbody tr {
                  padding-inline-end: 0.5rem;
                }
                
                .charts-css tbody tr th {
                  font-size: 0.65rem; /* Reduced from 0.75rem */
                  color: #6b7280;
                  font-weight: 400;
                  white-space: nowrap; /* Prevent wrapping */
                }
                
                .charts-css .data-tooltip {
                  position: absolute;
                  top: -1.5rem;
                  left: 50%;
                  transform: translateX(-50%);
                  background: rgba(55, 65, 81, 0.9);
                  color: white;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                  font-size: 0.75rem;
                  opacity: 0;
                  transition: opacity 0.2s;
                  white-space: nowrap;
                }
                
                .charts-css td:hover .data-tooltip {
                  opacity: 1;
                }

                .charts-css.column tbody .data-tbody {
                  display: flex;
                  justify-content: space-around;
                  width: 100%;
                }

                .chart-wrapper {
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 1rem 2rem 2rem 1rem; /* Reduced left padding */
                  position: relative;
                }
                
                /* X and Y axis labels */
                .axis-labels .x-label {
                  position: absolute;
                  bottom: -10px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 0.875rem;
                  font-weight: 500;
                  color: #4b5563;
                }
                
                /* Chart annotations */
                .chart-annotations {
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: 100%;
                  width: 100%;
                  pointer-events: none;
                }
                
                .chart-annotations .y-max,
                .chart-annotations .y-min {
                  position: absolute;
                  left: -5px;
                  font-size: 0.65rem; /* Reduced font size */
                  color: #6b7280;
                }
                
                .chart-annotations .y-max-right,
                .chart-annotations .y-min-right {
                  left: auto;
                  right: -5px;
                }
                
                .chart-annotations .y-max {
                  top: 1.5rem;
                }
                
                .chart-annotations .y-min {
                  bottom: 1.5rem;
                }
                
                /* Better grid styling */
                .charts-css.column.show-primary-axis {
                  --primary-axis-color: rgba(229, 231, 235, 0.8);
                  --primary-axis-width: 2px;
                }
                
                .charts-css.column.show-4-secondary-axes {
                  --secondary-axes-color: rgba(229, 231, 235, 0.5);
                }

                /* Tier hover effects */
                .bar-tier {
                  transition: opacity 0.3s ease;
                }

                /* We'll use JavaScript for the hover effects instead of CSS */
                /* Custom Tailwind-like classes for opacity */
                .opacity-40 {
                  opacity: 0.4;
                }
                
                .opacity-100 {
                  opacity: 1;
                }

                /* Legend hover effects */
                .chart-legend-item {
                  cursor: pointer;
                  transition: opacity 0.3s ease;
                }

                /* Add data-tier attributes to allow JavaScript hover handling */
                .tier-low {
                  --tier: "low";
                }
                
                .tier-middle {
                  --tier: "middle";
                }
                
                .tier-high {
                  --tier: "high";
                }
              `}</style>
              
              <div className="chart-wrapper min-w-[700px]" id="chart-container">
                <table className="charts-css column show-primary-axis show-4-secondary-axes show-labels data-spacing-4">
                  <caption>Return on Investment Over 12 Months</caption>
                  <thead>
                    <tr>
                      <th scope="col">Month</th>
                      <th scope="col">Low Tier</th>
                      <th scope="col">Middle Tier</th>
                      <th scope="col">High Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((data, index) => {
                      const maxValue = Math.max(
                        ...chartData.map(d => Math.max(d["Low Tier"], d["Middle Tier"], d["High Tier"]))
                      );
                      return (
                        <tr key={data.month}>
                          <th scope="row">{data.month}</th>
                          <td className="tier-low bar-tier" style={{
                            "--size": `calc(${data["Low Tier"]} / ${maxValue})`,
                            "--color": "rgba(49, 59, 192, 0.6)" /* Primary */
                          } as React.CSSProperties}>
                            <span className="data-tooltip">{formatCurrency(data["Low Tier"])}</span>
                          </td>
                          <td className="tier-middle bar-tier" style={{
                            "--size": `calc(${data["Middle Tier"]} / ${maxValue})`,
                            "--color": "rgba(0, 44, 102, 0.6)" /* Secondary */
                          } as React.CSSProperties}>
                            <span className="data-tooltip">{formatCurrency(data["Middle Tier"])}</span>
                          </td>
                          <td className="tier-high bar-tier" style={{
                            "--size": `calc(${data["High Tier"]} / ${maxValue})`,
                            "--color": "rgba(59, 130, 246, 0.6)" /* Blue-500 */
                          } as React.CSSProperties}>
                            <span className="data-tooltip">{formatCurrency(data["High Tier"])}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {/* Chart Annotations */}
                <div className="chart-annotations">
                  <div className="y-max">{formatCurrency(Math.max(
                    ...chartData.map(d => Math.max(d["Low Tier"], d["Middle Tier"], d["High Tier"]))
                  ))}</div>
                  <div className="y-min">$0</div>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex justify-center items-center mt-4 space-x-6 chart-legend">
                <div className="flex items-center chart-legend-item low">
                  <div className="w-4 h-4 bg-primary rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">Low Tier</span>
                </div>
                <div className="flex items-center chart-legend-item middle">
                  <div className="w-4 h-4 bg-secondary rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">Middle Tier</span>
                </div>
                <div className="flex items-center chart-legend-item high">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">High Tier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Breakdown Visualization */}
          <div className="bg-white rounded-lg shadow-lg mt-8 overflow-hidden">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200"> {/* Adjusted horizontal padding */}
              <h3 className="text-lg font-medium text-gray-900">Budget Breakdown</h3>
              <p className="text-sm text-gray-500 mt-1">Visual representation of your budget allocation</p>
            </div>
            <div className="p-4 sm:p-6"> {/* Adjusted overall padding */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"> {/* Adjusted gap */}
                {/* Low Tier Budget Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 shadow-sm"> {/* Adjusted internal card padding */}
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"> {/* Adjusted margin */}
                    <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                    Low Tier Budget
                  </h4>
                  <div className="mb-3"> {/* Adjusted margin */}
                    <div className="flex justify-between text-sm mb-1">
                      <span>Initial Budget</span>
                      <span>{formatCurrency(results.low.initialBudget)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-400 h-2.5 rounded-full" 
                        style={{
                          width: `${(results.low.initialBudget / results.low.totalBudget * 100).toFixed(0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-3"> {/* Adjusted margin */}
                    <div className="flex justify-between text-sm mb-1">
                      <span>Contingency Fund</span>
                      <span>{formatCurrency(results.low.contingencyFund)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{
                          width: `${(results.low.contingencyFund / results.low.totalBudget * 100).toFixed(0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200"> {/* Adjusted margin */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Budget</span>
                      <span className="text-lg font-bold text-primary">{formatCurrency(results.low.totalBudget)}</span>
                    </div>
                  </div>
                </div>

                {/* Middle Tier Budget Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 shadow-sm"> {/* Adjusted internal card padding */}
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"> {/* Adjusted margin */}
                    <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                    Middle Tier Budget
                  </h4>
                  <div className="mb-3"> {/* Adjusted margin */}
                    <div className="flex justify-between text-sm mb-1">
                      <span>Initial Budget</span>
                      <span>{formatCurrency(results.middle.initialBudget)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-700 h-2.5 rounded-full" 
                        style={{
                          width: `${(results.middle.initialBudget / results.middle.totalBudget * 100).toFixed(0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-3"> {/* Adjusted margin */}
                    <div className="flex justify-between text-sm mb-1">
                      <span>Contingency Fund</span>
                      <span>{formatCurrency(results.middle.contingencyFund)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-900 h-2.5 rounded-full" 
                        style={{
                          width: `${(results.middle.contingencyFund / results.middle.totalBudget * 100).toFixed(0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200"> {/* Adjusted margin */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Budget</span>
                      <span className="text-lg font-bold text-secondary">{formatCurrency(results.middle.totalBudget)}</span>
                    </div>
                  </div>
                </div>

                {/* High Tier Budget Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 shadow-sm"> {/* Adjusted internal card padding */}
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center"> {/* Adjusted margin */}
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    High Tier Budget
                  </h4>
                  <div className="mb-3"> {/* Adjusted margin */}
                    <div className="flex justify-between text-sm mb-1">
                      <span>Initial Budget</span>
                      <span>{formatCurrency(results.high.initialBudget)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-400 h-2.5 rounded-full" 
                        style={{
                          width: `${(results.high.initialBudget / results.high.totalBudget * 100).toFixed(0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-3"> {/* Adjusted margin */}
                    <div className="flex justify-between text-sm mb-1">
                      <span>Contingency Fund</span>
                      <span>{formatCurrency(results.high.contingencyFund)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{
                          width: `${(results.high.contingencyFund / results.high.totalBudget * 100).toFixed(0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200"> {/* Adjusted margin */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Budget</span>
                      <span className="text-lg font-bold text-blue-600">{formatCurrency(results.high.totalBudget)}</span>
                    </div>
                  </div>
                </div>
              </div>
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
                  <div className="bg-indigo-100 p-3 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div className="bg-sky-100 p-3 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <p className="mt-1 text-sm text-gray-500">Enter your contact information to save these results and receive a downloadable PDF of your renovation budget.</p>
            </div>
            <div className="p-6">
              {leadSubmitted ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700">Thank you! Your results have been saved.</p>
                  </div>
                  
                  <button 
                    onClick={generatePDF}
                    disabled={isPdfGenerating}
                    className={`flex items-center justify-center gap-3 px-5 py-3 rounded-lg font-medium shadow-md transition-all duration-300 ${
                      isPdfGenerating 
                        ? 'bg-gray-200 text-gray-500 cursor-wait w-full' 
                        : 'bg-gradient-to-r from-primary to-indigo-600 text-white hover:shadow-lg hover:scale-105 active:scale-100 w-full'
                    }`}
                  >
                    {isPdfGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <span className="relative group">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                          <span className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></span>
                        </span>
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-[2px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                          Download Your Budget PDF
                        </span>
                      </>
                    )}
                  </button>
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
                        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
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