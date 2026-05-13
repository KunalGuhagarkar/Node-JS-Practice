// Rename in the export file

function greet() {
    return 'Hello';
}

function bye() {
    return 'Goodbye';
}

export {greet as enter, bye as exit}; // Renaming Exports