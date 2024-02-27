# API Calls (React + Tailwind)

## Run the Docker
```
docker run --name QNetLinksOpcServer -p 9999:9999 -p 9990:9990 drsanti/opc-ua-server:latest
```

## Test APIs using Web Browser

```
http://localhost:9990/opc/api/v1/system/datetime
http://localhost:9990/opc/api/v1/system/datetime/d
http://localhost:9990/opc/api/v1/system/datetime/data/value
http://localhost:9990/opc/api/v1/system/datetime/data/value/zone
http://localhost:9990/opc/api/v1/system/datetime/data/value/local

http://localhost:9990/opc/api/v1/vector/boolean
http://localhost:9990/opc/api/v1/vector/boolean/data
http://localhost:9990/opc/api/v1/vector/boolean/data/value

http://localhost:9990/opc/api/v1/vector/integer
http://localhost:9990/opc/api/v1/vector/integer/data
http://localhost:9990/opc/api/v1/vector/integer/data/value

http://localhost:9990/opc/api/v1/vector/float
http://localhost:9990/opc/api/v1/vector/float/data
http://localhost:9990/opc/api/v1/vector/float/data/value

```

---

## Create React Project + Tailwind


### Create a project
Create a directory, `cd` to the directory, and run the following commands

```
npx create-react-app . --template typescript
cd ./app
npm install -D tailwindcss
npx tailwindcss init
```


### Modify the `tailwind.config.js:`
Replace the `content:[]` with the following line

`content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],`

### Modify the `index.css`
Add these three lines in the `index.css`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Run the application
```
npm start
```

---

## Create React component and Utilize the APIs

Let's go!