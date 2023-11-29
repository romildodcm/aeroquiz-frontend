import { QuestionThemes } from "./enums/QuestionTheme.enum";
import { QuestionOptions } from "./questionOptions.type";

export type Question = {
   question_id: number;
   theme: QuestionThemes;
   difficulty: 1 | 2 | 3;
   question: string;
   options: QuestionOptions[];
};
