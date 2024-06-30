export interface I_SvgIcon {
  viewBox?: string;
  focusable?: boolean;
  fill?: string;
  className?: string;
  OnClick?: (event: React.MouseEventHandler<SVGSVGElement, MouseEvent>) => void;
}
