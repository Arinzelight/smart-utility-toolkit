import { useCallback, useEffect, useState } from 'react';

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.4,
  CAD: 1.35,
  AUD: 1.52,
  NGN: 1200,
};

export const useCurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('NGN');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setRates(data.rates);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // Silently use fallback — no visible crash for the user
          setError('offline');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchRates();

    // Cleanup: abort in-flight request when fromCurrency changes or component unmounts
    return () => controller.abort();
  }, [fromCurrency]);

  const convert = useCallback((): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount === 0) return '0.00';

    // Same currency — no-op
    if (fromCurrency === toCurrency) {
      return numAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    const rate = rates[toCurrency];
    if (!rate) return 'N/A';

    return (numAmount * rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [amount, fromCurrency, toCurrency, rates]);

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result: convert(),
    availableCurrencies: Object.keys(rates),
    loading,
    isOffline: error === 'offline',
  };
};

