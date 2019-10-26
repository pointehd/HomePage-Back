import { NextFunction, Request, Response, Application } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { APIRouter } from './routers/APIRouter';

class App {
    public express: Application;
    public server: http.Server;
    public port: string | number | boolean;

    constructor() {
        this.express = express();
    }

    public async initialize(): Promise<void> {
        this.middleware();
        this.setNormalizePort(8000);
        this.routes();
    }

    public createServer(): void {
        this.express.set('port', this.port);
        this.server = http.createServer(this.express);
        this.server.listen(this.port);
    }

    private routes(): void {
        const api: APIRouter = new APIRouter();
        this.express.use('/api', api.router);
    }

    private middleware(): void {
        // this.express.use(logger('dev'));
        this.express.use('/uploads', express.static('uploads'));
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false, limit: '10mb', parameterLimit: 1000000 }));

        // CORS 문제.
        this.express.all('*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
            res.header('Access-Control-Allow-Methods', 'POST,GET');
            next();
        });
    }

    private setNormalizePort(port: number): void {
        this.port = this.normalizePort(port);
    }

    private normalizePort(val: number | string): number | string | boolean {
        const normalizedPort: number = (typeof val === "string") ? parseInt(val, 10) : val;
        if (isNaN(normalizedPort)) {
            return val;
        } else if (normalizedPort >= 0) {
            return normalizedPort;
        } else {
            return false;
        }
    }
}
export default App;