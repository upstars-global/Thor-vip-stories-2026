export interface IChip<T extends string = string> {
    label: string;
    name: T;
    dataTest?: string;
}
