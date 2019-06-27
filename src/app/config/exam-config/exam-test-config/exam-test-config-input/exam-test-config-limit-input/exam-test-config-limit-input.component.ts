import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputUnit, LimitType } from '@config/exam-config/exam-config.model';

const EXAM_TEST_CONFIG_LIMIT_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ExamTestConfigLimitInputComponent),
  multi: true
};

const EXAM_TEST_CONFIG_LIMIT_INPUT_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ExamTestConfigLimitInputComponent),
  multi: true
};

@Component({
  selector: 'yur-exam-test-config-limit-input',
  templateUrl: './exam-test-config-limit-input.component.html',
  styleUrls: ['./exam-test-config-limit-input.component.scss'],
  providers: [EXAM_TEST_CONFIG_LIMIT_INPUT_VALUE_ACCESSOR, EXAM_TEST_CONFIG_LIMIT_INPUT_VALIDATORS]
})
export class ExamTestConfigLimitInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  @Input() unit: InputUnit;

  limitForm: FormGroup;
  unitMap = new Map<number, string>([
    [InputUnit.Word, '字'],
    [InputUnit.Score, '分'],
    [InputUnit.Count, '次'],
    [InputUnit.Second, '秒']
  ]);

  private subscriptions = new Subscription();
  constructor(private fb: FormBuilder) {}

  get limitType(): number {
    return LimitType.limit;
  }

  get umlimitType(): number {
    return LimitType.umlimit;
  }

  ngOnInit() {
    this.initLimitForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initLimitForm() {
    this.limitForm = this.fb.group({
      limit: [LimitType.limit, Validators.required],
      limitNumber: [0, Validators.min(0)]
    });
  }

  isSelectedLimit(): boolean {
    return this.limitForm.get('limit').value === LimitType.limit;
  }

  writeValue(value: any) {
    if (!value) {
      return;
    }
    this.limitForm.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (_: any) => void) {
    if (this.limitForm) {
      fn(this.limitForm.value);
    }
    this.subscriptions.add(this.limitForm.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: (_: any) => void) {}

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.limitForm.disable() : this.limitForm.enable();
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.limitForm.valid ? null : { valid: false, meesage: 'limitForm field is invalid.' };
  }
}
