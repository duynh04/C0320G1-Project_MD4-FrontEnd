// Creator: Cường
export interface Page<T> {
    content : T[];
    pageable : any;
    last : boolean;
    totalPages : number;
    totalElements : number;
    size : number;
    number : number;
    sort : any;
    numberOfElements : number;
    first : boolean;
    empty : boolean;
}