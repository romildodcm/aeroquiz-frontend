const Title = ({ children }: { children: React.ReactNode }) => {
   return (
      <div
         className="bg-gray-700 p-4 rounded-t-md flex items-center justify-between"
      >
         {children}
      </div>
   );
};

export default Title;
