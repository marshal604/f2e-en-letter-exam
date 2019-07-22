import { Component, OnInit } from '@angular/core';

import { ExamQuestionBankInfo, QuestionType } from '@exam/exam.model';
import { ExamService } from '@core/services/exam/exam.service';

@Component({
  selector: 'yur-config-manage',
  templateUrl: './config-manage.component.html',
  styleUrls: ['./config-manage.component.scss']
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
    if (!row) {
      return '-';
    }
    let result: string | number;
    switch (header) {
      case 'examTime':
      case 'examPassScore':
      case 'examAllowCount':
        result = row.setting[header] === 0 ? '不限' : row.setting[header];
        break;
      case 'name':
        result = row[header];
        break;
      case 'examQuestionType':
        const typeMap = new Map<QuestionType, string>([
          [QuestionType.ChineseToEnglish, '中翻英'],
          [QuestionType.EnglishToChinese, '英翻中']
        ]);
        result = typeMap.get(row.setting[header]);
        break;
      case 'detail':
        result = 'GO!';
        break;
      default:
        result = row.setting[header];
        break;
    }
    return result;
  }

  onRowClicked({ row, header }: { row: ExamQuestionBankInfo; header: string }) {
    if (header === 'detail') {
      this.navigateTo(row.id);
    }
  }

  private navigateTo(id: string) {}

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
      'examAllowCount',
      'detail'
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
      ['examAllowCount', '考試上限次數'],
      ['detail', '考試結果']
    ]);
  }
}
