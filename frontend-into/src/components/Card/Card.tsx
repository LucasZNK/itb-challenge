import React from "react";
import classnames from "classnames";
import styles from "./Card.module.css";

interface Props {
  title: string;
  value: string;
  className?: string;
}
const Card = ({ title, value, className }: Props) => {
  const cardClasses = classnames(styles.cardContainer, className);
  const titleClasses = classnames(styles.cardTitle, className);
  const contentClasses = classnames(styles.cardContent, className);

  return (
    <div className={cardClasses}>
      <span className={titleClasses}>{title}</span>
      <span className={contentClasses}>{value}</span>
    </div>
  );
};

export default Card;
