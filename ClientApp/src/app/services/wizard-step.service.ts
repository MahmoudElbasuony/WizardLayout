import { Injectable, Inject } from '@angular/core';
import { BaseDataFetchService } from './base-data-fetch-service';
import { HttpClient } from '@angular/common/http';
import { WizardStep } from '../models/wizard-step.model';
import { Observable } from 'rxjs';

@Injectable()
export class WizardStepService extends BaseDataFetchService {

    private path: string;

    constructor(http: HttpClient, @Inject('BASE_URL') BASE_URL: string) {
        super(http, BASE_URL);
        this.path = `${this.baseUrl}` + 'WizardStep/';
    }

    getStep(stepId: string) {
        return this.get<WizardStep>(this.path, stepId);
    }

    getSteps() {
        return this.getAll<WizardStep>(this.path);
    }

    createStep(title) {
        return this.create<WizardStep>(this.path, { Title: title });
    }

    deleteStep(stepId: string) {
        return this.delete<any>(this.path, stepId);
    }
}
