import {useState} from 'react';
import {SearchContainer} from './styles';

import SearchIcon from '../../assets/search_icon.svg';
import CloseIcon from '../../assets/close_icon.svg';


export function SearchMenuBar() {
    const [searchInput, setSearchInput] = useState('');

    const resetSearch = () => {
        setSearchInput('');
    }

    return(
        <SearchContainer>
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