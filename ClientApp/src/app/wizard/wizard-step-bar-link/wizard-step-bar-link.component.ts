import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input()
  SelectedStepId : string;

  @Output()
  StepLinkClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  RemoveStepLinkClick: EventEmitter<string> = new EventEmitter<string>();

  public get IsActive(){
    return this.Id === this.SelectedStepId;
  }

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
