import { useGeneralContext } from "./context/GeneralContext";
import MainMenu from "./screens/MainMenu";
import Quiz from "./screens/Quiz";
import Resultado from "./screens/Resultado";

function App() {
   const { currentScreen } = useGeneralContext();
   return (
      <main className="bg-gray-800 min-w-[100vw] min-h-[100vh] flex flex-col items-center justify-center py-32">
         {currentScreen === "MainMenu" && <MainMenu />}
         {currentScreen === "Quiz" && <Quiz />}
         {currentScreen === "Result" && <Resultado />}
      </main>
   );
}

export default App;
