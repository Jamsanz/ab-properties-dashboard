export interface IQuestion {
  question: string;
  questionDescription?: string;
  questionType?: string;
  options?: [IOption];
  isRequired?: boolean;
  validation?: string;
}
interface IOption {
  option: string;
}