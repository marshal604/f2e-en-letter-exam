import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ExamService } from '@core/services/exam/exam.service';
import {
  ExamQuestionBankInfo,
  ExamClassroomQuestionItem,
  QuestionType,
  ExamQuestion,
  SaveExamResultRequest
} from '@exam/exam.model';
@Component({
  selector: 'yur-exam-classroom',
  templateUrl: './exam-classroom.component.html',
  styleUrls: ['./exam-classroom.component.scss']
})
export class ExamClassroomComponent implements OnInit, OnDestroy {
  selectedIndex = 0;
  questionList: ExamClassroomQuestionItem[];
  formGroup: FormGroup;
  questionBackInfo: ExamQuestionBankInfo;
  isDisabledSubmit: boolean;
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.examService
        .queryExamQuestionItem({ id: data.id })
        .then(
          q => {
            this.questionBackInfo = q;
            const questionList = this.parseExamQuestion(q);
            this.updateFormGroup(questionList.length);
            this.questionList = questionList;
          },
          () => {
            alert('Exam ID is invalid or permission denied.');
          }
        )
        .catch(err => {
          console.log('err', err);
        });
    });
  }

  ngOnInit() {
    this.initFormGroup();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    this.isDisabledSubmit = true;
    const selectedList = this.getSelectedQuestionList();
    const examScore = this.calExamScore(selectedList);
    const req: SaveExamResultRequest = {
      examId: this.questionBackInfo.id,
      userId: 'test',
      examName: this.questionBackInfo.name,
      userName: 'test',
      result: this.questionList.map((item, index) => {
        return {
          numberOfQuestion: index + 1,
          choose: {
            name: item.questions[selectedList[index]]
          },
          answer: {
            name: item.questions[item.answer]
          },
          isCorrect: item.answer === selectedList[index]
        };
      }),
      examScore,
      isCompleted: true
    };
    this.examService
      .saveExamResult(req)
      .then(() => {
        alert('送出完畢');
        this.router.navigate(['../../home'], { relativeTo: this.activatedRoute });
      })
      .catch(() => {
        alert('網路不穩，請重新送出');
        this.isDisabledSubmit = false;
      });
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({});
  }

  private updateFormGroup(formCount: number) {
    this.initFormGroup();
    let i = 0;
    while (i < formCount) {
      this.formGroup.setControl(`radio-${i}`, this.fb.control('', Validators.required));
      i++;
    }
  }

  private parseExamQuestion(input: ExamQuestionBankInfo): ExamClassroomQuestionItem[] {
    const questionTitleBank = this.parseQuestionBank({
      questions: input.question,
      type: input.setting.examQuestionType,
      isGetQuestionTitle: true
    });
    const questionAnswerBank = this.parseQuestionBank({
      questions: input.question,
      type: input.setting.examQuestionType
    });

    return questionAnswerBank.map((answer, index) => {
      const questions = this.getRandQuesiton({
        randCount: input.setting.examQuestionDisplayCount,
        questionBank: questionAnswerBank.filter(q => q !== answer),
        answer
      });
      return {
        questions,
        selected: -1,
        answer: questions.findIndex(q => q === answer),
        title: questionTitleBank[index]
      };
    });
  }

  private parseQuestionBank({
    questions,
    type,
    isGetQuestionTitle
  }: {
    questions: ExamQuestion;
    type: QuestionType;
    isGetQuestionTitle?: boolean;
  }): string[] {
    const typeList = [QuestionType.ChineseToEnglish, QuestionType.EnglishToChinese];
    const newTypeList = isGetQuestionTitle ? typeList.reverse() : typeList;
    const questionBank = type === newTypeList[0] ? questions.english : questions.chinese;

    return questionBank || [];
  }

  private getRandQuesiton({
    randCount,
    questionBank,
    answer
  }: {
    randCount: number;
    questionBank: string[];
    answer: string;
  }): string[] {
    const hashMap = new Map<number, boolean>();
    const answerSelf = 1;
    const questions = [];
    while (hashMap.size < randCount - answerSelf) {
      const rand = Math.floor(Math.random() * (questionBank.length - 1));
      if (!hashMap.get(rand)) {
        hashMap.set(rand, true);
      }
    }
    const answerPos = Math.floor(Math.random() * (hashMap.size - 1));
    Array.from(hashMap.keys()).forEach((key, index) => {
      if (index === answerPos) {
        questions.push(answer);
      }
      questions.push(questionBank[key]);
    });
    return questions;
  }

  private getSelectedQuestionList(): number[] {
    return Object.keys(this.formGroup.value).map(key => this.formGroup.value[key]);
  }
  private calExamScore(selectedList: number[]): number {
    const scorePerQuestion = 100 / selectedList.length;
    const score = this.questionList.reduce((pre, cur, index) => {
      const isCorrect = cur.answer === selectedList[index];
      pre += isCorrect ? scorePerQuestion : 0;
      return pre;
    }, 0);
    return Math.floor(score);
  }
}
