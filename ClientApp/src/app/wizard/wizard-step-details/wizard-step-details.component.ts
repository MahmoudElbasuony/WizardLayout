import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { WizardStep } from '../../models/wizard-step.model';
import { WizardStepItem } from '../../models/wizard-step-item.model';
import { SimulateAsync } from '../../utilities/simulation';
import { WizardAddeditStepItemComponent } from '../wizard-addedit-step-item/wizard-addedit-step-item.component';

@Component({
  selector: 'app-wizard-step-details',
  templateUrl: './wizard-step-details.component.html',
  styleUrls: ['./wizard-step-details.component.css']
})
export class WizardStepDetailsComponent implements OnInit {

  @Input()
  public Step: WizardStep;
  public CurrentStepItem: WizardStepItem;

  @ViewChild(WizardAddeditStepItemComponent, { read: WizardAddeditStepItemComponent, static: false })
  private _addEditStepItemComponent: WizardAddeditStepItemComponent;


  constructor() {

  }

  ngOnInit() {
    this.setInitialSelectedItem();
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
      this.CurrentStepItem = { ...matchedStepItem };
    }
  }

  onRemoveStepItemClicked(stepItemId: string) {
    if (confirm(`Are you sure you want to remove this step item ?`)) {
      SimulateAsync(stepItemId, (siid) => this.onStepItemRemoved(siid));
    }
  }

  onSaveStepItemClicked() {
    const isAdd = !this.CurrentStepItem.Id;
    SimulateAsync(this.CurrentStepItem, (si) => this.onStepItemSaved(si, isAdd));
  }

  onStepItemSaved(savedStepItem: WizardStepItem, isAdd: boolean) {
    savedStepItem.Id = isAdd ? Date.now().toString() : savedStepItem.Id;
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

  private onStepItemRemoved(stepItemId: string) {
    const { matchedStepItem, matchedStepItemIndex } = this.getLocalStepItemInfo(stepItemId);
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
    } else {
      this.onAddItemClicked();
    }
  }

  private getLocalStepItemInfo(stepItemId: string) {
    const matchedStepItem = this.Step.Items.find(s => s.Id === stepItemId);
    const matchedStepItemIndex = this.Step.Items.indexOf(matchedStepItem);
    return { matchedStepItem, matchedStepItemIndex };
  }

}
