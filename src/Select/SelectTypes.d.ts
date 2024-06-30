export interface SelectProps {
  className?: string;
  filter?: (option: any, value: string) => boolean;
  label?: string;
  options?: any[];
  renderOption?: (option: any) => JSX.Element;
  Value?: string;
  OnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption?: (option: any) => void;
  selectedOptionValue?: any;
}