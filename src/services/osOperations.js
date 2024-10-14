import { EOL, cpus, homedir, userInfo } from 'node:os';
import { arch } from "node:process"


export const printEOL = () => {
    console.log(`Default system End-Of-Line is: "${JSON.stringify(EOL)}"`);
}


export const printCPUS = () => {
    const cpusInfo = cpus();

    console.log(`Total number of CPUs: ${cpusInfo.length}`);

    const tableData = cpusInfo.map((cpu, index) => {
        const model = cpu.model;
        const speedInGHz = (cpu.speed / 1000).toFixed(2);

        return [`${model}`, `Speed: ${speedInGHz} GHz`];
    });

    console.table(tableData)
}


export const printHomedir = () => {
    console.log(`Current homedir is: ${homedir()}`);
}


export const printUsername = () => {
    console.log(`Current username is: ${userInfo().username}`);
}


export const printArchitecture = () => {
    console.log(`Current CPU architecture: ${arch}`);
}

