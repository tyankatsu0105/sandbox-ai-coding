import React from "react";

type CardProps = {
  renderHeader?: () => React.ReactNode;
  renderBody: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
};

export const Card = ({ renderHeader, renderBody, renderFooter }: CardProps) => {
  return (
    <div
      style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}
    >
      <div style={{ borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
        {renderHeader && renderHeader()}
      </div>
      <div style={{ padding: "16px 0" }}>{renderBody()}</div>
      <div style={{ borderTop: "1px solid #eee", paddingTop: "8px" }}>
        {renderFooter && renderFooter()}
      </div>
    </div>
  );
};
