export interface ExamQuestionBankInfo {
  id: string;
  name: string;
  setting: ExamSetting;
  question: ExamQuestion;
}

export interface ExamQuestionID {
  id: string;
}

export interface ExamSetting {
  examTime: number;
  examQuestionDisplayCount: number;
  examQuestionType: QuestionType;
  examPassScore: number;
  examAllowCount: number;
}

export interface ExamQuestion {
  chinese: string[];
  english: string[];
}

export enum QuestionType {
  EnglishToChinese = 1,
  ChineseToEnglish
}

export interface CreateExamQuestionRequest extends ExamQuestionBankInfo {}

export interface UpdateExamQuestionRequest extends ExamQuestionBankInfo {}

export interface GetExamQuestionItemRequest extends ExamQuestionID {
  id: string;
}
export interface DeleteExamQuestionRequest extends ExamQuestionID {}
