## React + Tailwind

### Create a new project and add Tailwind
```
npx create-react-app . --template typescript
cd ./app
npm install -D tailwindcss
npx tailwindcss init
```

### 
### Add code to `tailwind.config.js:`

`content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],`

### Add code to `index.css`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Run:
```
npm start
```