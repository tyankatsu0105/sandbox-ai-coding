export type TextProps = {
  children: string;
  size?: "small" | "medium" | "large";
  weight?: "normal" | "bold";
  color?: string;
  className?: string;
};

const defaultProps: Partial<TextProps> = {
  size: "medium",
  weight: "normal",
  color: "inherit",
};

export class TextFacade {
  private props: TextProps;

  constructor(props: TextProps) {
    this.props = { ...defaultProps, ...props };
  }

  getSize(): string {
    return this.props.size || "medium";
  }

  getWeight(): string {
    return this.props.weight || "normal";
  }

  getColor(): string {
    return this.props.color || "inherit";
  }

  getText(): string {
    return this.props.children;
  }

  getClassName(): string {
    return this.props.className || "";
  }
}
