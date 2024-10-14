import { normalize } from "node:path"
import { access } from "node:fs/promises";

export const checkIfFileExist = async (filePath) => {
    try {
        const normalizedPath = normalize(filePath);
        await access(normalizedPath)
        return true
    } catch (e) {
        console.error(`Could not access file ${filePath}. Check path and try again.`)
        return false

    }
}
