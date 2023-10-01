
import {HomeContainer,HomeContent,GoogleImg} from './styles';

import GoogleLogo from '../../assets/google_icon.png'

import { Footer } from "../../components/Footer";
import { HomeHeader } from "./components/HomeHeader";
import { SearchMenuBar } from "../../components/SearchMenuBar";

export function Home() {
    return(
        <HomeContainer>
            <HomeHeader />
            <HomeContent>
                <GoogleImg src={GoogleLogo} alt="Logo Google" />
                <SearchMenuBar />
            </HomeContent>
            <Footer />
        </HomeContainer>
    )
}