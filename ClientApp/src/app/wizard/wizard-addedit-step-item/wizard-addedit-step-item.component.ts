import { Component, OnInit, ViewChild, EventEmitter, Input, SimpleChanges, OnChanges, Output } from '@angular/core';
import { WizardStepItem } from '../../models/wizard-step-item.model';
import { NgForm } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-wizard-addedit-step-item',
  templateUrl: './wizard-addedit-step-item.component.html',
  styleUrls: ['./wizard-addedit-step-item.component.css']
})
export class WizardAddeditStepItemComponent implements OnInit {

  @Input()
  public StepItem: WizardStepItem;
  @Output()
  public StepItemSaveClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('saveStepItemForm', { read: NgForm, static: false })
  private _saveForm: NgForm;

  constructor() {
    
  }

  ngOnInit() {
  }

  resetSaveForm() {
    this._saveForm.resetForm();
  }

  onSaveStepItemClick() {
    this.StepItemSaveClick.emit();
  }
}
