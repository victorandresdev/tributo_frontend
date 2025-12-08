import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Options } from '../../helpers/options';
import { UtilService } from '../../../services/util.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

interface OptionsWithIdString {
  sId: string;
  sDescripcion: string;
}

@Component({
  selector: 'app-option-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './option-component.html',
  styleUrl: './option-component.scss'
})
export class OptionComponent implements OnInit, OnChanges {
  environment: any;
  form!: FormGroup;

  blUseOptionWithIdString: boolean = false;
  displayValue: string = '';

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() MsjRequired: string = "";
  @Input() options: Options[] = [];
  @Input() select: number = 0;
  @Input() editValue: number = 0;
  @Input() optionSelect: boolean = true;
  @Input() disabled: boolean = false;
  @Input() optionsWithIdString: OptionsWithIdString[] = [];
  @Input() selectWithIdString: string = '';
  @Input() showDisplayValue: boolean = false;
  @Input() showConcatCodigo: boolean = false;
  @Input() datoUnico: boolean = false;

  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              public utilService: UtilService) { }

  ngOnInit(): void {

    let idSelected;
    if (this.select && this.select != 0) idSelected = this.select;
    if (this.selectWithIdString && this.selectWithIdString != '') {
      this.displayValue = this.selectWithIdString;
      idSelected = this.selectWithIdString;
    }

    this.form = this.formBuilder.group({
      id: [idSelected ? idSelected : '', this.required ? [Validators.required, Validators.min(0)] : []],
    });

    if(this.disabled){
      this.form.controls["id"].disable();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      return;
    }
    if (changes['optionsWithIdString']) {
      if(this.optionsWithIdString?.length>0) this.blUseOptionWithIdString = true;
      else this.blUseOptionWithIdString = false;
    }
    if (changes['selectWithIdString']) {
      this.form.controls['id'].setValue(this.selectWithIdString);
    }
    if (changes['select']){
      /* Instrucción para forzar desde el formulario contenedor la muestra del mensaje de error,
        al ejecutar el método markAllAsTouched, forzando la reacción al otorgar -1 al valor del parámetro de entrada selected
        esto funciona con el validators min(0)
      */
      if(!this.select) this.form.controls['id'].setValue(null);
      else this.form.controls['id'].setValue(this.select);
      if(this.required === true && this.select < 0){
        this.form.markAllAsTouched();
      }
    }
    if (changes['editValue']) {
      if(this.optionSelect == true){
        this.form.controls['id'].setValue(this.editValue === 0 ? '' : this.editValue);
      }else{
        this.form.controls['id'].setValue(this.editValue);
      }
    }
  }

  setActivateValidation() {
    if (this.form.valid) {
      return;
    }

    if (this.required) {
      this.form.markAllAsTouched();
    }
  }

  emit(value: any) { console.log("Marcado: ",value);
    if(this.options.length > 0) this.selected.emit(value ? value : 0);
    if(this.optionsWithIdString.length > 0) {
      this.displayValue = this.optionsWithIdString.find(x => x.sId == value)?.sId || '';
      this.selected.emit(value ? value : '');
    }
  }

  validMsjError(){
    let rpta:string = "";
    if(this.required == true){
      if(this.MsjRequired != ""){
        rpta = this.MsjRequired;
      }else{
        rpta = this.utilService.getErrorMessage(this.form,'id');
      }
    }
    return rpta;
  }
}
