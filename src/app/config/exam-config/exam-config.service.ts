import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  DELETE_EXAM_QUESTION
} from './exam-config.graphql';

@Injectable({
  providedIn: 'root'
})
export class ExamConfigService {
  constructor(private apolloService: ApolloService) {}

  queryExamQuestionList(): Observable<ExamQuestionBankInfo[]> {
    return this.apolloService
      .getApollo()
      .query<{ GetExamQuestionList: ExamQuestionBankInfo[] }>({
        query: QUERY_EXAM_QUESTION_LIST
      })
      .pipe(
        map(({ data }) => data.GetExamQuestionList || []),
        catchError(() => of([]))
      );
  }

  queryExamQuestionItem(request: GetExamQuestionItemRequest): Observable<ExamQuestionBankInfo> {
    return this.apolloService
      .getApollo()
      .query<{ GetExamQuestionItem: ExamQuestionBankInfo }>({
        query: QUERY_EXAM_QUESTION_ITEM,
        variables: { request }
      })
      .pipe(
        map(({ data }) => data.GetExamQuestionItem),
        catchError(() => of(null))
      );
  }

  createExamQuestion(request: CreateExamQuestionRequest): Observable<ExamQuestionID> {
    return this.apolloService
      .getApollo()
      .mutate<{ CreateExamQuestion: ExamQuestionID }>({
        mutation: CREATE_EXAM_QUESTION,
        variables: { request }
      })
      .pipe(
        map(({ data }) => data.CreateExamQuestion),
        catchError(() => of(null))
      );
  }

  updateExamQuestion(request: UpdateExamQuestionRequest): Observable<ExamQuestionID> {
    return this.apolloService
      .getApollo()
      .mutate<{ UpdateExamQuestion: ExamQuestionID }>({
        mutation: UPDATE_EXAM_QUESTION,
        variables: { request }
      })
      .pipe(
        map(({ data }) => data.UpdateExamQuestion),
        catchError(() => of(null))
      );
  }

  deleteExamQuestion(request: DeleteExamQuestionRequest): Observable<ExamQuestionID> {
    return this.apolloService
      .getApollo()
      .mutate<{ DeleteExamQuestion: ExamQuestionID }>({
        mutation: DELETE_EXAM_QUESTION,
        variables: { request }
      })
      .pipe(
        map(({ data }) => data.DeleteExamQuestion),
        catchError(() => of(null))
      );
  }
}
