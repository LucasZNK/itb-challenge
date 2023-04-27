import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Card.module.css";

interface Props {
  title: string;
  value: string;
  className?: string;
  showTransition?: boolean;
}
const Card = ({ title, value, className, showTransition }: Props) => {
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    setTransitionClass(styles.valueTransition);

    const timer = setTimeout(() => {
      setTransitionClass("");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  const cardClasses = classnames(styles.cardContainer, className);
  const titleClasses = classnames(styles.cardTitle, className);
  const contentClasses = classnames(
    styles.cardContent,
    className,
    showTransition && transitionClass
  );

  return (
    <div className={cardClasses}>
      <span className={titleClasses}>{title}</span>
      <span className={contentClasses}>{value}</span>
    </div>
  );
};

export default Card;
