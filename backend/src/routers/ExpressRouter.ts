import express, { NextFunction, Request, Response, Router } from "express";
import AppRouter from "./AppRouter";

const router = express.Router();

class ExpressRouter implements AppRouter {
  private router: Router;

  routerName: string;

  private middlewares: Array<any> = [];

  constructor(routerName: string, middlewares: Array<any>) {
    this.router = router;
    this.routerName = routerName;
    this.middlewares = middlewares;
  }

  get(
    url: string,
    middleWares: Array<any> = [],
    callBack: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    this.router.get(
      url,
      [...this.middlewares, ...middleWares.map(this.catchAsync)],
      this.catchAsync(callBack)
    );
  }

  post(
    url: string,
    middleWares: Array<any> = [],
    callBack: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    this.router.post(
      url,
      [...this.middlewares, ...middleWares.map(this.catchAsync)],
      this.catchAsync(callBack)
    );
  }

  put(
    url: string,
    middleWares: Array<any> = [],
    callBack: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    this.router.put(
      url,
      [...this.middlewares, ...middleWares.map(this.catchAsync)],
      this.catchAsync(callBack)
    );
  }

  private catchAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(async (e) => {
        next(e);
      });
    };
  }

  getRoute() {
    return this.router;
  }
}

export default ExpressRouter;
