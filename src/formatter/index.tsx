

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface DateFormatterProps {
    data: string;
}

interface AmountFormatterProps {
    amount: number;
}

export function DateFormatter({ data }: DateFormatterProps) {
    return format(new Date(data), 'dd-MM-yyyy, HH:mm', { locale: id })
}

export function generateUniqueTransactionCode(): string {
    const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
    return randomSegment;
}

export function FormatCurrencyIDR({ amount }: AmountFormatterProps) {
    if (typeof amount !== "number") {
      amount = Number(amount);
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  


