import {ResultContent} from '../ResultContent';
import {ResultCardContainer, URLText, LinkButton, DescriptionText, Overlay, Content} from './styles'
import * as Dialog from '@radix-ui/react-dialog';

interface IAnimal {
    type: string;
    id: number;
    url: string;
    title: string;
    description: string;
    image: string;
};


interface IResultCard{
    animal: IAnimal;
    setAnimal: (newState: IAnimal) => void;
};

export function ResultContentMobile({animal, setAnimal}: IResultCard ) {
    
    function selectAnimal(){
        setAnimal(animal)
    };

    return(
        <ResultCardContainer>
            <Dialog.Root>
                <URLText>{animal.url}</URLText>
                <Dialog.Trigger asChild>
                    <LinkButton onClick={selectAnimal} >{animal.title}</LinkButton>
                </Dialog.Trigger>
                <DescriptionText>{animal.description}</DescriptionText>

                <Dialog.Portal>
                    <Overlay/>
                    <Content>
                        <ResultContent animal={animal}/>
                        <Dialog.Close />
                    </Content>
                </Dialog.Portal>
            </Dialog.Root>
        </ResultCardContainer>
    )
} 