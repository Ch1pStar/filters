const enableCEPDebug = require('./cep_debug');
const copyExtensionFiles = ()=>{
    const ncp = require('ncp');
    const fs = require('fs');
    const execSync = require('child_process').execSync;
    const extensionsPath = 'C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions';
    const extensionName = 'com.dopamine.Particles';
    const targetDir = `${extensionsPath}\\${extensionName}`;

    const copyDir = path=>{
        ncp.limit = 16;
        console.log(`Copying extension files '${path}'`);
        ncp(`./${path}`, `${targetDir}\\${path}`, err=>{
            if(err){
                console.log(`Error copying extension to ${path}`);
                console.log(err);
            }
        });
    };

    const doCopyExtensionFiles = ()=>{
        const dirsToCopy = [
            'dist',
            'CSXS',
            'html',
            'img',
            'test',
            '.debug',
        ];
        dirsToCopy.forEach(copyDir);
    }

    // if trying to understand this, nightmares are to be expected
    // replaces the new(//#) source map url syntax with the old(//@) 
    try{
        execSync(`\"C:\\Program Files\\Git\\git-bash.exe\" -c "find ./dist/ext.min.js -type f -exec sed -i 's/\\/\\/#/\\/\\/@/g' {} \\;"`);
    }catch(e){}

    if(!fs.existsSync(extensionsPath)){
        fs.mkdirSync(extensionsPath);
    }

    if(!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
    }else{
        execSync(`rd /s /q "${targetDir}"`);
        fs.mkdirSync(targetDir);
    }

    doCopyExtensionFiles();
}

const main = ()=>{
    copyExtensionFiles();
    enableCEPDebug();
}

main();
