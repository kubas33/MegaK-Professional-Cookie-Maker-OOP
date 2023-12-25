import * as express from 'express';
import { Router } from 'express';
import { CookieMakerApp } from '../index';
import { MyRouter } from '../types/my-router';

class HomeRouter implements MyRouter {
    readonly urlPrefix = '/';
    readonly router: Router = Router();
    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    private setUpRoutes() {
        this.router.get('/', this.home);
    }

    private home = (req: express.Request, res: express.Response) => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('home/index', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };
}

export {HomeRouter};
