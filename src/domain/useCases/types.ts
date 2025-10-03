
export interface AppContext {

}

export interface RequestContext {
    app: AppContext,
}

export class ValidationResults {
    static OK: ValidationResults
    
    constructor(public success: boolean) {}
}

ValidationResults.OK = new ValidationResults(true)

export interface PaginationMetadata {
    total: number,
    page: number,
    pageSize: number
}

export interface UseCaseResponse<T> {
    meta?: {
        pagination?: PaginationMetadata,
        warnings?: any[]
    },
    data: T,
}

export interface UseCase<Req, Res>  {
    parseAndValidateRequest(rc: RequestContext, data: any): [ValidationResults, Req]
    isAuthorized(rc: RequestContext, cur: Req): boolean
    execute(rc: RequestContext, cur: Req): UseCaseResponse<Res>
}

