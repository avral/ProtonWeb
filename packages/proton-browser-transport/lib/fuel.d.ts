import { LinkSession } from '@protonprotocol/proton-link';
import { SigningRequest } from '@protonprotocol/proton-signing-request';
export declare function fuel(request: SigningRequest, session: LinkSession, updatePrepareStatus: (message: string) => void): Promise<SigningRequest>;
