import { Component, OnInit, forwardRef, Input, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  QuestionType,
  ExamTestConfigItem,
  ExamTestConfigInputType,
  InputUnit
} from '@config/exam-config/exam-config.model';

const EXAM_TEST_CONFIG_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ExamTestConfigInputComponent),
  multi: true
};

@Component({
  selector: 'yur-exam-test-config-input',
  templateUrl: './exam-test-config-input.component.html',
  styleUrls: ['./exam-test-config-input.component.scss'],
  providers: [EXAM_TEST_CONFIG_INPUT_VALUE_ACCESSOR]
})
export class ExamTestConfigInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  examTestConfigForm: FormGroup;
  examTestConfigList: ExamTestConfigItem[];
  private onTouched: (_: any) => void;
  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {}

  get examTestConfigLimitType(): number {
    return ExamTestConfigInputType.Limit;
  }

  get examTestConfigSelectType(): number {
    return ExamTestConfigInputType.Select;
  }

  get examTestConfigRadioType(): number {
    return ExamTestConfigInputType.Radio;
  }

  ngOnInit() {
    this.initExamTestConfigList();
    this.initFormGroup();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initFormGroup() {
    this.examTestConfigForm = this.fb.group({
      examTime: '',
      examQuestionDisplayCount: 4,
      examQuestionType: QuestionType.EnglishToChinese,
      examPassScore: '',
      examAllowCount: ''
    });
  }

  initExamTestConfigList() {
    this.examTestConfigList = [
      {
        label: '考題時間',
        formControlName: 'examTime',
        inputType: ExamTestConfigInputType.Limit,
        unit: InputUnit.Second
      },
      {
        label: '及格分數',
        formControlName: 'examPassScore',
        inputType: ExamTestConfigInputType.Limit,
        unit: InputUnit.Score
      },
      {
        label: '考試次數',
        formControlName: 'examAllowCount',
        inputType: ExamTestConfigInputType.Limit,
        unit: InputUnit.Count
      },
      {
        label: '答題選項的數量',
        formControlName: 'examQuestionDisplayCount',
        value: [1, 2, 3, 4, 5].map(item => ({ id: item, name: item.toString() })),
        inputType: ExamTestConfigInputType.Select
      },
      {
        label: '考試模式',
        formControlName: 'examQuestionType',
        value: [{ id: 1, name: '中翻英' }, { id: 2, name: '英翻中' }],
        inputType: ExamTestConfigInputType.Radio
      }
    ];
  }

  writeValue(value: any) {
    if (!value) {
      return;
    }
    this.examTestConfigForm.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (_: any) => void) {
    if (this.examTestConfigForm) {
      fn(this.examTestConfigForm.value);
    }
    this.subscriptions.add(this.examTestConfigForm.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: (_: any) => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.examTestConfigForm.disable() : this.examTestConfigForm.enable();
  }
}
