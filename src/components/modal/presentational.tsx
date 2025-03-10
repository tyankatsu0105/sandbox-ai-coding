import { memo } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  color: #333;
`;

const StyledContent = styled.div`
  background-color: #fefefe;
  width: 80%;
  max-width: 600px;
  border-radius: 4px;
  position: relative;
`;

const StyledHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 8px 12px;
  border-bottom: 1px solid #000;
`;
const StyledBody = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid #000;
`;
const StyledFooter = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const StyledCloseIcon = styled.button`
  position: absolute;
  top: -20px;
  right: -12px;
  font-size: 24px;
`;
const StyledCloseButton = styled.button`
  padding: 4px 8px;
  background-color: red;
  cursor: pointer;
`;

type Props = {
  readonly onClose: () => void;
  readonly renderHeader?: () => React.ReactNode;
  readonly renderBody?: () => React.ReactNode;
  readonly renderFooter?: (props: {
    components: {
      Button: typeof StyledCloseButton;
    };
  }) => React.ReactNode;
};
export const Presentational = memo(function Presentational(props: Props) {
  return (
    <StyledContainer onClick={props.onClose}>
      <StyledContent onClick={(e) => e.stopPropagation()}>
        <StyledCloseIcon
          onClick={props.onClose}
          role="button"
          aria-label="Close"
        >
          &times;
        </StyledCloseIcon>
        {props.renderHeader && (
          <StyledHeader>{props.renderHeader()}</StyledHeader>
        )}
        {props.renderBody && <StyledBody>{props.renderBody()}</StyledBody>}
        {props.renderFooter && (
          <StyledFooter>
            {props.renderFooter({ components: { Button: StyledCloseButton } })}
          </StyledFooter>
        )}
      </StyledContent>
    </StyledContainer>
  );
});
