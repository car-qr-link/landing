import { Request } from "express";

export class HtmxHeaders {
    public readonly boosted?: boolean;
    public readonly currentUrl?: string;
    public readonly historyRestoreRequest?: boolean;
    public readonly prompt?: boolean;
    public readonly request: boolean;
    public readonly target?: string;
    public readonly triggerName?: string;
    public readonly trigger?: string;

    constructor(request: Request) {
        this.boosted = request.headers['hx-boosted'] === 'true';
        this.currentUrl = request.headers['hx-current-url'] as (string | undefined);
        this.historyRestoreRequest = request.headers['hx-history-restore-request'] === 'true';
        this.prompt = request.headers['hx-prompt'] === 'true';
        this.request = request.headers['hx-request'] === 'true';
        this.target = request.headers['hx-target'] as (string | undefined);
        this.triggerName = request.headers['hx-trigger-name'] as (string | undefined);
        this.trigger = request.headers['hx-trigger'] as (string | undefined);
    }
}