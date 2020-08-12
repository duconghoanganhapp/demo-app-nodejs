import { Request } from 'express';
import { STATUS_RESPONSE } from './constants';

export const success = (req: Request, message: string) => {
    let status: any = STATUS_RESPONSE.success;
    req.flash('status', status);
    req.flash('message', message);
}

export const error = (req: Request, message: string) => {
    let status: any = STATUS_RESPONSE.error;
    req.flash('status', status);
    req.flash('message', message);
}

export const warning = (req: Request, message: string) => {
    let status: any = STATUS_RESPONSE.waring;
    req.flash('status', status);
    req.flash('message', message);
}