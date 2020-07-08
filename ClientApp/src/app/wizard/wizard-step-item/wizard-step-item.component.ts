import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WizardStepItem } from '../../models/wizard-step-item.model';

@Component({
  selector: 'app-wizard-step-item',
  templateUrl: './wizard-step-item.component.html',
  styleUrls: ['./wizard-step-item.component.css']
})
export class WizardStepItemComponent implements OnInit {

  @Input()
  StepItem: WizardStepItem;
  @Input()
  ShowRemoveButton: boolean;
  @Input()
  RemoveButtonTooltip: string;

  @Output()
  RemoveItemLinkClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  ItemLinkClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onRemoveItemClick(event: Event) {
    if (this.ShowRemoveButton) {
      this.RemoveItemLinkClick.emit(this.StepItem.Id);
    }
    event.stopPropagation();
  }

  onItemClick() {
    this.ItemLinkClick.emit(this.StepItem.Id);
  }
}
