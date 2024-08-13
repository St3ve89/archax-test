export type TreeNodeProps = {
  name: string;
  children?: TreeNodeProps[];
  onSelect: (name: string, level: number) => void;
  level: number;
  isActive: boolean;
  activePath: string[];
};
