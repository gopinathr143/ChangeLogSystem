export interface updatesRequest {
    title: string;
    type: number;
    content: string;
    createdByUserId : number;
    logId: number;
}

export interface updatesResponse extends updatesRequest {
   typeDisplay:string;
   color:string;
}


