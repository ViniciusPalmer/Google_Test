import {
  ResultCardContainer,
  URLText,
  LinkText,
  DescriptionText,
} from "./styles";

interface IAnimal {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

interface IResultCard {
  animal: IAnimal;
  setAnimal: (newState: IAnimal) => void;
}

export function ResultCard({ animal, setAnimal }: IResultCard) {
  function selectAnimal() {
    setAnimal(animal);
  }

  return (
    <ResultCardContainer>
      <URLText>{animal.url}</URLText>
      <LinkText onClick={selectAnimal}>{animal.title}</LinkText>
      <DescriptionText>{animal.description}</DescriptionText>
    </ResultCardContainer>
  );
}
