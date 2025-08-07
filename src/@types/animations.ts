type GenericNumberType = [number] | [number, number] | [number, number, number];
type GenericStringType = [string] | [string, string] | [string, string, string];

export interface AnimationPropsI {
  duration?: number;
  ease?: string;
  delay?: number;
  delayExit?: number;
}

export interface GenericAnimationPropsI extends AnimationPropsI {
  opacity?: GenericNumberType;
  scale?: GenericNumberType;
  x?: GenericNumberType;
  y?: GenericNumberType;
  width?: GenericNumberType | GenericStringType;
  height?: GenericNumberType | GenericStringType;
  rotate?: GenericNumberType;
  skewX?: GenericNumberType;
  skewY?: GenericNumberType;
  borderRadius?: GenericNumberType | GenericStringType;
  backgroundColor?: GenericStringType;
  color?: GenericStringType;
  borderColor?: GenericStringType;
  borderWidth?: GenericNumberType;
  borderStyle?: GenericStringType;
  boxShadow?: GenericStringType;
  padding?: GenericNumberType | GenericStringType;
  margin?: GenericNumberType | GenericStringType;
  top?: GenericNumberType | GenericStringType;
  left?: GenericNumberType | GenericStringType;
  right?: GenericNumberType | GenericStringType;
  bottom?: GenericNumberType | GenericStringType;
  zIndex?: GenericNumberType;
  overflow?: GenericStringType;
  overflowX?: GenericStringType;
  overflowY?: GenericStringType;
  position?: GenericStringType;
  display?: GenericStringType;
  visibility?: GenericStringType;
  cursor?: GenericStringType;
  pointerEvents?: GenericStringType;
  transform?: GenericStringType;
  transformOrigin?: GenericStringType;
}
