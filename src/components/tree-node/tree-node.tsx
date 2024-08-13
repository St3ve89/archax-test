import { memo, useEffect, useState } from "react";
import { TreeNodeProps } from "./tree-node.type";
import styles from "./tree-node.module.css";

export const TreeNode = memo(
  ({
    name,
    children,
    onSelect,
    level,
    isActive,
    activePath,
  }: TreeNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
      const newIsExpanded = !isExpanded;
      setIsExpanded(newIsExpanded);
      if (newIsExpanded) {
        onSelect(name, level);
      } else {
        onSelect("", level);
      }
    };

    useEffect(() => {
      if (activePath[level] !== name) {
        setIsExpanded(false);
      }
    }, [activePath, level, name]);

    const isDirectlyActive = isActive && activePath.length === level + 1;

    return (
      <div className={styles.treeNodeContainer}>
        <div
          onClick={handleToggle}
          className={`${styles.treeNode} ${
            isDirectlyActive ? styles.active : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          {children ? <span>{isExpanded ? "▲" : "▼"}</span> : null}
          <span className={styles.treeNodeName}>{name}</span>
        </div>
        {isExpanded && children && (
          <div>
            {children.map((child) => (
              <TreeNode
                key={child.name}
                {...child}
                onSelect={onSelect}
                level={level + 1}
                isActive={activePath[level + 1] === child.name}
                activePath={activePath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
