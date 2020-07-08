import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-wizard-step-paging',
  templateUrl: './wizard-step-paging.component.html',
  styleUrls: ['./wizard-step-paging.component.css']
})
export class WizardStepPagingComponent implements OnInit, OnChanges {

  @Input()
  StepsCount: number;
  @Input()
  CurrentStepIndex = -1;

  @Output()
  OnPreviousClick: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  OnNextClick: EventEmitter<number> = new EventEmitter<number>();

  public get IsPreviousEnabled() {
    return this.CurrentStepIndex > 0;
  }

  public get IsNextEnabled() {
    return this.CurrentStepIndex < this.StepsCount - 1;
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.StepsCount === 0) {
    //   this.CurrentStepIndex = -1;
    // } else {
    //   this.CurrentStepIndex = 0;
    // }
  }

  ngOnInit() {

  }


  onNextClick() {
    if (this.CurrentStepIndex + 1 < this.StepsCount) {
      this.CurrentStepIndex++;
      this.OnNextClick.emit(this.CurrentStepIndex);
    }
  }

  onPreviousClick() {
    if (this.CurrentStepIndex - 1 > -1) {
      this.CurrentStepIndex--;
      this.OnPreviousClick.emit(this.CurrentStepIndex);
    }
  }



}
