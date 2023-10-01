import {HeaderContainer, SearchContainer, IconsContainer, GoogleImg} from './styles';
import { useNavigate  } from 'react-router-dom';

import googleAppsIcon from '../../../../assets/google_apps_icon.svg';
import userAvatar from '../../../../assets/user_avatar.svg';
import googleIcon from '../../../../assets/google_icon.png';
import { SearchMenuBar } from '../../../../components/SearchMenuBar';

export function ResultHeader() {
  const navigate = useNavigate();
  function returnToMain(e: any){
    e.preventDefault();
    navigate("/");
  }
    return(
        <HeaderContainer>
              <SearchContainer> 
                <GoogleImg src={googleIcon} alt="Google Image" onClick={returnToMain} />
                <SearchMenuBar/>
              </SearchContainer>
              <IconsContainer>
                <img src={googleAppsIcon} alt="Google Apps" />
                <img src={userAvatar} alt="Female Avatar" />
              </IconsContainer>
        </HeaderContainer>
    )
}