import * as React from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
