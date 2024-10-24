import { useState } from "react";
import WelcomeMessage from "./WelcomeMessage";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-violet-500">TodoApp</h1>
      <WelcomeMessage name="萱島ウサギ" uncompletedCount={6} />
      <button
        className="cursor-not-allowed rounded-full bg-blue-500 px-4 py-0.5 text-white hover:bg-blue-700"
        onClick={countUp}
      >
        count is {count}
      </button>
    </div>
  );
};

export default App;
