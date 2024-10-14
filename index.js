import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {getUserName} from "./src/utils/getUserName.js";
import {printCurrentWorkingDirectory} from "./src/utils/printCurrentWorkingDirectory.js";
import {userInputHandler} from "./src/handlers/userInputHandler.js";

const initFileManagerApp = () => {
    const username = getUserName()
    printCurrentWorkingDirectory()

    const rl = readline.createInterface({ input, output });

    const closeReadLine = () => rl.close()

    rl.on('line', async (line) => {
        await userInputHandler(line, closeReadLine)
        await printCurrentWorkingDirectory()
    })

    rl.on('close', async (line) => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    })
}

initFileManagerApp()
