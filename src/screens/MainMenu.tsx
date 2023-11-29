import { useRef } from "react";
import { QuestionThemes } from "../types/enums/QuestionTheme.enum";
import { useGeneralContext } from "../context/GeneralContext";

const MainMenu = () => {
   const { setCurrentTheme, setCurrentScreen } = useGeneralContext();
   const selectRef = useRef<HTMLSelectElement>(null);

   const onStartButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const selected = selectRef.current!.value;
      // check if selected is a valid QuestionTheme
      if (Object.values(QuestionThemes).includes(selected as QuestionThemes)) {
         setCurrentTheme(selected as QuestionThemes);
         setCurrentScreen("Quiz");
      }
      
   };
   return (
      <>
         <div className="flex flex-col gap-2 items-center mb-4">
            <h1 className="text-5xl text-white font-medium">AeroQuiz</h1>
            <p className="text-2xl font-extralight text-white/40">
               Selecione abaixo o tema do seu quiz:
            </p>
         </div>
         <div className="flex flex-row items-center gap-2">
            <select
               ref={selectRef}
               name="theme"
               id="theme"
               className="bg-gray-700 text-white font-medium px-4 py-2 rounded-lg shadow-md w-[200px] h-10"
            >
               {Object.values(QuestionThemes).map((theme) => (
                  <option key={theme} value={theme}>
                     {theme}
                  </option>
               ))}
            </select>
            <button
               onClick={onStartButtonPress}
               className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md"
            >
               Iniciar
            </button>
         </div>
      </>
   );
};

export default MainMenu;
