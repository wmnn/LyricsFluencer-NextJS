### How to run the app:
1. Create a firestore project
2. Enable firebase authentication through email and password
3. Create a firestore database
4. Add firestore database rules, these firestore rules will work (in development): 
  ```
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

5. Add firebase service account to ./firebaseServiceAccount.json for subscription handling
6. Add firebase web config to ./firebaseWebConfig.json for the front end authentication
7. Activate google translate and musixmatch api
8. Add api keys to .env (Sample file .env.sample)
9. Use node 16 (for example with node version manager run: `nvm use 16`)
10. Run: `pnpm i`
11. Run: `pnpm run dev`

