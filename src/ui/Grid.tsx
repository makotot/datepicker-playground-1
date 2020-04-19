import styled from "@emotion/styled";
import css from "@styled-system/css";
import {
  justifyContent,
  GridProps,
  FlexboxProps,
  alignContent,
  LayoutProps,
  justifyItems,
  alignItems,
  justifySelf,
  alignSelf,
  grid,
  layout
} from "styled-system";

type Props = GridProps &
  LayoutProps &
  Pick<
    FlexboxProps,
    | "justifyContent"
    | "alignContent"
    | "justifyItems"
    | "alignItems"
    | "justifySelf"
    | "alignSelf"
  >;

export const Grid = styled("div")<Props>(
  grid,
  justifyContent,
  justifyItems,
  alignItems,
  alignContent,
  layout,
  justifySelf,
  alignSelf,
  ({ display = "grid" }) =>
    css({
      display
    })
);
