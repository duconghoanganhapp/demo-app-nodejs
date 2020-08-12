import { Request, Response, NextFunction } from 'express';
import url from 'url';
// TODO: middlewares
// Redirect login page if not logged
const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    var urlCurrent = url.format({
        pathname: req.originalUrl
      });
    if(req.isAuthenticated()) {
        return next();
    }
    
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/auth/login?url=' + urlCurrent);
}
// Redirect dashboard page if logged
const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('back');      
}

export {
    ensureAuthenticated, forwardAuthenticated
}