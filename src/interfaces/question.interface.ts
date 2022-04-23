export interface IQuestion {
  question: string;
  qusetionDescription?: string;
  questionType?: string;
  options?: [IOption];
  isRequired?: boolean;
  validation?: string;
}
interface IOption {
  option: string;
}