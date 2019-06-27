import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'yur-exam-test-config',
  templateUrl: './exam-test-config.component.html',
  styleUrls: ['./exam-test-config.component.scss']
})
export class ExamTestConfigComponent implements OnInit {
  examForm: FormGroup;
  stepIndex = 0;
  constructor(private fb: FormBuilder) {}

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
    console.log('form', this.examForm.value);
  }
}
