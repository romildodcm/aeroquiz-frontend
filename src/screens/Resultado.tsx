import useQuestions from "../hooks/useQuestions";
import { QuestionThemes } from "../types/enums/QuestionTheme.enum";
import { Question } from "../components/Question";
import { useState } from "react";

const Resultado = () => {
   const { isLoadingQuestions, questions, error } = useQuestions({
      questionsQuantities: 6,
      questionTheme: QuestionThemes.AERONAUTICS,
   });
   const [selectedAnswers, setSelectedAnswers] = useState<
      { question_id: number; option: string }[]
   >([]);

   const handleSelectOption = (e: any, question_id: number, option: string) => {
      e.preventDefault();
      const currentlist = [...selectedAnswers];
      const exists = currentlist.find(
         (item) => item.question_id === question_id
      );
      if (exists) {
         const index = currentlist.indexOf(exists);
         currentlist[index].option = option;
         setSelectedAnswers(currentlist);
      } else {
         setSelectedAnswers([...selectedAnswers, { question_id, option }]);
      }
   };

   const checkIfIsSelected = (question_id: number, option: string) => {
      const exists = selectedAnswers.find(
         (item) => item.question_id === question_id && item.option === option
      );
      if (exists) {
         return true;
      }
      return false;
   };

   return (
      <>
         <div className="flex flex-col gap-2 items-center mb-16">
            <h1 className="text-5xl text-white font-medium">AeroQuiz</h1>
            <p className="text-2xl font-extralight text-white/40">
               Confira o resultado:
            </p>
         </div>
         {isLoadingQuestions && (
            <div className="block w-5 h-5 rounded-full border-4 border-white/40 border-t-white animate-spin"></div>
         )}
         <div className="flex flex-col gap-8 w-full items-center justify-center">
            {questions &&
               questions.length > 0 &&
               questions.map((question) => (
                  <Question.wrapper key={question.question_id}>
                     <Question.title>
                        <h2 className="text-white">{question.question}</h2>
                     </Question.title>
                     <Question.options>
                        {question.options.map((option) => (
                           <div
                              key={option.value}
                              onClick={(e: any) =>
                                 handleSelectOption(
                                    e,
                                    question.question_id,
                                    option.value
                                 )
                              }
                              className={`${
                                 checkIfIsSelected(
                                    question.question_id,
                                    option.value
                                 ) && "bg-blue-500"
                              }`}
                           >
                              <Question.option>
                                 <p
                                    id={`${question.question_id}_${option.value}`}
                                    className="text-white/80"
                                 >
                                    {option.value}
                                 </p>
                              </Question.option>
                           </div>
                        ))}
                     </Question.options>
                  </Question.wrapper>
               ))}
         </div>
         <button
            className="w-[100px] bg-blue-500 py-2 text-white rounded-md my-8 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
            disabled={selectedAnswers.length <= 5}
         >
            Resultado
         </button>
      </>
   );
};

export default Resultado;
