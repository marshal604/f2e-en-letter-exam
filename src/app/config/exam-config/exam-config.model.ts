import { NormalItemWithIdNumber } from '@shared/models/item.model';

export enum InputUnit {
  Word = 1,
  Score,
  Count,
  Second
}

export enum LimitType {
  umlimit,
  limit
}

export enum QuestionType {
  EnglishToChinese = 1,
  ChineseToEnglish
}

export interface ExamTestConfigItem {
  label: string;
  formControlName: string;
  inputType: ExamTestConfigInputType;
  value?: string | NormalItemWithIdNumber[];
  unit?: InputUnit;
}

export enum ExamTestConfigInputType {
  Radio = 1,
  Select,
  Limit
}
