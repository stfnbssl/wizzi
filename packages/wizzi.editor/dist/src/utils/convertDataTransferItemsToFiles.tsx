/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\utils\convertDataTransferItemsToFiles.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
export type WebkitDirectoryReaderResult = (WebkitFileEntry | WebkitDirectoryEntry)[];
export type WebkitDirectoryReader = { 
    readEntries: (success: (result: WebkitDirectoryReaderResult) => void, error: (e: Error) => void) => void;
};
export type WebkitFileEntry = { 
    isFile: true;
    isDirectory: false;
    name: string;
    fullPath: string;
    file: (success: (f: File) => void, failure: (e: Error) => void) => void;
};
export type WebkitDirectoryEntry = { 
    isFile: false;
    isDirectory: true;
    name: string;
    fullPath: string;
    createReader: () => WebkitDirectoryReader;
};
const blacklist = [
    /^\./, 
    /\.(jks|keystore)$/, 
    /^(android|ios)$/, 
    /^coverage$/, 
    /^(js|ts)config\.json$/, 
    /^flow-typed$/, 
    /^node_modules$/, 
    /^npm-debug\.log$/, 
    /^npm-error\.log$/, 
    /^package-lock\.json$/, 
    /^yarn-debug\.log$/, 
    /^yarn-error\.log$/, 
    /^yarn\.lock$/, 
    /^__tests__$/, 
    /~$/
];
const whitelist = [
    /^\.eslintrc(\.json)?$/
];
const processEntry = async (entry: WebkitFileEntry | WebkitDirectoryEntry, files: { 
    file: File;
    path: string;
}[], path: string) => {

    if (blacklist.some(r => 
    
        r.test(entry.name)
    ) && !whitelist.some(r => 
    
        r.test(entry.name)
    )) {
        return ;
    }
    if (entry.isFile) {
        const file = await new Promise<File>((resolve, reject) => 
            
                entry.file(resolve, reject)
            );
        files.push({
            path, 
            file
         })
    }
    else {
        if (entry.isDirectory) {
            const reader = entry.createReader();
            const entries = await new Promise<WebkitDirectoryReaderResult>((resolve, reject) => 
                
                    reader.readEntries(resolve, reject)
                );
            await Promise.all(entries.map(async (e: WebkitFileEntry | WebkitDirectoryEntry) => 
                
                    processEntry(e, files, `${path}/${e.name}`)
                
                ));
        }
    }
}
;
export default async function convertDataTransferItemsToFiles(items: (File | WebkitFileEntry | WebkitDirectoryEntry)[], mappings: { 
        [key: string]: string;
    }) {
    
        const files: { 
            file: File;
            path: string;
        }[] = [];
        await Promise.all(items.map((it) => {
            
                const path = mappings[it.name] || it.name;
                if (it instanceof File) {
                    files.push({
                        file: it, 
                        path
                     })
                    return undefined;
                }
                else {
                    return processEntry(it, files, path);
                }
            }
            ));
        return files;
    }
