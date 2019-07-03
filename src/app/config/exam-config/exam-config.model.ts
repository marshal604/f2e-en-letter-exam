import { NormalItemWithIdNumber } from '@shared/models/item.model';

export enum InputUnit {
  Word = 1,
  Score,
  Count,
  Second
}

export enum LimitType {
  unlimit = -1,
  limit = 1
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

export interface ExamTestConfigInput {
  examTime: ExamTestConfigLimitInput;
  examQuestionDisplayCount: ExamTestConfigLimitInput;
  examQuestionType: QuestionType;
  examPassScore: ExamTestConfigLimitInput;
  examAllowCount: ExamTestConfigLimitInput;
}

export interface ExamTestConfigLimitInput {
  limit: LimitType;
  limitNumber: number;
}
