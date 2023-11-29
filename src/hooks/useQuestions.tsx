import { useEffect, useState } from "react";
import { Question } from "../types/question.type";
import { QuestionThemes } from "../types/enums/QuestionTheme.enum";

interface GetQuestionsProps {
   questionsQuantities: number;
   questionTheme: QuestionThemes;
}

const useQuestions = ({
   questionsQuantities,
   questionTheme,
}: GetQuestionsProps) => {
   const [questions, setQuestions] = useState<Question[]>([]);
   const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
   const [isLoadingAnswers, setIsLoadingAnswers] = useState(false);
   const [error, setError] = useState<Error>();

   const getQuestions = async () => {
      setIsLoadingQuestions(true);
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/perguntas?theme=${questionTheme}&quantities=${questionsQuantities}`
         );
         const data = await response.json();
         setQuestions(data);
      } catch (error) {
         const result = error as Error;
         setError(result);
      } finally {
         setIsLoadingQuestions(false);
      }
   };

   const getAnswers = async (
      answersList: { question_id: number; option: string }[]
   ) => {
      setIsLoadingAnswers(true);
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/validar-respostas`,
            {
               method: "POST",
               body: JSON.stringify(answersList),
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await response.json();
         return data;
      } catch (error) {
         const result = error as Error;
         setError(result);
         return {};
      } finally {
         setIsLoadingAnswers(false);
      }
   };

   useEffect(() => {
      getQuestions();
   }, [questionsQuantities, questionTheme]);

   return {
      questions,
      isLoadingQuestions,
      error,
      isLoadingAnswers,
      getAnswers
   };
};

export default useQuestions;
