import { ApplicationList } from "../application-list";
import { Navigation } from "../navigation";
import styles from "./application-explorer.module.css";

export const ApplicationExplorer = () => {
  return (
    <div className={styles.applicationContainer}>
      <Navigation />
      <ApplicationList />
    </div>
  );
};
