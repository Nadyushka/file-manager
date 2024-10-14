import { FILES_OPERATIONS } from "../constants/operations.js";
import { copyFile, createFile, deleteFile, readFile, renameFile } from "../services/filesOperations.js";

export const filesOperationHandlers = async (operation, arg, currentDirectory) => {
    switch (operation) {
        case FILES_OPERATIONS.cat: {
            await readFile(arg, currentDirectory)
            break
        }
        case FILES_OPERATIONS.add : {
            await createFile(arg, currentDirectory)
            break
        }
        case FILES_OPERATIONS.rn : {
            await renameFile(arg, currentDirectory)
            break
        }
        case FILES_OPERATIONS.cp : {
            await copyFile(arg, currentDirectory)
            break
        }
        case FILES_OPERATIONS.mv : {
            await copyFile(arg, currentDirectory, true)
            break
        }
        case FILES_OPERATIONS.rm : {
            await deleteFile(arg, currentDirectory)
            break
        }
    }
}
