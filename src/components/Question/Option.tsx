import { ReactNode } from "react";

const QuestionOption = ({ children }: { children: ReactNode }) => {
   return <div className="hover:bg-gray-800 cursor-pointer px-4 py-2 flex items-center gap-4 ">{children}</div>;
};

export default QuestionOption;
