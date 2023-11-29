import { AnswerOption } from "./answerOptions.type";
import { QuestionThemes } from "./enums/QuestionTheme.enum";

type AnswerQuestion = {
   question_id: number;
   theme: QuestionThemes;
   difficulty: 1 | 2 | 3;
   score: number;
   question: string;
   options: AnswerOption[];
   explanation: string;
};

export type Answer = {
   score: number;
   correct_answers: number;
   questions: AnswerQuestion[];
};
