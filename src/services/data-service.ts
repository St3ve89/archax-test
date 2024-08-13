export interface Application {
  id: string;
  name: string;
  spend: number;
  [key: string]: string | number;
}

export const fetchData = async (): Promise<Application[]> => {
  const response = await fetch("http://localhost:8080/data");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
