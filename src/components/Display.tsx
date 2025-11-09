import './Display.css';

interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className="calculator-display">
      <div className="display-content">{value || '0'}</div>
    </div>
  );
};

export default Display;

