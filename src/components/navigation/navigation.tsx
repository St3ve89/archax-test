import { useApplicationContext } from "../../hooks/use-application-context";
import { TreeNodeData, useTree } from "../../hooks/use-tree";
import { RangeSlider } from "../range-slider";
import { TreeNode } from "../tree-node";
import { TreeNodeProps } from "../tree-node/tree-node.type";
import styles from "./navigation.module.css";

export const Navigation = () => {
  const tree = useTree();

  const {
    maxSpend,
    spendFilter,
    setSpendFilter,
    selectCapability,
    activePath,
  } = useApplicationContext();

  const convertTreeNodeDataToProps = (
    node: TreeNodeData,
    level: number
  ): TreeNodeProps => ({
    name: node.name,
    children: node.children?.map((child) =>
      convertTreeNodeDataToProps(child, level + 1)
    ),
    onSelect: selectCapability,
    level: level,
    isActive: activePath[level] === node.name,
    activePath: activePath,
  });

  return (
    <div className={styles.navigationContainer}>
      <div>
        <h4 className={styles.navigationTitle}>Navigation</h4>
        <div>
          {tree.map((cap) => (
            <TreeNode key={cap.name} {...convertTreeNodeDataToProps(cap, 0)} />
          ))}
        </div>
      </div>
      <div className={styles.navigationDivider} />
      <div>
        <h4 className={styles.navigationTitle}>Filters</h4>
        <RangeSlider
          id="spending"
          label="Spending"
          min={0}
          max={maxSpend}
          value={spendFilter}
          onChange={setSpendFilter}
        />
      </div>
    </div>
  );
};
