import {useState, useContext, useEffect} from 'react';
import {ResultContainer,ResultData,SearchResult} from './styles';
import {useRef} from 'react';


import { Footer } from '../../components/Footer';
import { ResultHeader } from './components/ResultsHeader';
import { ResultCard } from './components/ResultCard';
import {ResultContent} from './components/ResultContent';
import {ResultContentMobile} from './components/ResultContentMobile';

import { NoResultsFound } from './components/NoResultsFound';
import { AnimalsDataContext } from '../../contexts/animalData';
import { SearchInputContext } from '../../contexts/searchInput';

interface IAnimal {
    type: string;
    id: number;
    url: string;
    title: string;
    description: string;
    image: string;
};

export function Results() {
    const [foundResults, setFoundResults] = useState(false);
    const [selectedCard, setSelectedCard] = useState<IAnimal | null>();
    const [filteredAnimalsList, setFilteredAnimalsList] = useState<IAnimal[]>([]);
    const {animalsData} = useContext(AnimalsDataContext);
    const {searchInput} = useContext(SearchInputContext);

    const windowWidth = useRef(window.innerWidth);
    const currentScreenSize = windowWidth.current | 0;

    async function filterBySearchTerm(searchTerm: string, data: IAnimal[]){
        const filteredData = await data.filter((item) => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
            || item.type.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredAnimalsList(filteredData);
    }
    
    useEffect(()=>{
        filterBySearchTerm(searchInput, animalsData);
    },[searchInput])

    useEffect(()=>{
        if(filteredAnimalsList.length > 0 && searchInput){
            setFoundResults(true);
        }else{
            setFoundResults(false);
            setSelectedCard(null)
        }
    },[filteredAnimalsList]);

    const handleCardSelected = (newState: IAnimal) => {
        setSelectedCard(newState);
      };

    const renderSearchResultPage = () => {
        return(
            <>
                <SearchResult>
                    {filteredAnimalsList.map((animal)=>
                        <ResultCard key={animal.id} animal={animal} setAnimal={handleCardSelected}/>)}
                </SearchResult>
                {selectedCard && <ResultContent animal={selectedCard}/>}
            </>
        )
    };

    const renderSearchResultPageMobile = () => {
        return(
            <SearchResult>
             {filteredAnimalsList.map((animal)=>
                        <ResultContentMobile key={animal.id} animal={animal} setAnimal={handleCardSelected}/>)}
            </SearchResult>
        )
    };


    const renderNoResultPage = () => {
        return(<NoResultsFound searchText={'Bird'} suggestionList={['Dog, Cat, Shark']} />);
    };

    const handleScreen = () => {
        if(!foundResults) return renderNoResultPage();

        if(currentScreenSize > 800) return renderSearchResultPage();
        else return renderSearchResultPageMobile();
    }

    return(
        <ResultContainer>
            <ResultHeader/>
            <ResultData>
                {handleScreen()}
            </ResultData>
            <Footer />
        </ResultContainer>
    )
} 
