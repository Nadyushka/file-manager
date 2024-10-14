import { createReadStream, createWriteStream } from "node:fs"
import { unlink } from 'node:fs/promises';
import { createGzip, createGunzip } from 'node:zlib';
import { pipeline } from 'stream/promises'
import { isAbsolute, join, normalize } from 'node:path';
import {checkIfFileExist} from "../utils/checkIfFileExist.js";

export const compressDecompressFile = async (arg, isFileCompressOperation, currentDirectory) => {
// compress src\\files\\fileToCompress.txt src\\files\\compressedFile.gz
// decompress src\files\compressedFile.gz src\files\fileToCompress.txt

    const fileName = normalize(arg[0])
    const changedFileName = normalize(arg[1])

    const fileToChangePath = isAbsolute(fileName) ? fileName : join(currentDirectory,fileName)
    const changedFilePath = isAbsolute(changedFileName) ? changedFileName : join(currentDirectory,changedFileName)

   const isFileExist = await checkIfFileExist(fileToChangePath)
    if (!isFileExist) return

    const readStream = createReadStream(fileToChangePath);
    const writeStream = createWriteStream(changedFilePath);

    try {
        if (isFileCompressOperation) {
            const gzip = createGzip();
            await pipeline(readStream, gzip, writeStream)
        } else {
            const gunzip = createGunzip();
            await pipeline(readStream, gunzip, writeStream)
        }
        await unlink(fileToChangePath)
    } catch (e) {
        const operationName = isFileCompressOperation ? 'compression' : 'decompression'
        console.error(`There is an error in ${operationName}: ${e}`)
    }
}
