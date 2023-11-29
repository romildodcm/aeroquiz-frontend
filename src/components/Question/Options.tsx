import { ReactNode } from "react";

const QuestionOptions = ({ children }: { children: ReactNode }) => {
   return <div className="flex flex-col bg-gray-900 rounded-b-md">
      {children}
   </div>
};

export default QuestionOptions;
