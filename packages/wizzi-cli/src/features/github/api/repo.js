/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.cli\.wizzi\src\features\github\api\repo.js.ittf
    utc time: Wed, 08 Jan 2025 05:17:28 GMT
*/
const fetch = require('node-fetch');
const path = require('path');
const git = require('isomorphic-git');
const memfs = require('memfs');
const http = require('isomorphic-git/http/node');
const {
    createFsFromVolume, 
    Volume
 } = memfs;
const fSystem = require('@wizzi/utils').fSystem;

const volume = new Volume();
const fs = createFsFromVolume(volume);
fs.kind = 'filesystem';
const wizzifs = fSystem.vfile(fs);

var md = module.exports = {};
md.getRepository = async function(owner, repo, accessToken) {
    return new Promise((resolve, reject) => 
            fetch(`https://api.github.com/repos/${owner}/${repo}`, getOptions(accessToken)).then((response) => {
                if (!response.ok) {
                    throw new Error(response.status.toString());
                }
                return response.json();
            }
            ).then(async (responseData) => {
                responseData._contents = await md.getContents(owner, repo, accessToken);
                ;
                resolve(responseData)
            }
            ).catch(err => 
                reject(err)
            )
        
        );
}
;

md.getContents = async function(owner, repo, accessToken) {
    console.log('getContents.enter', owner, repo, accessToken, __filename);
    return new Promise((resolve, reject) => 
            fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, getOptions(accessToken)).then((response) => {
                if (!response.ok) {
                    throw new Error(response.status.toString());
                }
                response.json();
            }
            ).then((responseData) => {
                console.log('getContents', responseData, __filename);
                return resolve(responseData);
            }
            ).catch(err => 
                reject(err)
            )
        
        );
}
;

md.cloneBranch = async function(repo, branch, kind) {
    volume.reset();
    const dir = '/' + repo.name;
    return new Promise((resolve, reject) => 
            fs.mkdir(dir, async (err) => {
                if (err) {
                    return reject(err);
                }
                try {
                    await git.clone({
                            fs, 
                            http, 
                            dir, 
                            url: `https://github.com/${repo.owner}/${repo.name}`, 
                            ref: `${branch}`, 
                            singleBranch: true, 
                            depth: 10, 
                            onAuth: (url) => {
                                return 
                                    // oauth2format 'github'
                                    {
                                        password: repo.token
                                     };
                            }
                            
                         });
                    let files = wizzifs.getFiles(dir, {
                        deep: true, 
                        documentContent: true
                     });
                    const packies = {};
                    files.forEach((file) => {
                        if (file.relPath.startsWith('.git/') == false) {
                            if (kind === 'all' || kind === 'ittf' && file.relPath.endsWith('.ittf') == true) {
                                packies[file.relPath] = {
                                    type: "CODE", 
                                    contents: file.content
                                 };
                            }
                        }
                    }
                    )
                    const log = await git.log({
                            fs, 
                            dir
                         });
                    return resolve({
                            owner: repo.owner, 
                            name: repo.name, 
                            description: '', 
                            branch, 
                            files: packies, 
                            commitHistory: log
                         });
                } 
                catch (ex) {
                    return reject(ex);
                } 
            }
            )
        );
}
;

function getOptions(accessToken) {
    return {
            method: 'GET', 
            headers: headers(accessToken)
         };
}

function headers(accessToken) {
    const ret = {
        'Accept': 'application/vnd.github.v3+json', 
        'Content-Type': 'application/json'
     };
    if (accessToken) {
        ret['Authorization'] = 'token ' + accessToken;
    }
    return ret;
}