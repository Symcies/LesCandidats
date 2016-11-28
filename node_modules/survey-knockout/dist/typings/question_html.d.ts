// Type definitions for Survey JavaScript library v0.10.1
// Project: http://surveyjs.org/
// Definitions by: Andrew Telnov <https://github.com/andrewtelnov/>

import { QuestionBase } from "./questionbase";
export declare class QuestionHtmlModel extends QuestionBase {
    name: string;
    private htmlValue;
    constructor(name: string);
    getType(): string;
    html: string;
    processedHtml: string;
}
