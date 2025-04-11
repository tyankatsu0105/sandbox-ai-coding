import React, { useMemo } from "react";
import { TextFacade, TextProps } from "./facade";
import { TextPresentational } from "./presentational";

export const TextContainer: React.FC<TextProps> = (props) => {
  const facade = useMemo(
    () => new TextFacade(props),
    [props.children, props.size, props.weight, props.color, props.className]
  );

  const presentationalProps: TextProps = {
    children: facade.getText(),
    size: facade.getSize() as TextProps["size"],
    weight: facade.getWeight() as TextProps["weight"],
    color: facade.getColor(),
    className: facade.getClassName(),
  };

  return <TextPresentational {...presentationalProps} />;
};
