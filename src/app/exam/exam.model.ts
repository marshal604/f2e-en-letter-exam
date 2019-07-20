export { ExamQuestionBankInfo, QuestionType, ExamQuestion } from '@gql-models/exam/exam.model';
export { SaveExamResultRequest } from '@gql-models/exam/exam-result.model';
export interface ExamClassroomQuestionItem {
  answer: number;
  selected: number;
  questions: string[];
  title: string;
}
