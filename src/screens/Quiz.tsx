import useQuestions from "../hooks/useQuestions";
import { QuestionThemes } from "../types/enums/QuestionTheme.enum";
import { Question } from "../components/Question";
import { useState } from "react";

const Quiz = () => {
   const { isLoadingQuestions, questions, error, getAnswers } = useQuestions({
      questionsQuantities: 6,
      questionTheme: QuestionThemes.AERONAUTICS,
   });
   const [selectedAnswers, setSelectedAnswers] = useState<
      { question_id: number; option: string }[]
   >([]);
   const [result, setResult] = useState<any>({});
   const [isShowingResult, setIsShowingResult] = useState(false);

   const handleSelectOption = (question_id: number, option: string) => {
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

   const handleSubmitAnswers = async () => {
      const result = await getAnswers(selectedAnswers);
      setResult(result);
      setIsShowingResult(true);
      console.log(result);
   };

   const getColorStatus = (isSelected: boolean, isCorrect: boolean) => {
      if (isSelected && isCorrect) {
         return "bg-green-600";
      }
      if (isSelected && !isCorrect) {
         return "bg-red-700";
      }
      if (!isSelected && isCorrect) {
         return "bg-green-600";
      }
      return "";
   };

   const getBorderColorStatus = (questions: any) => {
      if(questions.options.some((option: any) => option.is_correct && option.selected)) {
         return "border-green-700"
      }
      if(questions.options.some((option: any) => !option.is_correct && option.selected)) {
         return "border-red-800"
      }
   };

   return (
      <>
         <div className="flex flex-col gap-2 items-center mb-16">
            <h1 className="text-5xl text-white font-medium">AeroQuiz</h1>
            <p className="text-2xl font-extralight text-white/40">
               Responda a questões abaixo:
            </p>
         </div>
         {isLoadingQuestions && (
            <div className="block w-5 h-5 rounded-full border-4 border-white/40 border-t-white animate-spin"></div>
         )}
         {/* Formulario de perguntas */}
         <div className="flex flex-col gap-8 w-full items-center justify-center">
            {questions &&
               !isShowingResult &&
               questions.map((question) => (
                  <Question.wrapper key={question.question_id}>
                     <Question.title>
                        <h2 className="text-white">{question.question}</h2>
                     </Question.title>
                     <Question.options>
                        {question.options.map((option) => (
                           <div
                              key={option.value}
                              onClick={() =>
                                 handleSelectOption(
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
         {/* Formulario de respostas */}
         <div className="flex flex-col gap-8 w-full items-center justify-center">
            {isShowingResult &&
               result &&
               result.questions.map((question: any) => (
                  <Question.wrapper key={question.question_id}>
                     <div className={`rounded-md border-2 ${getBorderColorStatus(question)}`}>
                        <Question.title>
                           <h2 className="text-white">{question.question}</h2>
                        </Question.title>
                        <Question.options>
                           {question.options.map((option: any) => (
                              <div
                                 key={option.value}
                                 onClick={() =>
                                    handleSelectOption(
                                       question.question_id,
                                       option.value
                                    )
                                 }
                                 className={`${getColorStatus(
                                    option.selected,
                                    option.is_correct
                                 )}`}
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
                     </div>
                  </Question.wrapper>
               ))}
         </div>
         <button
            className="w-[100px] bg-blue-500 py-2 text-white rounded-md my-8 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
            disabled={selectedAnswers.length <= 5 || result.score}
            onClick={() => handleSubmitAnswers()}
         >
            Resultado
         </button>
         {result && result.score && (
            <div className="flex items-center justify-center p-8 bg-gray-700 rounded-md flex-col">
               <p className="text-white font-medium text-xl text-center">
                  Sua pontuação:{" "}
                  <span className="text-2xl text-blue-500">{result.score}</span>
               </p>
               <p className="text-white font-medium text-xl text-center">
                  Total de acertos:{" "}
                  <span className="text-2xl text-blue-500">
                     {result.correct_answers}
                  </span>
               </p>
            </div>
         )}
      </>
   );
};

export default Quiz;
