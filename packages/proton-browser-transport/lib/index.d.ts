import { LinkSession, LinkStorage, LinkTransport } from 'anchor-link';
import { SigningRequest } from 'eosio-signing-request';
export interface BrowserTransportOptions {
    /** CSS class prefix, defaults to `anchor-link` */
    classPrefix?: string;
    /** Whether to inject CSS styles in the page header, defaults to true. */
    injectStyles?: boolean;
    /** Whether to display request success and error messages, defaults to true */
    requestStatus?: boolean;
    /** Local storage prefix, defaults to `anchor-link`. */
    storagePrefix?: string;
    /** Requesting account of the dapp (optional) */
    requestAccount?: string;
}
export default class BrowserTransport implements LinkTransport {
    readonly options: BrowserTransportOptions;
    storage: LinkStorage;
    constructor(options?: BrowserTransportOptions);
    private classPrefix;
    private injectStyles;
    private requestStatus;
    private requestAccount;
    private activeRequest?;
    private activeCancel?;
    private containerEl;
    private requestEl;
    private styleEl?;
    private countdownTimer?;
    private closeTimer?;
    private closeModal;
    private setupElements;
    private createEl;
    private hide;
    private show;
    private displayRequest;
    showLoading(): Promise<void>;
    onRequest(request: SigningRequest, cancel: (reason: string | Error) => void): void;
    onSessionRequest(session: LinkSession, request: SigningRequest, cancel: (reason: string | Error) => void): void;
    private clearTimers;
    onSuccess(request: SigningRequest): void;
    onFailure(request: SigningRequest, error: Error): void;
}
