


interface ButtonProps {
    label: string;
    onClick?: () => void;
    class?: string;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {

    const { label, onClick, class: className, disabled } = props;
  return (
    <button onClick={onClick} className={className} disabled={disabled}>{label}</button>
  )
}
