export interface LinkStorage {
    write(key: string, data: string): Promise<void>;
    read(key: string): Promise<string | null>;
    remove(key: string): Promise<void>;
}
//# sourceMappingURL=link-storage.d.ts.map