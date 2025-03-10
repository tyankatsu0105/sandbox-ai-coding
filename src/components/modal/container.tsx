import { ComponentProps, memo } from "react";

import { Presentational } from "./presentational";
import { CLOSE_ICON } from "./facade";

type Props = {
  readonly isOpen: boolean;
  readonly onClose: ComponentProps<typeof Presentational>["onClose"];
  readonly renderHeader: ComponentProps<typeof Presentational>["renderHeader"];
  readonly renderBody: ComponentProps<typeof Presentational>["renderBody"];
  readonly renderFooter: ComponentProps<typeof Presentational>["renderFooter"];
};
export const Modal = memo(function Modal(props: Props) {
  if (!props.isOpen) return <></>;

  return (
    <Presentational
      renderCloseIcon={() => <span>{CLOSE_ICON}</span>}
      onClose={props.onClose}
      renderHeader={props.renderHeader}
      renderBody={props.renderBody}
      renderFooter={props.renderFooter}
    />
  );
});
