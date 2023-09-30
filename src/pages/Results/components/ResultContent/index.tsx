import {ResultCardContainer, SpanContent,TittleText, } from './styles'

interface IResultContent{
    img: string;
    URL: string;
    title: string;
    description: string;
};

export function ResultContent({img, URL, title, description}: IResultContent ) {
    return(
        <ResultCardContainer>
            <img src={img} alt={title} />
            <SpanContent>{URL}</SpanContent>
            <TittleText href="#">{title}</TittleText>
            <SpanContent>{description}</SpanContent>
        </ResultCardContainer>
    )
} 