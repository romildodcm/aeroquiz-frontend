import { ReactNode, createContext, useContext, useState } from "react";

interface QuestionContextProps {
   isOpenedOptions: boolean;
   setIsOpenedOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestionContext = createContext<QuestionContextProps>(
   {} as QuestionContextProps
);
export const QuestionProvider = ({ children }: { children: ReactNode }) => {
   const [isOpenedOptions, setIsOpenedOptions] = useState(false);
   return (
      <QuestionContext.Provider value={{ isOpenedOptions, setIsOpenedOptions }}>
         {children}
      </QuestionContext.Provider>
   );
};
export const useQuestionContext = () => useContext(QuestionContext);
