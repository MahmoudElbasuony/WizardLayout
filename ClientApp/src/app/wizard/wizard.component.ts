import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WizardStep } from '../models/wizard-step.model';
import { SimulateAsync } from '../utilities/simulation';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  public Steps: WizardStep[];
  public CurrentStep: WizardStep;
  public get CurrentStepIndex() {
    return this.Steps.indexOf(this.CurrentStep);
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.Steps = [];
  }

  ngOnInit() {
  }

  onAddStepClicked() {

    const defaultStepName = `Step ${Date.now()}`;
    const stepName = prompt('Enter Step Name', defaultStepName);

    if (!this.validateEarlyStepIntialization(stepName)) {
      return;
    }

    this.initiateNewStep(stepName);
  }

  onRemoveStepClicked(stepId: string) {
    if (confirm(`Are you sure you want to remove this step ?`)) {
      SimulateAsync(stepId, (sid) => this.onStepRemoved(sid));
    }
  }


  onStepClicked(stepId: string) {
    const { matchedStep } = this.getLocalStepInfo(stepId);
    if (matchedStep) {
      this.CurrentStep = matchedStep;
    }
  }

  onStepPageClicked(stepIndex: number) {
    const step = this.Steps[stepIndex];
    this.CurrentStep = step;
  }


  private initiateNewStep(stepName: string) {
    const newStep = new WizardStep(stepName);
    newStep.Id = Date.now().toString();
    this.Steps.push(newStep);
    this.CurrentStep = newStep;
  }


  private onStepRemoved(stepId: string) {
    const { matchedStep, matchedStepIndex } = this.getLocalStepInfo(stepId);
    if (matchedStepIndex >= 0) {
      if (matchedStep === this.CurrentStep) {
        this.CurrentStep = null;
      }
      this.Steps.splice(matchedStepIndex, 1);
      alert(`Step : ${matchedStep.Title} has been removed .`);
    }


  }

  private getLocalStepInfo(stepId) {
    const matchedStep = this.Steps.find(s => s.Id === stepId);
    const matchedStepIndex = this.Steps.indexOf(matchedStep);
    return { matchedStep, matchedStepIndex };
  }

  private validateEarlyStepIntialization(stepName: string): boolean {
    if (!(stepName && stepName.trim())) {
      alert(`Step Name Can't Be Empty , Try Again.`);
      return false;
    }
    return true;
  }



}
