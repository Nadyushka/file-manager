import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile, rename, unlink } from 'node:fs/promises';
import { join, isAbsolute, normalize } from 'node:path';
import {checkIfFileExist} from "../utils/checkIfFileExist.js";


export const readFile = (arg, currentDirectory) => {
    // cat src/constants/operations.js
    if (!arg[0]){
        console.error('There was provided no path to file')
        return
    }

    const path = normalize(arg[0])

    const pathToFile = isAbsolute(path) ?
        path :
        join(currentDirectory, path)

    const stream = createReadStream( pathToFile, { encoding: 'utf8' });

    stream.on('data', (chunk) => {
        console.log(chunk);
    });

    stream.on('end', () => {
        console.log('Finished reading the file.');
    });

    stream.on('error', (error) => {
        console.error(`Error reading file: ${error.message}`);
    });
}


export const createFile = async (fileName, currentDirectory) => {
    // add src/files/text.txt
    if (!fileName[0] || fileName.length !== 1){
        console.error('There was provided no file name to create')
        return
    }
    const filePath = join(currentDirectory, '', normalize(fileName[0]));

    try {
        const options = {
            flag: 'wx',
            encoding: 'utf8'
        }
        await writeFile(filePath, '', options);
        console.log(`Empty file created at: ${filePath}`);
    } catch (error) {
        console.error(`Error creating file: ${error.message}`);
    }
}


export const renameFile = async (arg, currentDirectory) => {
    // rn src/files/fileToRename.txt src/files/renamedFile.txt
    // rn src/files/renamedFile.txt src/files/fileToRename.txt

    if (arg.length < 2) {
        console.error('Both old and new file names must be provided');
        return;
    }

    const oldFile = normalize(arg[0])
    const newFile = normalize(arg[1])

    const oldFilePath = isAbsolute(oldFile) ? oldFile : join(currentDirectory, oldFile)
    const newFilePath = isAbsolute(newFile) ? newFile : join(currentDirectory, newFile)

    const isFileExist = await checkIfFileExist(oldFilePath)
    if (!isFileExist) return

    try {
        await rename(oldFilePath, newFilePath);
        console.log(`File renamed from ${oldFile} to ${newFile}`);
    } catch (error) {
        console.error(`Error renaming file: ${error.message}`);
    }
}


export const copyFile = async (arg, currentDirectory, withDeleting = false) => {
    // cp src/files/fileToCopy.txt src/files/fileToCopy1.txt
    // mv src/files/fileToCopy.txt src/files/fileToCopy1.txt

    if (arg.length < 2) {
        console.error('Both source and destination file names must be provided');
        return;
    }

    const sourceFile = normalize(arg[0])
    const destinationFile = normalize(arg[1])

    const sourceFilePath = isAbsolute(sourceFile) ? sourceFile :join(currentDirectory, sourceFile)
    const destinationFilePath = isAbsolute(destinationFile) ? destinationFile :join(currentDirectory, destinationFile)

    const isFileExist= await checkIfFileExist(sourceFilePath);
    if (!isFileExist) return

    try {
        const readStream = createReadStream(sourceFilePath);
        const writeStream = createWriteStream(destinationFilePath);

        await readStream.pipe(writeStream);

        writeStream.on('finish', async () => {
            console.log(`File copied from ${sourceFile} to ${destinationFile}`);

            if (!withDeleting) return

            try {
                await unlink(sourceFilePath)
                console.log(`Original file ${sourceFile} was deleted.`)
            } catch (e) {
                console.error(`Original file ${sourceFile} was not deleted.`)
            }
        });

        writeStream.on('error', (error) => {
            console.error(`Error writing file: ${error.message}`);
        });

    } catch (error) {
        console.error(`Error copying file: ${error.message}`);
    }
}

export const deleteFile = async (arg, currentDirectory) => {
    // rm src/files/fileToDelete.txt

    if (arg.length < 1) {
        console.error('File name must be provided');
        return;
    }

    const fileName = normalize(arg[0])

    const filePath = isAbsolute(fileName) ? fileName : join(currentDirectory, fileName);

    try {
        await unlink(filePath);
        console.log(`File ${fileName} was deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
    }
}
