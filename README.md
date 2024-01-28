<img src="frontend/src/assets/Communify.png" alt="Image"  height="100" />

# Communify

> Intuitive and simple groupchats.

## 🥳 Installation and Configuration

### Installation
1. clone the repository:
```bash
git clone https://github.com/Dino-Kupinic/Communify.git
```
2. `npm install` in frontend:
```bash
cd frontend && npm install
```
`⚠️ Important: you need to have docker CLI installed!`

3. run `compose.yaml`
```bash
cd .. && docker compose up 
```
Continue with the configuration below.

### Configuration

5. create a `.env` file in `/frontend`. Example .env is provided.

`⚠️ Important: for hosting in the network, you should also change the BACKEND_URL file in frontend/src/db/pocketbase.ts:`
```ts
const POCKETBASE_URL = "http://<ip-address>:8090"

export const pb = new PocketBase(POCKETBASE_URL)

```
// WIP

`⚠️ Important: This tutorial only covers setting up with the vite dev server. If you want to use apache or ngnix, you will have to figure that out yourself.`
   
## 👌 Authors

- [@Dino Kupinic](https://www.github.com/Dino-Kupinic) (version 1 & 2)
- [@Johannes Kerbl](https://www.github.com/JKerbl) (version 1)
- [@Jannick Angerer](https://www.github.com/Neuery17Alt) (version 1)

## 🛠️ Tech Stack

**Frontend:** Vue.js

**Backend:** Pocketbase

**Database:** SQLite  

## 🍿 License

[MIT](https://choosealicense.com/licenses/mit/)


