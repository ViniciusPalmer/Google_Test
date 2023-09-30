import {HeaderContainer, HeaderText, IconsContainer} from './styles';

import googleAppsIcon from '../../../../assets/google_apps_icon.svg';
import userAvatar from '../../../../assets/user_avatar.svg';

export function HomeHeader() {
    return(
        <HeaderContainer>
              <HeaderText> <b>Agile Content</b> Frontend Test</HeaderText>
              <IconsContainer>
                <img src={googleAppsIcon} alt="Google Apps" />
                <img src={userAvatar} alt="Female Avatar" />
              </IconsContainer>
        </HeaderContainer>
    )
}