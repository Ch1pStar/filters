const enableCEPDebug = ()=>{
    //Enable Flash debug mode
    const regedit = require('regedit');
    const setDebugFlag = ()=>{
        process.stdout.write('Setting Adobe CEP debug registry flag...');
        regedit.putValue({
            'HKCU\\SOFTWARE\\Adobe\\CSXS.6': {
                'PlayerDebugMode':{
                    value: 1,
                    type: 'REG_SZ'
                }
            }
        }, err=>{    
            if(err){
                console.log('Error setting \'PlayerDebugMode\' registry entry');
                console.log(err);
            }
            process.stdout.write('done\n');
        });
    }

    const checkPath = ()=>{
        const path = 'HKCU\\SOFTWARE';

        regedit.list(path, (err, result)=>{
            if(err){
                console.log(err);
            }

            if(result[path].keys.indexOf('Adobe') !== -1){
                const pathAdobe = `${path}\\Adobe`;
                regedit.list(pathAdobe, (err, result)=>{
                    if(result[pathAdobe].keys.indexOf('CSXS.6') === -1){
                        const pathCSXS = `${pathAdobe}\\CSXS.6`;
                        process.stdout.write(`Missing registry key ${pathCSXS}, creating one...`);
                        regedit.createKey(`${pathCSXS}`, function(err) {
                            if(err){
                                console.log(`Error creating registry key ${pathCSXS}`);
                                console.log(err);
                            }
                        });
                        process.stdout.write('done\n');
                    }
                    setDebugFlag();
                });
            }
        });
    }
    checkPath();
}

module.exports = enableCEPDebug;