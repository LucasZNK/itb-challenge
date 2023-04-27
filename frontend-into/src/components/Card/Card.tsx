import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}
const Card = ({ title, children }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Card;
