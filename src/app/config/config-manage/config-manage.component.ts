import { Component, OnInit } from '@angular/core';

import { ExamQuestionBankInfo, QuestionType } from '@exam/exam.model';
import { ExamService } from '@core/services/exam/exam.service';

@Component({
  selector: 'yur-config-manage',
  templateUrl: './config-manage.component.html',
  styleUrls: ['./config-manage.component.css']
})
export class ConfigManageComponent implements OnInit {
  examQuestionBankList: ExamQuestionBankInfo[] = [];
  examQuestionHeaders: string[];
  examQuestionHeadersMap: Map<string, string>;
  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.initExamQuestionBankList();
    this.initQuestionHeaders();
    this.initQuestionHeadersMap();
  }

  parseRowWordingFn(row: ExamQuestionBankInfo, header: string): string | number {
    let result: string | number;
    switch (header) {
      case 'examQuestionType':
        const typeMap = new Map<QuestionType, string>([
          [QuestionType.ChineseToEnglish, '中翻英'],
          [QuestionType.EnglishToChinese, '英翻中']
        ]);
        result = typeMap.get(row[header]);
        break;
      default:
        result = row[header];
        break;
    }
    return result;
  }

  private initExamQuestionBankList() {
    this.examService.queryExamQuestionList().then(data => {
      this.examQuestionBankList = data;
    });
  }

  private initQuestionHeaders() {
    this.examQuestionHeaders = [
      'no',
      'name',
      'examTime',
      'examQuestionDisplayCount',
      'examQuestionType',
      'examPassScore',
      'examAllowCount'
    ];
  }
  private initQuestionHeadersMap() {
    this.examQuestionHeadersMap = new Map([
      ['no', 'No'],
      ['name', '題庫'],
      ['examTime', '考題時間'],
      ['examQuestionDisplayCount', '每題題數'],
      ['examQuestionType', '考題模式'],
      ['examPassScore', '及格分數'],
      ['examAllowCount', '考試上限次數']
    ]);
  }
}
