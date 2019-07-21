import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApolloService } from '@core/services/apollo.service';
import {
  ExamQuestionBankInfo,
  GetExamQuestionItemRequest,
  CreateExamQuestionRequest,
  ExamQuestionID,
  UpdateExamQuestionRequest,
  DeleteExamQuestionRequest
} from '@gql-models/exam/exam.model';
import {
  QUERY_EXAM_QUESTION_LIST,
  QUERY_EXAM_QUESTION_ITEM,
  CREATE_EXAM_QUESTION,
  UPDATE_EXAM_QUESTION,
  DELETE_EXAM_QUESTION,
  SAVE_EXAM_RESULT,
  QUERY_EXAM_QUESTION_RESULT_LIST
} from './exam.graphql';
import {
  ExamQuestionResultID,
  SaveExamResultRequest,
  GetExamQuestionResultListRequest,
  ExamQuestionResultItem
} from '@gql-models/exam/exam-result.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private apolloService: ApolloService) {}

  queryExamQuestionList(): Promise<ExamQuestionBankInfo[]> {
    return this.apolloService
      .getApollo()
      .query<{ GetExamQuestionList: ExamQuestionBankInfo[] }>({
        query: QUERY_EXAM_QUESTION_LIST
      })
      .pipe(
        map(({ data }) => data.GetExamQuestionList || []),
        catchError(() => of([]))
      )
      .toPromise();
  }

  queryExamQuestionItem(req: GetExamQuestionItemRequest): Promise<ExamQuestionBankInfo> {
    return this.apolloService
      .getApollo()
      .query<{ GetExamQuestionItem: ExamQuestionBankInfo }>({
        query: QUERY_EXAM_QUESTION_ITEM,
        variables: { req }
      })
      .pipe(
        map(({ data }) => data.GetExamQuestionItem),
        catchError(err => throwError(err))
      )
      .toPromise();
  }

  createExamQuestion(req: CreateExamQuestionRequest): Observable<ExamQuestionID> {
    return this.apolloService
      .getApollo()
      .mutate<{ CreateExamQuestion: ExamQuestionID }>({
        mutation: CREATE_EXAM_QUESTION,
        variables: { req }
      })
      .pipe(
        map(({ data }) => data.CreateExamQuestion),
        catchError(() => of(null))
      );
  }

  updateExamQuestion(req: UpdateExamQuestionRequest): Observable<ExamQuestionID> {
    return this.apolloService
      .getApollo()
      .mutate<{ UpdateExamQuestion: ExamQuestionID }>({
        mutation: UPDATE_EXAM_QUESTION,
        variables: { req }
      })
      .pipe(
        map(({ data }) => data.UpdateExamQuestion),
        catchError(() => of(null))
      );
  }

  deleteExamQuestion(req: DeleteExamQuestionRequest): Observable<ExamQuestionID> {
    return this.apolloService
      .getApollo()
      .mutate<{ DeleteExamQuestion: ExamQuestionID }>({
        mutation: DELETE_EXAM_QUESTION,
        variables: { req }
      })
      .pipe(
        map(({ data }) => data.DeleteExamQuestion),
        catchError(() => of(null))
      );
  }

  saveExamResult(req: SaveExamResultRequest): Promise<ExamQuestionResultID> {
    return this.apolloService
      .getApollo()
      .mutate<{ SaveExamQuestionResult: ExamQuestionResultID }>({
        mutation: SAVE_EXAM_RESULT,
        variables: { req }
      })
      .pipe(map(({ data }) => data.SaveExamQuestionResult))
      .toPromise();
  }

  getExamResultList(req: GetExamQuestionResultListRequest): Promise<ExamQuestionResultItem[]> {
    return this.apolloService
      .getApollo()
      .query<{ GetExamQuestionResultList: ExamQuestionResultItem[] }>({
        query: QUERY_EXAM_QUESTION_RESULT_LIST,
        variables: { req }
      })
      .pipe(
        map(({ data }) => data.GetExamQuestionResultList),
        catchError(() => of([]))
      )
      .toPromise();
  }
}
