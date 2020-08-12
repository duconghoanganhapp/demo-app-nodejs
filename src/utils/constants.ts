export const PATH_UPLOAD_IMG: string = '/public/uploads/img/';
export const PATH_UPLOAD_TXT: string = '/public/uploads/txt/';
export const TMP_PATH_UPLOAD_IMG: string = '/public/tmp/';
export const DEFAULT_IMG_SIZE: number = 4*1024*1024;
export const ROLE_USER: object = {
    0: 'Super Admin',
    1: 'Admin',
    2: 'User'
}
export enum STATUS_RESPONSE {
    success = 0,
    error = 1,
    waring = 2
}
export enum TABLE_FILE {
    product = 'pro',
    articles = 'art'
}