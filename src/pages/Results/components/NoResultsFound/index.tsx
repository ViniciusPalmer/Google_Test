import {NoResultsContainer} from './styles';

interface INoResultsFound{
    searchText?: string,
    suggestionList: string[],
};

export function NoResultsFound ({searchText, suggestionList}:INoResultsFound) {

    const noSuggestionsErrorDescription = () => {
        return(
            <h1>API is not working, try restart your app.</h1>
        )
    };
    
    const isEmptyArray = (value: string[]) => {
       return value.length > 0 ? false : true;
    };

    return(
        <>
            {isEmptyArray(suggestionList) ? noSuggestionsErrorDescription() :
                <NoResultsContainer>
                    {searchText && <span>No Results Found for: <b>{searchText}</b> </span>}
                    <span>Try looking for: {suggestionList && suggestionList.map((item) => <b>{item}</b>,)}.</span>
                </NoResultsContainer>
            }
        </>
    )
}

