import { useState } from 'react';
import Display from './Display';
import Button from './Button';
import { calculate, formatDisplay, type Operator } from '../utils/calculator';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      try {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operator);
        setDisplay(formatDisplay(newValue));
        setPreviousValue(newValue);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      try {
        const newValue = calculate(previousValue, inputValue, operator);
        setDisplay(formatDisplay(newValue));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      }
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(formatDisplay(value));
    setWaitingForOperand(true);
  };

  const handleToggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div className="calculator-container">
        <Display value={display} />
        <div className="calculator-buttons">
          <Button label="AC" onClick={clear} className="clear" />
          <Button label="±" onClick={handleToggleSign} className="operator" />
          <Button label="%" onClick={handlePercent} className="operator" />
          <Button label="÷" onClick={() => performOperation('/')} className="operator" />
          
          <Button label="7" onClick={() => inputNumber('7')} />
          <Button label="8" onClick={() => inputNumber('8')} />
          <Button label="9" onClick={() => inputNumber('9')} />
          <Button label="×" onClick={() => performOperation('*')} className="operator" />
          
          <Button label="4" onClick={() => inputNumber('4')} />
          <Button label="5" onClick={() => inputNumber('5')} />
          <Button label="6" onClick={() => inputNumber('6')} />
          <Button label="−" onClick={() => performOperation('-')} className="operator" />
          
          <Button label="1" onClick={() => inputNumber('1')} />
          <Button label="2" onClick={() => inputNumber('2')} />
          <Button label="3" onClick={() => inputNumber('3')} />
          <Button label="+" onClick={() => performOperation('+')} className="operator" />
          
          <Button label="0" onClick={() => inputNumber('0')} doubleWidth />
          <Button label="." onClick={inputDecimal} />
          <Button label="=" onClick={handleEquals} className="equals" />
        </div>
      </div>
    </div>
  );
};

export default Calculator;

