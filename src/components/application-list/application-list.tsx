import { useApplicationContext } from "../../hooks/use-application-context";
import { ApplicationItem } from "../application-item";
import styles from "./application-list.module.css";

export const ApplicationList = () => {
  const { filteredApplications } = useApplicationContext();
  return (
    <ul className={styles.applicationListContainer}>
      {filteredApplications.map(({ id, name, spend }) => (
        <ApplicationItem key={id} name={name} spend={spend} />
      ))}
    </ul>
  );
};
