/**
 * Utility functions for beverage cost-benefit calculations
 */
export const calculateCostPerLiter = (volume: number, price: number): number => {
  const volumeInLiters = volume / 1000;
  return price / volumeInLiters;
};

export const analyzeBeverages = (beverages: Beverage[]): BeverageAnalysis[] => {
  if (!beverages.length) return [];

  const withCostPerLiter = beverages.map(beverage => ({
    ...beverage,
    costPerLiter: calculateCostPerLiter(beverage.volume, beverage.price)
  }));

  const lowestCostPerLiter = Math.min(
    ...withCostPerLiter.map(b => b.costPerLiter)
  );

  return withCostPerLiter.map(beverage => ({
    ...beverage,
    isBestValue: beverage.costPerLiter === lowestCostPerLiter
  }));
};