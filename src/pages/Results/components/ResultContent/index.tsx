import { ResultCardContainer, SpanContent, TittleText } from "./styles";

interface IAnimal {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

interface IResultContent {
  animal: IAnimal;
}

export function ResultContent({ animal }: IResultContent) {
  return (
    <ResultCardContainer>
      <img src={animal.image} alt={animal.title} />
      <SpanContent>{animal.url}</SpanContent>
      <TittleText href="#">{animal.title}</TittleText>
      <SpanContent>{animal.description}</SpanContent>
    </ResultCardContainer>
  );
}
