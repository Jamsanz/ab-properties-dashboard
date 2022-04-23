import { IQuestion } from "./question.interface";

export interface IForm {
  doc_name: string;
  doc_description: string;
  questions?: IQuestion[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}