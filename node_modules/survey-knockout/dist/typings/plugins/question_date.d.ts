// Type definitions for Survey JavaScript library v0.10.1
// Project: http://surveyjs.org/
// Definitions by: Andrew Telnov <https://github.com/andrewtelnov/>

import { Question } from "../question";
export default class QuestionDateModel extends Question {
    name: string;
    showOtherMonths: boolean;
    selectOtherMonths: boolean;
    showButtonPanel: boolean;
    changeMonth: boolean;
    changeYear: boolean;
    numberOfMonths: number;
    minDate: string;
    maxDate: string;
    constructor(name: string);
    getType(): string;
    getjQueryScript(selectorId: string): string;
    private getOptions();
    supportGoNextPageAutomatic(): boolean;
}
