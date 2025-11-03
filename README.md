### Nama : Ahmad Muslihul Khair

### NIM : F1D02310001

### Mata Kuliah : Pemrograman Web Lanjut

---
## Week 9
### Auth
---
### Tools yang digunakan

- node.js

- Mysql2

- express

- dotenv

- bcrypt, jsonwebtoken (modul utama auth)

- Nodemon

- googleapis
---
### Deskripsi Project
membuat program dengan mengimplementasikan authentifikasi, ini merupakan lanjutan dari mini projek saya, yang saya tambahkan dengan auth google. 
module utamanya yaitu **jwt** untuk menggenerate token, dan **bcrypt** digunakan untuk menghash password
### variasi dari tambahan saya
- auth dengan google

### ***Untuk yang tidak menggunakan Auth google, ada di mini project Minggu lalu :***
``` js
https://github.com/khair0001/pwl25-mini-project
```
### Struktur Folder Project

```
├── src/
│   ├── app.js               
│   ├── config/
│   │   ├── db.js            
│   │   └── googleAuth.js    
│   ├── controllers/         
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── userController.js
│   ├── models/              
│   │   ├── bookModel.js     
│   │   └── userModel.js     
│   ├── routes/              
│   │   ├── authRouter.js    
│   │   ├── bookRouter.js    
│   │   └── userRouter.js    
│   └── middleware/          
│       ├── authvalidate.js  
│       ├── bookValidate.js  
│       ├── userValidate.js  
│       ├── errorHandler.js  
│       └── log.js           
├── .env.example             
├── .gitignore
├── package.json
└── README.md
```


### Cara Instalasi

1. Clone repository

``` bash

git clone https://github.com/khair0001/week9-auth

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
  - email terdaftar
    <img width="1408" height="242" alt="Screenshot 2025-11-03 132816" src="https://github.com/user-attachments/assets/6a22ae5b-1716-4002-bb40-a32dde69add5" />

  - path
    <img width="1429" height="229" alt="Screenshot 2025-11-03 132837" src="https://github.com/user-attachments/assets/ca04777e-f656-4521-b513-d70ba6ca6fd2" />

2. register berhasil
<img width="1443" height="888" alt="Screenshot 2025-11-03 132601" src="https://github.com/user-attachments/assets/0588177b-4caf-44e9-8882-0b81d839137e" />

3. login dengan email dan password berhasil
<img width="1432" height="773" alt="Screenshot 2025-11-03 132914" src="https://github.com/user-attachments/assets/6d5d13dd-10bf-4ad3-a0f7-683b5f485b43" />

4. login dengan email dan password gagal
<img width="1432" height="634" alt="Screenshot 2025-11-03 132946" src="https://github.com/user-attachments/assets/6ab9392d-2abb-4212-95ef-0e9540ce7528" />

5. login dengan google
<img width="781" height="468" alt="image" src="https://github.com/user-attachments/assets/6829d1a6-eae1-41c0-a9fa-4fa72304d128" />

<img width="1751" height="88" alt="image" src="https://github.com/user-attachments/assets/4a4688c3-0786-4b29-9d53-1a76729ca0f7" />

6. penggunaan token jwt
<img width="1426" height="705" alt="Screenshot 2025-11-03 133142" src="https://github.com/user-attachments/assets/c99dbdaf-36bc-4227-94c8-480efcbdc0a2" />
