import {OS_OPERATIONS} from "../constants/operations.js";
import {printArchitecture, printCPUS, printEOL, printHomedir, printUsername} from "../services/osOperations.js";

export const osOperationHandlers = async (arg) => {
    if (!arg[0]) {
        console.error('There is no arguments provided');
        return
    }

    switch (arg[0].slice(2)) {
        case OS_OPERATIONS.EOL: {
            await printEOL()
            break
        }
        case OS_OPERATIONS.cpus: {
            await printCPUS()
            break
        }
        case OS_OPERATIONS.homedir: {
            await printHomedir()
            break
        }
        case OS_OPERATIONS.username: {
            await printUsername()
            break
        }
        case OS_OPERATIONS.architecture: {
            await printArchitecture()
            break
        }
        default: {
            console.error('There is no such command for OS')
        }

    }
}

