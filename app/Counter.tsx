"use client";

import { useCounter } from "./useCounter";
import { Button } from "./Button";
import { Card } from "./Card";

export function Counter() {
  const { count, increment } = useCounter();

  return (
    <Card
      header={<h2>Card Header</h2>}
      body={<p>This is the body of the card. Count: {count}</p>}
      footer={<Button onClick={increment}>Click me</Button>}
    />
  );
}
