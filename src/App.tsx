import { useState } from "react";

const App = () => {
  const hoge = "Hoge";
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div className="mx-4 md:mx-auto mt-10 max-w-2xl"> 
      <h1 className="font-bold text-2xl mb-4 text-violet-600">TodoApp</h1>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white py-0.5 px-4 rounded-full cursor-not-allowed"
        onClick={countUp}>count is {count}</button>
    </div>
  );
};

export default App;