import { Injectable, Inject } from '@angular/core';
import { BaseDataFetchService } from './base-data-fetch-service';
import { HttpClient } from '@angular/common/http';
import { WizardStepItem } from '../models/wizard-step-item.model';

@Injectable()
export class WizardStepItemService extends BaseDataFetchService {

    private path: string;

    constructor(http: HttpClient, @Inject('BASE_URL') BASE_URL: string) {
        super(http, BASE_URL);
        this.path = `${this.baseUrl}` + 'WizardStepItem/';
    }

    getStepItem(stepItemId: string) {
        return this.get<WizardStepItem>(this.path, stepItemId);
    }

    createStepItem(stepId: string, stepItem: WizardStepItem) {
        return this.create<WizardStepItem>(`${this.path}${stepId}/`, stepItem);
    }

    updateStepItem(stepItem: WizardStepItem) {
        return this.update<WizardStepItem>(this.path, stepItem.Id, stepItem);
    }

    deleteStepItem(stepItemId: string) {
        return this.delete<any>(this.path, stepItemId);
    }

}