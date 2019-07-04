import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExamService } from '@core/services/exam/exam.service';
import { ExamQuestionBankInfo } from '@exam/exam.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'yur-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.scss']
})
export class ExamHomeComponent implements OnInit, OnDestroy {
  examQuestionOptions: ExamQuestionBankInfo[];
  examFormControl = new FormControl();

  private subscriptions = new Subscription();
  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit() {
    this.queryExamQuestionList().toPromise();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onGoConfigPage() {
    this.router.navigate(['config']);
  }

  onStartExam() {
    // this.router.navigate([`exam/classroom/${this.examFormControl.value}`]);
  }

  private queryExamQuestionList(): Observable<ExamQuestionBankInfo[]> {
    return this.examService.queryExamQuestionList().pipe(
      tap(data => {
        this.examQuestionOptions = data;
        this.examFormControl.setValue(data.length > 0 ? data[0].id : '');
      })
    );
  }
}
