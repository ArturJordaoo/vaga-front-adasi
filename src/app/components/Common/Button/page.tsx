import './button.module.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  outlined?: boolean;
}

function Button({ text, onClick, outlined = false }: ButtonProps) {
  return (
    <div
      className={outlined ? 'btn-outlined' : 'btn'}
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
}

export default Button;
