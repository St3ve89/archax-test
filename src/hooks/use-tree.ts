import { useMemo } from "react";
import { buildTree } from "../utils/buildTree";
import { useApplicationContext } from "./use-application-context";

export interface TreeNodeData {
  name: string;
  children?: TreeNodeData[];
}

export const useTree = (): TreeNodeData[] => {
  const { applications } = useApplicationContext();
  return useMemo(() => {
    const levels = ["BCAP1", "BCAP2", "BCAP3"];
    return buildTree(applications, levels);
  }, [applications]);
};
