// Errors

const errorFirstCallback = (err, data) => {
    if (err) {
        console.error(`This is an error: ${err}.`);
    } else {
        console.log(`This is no error the data is: ${data}`);
    }
}

errorFirstCallback(null, 'Kunal'); // Output: This is no error the data is: Kunal
errorFirstCallback(new Error()); // This is an error: Error.