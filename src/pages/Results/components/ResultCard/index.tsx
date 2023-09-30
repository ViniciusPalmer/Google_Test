import {ResultCardContainer, URLText,LinkText, DescriptionText} from './styles'

interface IResultCard{
    URL: string;
    title: string;
    description: string;
};

export function ResultCard({URL, title, description}: IResultCard ) {
    return(
        <ResultCardContainer>
            <URLText>{URL}</URLText>
            <LinkText href="#">{title}</LinkText>
            <DescriptionText>{description}</DescriptionText>
        </ResultCardContainer>
    )
} 