/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\production\api\tfolder.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/
import NodeCache from 'node-cache';
import {GetTFolderModel} from '../mongo/tfolder';
import {ITFolderModel} from '../types';
import {ValidateResult, CRUDResult} from '../../types';
import {packiTypes} from '../../packi';

const myname = 'features.production.api.tfolder';

const tfolderCache = new NodeCache({
    stdTTL: 120, 
    checkperiod: 60
 });

export async function validateTFolder(owner: string, name: string) {

    const TFolder = GetTFolderModel();
    return new Promise((resolve, reject) => {
        
            let query = { owner: owner, name: name };
            TFolder.find(query, (err, result) => {
            
                console.log(myname, 'validateTFolder', 'TFolder.find', 'error', err);
                if (err) {
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            isValid: false, 
                            message: 'tFolder already exists'
                         });
                }
                resolve({
                    isValid: true
                 })
            }
            )
        }
        );
}

export async function getListTFolder(options?: any):  Promise<CRUDResult> {

    options = options || {};
    
    console.log(myname, 'getListTFolder', 'options', options)
    
    const TFolder = GetTFolderModel();
    
    return new Promise((resolve, reject) => {
        
            
            const query = TFolder.find(options.query);
            if (options.limit) {
                query.limit(options.limit);
            }
            if (options.sort) {
                query.sort(options.sort);
            }
            query.find((err, result) => {
            
                if (err) {
                    console.log(myname, 'getListTFolder', 'TFolder.find', 'error', err);
                    return reject(err);
                }
                console.log(myname, 'getListTFolder', 'TFolder.find', 'Object.keys(result)', Object.keys(result));
                const resultItem = [];
                var i, i_items=result, i_len=result.length, item;
                for (i=0; i<i_len; i++) {
                    item = result[i];
                    const item_obj = {
                        owner: item.owner, 
                        name: item.name, 
                        description: item.description, 
                        packiFiles: item.packiFiles
                     };
                    resultItem.push(item_obj)
                }
                resolve({
                    oper: 'getList', 
                    ok: true, 
                    item: resultItem
                 })
            }
            )
        }
        );
}

export async function getTFolder(owner: string, name: string):  Promise<CRUDResult> {

    
    console.log(myname, 'getTFolder', owner, name)
    
    const TFolder = GetTFolderModel();
    
    return new Promise((resolve, reject) => {
        
            
            let query = {
                owner: owner, 
                name: name
             };
            
            TFolder.find(query, (err, result) => {
            
                if (err) {
                    console.log(myname, 'getTFolder', 'TFolder.find', 'error', err);
                    return reject(err);
                }
                if (result.length == 1) {
                    return resolve({
                            oper: 'get', 
                            ok: true, 
                            item: result[0]
                         });
                }
                resolve({
                    oper: 'get', 
                    ok: false, 
                    message: 'tFolder not found'
                 })
            }
            )
        }
        );
}

export async function createTFolder(owner: string, name: string, description: string, packiFiles: string):  Promise<CRUDResult> {

    
    console.log(myname, 'createTFolder', owner, name, description, packiFiles)
    
    const TFolder = GetTFolderModel();
    
    return new Promise((resolve, reject) => {
        
            
            let query = {
                owner: owner, 
                name: name
             };
            
            TFolder.find(query, (err, result) => {
            
                if (err) {
                    console.log(myname, 'getTFolder', 'TFolder.find', 'error', err);
                    return reject(err);
                }
                console.log(myname, 'getTFolder', 'TFolder.find', 'result', result);
                if (result.length > 0) {
                    return resolve({
                            oper: 'create', 
                            ok: false, 
                            message: 'tFolder already exists'
                         });
                }
                const newTFolder = new TFolder({
                    owner: owner, 
                    name: name, 
                    description: description, 
                    packiFiles: packiFiles, 
                    created_at: new Date(), 
                    updated_at: new Date()
                 });
                newTFolder.save(function(err, doc) {
                
                    if (err) {
                        console.log(myname, 'createTFolder', 'newTFolder.save', 'error', err);
                        return reject(err);
                    }
                    return resolve({
                            oper: 'create', 
                            ok: true, 
                            item: doc._doc, 
                            message: 'tFolder created'
                         });
                })
            }
            )
        }
        );
}

export async function updateTFolder(owner: string, name: string, description: string, packiFiles: string):  Promise<CRUDResult> {

    
    console.log(myname, 'updateTFolder', owner, name, description, packiFiles)
    
    const TFolder = GetTFolderModel();
    
    return new Promise((resolve, reject) => {
        
            
            const query = {
                owner: owner, 
                name: name
             };
            const update: any = {};
            if (typeof owner !== 'undefined') {
                update['owner'] = owner;
            }
            if (typeof name !== 'undefined') {
                update['name'] = name;
            }
            if (typeof description !== 'undefined') {
                update['description'] = description;
            }
            if (typeof packiFiles !== 'undefined') {
                update['packiFiles'] = packiFiles;
            }
            update['updated_at'] = new Date();
            
            TFolder.findOneAndUpdate(query, update, {}, (err, result) => {
            
                if (err) {
                    console.log(myname, 'updateTFolder', 'TFolder.findOneAndUpdate', 'error', err);
                    return reject(err);
                }
                
                console.log(myname, 'updateTFolder', 'TFolder.findOneAndUpdate', 'result', result);
                return resolve({
                        oper: 'update', 
                        ok: true, 
                        message: 'tFolder updated'
                     });
            }
            )
        }
        );
}

export async function getTFolderObject(owner: string, name: string) {

    return new Promise((resolve, reject) => 
        
            getTFolder(owner, name).then((result) => {
            
                if (!result.ok) {
                    return reject(result);
                }
                const tf: ITFolderModel = result.item;
                console.log('myname', 'getTFolderObject.tf', tf);
                const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                console.log('myname', 'getTFolderObject.tf_packiFiles_object', tf_packiFiles_object);
                const obj = {
                    ...tf._doc, 
                    packiFiles: tf_packiFiles_object, 
                    _id: tf._id.toString()
                 };
                console.log('myname', 'getTFolderObject', obj);
                return resolve(obj);
            }
            ).catch((err: any) => {
            
                console.log('getTFolder_withCache.getTFolder.error', err);
                return reject(err);
            }
            )
        
        );
}

export async function getTFolder_withCache(owner: string, name: string) {

    var cacheKey = owner + '|' + name;
    console.log('getTFolder_withCache.cacheKey', cacheKey);
    return new Promise((resolve, reject) => {
        
            let tfValue = tfolderCache.get(cacheKey);
            if (tfValue) {
                return resolve(tfValue);
            }
            getTFolder(owner, name).then((result) => {
            
                if (!result.ok) {
                    return reject(result);
                }
                const tf: ITFolderModel = result.item;
                const tf_packiFiles_object: packiTypes.PackiFiles = JSON.parse(tf.packiFiles);
                tfValue = {
                    packiFiles: tf_packiFiles_object
                 };
                tfolderCache.set(cacheKey, tfValue);
                return resolve(tfValue);
            }
            ).catch((err: any) => {
            
                console.log('getTFolder_withCache.getArtifactProduction.error', err);
                return reject(err);
            }
            )
        }
        );
}

export function invalidateCache(owner: string, name: string) {

    var cacheKey = owner + '|' + name;
    tfolderCache.del(cacheKey);
}
