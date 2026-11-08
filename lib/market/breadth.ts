
export type StockQuote = {
  symbol: string;
  currentPrice: number;
  previousClose: number;
};

export type MarketBreadthResult = {
  totalStocks: number;
  evaluatedStocks: number;
  advances: number;
  declines: number;
  unchanged: number;
  missingData: number;
  netAdvances: number;
  advanceDeclineRatio: number | null;
  dataCoveragePercent: number;
  isComplete: boolean;
};

export function calculateMarketBreadth(
  stocks: readonly (StockQuote | null | undefined)[]
): MarketBreadthResult {
  let advances = 0;
  let declines = 0;
  let unchanged = 0;
  let missingData = 0;

  for (const stock of stocks) {
    if (
      !stock ||
      !Number.isFinite(stock.currentPrice) ||
      !Number.isFinite(stock.previousClose) ||
      stock.currentPrice <= 0 ||
      stock.previousClose <= 0
    ) {
      missingData++;
      continue;
    }

    if (stock.currentPrice > stock.previousClose) {
      advances++;
    } else if (stock.currentPrice < stock.previousClose) {
      declines++;
    } else {
      unchanged++;
    }
  }

  const totalStocks = stocks.length;
  const evaluatedStocks = advances + declines + unchanged;

  return {
    totalStocks,
    evaluatedStocks,
    advances,
    declines,
    unchanged,
    missingData,
    netAdvances: advances - declines,
    advanceDeclineRatio:
      declines > 0 ? advances / declines : null,
    dataCoveragePercent:
      totalStocks > 0
        ? (evaluatedStocks / totalStocks) * 100
        : 0,
    isComplete: totalStocks > 0 && missingData === 0,
  };
}
