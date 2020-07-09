import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { WizardStep } from '../../models/wizard-step.model';
import { WizardStepItem } from '../../models/wizard-step-item.model';
import { WizardAddeditStepItemComponent } from '../wizard-addedit-step-item/wizard-addedit-step-item.component';
import { WizardStepItemService } from '../../services/wizard-step-item.service';

@Component({
  selector: 'app-wizard-step-details',
  templateUrl: './wizard-step-details.component.html',
  styleUrls: ['./wizard-step-details.component.css']
})
export class WizardStepDetailsComponent implements OnChanges, OnInit {

  @Input()
  public Step: WizardStep;
  public CurrentStepItem: WizardStepItem;

  @ViewChild(WizardAddeditStepItemComponent, { read: WizardAddeditStepItemComponent, static: false })
  private _addEditStepItemComponent: WizardAddeditStepItemComponent;


  constructor(private stepItemService: WizardStepItemService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setInitialSelectedItem();
  }

  ngOnInit() {

  }

  onAddItemClicked() {
    const newStepItem: WizardStepItem = new WizardStepItem('', '');
    this.Step.Items.push(newStepItem);
    if (this._addEditStepItemComponent) {
      this._addEditStepItemComponent.resetSaveForm();
    }
    this.CurrentStepItem = newStepItem;
  }

  onItemClicked(stepItemId: string) {
    const { matchedStepItem } = this.getLocalStepItemInfo(stepItemId);
    if (matchedStepItem) {
      if (this._addEditStepItemComponent) {
        this._addEditStepItemComponent.resetSaveForm();
      }
      setTimeout(() => { this.CurrentStepItem = { ...matchedStepItem }; }, 0);
    }
  }

  onRemoveStepItemClicked(stepItemId: string) {
    if (confirm(`Are you sure you want to remove this step item ?`)) {
      this.stepItemService.deleteStepItem(stepItemId).subscribe((si) => this.onStepItemRemoved(si));
    }
  }

  onSaveStepItemClicked() {
    const isAdd = !this.CurrentStepItem.Id;
    if (isAdd) {
      this.stepItemService.createStepItem(this.Step.Id, this.CurrentStepItem).subscribe((si) => this.onStepItemSaved(si, isAdd));
    } else {
      this.stepItemService.updateStepItem(this.CurrentStepItem).subscribe((si) => this.onStepItemSaved(si, isAdd));
    }
  }

  onStepItemSaved(savedStepItem: WizardStepItem, isAdd: boolean) {

    if (isAdd) {
      this.Step.Items.push(savedStepItem);
    }

    const { matchedStepItem, matchedStepItemIndex } = this.getLocalStepItemInfo(savedStepItem.Id);
    if (matchedStepItemIndex >= 0) {
      // update required properities 
      matchedStepItem.Id = savedStepItem.Id;
      matchedStepItem.Name = savedStepItem.Name;
      matchedStepItem.Title = savedStepItem.Title;
      matchedStepItem.Description = savedStepItem.Description;
      alert(`Step item : ${matchedStepItem.Name} has been ${isAdd ? 'saved' : 'updated'} successfully .`);
      this.CurrentStepItem = null;

    }
  }

  private onStepItemRemoved(stepItem: WizardStepItem) {
    const { matchedStepItem, matchedStepItemIndex } = this.getLocalStepItemInfo(stepItem.Id);
    if (matchedStepItemIndex >= 0) {
      if (matchedStepItem.Id === this.CurrentStepItem.Id) {
        this.CurrentStepItem = null;
      }
      this.Step.Items.splice(matchedStepItemIndex, 1);
      alert(`Step item : ${matchedStepItem.Name} has been removed .`);
    }
  }

  private setInitialSelectedItem() {
    if (this.Step.Items.length > 0) {
      this.CurrentStepItem = { ...this.Step.Items[0] };
    }
  }

  private getLocalStepItemInfo(stepItemId: string) {
    const matchedStepItem = this.Step.Items.find(s => s.Id === stepItemId);
    const matchedStepItemIndex = this.Step.Items.indexOf(matchedStepItem);
    return { matchedStepItem, matchedStepItemIndex };
  }

}
