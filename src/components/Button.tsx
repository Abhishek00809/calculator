import './Button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  doubleWidth?: boolean;
}

const Button = ({ label, onClick, className = '', doubleWidth = false }: ButtonProps) => {
  return (
    <button
      className={`calculator-button ${className} ${doubleWidth ? 'double-width' : ''}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};

export default Button;

