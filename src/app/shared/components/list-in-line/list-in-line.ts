import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Options } from '../../helpers/options';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilService } from '../../../services/util.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-in-line',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-in-line.html',
  styleUrl: './list-in-line.scss'
})
export class ListInLine implements OnInit {
  form!: FormGroup;

  @Input() options!: Options[];
  @Input() icon!: string;
  @Input() select: number = 0;
  @Input() required: boolean = false;
  @Input() etiqueta!: string;
  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              public utilService: UtilService) { }

  ngOnInit(): void {
    let idSelected;
    this.form = this.formBuilder.group({
      id: [idSelected ? idSelected : '', this.required ? [Validators.required, Validators.min(0)] : []],
    });
  }

  setActivateValidation() {
    if (this.form.valid) {
      return;
    }

    if (this.required) {
      this.form.markAllAsTouched();
    }
  }

  emit(evento: any) {
    if(this.options.length > 0) this.selected.emit(evento.srcElement.value ? evento.srcElement.value : 0);
  }
}
