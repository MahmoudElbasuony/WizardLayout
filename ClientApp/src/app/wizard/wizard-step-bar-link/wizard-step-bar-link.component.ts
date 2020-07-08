import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityMode } from 'src/app/models/enums';

@Component({
  selector: 'app-wizard-step-bar-link',
  templateUrl: './wizard-step-bar-link.component.html',
  styleUrls: ['./wizard-step-bar-link.component.css']
})
export class WizardStepBarLinkComponent implements OnInit {

  @Input()
  Id: string;
  @Input()
  Title: string;
  @Input()
  TooltipText: string;
  @Input()
  ShowRemoveButton: boolean;
  @Input()
  RemoveButtonTooltip: string;

  @Output()
  StepLinkClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  RemoveStepLinkClick: EventEmitter<string> = new EventEmitter<string>();


  constructor() {

  }

  ngOnInit() {
  }

  onStepClick() {
    this.StepLinkClick.emit(this.Id);
  }

  onRemoveStepClick(event: Event) {
    if (this.ShowRemoveButton) {
      this.RemoveStepLinkClick.emit(this.Id);
    }
    event.stopPropagation();
  }

}
