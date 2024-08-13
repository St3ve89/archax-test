import { TreeNodeData } from "../hooks/use-tree";
import { Application } from "../services/data-service";

const buildTreeRecursive = (
  nodes: { [key: string]: any },
  levels: string[],
  app: Application,
  levelIndex: number
) => {
  if (levelIndex >= levels.length) return;

  const level = levels[levelIndex];
  const value = app[level as keyof Application] as string;

  if (!nodes[value]) {
    nodes[value] = { name: value, children: {} };
  }

  buildTreeRecursive(nodes[value].children, levels, app, levelIndex + 1);
};

const convertToTreeNodes = (nodes: { [key: string]: any }): TreeNodeData[] => {
  return Object.values(nodes)
    .map((node: any) => ({
      name: node.name,
      children: node.children ? convertToTreeNodes(node.children) : undefined,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};

export const buildTree = (
  applications: Application[],
  levels: string[]
): TreeNodeData[] => {
  const tree: { [key: string]: any } = {};

  applications.forEach((app) => {
    buildTreeRecursive(tree, levels, app, 0);
  });

  return convertToTreeNodes(tree);
};
