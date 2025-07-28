// utils/billUtils.js

export function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return `${day}th`;
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

export function summarizeBills(bills) {
  const summary = {
    paid: { total: 0, count: 0 },
    soon: { total: 0, count: 0 },
    unpaid: { total: 0, count: 0 },
  };

  bills.forEach((bill) => {
    const amount = parseFloat(bill.amount) || 0;
    const status = bill.status;

    if (summary[status]) {
      summary[status].total += amount;
      summary[status].count += 1;
    }
  });

  return summary;
}