import { createReadStream } from "node:fs"
import { createHash } from 'node:crypto'
import { isAbsolute, join, normalize } from "node:path"
import { checkIfFileExist } from "../utils/checkIfFileExist.js";

export const calculateHash = async (arg, appRootDirectory) => {
// hash src\\files\\fileToCalculateHashFor.txt
    if (!arg[0]) {
        console.error('Path was not provided')
        return
    }

    const path = normalize(arg[0])

    const pathToFile = isAbsolute(path) ?
        path :
        join(appRootDirectory, path)

    const isExist = await checkIfFileExist(pathToFile)
    if (!isExist) return

    try {
        const hash = createHash('sha256')
        const stream = createReadStream(pathToFile)

        stream.on('data',(data) => hash.update(data))

        stream.on('end', () => {
            const fileHash = hash.digest('hex')
            console.log(`SHA-256 Hash for ${pathToFile}: ${fileHash}`)
        })

    } catch (e) {
        console.error(`There is an error in calculate Hash: ${e}`)
    }
}
