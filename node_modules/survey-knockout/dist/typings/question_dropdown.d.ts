// Type definitions for Survey JavaScript library v0.10.1
// Project: http://surveyjs.org/
// Definitions by: Andrew Telnov <https://github.com/andrewtelnov/>

import { QuestionSelectBase } from "./question_baseselect";
export declare class QuestionDropdownModel extends QuestionSelectBase {
    name: string;
    private optionsCaptionValue;
    constructor(name: string);
    optionsCaption: string;
    getType(): string;
    supportGoNextPageAutomatic(): boolean;
}
