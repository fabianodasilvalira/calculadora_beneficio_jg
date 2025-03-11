import React, { useState, useEffect } from 'react';
import { Beer } from 'lucide-react';
import { Beverage, BeverageAnalysis } from './types/beverage';
import { analyzeBeverages } from './utils/beverageCalculator';
import { BeverageForm } from './components/BeverageForm';
import { ResultsDisplay } from './components/ResultsDisplay';

function App() {
  const [beverages, setBeverages] = useState<Beverage[]>([
    { id: crypto.randomUUID(), description: '', volume: 0, price: 0 },
    { id: crypto.randomUUID(), description: '', volume: 0, price: 0 },
  ]);
  const [results, setResults] = useState<BeverageAnalysis[]>([]);

  const handleUpdate = (newBeverages: Beverage[]) => {
    setBeverages(newBeverages);
    const validBeverages = newBeverages.filter(
      (b) => b.volume > 0 && b.price > 0
    );
    setResults(analyzeBeverages(validBeverages));
  };

  const handleClear = () => {
    setBeverages([
      { id: crypto.randomUUID(), description: '', volume: 0, price: 0 },
      { id: crypto.randomUUID(), description: '', volume: 0, price: 0 },
    ]);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-300 rounded-full blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-blue-600 p-4 sm:p-6 rounded-full shadow-xl">
                <Beer size={48} className="text-white animate-bounce-slow sm:size-16" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-blue-900 leading-none mb-1 sm:mb-2">
                JG Depósito
              </h1>
              <p className="font-bebas text-3xl sm:text-4xl md:text-5xl text-blue-700 tracking-wide">
                de Bebidas
              </p>
              <p className="font-bebas text-2xl sm:text-3xl md:text-4xl text-blue-700 tracking-wide">
                (86) 99528-3262
              </p>
            </div>

          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4 font-poppins">
            Calculadora de Custo-Benefício
          </h2>
          <p className="text-lg sm:text-xl text-blue-700 max-w-2xl mx-auto font-poppins px-2">
            Compare preços e volumes de diferentes bebidas para encontrar a melhor opção
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl mb-6 sm:mb-8 hover:shadow-2xl transition-all duration-300">
          <BeverageForm
            beverages={beverages}
            onUpdate={handleUpdate}
            onClear={handleClear}
          />
        </div>
        
        <ResultsDisplay results={results} />
      </div>
    </div>
  );
}

export default App;
