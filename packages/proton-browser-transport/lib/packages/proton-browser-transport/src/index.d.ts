import { LinkSession, LinkStorage, LinkTransport } from '@protonprotocol/proton-link';
import { SigningRequest } from '@protonprotocol/proton-signing-request';
export interface BrowserTransportOptions {
    classPrefix?: string;
    injectStyles?: boolean;
    requestStatus?: boolean;
    storagePrefix?: string;
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
//# sourceMappingURL=index.d.ts.map