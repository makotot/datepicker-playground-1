import styled from "@emotion/styled";
import {
  compose,
  space,
  background,
  color,
  layout,
  border,
  shadow,
  overflow,
  textAlign,
  opacity,
  lineHeight,
  borderRadius,
  BoxShadowProps,
  BorderProps,
  BackgroundColorProps,
  BorderRadiusProps,
  SpaceProps,
  LayoutProps,
  BackgroundProps,
  TextAlignProps,
  LineHeightProps,
  OverflowProps,
  OpacityProps,
  ResponsiveValue
} from "styled-system";
import {
  createShouldForwardProp,
  props
} from "@styled-system/should-forward-prop";
import * as CSS from "csstype";

export type TextColorProps = {
  textColor?: ResponsiveValue<CSS.ColorProperty>;
};
export type BoxProps = LayoutProps &
  SpaceProps &
  BackgroundProps &
  BorderProps &
  BorderRadiusProps &
  BoxShadowProps &
  TextAlignProps &
  LineHeightProps &
  OverflowProps &
  OpacityProps &
  BackgroundColorProps &
  TextColorProps;

const shouldForwardProp = createShouldForwardProp([...props]);
export const Box = styled("div", {
  shouldForwardProp
})<
  BoxProps & {
    as?: React.ElementType;
  }
>(
  compose(
    space,
    background,
    border,
    borderRadius,
    color,
    layout,
    lineHeight,
    opacity,
    overflow,
    shadow,
    textAlign
  )
);
