import React from 'react';
import { Share2 } from 'lucide-react';
import { BeverageAnalysis } from '../types/beverage';

interface ResultsDisplayProps {
  results: BeverageAnalysis[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const handleShare = async () => {
    const bestValue = results.find((r) => r.isBestValue);
    if (!bestValue) return;

    const text = `Melhor custo-benefício:\n${bestValue.description}\n${
      bestValue.volume
    }ml por R$${bestValue.price}\nCusto por litro: R$${bestValue.costPerLiter.toFixed(
      2
    )}`;

    try {
      await navigator.share({ text });
    } catch (err) {
      await navigator.clipboard.writeText(text);
      alert('Resultado copiado para a área de transferência!');
    }
  };

  if (!results.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 sm:mt-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
            Resultados da Análise
          </h2>
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className={`p-4 sm:p-6 rounded-xl transition-all duration-200 ${
                  result.isBestValue
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-2">
                      {result.description || 'Produto sem descrição'}
                    </h3>
                    <p className="text-base sm:text-lg mb-1">
                      {result.volume}ml por R${result.price}
                    </p>
                    <p className="text-gray-600">
                      Custo por litro: R${result.costPerLiter.toFixed(2)}
                    </p>
                  </div>
                  {result.isBestValue && (
                    <span className="text-blue-600 font-semibold text-base sm:text-lg bg-blue-100 px-4 py-2 rounded-lg w-full sm:w-auto text-center">
                      Melhor Custo-Benefício!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t bg-gray-50 p-4 sm:p-6">
          <button
            onClick={handleShare}
            className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-800 font-medium w-full sm:w-auto"
          >
            <Share2 size={20} />
            Compartilhar Melhor Resultado
          </button>
        </div>
      </div>
    </div>
  );
};