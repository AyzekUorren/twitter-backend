export class CreateMigrationDto {
    readonly count: number;
    readonly last: Date;
    readonly currentVersion: string;
}
