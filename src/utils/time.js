import { monthString } from '@base86inc/apollo-client/build/src/components/Invoice';
import orderBy from 'lodash/orderBy';

export function toMonthYear({ month, year }) {
  return `${month}_${year}`;
}

export function fromMonthYear(monthYear) {
  const [monthStr, yearStr] = (monthYear || '').split('_');
  const month = Number(monthStr);
  const year = Number(yearStr);
  return { month, year };
}

export function sortMonthYear(monthYears) {
  return orderBy(
    monthYears.map(fromMonthYear),
    ['year', 'month'],
    ['desc', 'desc'],
  ).map(toMonthYear);
}

export function toMonthString(key) {
  const [m, y] = key.split('_');
  return `${monthString(Number(m))} '${String(y).slice(2)}`;
}
