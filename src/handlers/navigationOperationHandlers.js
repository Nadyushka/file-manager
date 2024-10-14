import {NAVIGATION_OPERATIONS} from "../constants/operations.js";
import { goToDirectory, goToParentDirectory, listAllFilesAndFolders} from "../services/navigationOpeartions.js";

export const navigationOperationHandlers = async (operation, arg, currentDirectory) => {
    switch (operation) {
        case NAVIGATION_OPERATIONS.up: {
            await goToParentDirectory(currentDirectory)
            break
        }
        case NAVIGATION_OPERATIONS.cd: {
            await goToDirectory(arg, currentDirectory)
            break
        }
        case NAVIGATION_OPERATIONS.ls: {
            await listAllFilesAndFolders()
            break
        }
    }
}
