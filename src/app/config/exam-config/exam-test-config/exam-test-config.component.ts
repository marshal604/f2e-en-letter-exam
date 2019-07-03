import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ExamConfigService } from '@config/exam-config/exam-config.service';
import { ExamTestConfigInput, LimitType } from '@config/exam-config/exam-config.model';
import { CreateExamQuestionRequest, ExamQuestion, ExamSetting } from '@gql-models/exam/exam.model';

@Component({
  selector: 'yur-exam-test-config',
  templateUrl: './exam-test-config.component.html',
  styleUrls: ['./exam-test-config.component.scss']
})
export class ExamTestConfigComponent implements OnInit {
  examForm: FormGroup;
  stepIndex = 0;
  constructor(private fb: FormBuilder, private examConfigService: ExamConfigService) {}

  ngOnInit() {
    this.initExamFormGroup();
  }

  initExamFormGroup() {
    this.examForm = this.fb.group({
      examQuestion: '',
      examConfig: ''
    });
  }

  onSave() {
    const examQuestion = this.examForm.get('examQuestion').value;
    const examConfig = this.examForm.get('examConfig').value;
    const req: CreateExamQuestionRequest = {
      id: examQuestion.id,
      name: examQuestion.name,
      setting: this.parseExamSetting(examConfig),
      question: this.parseExamQuestion(examQuestion.question)
    };
    console.log('req', req);
    this.examConfigService.createExamQuestion(req).toPromise();
  }

  private parseExamQuestion(question: string): ExamQuestion {
    const questions = question.split('\n');
    const result: ExamQuestion = { chinese: [], english: [] };
    questions.forEach(q => {
      const splitArray = q.split('=');
      const english = splitArray[0].trim();
      const chinese = splitArray[1].trim();
      result.chinese.push(chinese);
      result.english.push(english);
    });
    return result;
  }

  private parseExamSetting(config: ExamTestConfigInput): ExamSetting {
    return {
      examTime: config.examTime.limit ? config.examTime.limitNumber : LimitType.unlimit,
      examQuestionDisplayCount: config.examQuestionDisplayCount.limit
        ? config.examQuestionDisplayCount.limitNumber
        : LimitType.unlimit,
      examQuestionType: config.examQuestionType,
      examPassScore: config.examPassScore.limit
        ? config.examPassScore.limitNumber
        : LimitType.unlimit,
      examAllowCount: config.examAllowCount.limit
        ? config.examAllowCount.limitNumber
        : LimitType.unlimit
    };
  }
}
