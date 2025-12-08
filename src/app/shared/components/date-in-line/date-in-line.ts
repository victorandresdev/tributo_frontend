import { UtilService } from './../../../services/util.services';
import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MY_DATE_FORMATS } from '../../constants/app.constants';

@Component({
  selector: 'app-date-in-line',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './date-in-line.html',
  styleUrl: './date-in-line.scss',
  providers: [
    { provide: MY_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DateInLine implements OnInit, OnChanges {
  form!:FormGroup;
  fecha!:Date;
  @Input() etiqueta!:string;
  @Input() default!:Date;

  constructor(
    private fb:FormBuilder,
    private utilservice: UtilService
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha:["",[]]
    });
    // this.form.get('fecha')?.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['default']){
      if(this.default != null){
        console.log("Default: ", this.default);
        this.fecha = this.default;
        //this.asignaFecha();
      }
    }
  }

  asignaFecha(){
    let fec:string = this.utilservice.formatoFecha(this.fecha,'fechaData');
    console.log("Fec: ",fec);
    this.form.get('fecha')?.setValue(fec);
  }
}
