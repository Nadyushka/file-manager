import { dirname } from 'node:path';

export const getAppRootFolderPath = (currentPath) => {
    let baseDir = currentPath

    if (!currentPath.includes('src')) {
        return baseDir
    }

    while(!baseDir.endsWith('src')) {
        baseDir = dirname(baseDir)
    }

    return dirname(baseDir)

}
