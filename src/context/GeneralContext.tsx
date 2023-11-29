import { createContext, useContext, useState } from "react";
import { QuestionThemes } from "../types/enums/QuestionTheme.enum";

interface GeneralContextProps {
   currentScreen: "MainMenu" | "Quiz" | "Result";
   setCurrentScreen: React.Dispatch<
      React.SetStateAction<"MainMenu" | "Quiz" | "Result">
   >;
   currentTheme: QuestionThemes;
   setCurrentTheme: React.Dispatch<React.SetStateAction<QuestionThemes>>;
}

export const GeneralContext = createContext<GeneralContextProps>(
   {} as GeneralContextProps
);

export const GeneralProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [currentScreen, setCurrentScreen] = useState<
      "MainMenu" | "Quiz" | "Result"
   >("MainMenu");
   const [currentTheme, setCurrentTheme] = useState<QuestionThemes>(
      QuestionThemes.AEROSPACIAL
   );

   return (
      <GeneralContext.Provider
         value={{
            currentScreen,
            setCurrentScreen,
            currentTheme,
            setCurrentTheme,
         }}
      >
         {children}
      </GeneralContext.Provider>
   );
};

export const useGeneralContext = () => {
   return useContext(GeneralContext);
};
