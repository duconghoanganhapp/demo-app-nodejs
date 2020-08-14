npm i -S (--save)
npm i -D (--save-dev)
<!-- run migrations -->
npx sequelize-cli db:migrate
<!-- create a migration -->
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
<!-- create a migration empty -->
npx sequelize-cli migration:generate --name action-table 

<!-- rollback -->
npx sequelize-cli db:migrate:undo

<!-- Packages reference -->
"dependencies": {
    "@isk/isk-api-client-jwt": "0.0.4-alpha.15",
    "admin-lte": "^2.4.18",
    "aws-sdk": "^2.580.0",
    "big.js": "^5.2.2",
    "body-parser": "^1.18.3",
    "bootstrap": "^4.3.1",
    "connect-redis": "^3.4.2",
    "csv-stringify": "^5.0.0",
    "debug": "^3.2.6",
    "ejs": "^2.6.1",
    "exceljs": "^1.7.0",
    "express": "^4.16.4",
    "express-ejs-layouts": "^2.5.0",
    "express-session": "^1.15.6",
    "express-validator": "^5.3.0",
    "http-status": "^1.3.1",
    "iconv-lite": "^0.5.0",
    "lodash": "^4.17.15",
    "moment": "^2.22.2",
    "moment-timezone": "^0.5.23",
    "multer": "^1.4.1",
    "puppeteer": "^1.12.2",
    "qs": "^6.6.0",
    "serve-favicon": "^2.5.0",
    "tempfile": "^3.0.0",
    "xlsx-populate": "^1.20.1"
  },
  "devDependencies": {
    "@types/big.js": "^4.0.5",
    "@types/connect-redis": "0.0.10",
    "@types/csv-stringify": "^1.4.2",
    "@types/debug": "0.0.31",
    "@types/ejs": "^2.6.0",
    "@types/exceljs": "^0.5.3",
    "@types/express": "^4.16.0",
    "@types/express-ejs-layouts": "^2.3.1",
    "@types/express-session": "^1.15.11",
    "@types/iconv-lite": "0.0.1",
    "@types/lodash": "^4.14.137",
    "@types/moment-timezone": "^0.5.12",
    "@types/multer": "^1.3.7",
    "@types/node": "^10.12.19",
    "@types/puppeteer": "^1.12.2",
    "@types/qs": "^6.5.1",
    "@types/serve-favicon": "^2.2.30",
    "@types/tempfile": "^3.0.0",
    "ejs-lint": "^0.3.0",
    "mocha": "^6.1.4",
    "nyc": "^14.0.0",
    "tslint": "^5.11.0",
    "tslint-microsoft-contrib": "^5.2.1",
    "typescript": "^3.1.5"
  },

<!-- Reference source ts nodejs -->
https://github.com/microsoft/TypeScript-Node-Starter/tree/master/src
https://github.com/mwanago/express-typescript
https://github.com/ahmerb/typescript-sequelize-example

<!-- References -->
https://viblo.asia/p/imports-va-exports-trong-javascript-es6-6J3ZgjyAKmB
https://gorrion.io/blog/node-express-js-typescript-sequelize
https://grokonez.com/node-js/sequelize-orm-build-crud-restapis-with-nodejs-express-sequelize-mysql
https://viblo.asia/p/giu-cho-code-sach-dep-voi-eslint-3Q75wkxG5Wb
https://viblo.asia/p/toi-uu-ma-nguon-javascript-voi-eslint-LzD5dDzw5jY

<!-- StackOverFlow - GitHub (questions)-->
https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file
https://github.com/visionmedia/express-messages/issues/11
  
<!-- learning Object -->
https://viblo.asia/p/mot-so-ham-javascript-huu-ich-ve-array-va-object-bWrZnggOlxw
<!-- Structure folder views -->
<!-- passport -->
<!-- passport.initialize : middleware được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
passport.session: middleware sử dụng kịch bản Passport , sử dụng session lấy thông tin user rồi gắn vào req.user.
passport.deserializeUser : hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
passport.authenticate: middleware giúp ta gắn kịch bản local vào route.
passport.serializeUser: hàm được gọi khi xác thực thành công để lưu thông tin user vào session
Với từng request passport gắn thêm cho bạn 4 hàm :
req.login()
req.logout()
req.isAuthenticated()
req.isUnauthenticated() -->
https://docs.google.com/spreadsheets/d/1AUIU2kexRHrYPlZmRLY1JgEiDDhzn_4KFVV4qVCIYYA/edit#gid=0
https://viblo.asia/p/su-dung-lodash-trong-du-an-javascript-ZjleawxRvqJ
https://viblo.asia/p/mot-so-luu-y-de-de-ung-dung-nodejs-an-toan-hon-3P0lPnLoKox
https://medium.com/javascript-in-plain-english/how-to-validate-file-type-when-uploading-files-to-express-apps-2c54525eb0b3
https://anonystick.com/blog-developer/3-middleware-huu-ich-khi-su-dung-express-rest-api-2019112318055877.jsx
https://viblo.asia/p/summernote-mot-editor-library-don-gian-de-su-dung-va-tich-hop-cho-ung-dung-cua-ban-924lJWRW5PM
https://www.codota.com/code/javascript/functions/fs/renameSync
https://github.com/muhozi/summernote-nodejs
<!-- socketio -->
https://socket.io/docs/#Installing
<!-- icon -->
https://www.npmjs.com/package/node-emoji
https://github.com/mervick/emojionearea
<!-- nodejs  -->
https://medium.com/@giangcoffee/event-loop-l%C3%A0-g%C3%AC-v%C3%A0-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-th%E1%BA%BF-n%C3%A0o-d52caa908090