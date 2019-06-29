import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yur-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.scss']
})
export class ExamHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onGoConfigPage() {
    this.router.navigate(['config']);
  }
}
