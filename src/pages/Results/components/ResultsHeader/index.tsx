import {HeaderContainer, SearchContainer, IconsContainer} from './styles';

import googleAppsIcon from '../../../../assets/google_apps_icon.svg';
import userAvatar from '../../../../assets/user_avatar.svg';
import googleIcon from '../../../../assets/google_icon.png';
import { SearchMenuBar } from '../../../../components/SearchMenuBar';

export function ResultHeader() {
    return(
        <HeaderContainer>
              <SearchContainer> 
                <img src={googleIcon} alt="Google Image" />
                <SearchMenuBar/>
              </SearchContainer>
              <IconsContainer>
                <img src={googleAppsIcon} alt="Google Apps" />
                <img src={userAvatar} alt="Female Avatar" />
              </IconsContainer>
        </HeaderContainer>
    )
}