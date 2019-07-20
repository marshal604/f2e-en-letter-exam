import gql from 'graphql-tag';

export const QUERY_EXAM_QUESTION_LIST = gql`
  query {
    GetExamQuestionList {
      id
      name
      setting {
        examTime
        examPassScore
        examAllowCount
        examQuestionType
        examQuestionDisplayCount
      }
      question {
        english
        chinese
      }
    }
  }
`;

export const QUERY_EXAM_QUESTION_ITEM = gql`
  query GetExamQuestionItem($req: GetExamQuestionItemRequest) {
    GetExamQuestionItem(req: $req) {
      id
      name
      setting {
        examTime
        examPassScore
        examAllowCount
        examQuestionType
        examQuestionDisplayCount
      }
      question {
        english
        chinese
      }
    }
  }
`;

export const CREATE_EXAM_QUESTION = gql`
  mutation CreateExamQuestion($req: CreateExamQuestionRequest) {
    CreateExamQuestion(req: $req) {
      id
    }
  }
`;

export const UPDATE_EXAM_QUESTION = gql`
  mutation UpdateExamQuestion($req: UpdateExamQuestionRequest) {
    UpdateExamQuestion(req: $req) {
      id
    }
  }
`;

export const DELETE_EXAM_QUESTION = gql`
  mutation DeleteExamQuestion($req: DeleteExamQuestionRequest) {
    DeleteExamQuestion(req: $req) {
      id
    }
  }
`;

export const SAVE_EXAM_RESULT = gql`
  mutation SaveExamQuestionResult($req: SaveExamResultRequest) {
    SaveExamQuestionResult(req: $req) {
      id
    }
  }
`;
