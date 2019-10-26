import { NextFunction, Request, Response, Router } from 'express';
import { IResponse, ERROR_CODE } from '../interface/Define';
import APIController from '../contoller/APIController';
​
export class APIRouter {
    public router: Router;
​
    constructor() {
        this.router = Router();
        this.routes();
    }
​
    private async routes(): Promise<void> {
        this.router.get('/articles', this.test);
    }
​
    private async test(request: Request, response: Response, next: NextFunction): Promise<void> {
        const responseData: IResponse<any> = { success: ERROR_CODE.SUCCESS, error: ERROR_CODE.SUCCESS, result: {} };
        
        const testResult: Array<any> = new APIController().test();
        responseData.result.articles = testResult;

        response.send(responseData);
    }
}