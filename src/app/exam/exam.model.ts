export { ExamQuestionBankInfo, QuestionType, ExamQuestion } from '@gql-models/exam/exam.model';

export interface ExamClassroomQuestionItem {
  answer: number;
  selected: number;
  questions: string[];
  title: string;
}
