export interface SaveExamResultRequest {
  id: string;
  examId: string;
  userId: string;
  examName: string;
  userName: string;
  result: SaveExamResultContent[];
  examScore: number;
  isCompeleted: boolean;
  examTime?: string;
}

export interface SaveExamResultContent {
  numberOfQuestion: number;
  choose: ExamResult;
  answer: ExamResult;
  isCorrect: boolean;
}

export interface ExamResult {
  name: string;
  questionId?: string; // @TODO: create question table to user selected already exist question
}

export interface ExamQuestionResultID {
  id: string;
}
