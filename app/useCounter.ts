import { useState } from "react";

export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  return { count, increment };
};
