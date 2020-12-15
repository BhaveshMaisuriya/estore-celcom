# MyTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. Alternatively you can use `ng g c component-name` as a short hand.
As we are not using test cases at the moment, you can omit the creation of spec file using `ng g c component-name --spec false` option.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
Run directly `ng serve` to build and run the project in single command.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Dos and Don'ts before start coding

1. Dont use window or document or localStorage directly. Either use isPlatformBrowser method from '@angular/common" or use if(typeof window !== undefined) before doing window.something.
2. Above rule is applicable for document and localstorage too. Make sure you check if(localStorage) or if(typeof document !== undefined) before using it.
3. Avoid using hammer.js - Try a work around for this.

## Environment settings (environment.json)
1. `apiUrl` & `nodeUrl` is for Drupal server (Celcom portal). For local, we are pointing to UAT server;
2. `eStoreUrl` is pointing to Magento server.
3. `eStoreFrontEndUrl` is mainly used to point to angular server for estore.
4. Other external URLs are `paymentGateWayLink`, `mobileConnectUrl` and `apiGateWayUrl`.

## Development Environment

Follow below steps during your development:
1. In "app.service.js" uncomment line no 11 and comment line no 12. `host` string should point to your `localhost` in local.
2. Open 2 command prompts (cmd) and navigate to `celcom_estore_frontend` folder.
3. Run `npm run start:dynamic` in one cmd propmt. To stop use `ctrl + c` command.
4. Run `ng serve` in another. To stop use `ctrl + c` command.
5. In case, `ng serve` doesn't work in cmd, open node command prompt and navigate to `celcom_estore_frontend` folder and run the command `ng serve`.
6. After each component creation, you need to restart both node and angular servers (step #2 to #5 above).
7. Any changes in node server files, you need to restart node.
8. Any changes to angular files, no need to restart, as webpack gets regenrated once you save.
9. While debugging in IE in local, set `__Zone_enable_cross_context_check` in `polyfill.ts` to `true` (line 62). Comment it before committing. Otherwise, it may lead to performance issues in non-local environments.

## Referrence for angular universal 
https://angular.io/guide/universal

## Redis
Redis is not supported in windows. Please make isRedisCacheEnabled as always false in environment.json in local

To remove node js error for redis in local in webpack.server.config.js comment line no 15, and uncomment line no 17 and 18.

Revert the above changes while commiting the code.

## Dynamic Data From Redis
To insert dynamic data into Redis Follow Below commands.
  We are Using Redis DB 1 for dynamic configurations.
  
1. Select DB 1.
    > select 1
2. For Adobe Configuration execute below command in Redis CLI.
    > HMSET adobeUrl type 'header_script' value '<script src="https://assets.adobedtm.com/launch-ENe7577517d75c4a789c62a6cb4dc09681-staging.min.js"></script>'

3.  FOr WSO2 Enable
    > SET isWSO2 true

## Queue IT Device Details Page URL's

1. Select DB 0.
    > select 0

2. To add Queue IT URL's Execute Below Command in Redis CLI.
    > SADD quiet:urls /device-detail/HuaweiP20Pro /device-detail/Samsung-Galaxy-S9-plus

## YARN
## YARN local first setup
npm install
npm i -g yarn && npm i --save yarn && yarn --version  

## YARN first time setup server  
npm i -g yarn    
yarn --version 
yarn install

## YARN  second time run in server  
yarn install 
npm prune
