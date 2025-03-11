import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Beverage, volumeOptions } from '../types/beverage';

interface BeverageFormProps {
  beverages: Beverage[];
  onUpdate: (beverages: Beverage[]) => void;
  onClear: () => void;
}

export const BeverageForm: React.FC<BeverageFormProps> = ({
  beverages,
  onUpdate,
  onClear,
}) => {
  const handleInputChange = (
    id: string,
    field: keyof Omit<Beverage, 'id'>,
    value: string
  ) => {
    const numValue = field === 'description' ? value : parseFloat(value) || 0;
    const updated = beverages.map((bev) =>
      bev.id === id ? { ...bev, [field]: numValue } : bev
    );
    onUpdate(updated);
  };

  const handleVolumeChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const option = volumeOptions.find(opt => opt.value === numValue);
    const updated = beverages.map((bev) =>
      bev.id === id
        ? {
            ...bev,
            volume: numValue,
            description: option ? option.label : bev.description
          }
        : bev
    );
    onUpdate(updated);
  };

  const addBeverage = () => {
    onUpdate([
      ...beverages,
      { id: crypto.randomUUID(), description: '', volume: 0, price: 0 },
    ]);
  };

  const removeBeverage = (id: string) => {
    onUpdate(beverages.filter((bev) => bev.id !== id));
  };

  const groupedOptions = volumeOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof volumeOptions>);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        {beverages.map((beverage) => (
          <div
            key={beverage.id}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-[2]">
              <select
                value={beverage.volume}
                onChange={(e) => handleVolumeChange(beverage.id, e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
              >
                <option value="0">Selecione o volume</option>
                {Object.entries(groupedOptions).map(([category, options]) => (
                  <optgroup key={category} label={category}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Preço (R$)"
                  value={beverage.price || ''}
                  onChange={(e) =>
                    handleInputChange(beverage.id, 'price', e.target.value)
                  }
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
                  min="0"
                  step="0.01"
                />
              </div>
              <button
                onClick={() => removeBeverage(beverage.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200 self-center"
                title="Remover item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={addBeverage}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium w-full sm:w-auto"
        >
          <PlusCircle size={20} />
          Adicionar Produto
        </button>
        <button
          onClick={onClear}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 w-full sm:w-auto"
        >
          Limpar Tudo
        </button>
      </div>
    </div>
  );
};