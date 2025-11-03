### Nama : Ahmad Muslihul Khair

### NIM : F1D02310001

---
## Week 9
### Auth
---
### Tools yang digunakan

- node.js

- Mysql2

- express

- dotenv

- bcrypt, jsonwebtoken

- Nodemon

- googleapis
---
### Deskripsi Project
membuat program dengan mengimplementasikan authentifikasi, ini merupakan lanjutan dari mini projek saya, yang saya tambahkan dengan auth google
### variasi dari tambahan saya

- auth dengan google
### Struktur Folder Project

```

|── package.json

├── src/

│   ├── app.js

│   ├── config/

│   │   └── db.js

│   ├── controllers/

│   │   ├── authController.js

│   │   └── bookController.js

│   ├── models/

│   │   └── bookModel.js

│   ├── routes/

│   │   ├── authRouter.js

│   │   └── bookRouter.js

│   └── middleware/

│       ├── authvalidate.js

│       ├── bookValidate.js

│       ├── errorHandler.js

│       └── log.js

└── README.md

```


### Cara Instalasi

1. Clone repository

``` bash

git clone https://github.com/khair0001/pwl25-mini-project

```

2. install npm yang di perlukan di folder project

``` bash

npm install

```

3. buat database yang berisi table users dan books

4. buat file .env dengan isi

```
PORT =
DB_HOST =
DB_USER =
DB_PASSWORD =
DB_NAME = namadatabsae
JWT_SECRET=
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
```

```
### Cara Run code

npm run dev
```

### Hasil Program

1. register gagal

2. register berhasil

3. login dengan email dan password berhasil

4. login dengan email dan password gagal

5. login dengan google
