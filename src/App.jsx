import "./App.css";

import Languages from "../components/Languages";
import ProgrammingLanguages from "./programmingLanguages";
function App() {
  const langElements = ProgrammingLanguages.map((langObj) => (
    <Languages lang={langObj.lang} color={langObj.color} id={langObj.id} />
  ));

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="text-center ">
        <h1 className="text-[1.25rem] font-medium text-[#F9F4DA]">
          Assembly:Endgame
        </h1>

        <p className="text-[0.875rem] max-w-87.5 text-[#8E8E8E]">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <div className="h-14.75 w-89.75 bg-[#10A95B] rounded flex flex-col justify-center items-center my-8">
        <p className="text-[20px] font-medium text-[#F9F4DA]">You Win</p>
        <p className="text-[#F9F4DA] font-medium text-[16px]">Well done! 🎉</p>
      </div>

      <div className="flex justify-center items-center flex-wrap w-66.5 h-[51.5px] my-8">
        {langElements}
      </div>
    </main>
  );
}

export default App;
