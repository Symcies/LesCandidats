// Type definitions for Survey JavaScript library v0.10.1
// Project: http://surveyjs.org/
// Definitions by: Andrew Telnov <https://github.com/andrewtelnov/>

export declare class SurveyTemplateText {
    constructor();
    replaceText(replaceText: string, id: string, questionType?: string): void;
    protected getId(id: string, questionType: string): string;
    protected text: string;
}
