/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\site\index.ts.ittf
    utc time: Thu, 22 Jul 2021 16:33:13 GMT
*/
import {ControllerType} from '../features/app';
import {HomeController} from './controllers/home';
import {ProductionsController} from './controllers/productions';
const siteControllers: ControllerType[] = [
    new HomeController(), 
    new ProductionsController()
];
export {siteControllers};
