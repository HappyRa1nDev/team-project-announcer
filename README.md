# Проект Announcer

## Инструкция по развертыванию проекта:

### Clone the repository:

- Create a empty folder and `cd` into that folder.
- Type the following command to clone project in same directory.

## Backend

### 1. Go to the root folder and perform the following commands:

`cd backend/`

### 2. Create and activate the virtual environment

```bash
python -m venv venv
venv\Scripts\activate
```

> If their is any error activating virtual env, please google search it for your system or try `venv\bin\activate` or `source venv/bin/activate`

### 3. Install required packages

```bash
pip install -r requirements.txt
```

### 4. Run the server

```bash
python manage.py migrate
python manage.py runserver
```

## Frontend

- Head back to the root folder
- Enter in `cd frontend/`

### 1. Installing packages

```bash
npm i
```

### 2. Run the application

```bash
npm run dev
```

> Make sure both frontend and backend are running.

## Docker

> Change database host in settings.py to 'HOST' : 'db'
```bash
docker compose up --build -d
```