/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\validations.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
export const validatePackiName = (name: string) => 

    name ? /^[a-z_\-\.\d\s]+$/i.test(name) ? null : new Error('Name can only contain letters, numbers, space, hyphen (-), dot (.) and underscore (_).') : new Error('Name cannot be empty.')
;
