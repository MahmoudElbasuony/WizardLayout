import { WizardStepItem } from './wizard-step-item.model';
export class WizardStep {

    public Id: string;
    public Items: WizardStepItem[];

    constructor(public Title: string) {
        this.Items = [];
    }
}