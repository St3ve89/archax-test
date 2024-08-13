import { ApplicationItemProps } from "./application-item.type";
import styles from "./application-item.module.css";

export const ApplicationItem = ({ name, spend }: ApplicationItemProps) => {
  return (
    <li className={styles.applicationItem}>
      <span>{name}</span>
      <span>Total spend: ${spend}</span>
    </li>
  );
};
