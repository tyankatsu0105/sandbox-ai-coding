import React from "react";

type CardProps = {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
};

export function Card({ header, body, footer }: CardProps) {
  return (
    <div
      style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}
    >
      <div style={{ borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
        {header}
      </div>
      <div style={{ padding: "16px 0" }}>{body}</div>
      <div style={{ borderTop: "1px solid #eee", paddingTop: "8px" }}>
        {footer}
      </div>
    </div>
  );
}
