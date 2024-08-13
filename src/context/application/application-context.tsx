import React, { createContext, useState, useEffect } from "react";
import { Application, fetchData } from "../../services/data-service";
import { ApplicationContextProps } from "./application-context.type";

export const ApplicationContext = createContext<
  ApplicationContextProps | undefined
>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    []
  );
  const [activePath, setActivePath] = useState<string[]>([]);
  const [spendFilter, setSpendFilter] = useState(0);
  const [maxSpend, setMaxSpend] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setApplications(data);
        const maxSpendValue = Math.max(...data.map((app) => app.spend));
        setMaxSpend(maxSpendValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (selectedCapabilities.length > 0) {
      filtered = filtered.filter((app) => {
        return selectedCapabilities.every((capability, index) => {
          const key = `BCAP${index + 1}`;
          return capability === "" || app[key] === capability;
        });
      });
    } else {
      filtered = [];
    }

    filtered = filtered.filter((app) => app.spend >= spendFilter);

    setFilteredApplications(filtered);
  }, [applications, selectedCapabilities, spendFilter]);

  const selectCapability = (capability: string, level: number) => {
    setSelectedCapabilities((prevSelected) => {
      const newSelected = [...prevSelected];
      if (capability === "") {
        return newSelected.slice(0, level);
      } else {
        newSelected[level] = capability;
        return newSelected.slice(0, level + 1);
      }
    });
    setActivePath((prevActive) => {
      const newActive = [...prevActive];
      if (capability === "") {
        return newActive.slice(0, level);
      } else {
        newActive[level] = capability;
        return newActive.slice(0, level + 1);
      }
    });
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        filteredApplications,
        selectedCapabilities,
        activePath,
        spendFilter,
        maxSpend,
        setSpendFilter,
        selectCapability,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
