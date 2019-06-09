import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@shared/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [MaterialModule, FormsModule, CommonModule],
  declarations: []
})
export class SharedModule {}
