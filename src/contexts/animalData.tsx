import { ReactNode, createContext, useState, useEffect } from "react";
import data from "../API/fakerAnimals";

interface IAnimal {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

interface IAnimalContextType {
  animalsData: IAnimal[];
}

interface IChildren {
  children: ReactNode;
}

export const AnimalsDataContext = createContext({} as IAnimalContextType);

export function AnimalsDataProvider({ children }: IChildren) {
  const [animalsData, setAnimalsData] = useState<IAnimal[]>([]);

  async function setData() {
    const animals = await data;
    setAnimalsData(animals);
  }
  useEffect(() => {
    setData();
  }, []);

  return (
    <AnimalsDataContext.Provider value={{ animalsData }}>
      {children}
    </AnimalsDataContext.Provider>
  );
}
