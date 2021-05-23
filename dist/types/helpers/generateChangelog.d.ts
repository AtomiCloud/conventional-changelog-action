declare function generateStringChangelog(tagPrefix: string, preset: string, version: string, releaseCount: string, config: any): Promise<string>;
declare function generateFileChangelog(tagPrefix: string, preset: string, version: string, fileName: string, releaseCount: string, config: any): Promise<void>;
export { generateFileChangelog, generateStringChangelog };
