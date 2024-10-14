import { cwd } from "node:process"

export const printCurrentWorkingDirectory = () => {
    console.log(`You are currently in ${cwd()}`)
    console.log('----------------------------------')
}
