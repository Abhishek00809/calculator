export type Operator = '+' | '-' | '*' | '/' | '=' | null;

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operator: Operator;
  waitingForOperand: boolean;
}

export const calculate = (
  previousValue: number,
  currentValue: number,
  operator: Operator
): number => {
  switch (operator) {
    case '+':
      return previousValue + currentValue;
    case '-':
      return previousValue - currentValue;
    case '*':
      return previousValue * currentValue;
    case '/':
      if (currentValue === 0) {
        throw new Error('Cannot divide by zero');
      }
      return previousValue / currentValue;
    default:
      return currentValue;
  }
};

export const formatDisplay = (value: number | string): string => {
  if (typeof value === 'string') return value;
  
  // Handle very large numbers
  if (Math.abs(value) > 999999999) {
    return value.toExponential(5);
  }
  
  // Handle very small numbers
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(5);
  }
  
  // Format with appropriate decimal places
  const str = value.toString();
  if (str.includes('.')) {
    // Limit to 9 decimal places
    return parseFloat(value.toFixed(9)).toString();
  }
  
  return str;
};

