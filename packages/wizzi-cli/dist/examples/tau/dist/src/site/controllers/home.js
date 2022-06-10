/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\site\controllers\home.js.ittf
    utc time: Fri, 19 Feb 2021 10:35:17 GMT
*/
'use strict';
import { Router } from 'express';
export class HomeController {
    path = '';
    router = Router();
    initialize(initValues) {
        this.router.get(`/`, this.home);
    }
    home(request, response, next) {
        response.render('home/index.html.ittf', {
            title: 'Site Home'
        })
    }
}
