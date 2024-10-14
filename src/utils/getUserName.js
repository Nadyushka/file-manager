export const getUserName = () => {
    try {
        const args = process.argv.slice(2);
        const usernameArg = args.find(arg => arg.startsWith('--username='));
        const username = usernameArg.split('=')[1]

        console.log('----------------------------------')
        console.log(`%cWelcome to the File Manager, ${username}!`, 'color: green')

        return username
    } catch (e) {
        throw new Error('Invalid --username argument. Please start app with the command npm run start -- --username=your_username');
    }
}
