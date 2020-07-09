import { Component, OnInit, Inject } from '@angular/core';
import { WizardStep } from '../models/wizard-step.model';
import { SimulateAsync } from '../utilities/simulation';
import { WizardStepService } from '../services/wizard-step.service';

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

  constructor(private stepService: WizardStepService) {
    this.Steps = [];
  }

  ngOnInit() {
    this.stepService.getSteps().subscribe(steps => this.Steps = steps);
  }

  onAddStepClicked() {

    const defaultStepName = `Step ${Date.now()}`;
    const stepName = prompt('Enter Step Name', defaultStepName);

    if (!this.validateEarlyStepIntialization(stepName)) {
      return;
    }

    this.stepService.createStep(stepName).subscribe(s => {
      this.Steps.push(s);
      this.CurrentStep = s;
    });

  }

  onRemoveStepClicked(stepId: string) {
    if (confirm(`Are you sure you want to remove this step ?`)) {
      this.stepService.deleteStep(stepId).subscribe(s => this.onStepRemoved(s));
    }
  }


  onStepClicked(stepId: string) {
    this.stepService.getStep(stepId).subscribe(s => this.onStepInfoReterived(s));
  }

  onStepPageClicked(stepIndex: number) {
    const step = this.Steps[stepIndex];
    this.CurrentStep = step;
  }

  onStepInfoReterived(step: WizardStep) {
    const { matchedStep, matchedStepIndex } = this.getLocalStepInfo(step.Id);
    if (matchedStep) {
      matchedStep.Items = [...step.Items];
      this.CurrentStep = matchedStep;
    }
  }

  private onStepRemoved(step: WizardStep) {
    const { matchedStep, matchedStepIndex } = this.getLocalStepInfo(step.Id);
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
