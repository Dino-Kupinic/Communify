<img src="frontend/src/assets/img/CommunifyLogo.svg" alt="Image"  height="150" />

# Communify

> Intuitive and simple chat app with rooms.

## 🥳 Installation and Configuration

### Installation
1. clone the repository:
```bash
git clone https://github.com/Dino-Kupinic/Communify.git
```
2. `npm install` in frontend and backend:
```bash
cd Communify/frontend && npm install && cd ../backend && npm install
```
`⚠️ Important: you need to have docker installed!`

3. run `compose.yaml`
```bash
cd .. && docker compose up --build
```
Continue with the configuration below!

### Configuration
4. run `schema.sql` and `insert_test_data.sql` in `/backend/src/database/` for the postgres db
5. create a `.env` file in `/backend/` with following content:
   
`⚠️ Important: this application is only for learning purposes, normally the .env file with the secret key wouldn't be accessible`
```env
PORT=4000
DB_PORT=5432
SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NzIyMzY4NiwiaWF0IjoxNjk3MjIzNjg2fQ.MRdk7L642ry-VHvkEfBPr_HXXCJ9PjcY9bgwu7zmahQ
```
6. rerun `docker compose up --build`
7. Head to `http://localhost:10000/`
8. Follow the steps on the website
   
## 👌 Authors

- [@Dino Kupinic](https://www.github.com/Dino-Kupinic)
- [@Johannes Kerbl](https://www.github.com/JKerbl)
- [@Jannick Angerer](https://www.github.com/Neuery17Alt)

## 🛠️ Tech Stack

**Client:** Vue.js

**Server:** Node.js, Socket.io

**Database:** PostgreSQL 

## 🍿 License

[MIT](https://choosealicense.com/licenses/mit/)


