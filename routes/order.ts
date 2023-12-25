import {Router, Request, Response} from 'express'
import { CookieMakerApp } from '..';
import { MyRouter } from '../types/my-router';

class OrderRouter implements MyRouter {
    readonly urlPrefix = '/order';
    readonly router: Router = Router();
    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/summary', this.sumary);
        this.router.get('/thanks', this.thanks);
    }

    sumary = (req: Request, res: Response) => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };

    thanks = (req: Request, res: Response) => {
        const {sum} = this.cmapp.getCookieSettings(req);

        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            });
    }
}

export {OrderRouter};
