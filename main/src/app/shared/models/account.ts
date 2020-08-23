export interface Account {
    [prop: string]: any;
    id: number ;
    password: string ;
    question: string ;
    answer: string ;
    userId: bigint ;
    roleId: bigint ;
    reasonBan: string ;
    status: boolean ;
}
