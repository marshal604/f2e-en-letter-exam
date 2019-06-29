import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Subscription } from 'rxjs';

const EXAM_TEST_QUESTION_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ExamTestQuestionInputComponent),
  multi: true
};

const EXAM_TEST_QUESTION_INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ExamTestQuestionInputComponent),
  multi: true
};

@Component({
  selector: 'yur-exam-test-question-input',
  templateUrl: './exam-test-question-input.component.html',
  styleUrls: ['./exam-test-question-input.component.scss'],
  providers: [EXAM_TEST_QUESTION_INPUT_VALUE_ACCESSOR, EXAM_TEST_QUESTION_INPUT_VALIDATOR]
})
export class ExamTestQuestionInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  examQuestionForm: FormGroup;

  private onTouched: (_: any) => void;
  private subscriptions = new Subscription();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initFormGroup();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initFormGroup() {
    this.examQuestionForm = this.fb.group({
      id: '0',
      name: ['', Validators.required],
      question: ['', [Validators.required, this.questionValidators]]
    });
  }

  writeValue(value: any) {
    if (!value) {
      return;
    }
    this.examQuestionForm.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (_: any) => void) {
    this.subscriptions.add(this.examQuestionForm.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: (_: any) => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.examQuestionForm.disable() : this.examQuestionForm.enable();
  }

  questionValidators(control: AbstractControl): ValidationErrors {
    // english = 中文
    const regExp = new RegExp(/(\w+\s*)+=(\s*\S+)+/);
    let isValid = true;
    control.value.split('\n').forEach(val => (isValid = regExp.test(val)));
    return isValid ? null : { valid: false, message: 'Exam Test Question fields are invalid.' };
  }

  validate(): ValidationErrors {
    return this.examQuestionForm.valid
      ? null
      : { valid: false, message: 'Exam Test Question fields are invalid.' };
  }
}
