import { useState, useContext, useEffect, useRef } from "react";
import {
  ResultContainer,
  ResultData,
  SearchResult,
  ResultMainContent,
  StyledReactPaginate,
} from "./styles";

import { Footer } from "../../components/Footer";
import { ResultHeader } from "./components/ResultsHeader";
import { ResultCard } from "./components/ResultCard";
import { ResultContent } from "./components/ResultContent";
import { ResultContentMobile } from "./components/ResultContentMobile";

import { NoResultsFound } from "./components/NoResultsFound";
import { AnimalsDataContext } from "../../contexts/animalData";
import { SearchInputContext } from "../../contexts/searchInput";

interface IAnimal {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

export function Results() {
  const [itemOffset, setItemOffset] = useState(0);
  const [foundResults, setFoundResults] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IAnimal | null>();
  const [filteredAnimalsList, setFilteredAnimalsList] = useState<IAnimal[]>([]);
  const { animalsData } = useContext(AnimalsDataContext);
  const { searchInput } = useContext(SearchInputContext);

  const windowWidth = useRef(window.innerWidth);
  const currentScreenSize = windowWidth.current | 0;
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredAnimalsList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredAnimalsList.length / itemsPerPage);

  async function filterBySearchTerm(searchTerm: string, data: IAnimal[]) {
    const filteredData = await data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnimalsList(filteredData);
  }

  useEffect(() => {
    filterBySearchTerm(searchInput, animalsData);
  }, [searchInput]);

  useEffect(() => {
    if (filteredAnimalsList.length > 0 && searchInput) {
      setFoundResults(true);
    } else {
      setFoundResults(false);
      setSelectedCard(null);
    }
  }, [filteredAnimalsList]);

  const handleCardSelected = (newState: IAnimal) => {
    setSelectedCard(newState);
  };

  const renderSearchResultPage = () => {
    return (
      <>
        <SearchResult>
          {currentItems.map((animal) => (
            <ResultCard
              key={animal.id}
              animal={animal}
              setAnimal={handleCardSelected}
            />
          ))}
        </SearchResult>
        {selectedCard && <ResultContent animal={selectedCard} />}
      </>
    );
  };

  const renderSearchResultPageMobile = () => {
    return (
      <SearchResult>
        {currentItems.map((animal) => (
          <ResultContentMobile
            key={animal.id}
            animal={animal}
            setAnimal={handleCardSelected}
          />
        ))}
      </SearchResult>
    );
  };

  const generateSuggestionList = (animals: IAnimal[]) => {
    let newList = animals.map((item) => item.type);
    return (newList = [...new Set(newList)].slice(0, 5));
  };

  const renderNoResultPage = () => {
    const getResults = generateSuggestionList(animalsData);
    return (
      <NoResultsFound searchText={searchInput} suggestionList={getResults} />
    );
  };

  const handleScreen = () => {
    if (!foundResults) return renderNoResultPage();

    if (currentScreenSize > 800) return renderSearchResultPage();
    else return renderSearchResultPageMobile();
  };

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredAnimalsList.length;
    setItemOffset(newOffset);
    setSelectedCard(null);
  };

  return (
    <ResultContainer>
      <ResultHeader />
      <ResultMainContent>
        <ResultData>{handleScreen()}</ResultData>
        <StyledReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </ResultMainContent>
      <Footer />
    </ResultContainer>
  );
}
