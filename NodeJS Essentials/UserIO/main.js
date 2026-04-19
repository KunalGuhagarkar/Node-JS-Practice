// User Input and Output

process.stdout.write("This is sample text.\n");

process.stdin.on('data', (userInput) => {
    let input = userInput.toString();
    console.log('User input is', input);
});
