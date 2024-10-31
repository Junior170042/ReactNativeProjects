import React, { createContext, useState, useContext, ReactNode } from "react";
import useExtraRegister, { ExtraRegister } from "./useSqlite";


// Define the shape of your context
type ExtraContextType = {
  extras: ExtraRegister[];
  currentIntervalExtras: ExtraRegister[];
  currentMonthExtras: ExtraRegister[];
  searchExtras: ExtraRegister[];
  deleteExtra: (id: number | string) => void,
  getCurrentMonthExtras: () => void,
  getExtrasBySearchWord: (word: string) => void,
  getCurrentIntervalExtras: () => void

  getExtras: () => void;
};

// Create the context with an initial undefined value
const ExtraContext = createContext<ExtraContextType | undefined>(undefined);

// Create a provider component
export const ExtraProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const {
    getAllExtraRegisters,
    getExtraRegistersByDayOrMonthOrYear,
    getExtraRegistersBetweenDates,
    deleteExtraRegister,

  } = useExtraRegister()

  const date = new Date()

  const currentMonth = date.getMonth() + 1

  const [extras, setExtras] = useState<ExtraRegister[]>([]);
  const [currentMonthExtras, setCurrentMonthExtras] = useState<ExtraRegister[]>([]);
  const [currentIntervalExtras, setCurrentIntervalExtras] = useState<ExtraRegister[]>([]);
  const [searchExtras, setSearchExtras] = useState<ExtraRegister[]>([]);

  const getExtras = () => {
    setExtras(getAllExtraRegisters() || [])
  }


  const deleteExtra = (id: number | string) => {
    deleteExtraRegister(id).then(res => {
      if (res) {
        setExtras(extras.filter(extra => extra.id != id))
        getExtrasBySearchWord("")
      }
    })
  }


  const getCurrentMonthExtras = () => {
    const result = getExtraRegistersByDayOrMonthOrYear(currentMonth.toString())
    setCurrentMonthExtras(result as ExtraRegister[])

  }

  const getExtrasBySearchWord = (searchWord: string) => {
    const result = getExtraRegistersByDayOrMonthOrYear(searchWord)

    if (result && result.length > 0) {
      setSearchExtras(result)
    } else {
      setSearchExtras(getAllExtraRegisters() || [])
    }
  }

  const getCurrentIntervalExtras = () => {
    getExtraRegistersBetweenDates().then(result => setCurrentIntervalExtras(result as ExtraRegister[]))

  }


  return (
    <ExtraContext.Provider
      value={{
        extras,
        getExtras,
        searchExtras,
        currentMonthExtras,
        currentIntervalExtras,
        deleteExtra,
        getCurrentIntervalExtras,
        getExtrasBySearchWord,
        getCurrentMonthExtras
      }}
    >
      {children}
    </ExtraContext.Provider>
  );
};

// Create a hook to easily use the context in any component
export const useExtraContext = (): ExtraContextType => {
  const context = useContext(ExtraContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
