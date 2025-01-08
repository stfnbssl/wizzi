/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\crypto\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
// VIA var randomstring = require("randomstring")
var Hashids = require("hashids");
if (Hashids.__esModule == true) {
    Hashids = Hashids.default;
}
// loog 'Hashids', Hashids
var crypto = require('crypto');
// Must be 256 bytes (32 characters)
var ENCRYPTION_KEY = process.env.PROCESS_ENCRYPTION_KEY || "C9jM6ONATgsd1W30g6T8N3elW7sgHF4q";
// loog 'crypto/endec.ENCRYPTION_KEY', ENCRYPTION_KEY
// For AES, this is always 16
var IV_LENGTH = 16;
// simple
var hashids = new Hashids("im Anfang toll");
function encrypt(text) {
    var iv = crypto.randomBytes(IV_LENGTH);
    var cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([
        encrypted, 
        cipher.final()
    ])
    ;
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decrypt(text) {
    var textParts = text.split(':');
    var iv = new Buffer(textParts.shift(), 'hex');
    var encryptedText = new Buffer(textParts.join(':'), 'hex');
    var decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([
        decrypted, 
        decipher.final()
    ])
    ;
    return decrypted.toString();
}
function encryptSimple(text) {
    var hex = Buffer(text).toString('hex');
    return hashids.encodeHex(hex);
}
function decryptSimple(text) {
    var decodedHex = hashids.decodeHex(text);
    return Buffer(decodedHex, 'hex').toString('utf8');
}
module.exports = {
    decrypt: decrypt, 
    encrypt: encrypt, 
    decryptSimple: decryptSimple, 
    encryptSimple: encryptSimple
 };