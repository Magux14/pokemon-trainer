import { useState } from "react";

/*
export interface Welcome {
    category:         string;
    id:               string;
    correctAnswer:    string;
    incorrectAnswers: string[];
    question:         Question;
    tags:             string[];
    type:             string;
    difficulty:       string;
    regions:          any[];
    isNiche:          boolean;
}

export interface Question {
    text: string;
}
*/

export const useFetchQuestion = () => {

    const [question, setQuestion] = useState(null);
    const [questionError, setQuestionError] = useState(null);

    const fromJsObjToParams = (obj) => {
        const params = new URLSearchParams();
        for (const property in obj) {
            if (obj[property]) {
                params.append(property, obj[property]);
            }
        }
        return params;
    }

    const ltsCategories = ['fictitious_characters', 'harry_potter', 'batman', 'star_wars', 'geography', 'the_solar_system', 'arts_and_literature', 'animals', 'holy_roman_empire', 'advertising', 'classical_music', 'food_and_drink', "1990's", 'games', 'places', 'technology', 'alcohol', 'clothing', 'philosophy', 'asia', 'film', 'lord_of_the_rings', 'engineering', "1970's", 'the_internet', 'events', 'cities', 'tourist_attractions', 'fruit', 'europe', 'musical_instruments', 'the_simpsons', 'countries', 'songs', 'languages', 'card_games', 'soccer', 'space', 'washington_dc', 'cars', 'bones', 'the_ancient_world', 'ancient_egypt', 'psychology', 'world_cup', 'cartoons', 'tv', 'gambling', 'romans', 'film_and_tv', 'fantasy', 'mathematics', 'general_knowledge', 'computing', 'mexico']

    const setupUrl = (difficulty = 'easy') => {

        const gateway = 'https://the-trivia-api.com/v2/questions?';
        const params = {
            limit: 1,
            categories: ltsCategories.join(),
            region: 'MX',
            type: 'text_choice',
            difficulties: difficulty
        }

        return gateway + fromJsObjToParams(params);
    }

    const generateQuestion = async () => {
        const url = setupUrl();
        const resp = await fetch(url).catch(() => null);
        if (!resp) {
            setQuestionError('API error');
        }
        const data = await resp.json().catch(() => null)
        if (!data || data.length < 1) {
            setQuestionError('API error');
            return;
        }

        const questionData = data[0];
        const question = {
            text: questionData.question.text,
            options: [
                ...questionData.incorrectAnswers,
                questionData.correctAnswer
            ],
            correctAnswer: questionData.correctAnswer
        }
        setQuestion(question);
    }

    return {
        question,
        generateQuestion,
        questionError
    }
}
