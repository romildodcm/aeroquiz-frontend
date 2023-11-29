import { ReactNode } from "react";
import { QuestionProvider } from "./Context";

const QuestionWrapper = ({ children }: { children: ReactNode }) => {
   return (
      <QuestionProvider>
         <div className="flex flex-col w-[60%]">{children}</div>
      </QuestionProvider>
   );
};

export default QuestionWrapper;
