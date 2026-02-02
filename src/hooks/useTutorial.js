import { useState } from 'react';

export function useTutorial(){
    const [currentStep, setCurrentStep] = useState(0);
    const [isTutorialActive, setIsTutoriaActive] = useState(false);

    const steps = [
        {
            title: "Bem-vindo! 👋",
            content: "Vamos aprender a usar seu assistente de compras em 4 passos rápidos.",
        },
        {
            title: "Adicionar Produtos ➕",
            content: "Clique no botão superior para adicionar um novo produto, insira o nome, preços e marcas.",
        },
        {
            title: "Trocar o mês 📅",
            content: "Use o seletor para ver suas compras de Janeiro, Fevereiro e assim por diante.",
        },
        {
            title: "Comparação de Preços 💹",
            content: "O app avisa automaticamente se o produto subiu ou desceu de preço em relação ao mês passado!",
        },
    ];

    const startTutorial = () => {
        setCurrentStep(0);
        setIsTutoriaActive(true);
    };

    const nextStep = () => {
        if(currentStep < steps.length - 1){
            setCurrentStep(currentStep + 1);
        } else {
            setIsTutoriaActive(false); // Fim do tour
        }
    };

    const stopTutorial = () => setIsTutoriaActive(false);

    return{
        isTutorialActive,
        currentStep, 
        stepData: steps[currentStep],
        startTutorial,
        nextStep,
        stopTutorial,
    }
}