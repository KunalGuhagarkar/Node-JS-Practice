// ==========================================
// LEVEL 2 - ENCRYPTION & HASHING
// ==========================================

/*
|--------------------------------------------------------------------------
| ENCRYPTION
|--------------------------------------------------------------------------
|
| Encryption is the process of converting readable data into
| unreadable data using a secret key.
|
| Flow:
|
|   Password + Secret Key
|            ↓
|      Encryption Algorithm
|            ↓
|        Cipher Text
|
| Example:
|
|   "kunal123"
|        ↓
|   "8sjd92ksl@#"
|
| The encrypted data CAN be converted back into the original
| password if you have the secret key.
|
| Modern Encryption Algorithms:
|   - AES-256
|   - RSA
|
| Problem:
| If hackers discover the secret key,
| all encrypted passwords can be decrypted.
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| HASHING
|--------------------------------------------------------------------------
|
| Hashing converts data into a fixed random-looking string.
|
| Flow:
|
|   Password
|      ↓
|   Hash Function
|      ↓
|      Hash
|
| Example:
|
|   "kunal123"
|        ↓
|   "$2b$10$kjasdhkjasdh..."
|
| Important:
| Hashing is ONE-WAY.
|
| You can create a hash from a password,
| but you cannot reverse the hash back into the password.
|
| Modern Hashing Libraries:
|   - bcrypt
|   - argon2
|
| Hashing is mainly used for storing passwords securely.
|
*/


// ==========================================
// HASHING AUTHENTICATION FLOW
// ==========================================

/*
|--------------------------------------------------------------------------
| REGISTRATION
|--------------------------------------------------------------------------
|
| User enters password:
|
|   "kunal123"
|
| Application hashes the password:
|
|   bcrypt.hash("kunal123")
|
| Store ONLY the hash in the database:
|
|   "$2b$10$kjasdhkjasdh..."
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
|
| User enters password:
|
|   "kunal123"
|
| Application hashes entered password again
| and compares it with the stored hash.
|
| If:
|
|   Generated Hash === Stored Hash
|
| Then:
|
|   Login Successful
|
*/


// ==========================================
// MAIN DIFFERENCE
// ==========================================

/*
|--------------------------------------------------------------------------
| ENCRYPTION vs HASHING
|--------------------------------------------------------------------------
|
| ENCRYPTION:
|   - Two-way process
|   - Can be decrypted
|   - Uses a secret key
|   - Used for protecting sensitive data
|
| HASHING:
|   - One-way process
|   - Cannot be reversed
|   - No secret key
|   - Used for storing passwords
|
*/