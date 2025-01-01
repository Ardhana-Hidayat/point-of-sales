

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface DateFormatterProps {
    data: string;
}

export default function DateFormatter({ data }: DateFormatterProps) {
    return format(new Date(data), 'dd-MM-yyyy, HH:mm', { locale: id })
}

export function generateUniqueTransactionCode(): string {
    const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
    return randomSegment;
}


