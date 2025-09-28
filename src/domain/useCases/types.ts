
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

export interface UseCase<Req, Res>  {
    validateRequest(rc: RequestContext, cur: Req): ValidationResults
    isAuthorized(rc: RequestContext, cur: Req): boolean
    parseRequest(data: any): Req
    execute(rc: RequestContext, cur: Req): Res
}

