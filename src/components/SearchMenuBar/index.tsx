import {useContext} from 'react';
import {useLocation, useNavigate  } from 'react-router-dom';
import {SearchContainer} from './styles';

import SearchIcon from '../../assets/search_icon.svg';
import CloseIcon from '../../assets/close_icon.svg';
import { SearchInputContext } from '../../contexts/searchInput';


export function SearchMenuBar() {
    const location = useLocation();
    const navigate = useNavigate();
 

    const {searchInput, setSearchInput} = useContext(SearchInputContext);

    const resetSearch = () => {
        setSearchInput('');
    }

    function submitSearchInput(e: any) {
        e.preventDefault();
        if(location.pathname === "/") return  navigate("/results");
    } 

    return(
        <SearchContainer onSubmit={submitSearchInput}>
                <button type="submit"><img src={SearchIcon} alt="Search Icon"/></button>
                <input 
                    type="text" 
                    value={searchInput} 
                    onChange={value => setSearchInput(value.target.value)}
                />
                <img src={CloseIcon} alt="Close Icon" onClick={resetSearch} />
        </SearchContainer>
    )
}