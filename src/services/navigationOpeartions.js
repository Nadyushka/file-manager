import { dirname, normalize, resolve, isAbsolute } from 'node:path';
import { chdir, cwd } from "node:process"
import { readdir } from "node:fs/promises";
import {checkIfFileExist} from "../utils/checkIfFileExist.js";

export const goToParentDirectory = async (currentDirectory) => {
    const parentDir = dirname(currentDirectory);

    if (currentDirectory === parentDir) {
        console.error('You are already at the root directory.');
        return;
    }

    try {
        await chdir(parentDir);
        console.log(`Changed working directory to: ${parentDir}`);
    } catch (error) {
        console.error(`Error changing directory: ${error.message}`);
    }
}


export const goToDirectory = async (pathToDir, currentDirectory) => {
    // cd src\constants

    if (!pathToDir[0] || pathToDir.length !== 1) {
        console.error('There is no path to directory provided')
        return
    }

    const pathToDirectory = normalize(pathToDir[0])

    const targetDir = isAbsolute(pathToDirectory)
        ? pathToDirectory
        : resolve(currentDirectory, pathToDirectory);

    try {
        await checkIfFileExist(targetDir);
        await chdir(targetDir);

        console.log(`Changed working directory to: ${targetDir}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}


export const listAllFilesAndFolders = async () => {
    try {
        const filesAndFolders = await readdir(cwd(), { withFileTypes: true });

        const folders = filesAndFolders.filter(child => child.isDirectory());
        const files = filesAndFolders.filter(child => child.isFile());

        folders.sort((a, b) => a.name.localeCompare(b.name));
        files.sort((a, b) => a.name.localeCompare(b.name));

        const sortedContents = [...folders, ...files];

        const tableData = sortedContents.map(child => ({
            Name: child.name,
            Type: child.isDirectory() ? 'Folder' : 'File'
        }));

        console.table(tableData)
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
    }
}
