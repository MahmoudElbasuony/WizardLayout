import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { WizardStep } from '../../models/wizard-step.model';

@Component({
  selector: 'app-wizard-step-bar',
  templateUrl: './wizard-step-bar.component.html',
  styleUrls: ['./wizard-step-bar.component.css']
})
export class WizardStepBarComponent implements OnInit {

  @Input()
  Steps: WizardStep[];
  @Input()
  SelectedStepId: string;


  @Output()
  OnAddStepClick: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  OnRemoveStepClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  OnStepClick: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
    this.Steps = [];
  }

  ngOnInit() {

  }

  onStepLinkClicked(stepId: string) {
    this.SelectedStepId = stepId;
    this.OnStepClick.emit(stepId);
  }

  onRemoveStepClicked(stepId: string) {
    this.OnRemoveStepClick.emit(stepId);
  }

  onAddStepClicked() {
    this.OnAddStepClick.emit();
  }

}
