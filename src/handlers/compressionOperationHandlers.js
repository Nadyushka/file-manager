import { compressDecompressFile } from "../services/compressionOperations.js";
import {COMPRESSION_OPERATIONS} from "../constants/operations.js";

export const compressionOperationHandlers = async (operation, arg, currentDirectory) => {
    if (arg.length < 2) throw new Error('Invalid number of parameters');

    switch (operation) {
        case COMPRESSION_OPERATIONS.compress: {
            await compressDecompressFile(arg, true, currentDirectory)
            break
        }
        case COMPRESSION_OPERATIONS.decompress: {
            await compressDecompressFile(arg, false, currentDirectory)
            break
        }
    }
}

