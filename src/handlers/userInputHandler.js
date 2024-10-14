import { cwd } from "node:process"
import {
    COMPRESSION_OPERATIONS,
    FILES_OPERATIONS,
    NAVIGATION_OPERATIONS,
    OS_OPERATIONS
} from "../constants/operations.js";
import {navigationOperationHandlers} from "./navigationOperationHandlers.js";
import { osOperationHandlers } from "./osOperationHandlers.js";
import {filesOperationHandlers} from "./filesOperationHandlers.js";
import {calculateHash} from "../services/calculateHash.js";
import {compressionOperationHandlers} from "./compressionOperationHandlers.js";
import {getAppRootFolderPath} from "../utils/getAppRootFolderPath.js";

export const userInputHandler = async (userInput, closeReadline) => {
    const [operation, ...arg] = userInput.trim().split(' ')
    const currentDirectory = getAppRootFolderPath(cwd())

    switch (operation) {
        case NAVIGATION_OPERATIONS[operation]:
            await navigationOperationHandlers(operation, arg, currentDirectory);
            break;
        case FILES_OPERATIONS[operation]:
            await filesOperationHandlers(operation, arg, currentDirectory);
            break;
        case OS_OPERATIONS[operation]:
            await osOperationHandlers(arg);
            break;
        case COMPRESSION_OPERATIONS[operation]:
            await compressionOperationHandlers(operation, arg, currentDirectory);
            break;
        case 'hash':
            await calculateHash(arg, currentDirectory);
            break;
        case '.exit':
            closeReadline();
            break
        default:
            console.error('Please check your input. There is no such command')
            break
    }
}
