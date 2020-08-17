export interface Location {
    readonly id: number,
    readonly name: string,
    huyen?: Location[],
    xa?: Location[]
    // tinh_id?: number,
    // huyen_id?: number
}
