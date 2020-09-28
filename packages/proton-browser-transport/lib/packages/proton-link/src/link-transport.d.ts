import { SigningRequest } from '@protonprotocol/proton-signing-request';
import { TransactResult } from './link';
import { LinkSession } from './link-session';
import { LinkStorage } from './link-storage';
export interface LinkTransport {
    onRequest(request: SigningRequest, cancel: (reason: string | Error) => void): void;
    onSuccess?(request: SigningRequest, result: TransactResult): void;
    onFailure?(request: SigningRequest, error: Error): void;
    onSessionRequest?(session: LinkSession, request: SigningRequest, cancel: (reason: string | Error) => void): void;
    storage?: LinkStorage;
    prepare?(request: SigningRequest, session?: LinkSession): Promise<SigningRequest>;
    showLoading?(): void;
}
//# sourceMappingURL=link-transport.d.ts.map