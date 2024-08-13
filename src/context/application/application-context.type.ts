import { ReactNode } from "react";
import { Application } from "../../services/data-service";

export type ApplicationContextProps = {
  applications: Application[];
  filteredApplications: Application[];
  selectedCapabilities: string[];
  activePath: string[];
  spendFilter: number;
  maxSpend: number;
  setSpendFilter: (value: number) => void;
  selectCapability: (capability: string, level: number) => void;
};

export type ApplicationProviderProps = {
  children: ReactNode;
};
