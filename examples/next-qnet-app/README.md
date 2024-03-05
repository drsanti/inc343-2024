

# Development Workflow

## Docker

1) Run Docker daemon
2) Stop the running container
3) Delete the previous image
4) Run the new image (internet connection is required)
    ```
    docker run --name opc-ua-server -p 9999:9999 -p 9990:9990 drsanti/opc-ua-server
    ```


## Next.js Application

1) Install dependencies (internet connection is required)
    ```
    npm install
    ```

2) Run the application in development mode
    ```
    npm run dev
    ```

3) Start with learning `React` and `Next`. Look at examples in the `src/components/basics` folder. 
   Make sure you understand what `components`, `props`, and `React Hooks` (like `useState` and `useEffect`) are all about. 
   Also, learning `TypeScript` and `TailwindCSS` is really useful.

---

## QNetBrowserSocketThe 

`QNetBrowserSocket` is a `library` that acts as a bridge to connect a browser to an OPC-UA server. 
It offers all the essential functions needed for the browser to access the OPC-UA server seamlessly.

### Example:

```ts
"use client";

import React, { useState, useEffect } from "react";
import { QNetBrowserSocket } from "qnetbrowsersocket";

export default function Home() {

  const [bitArray, setBitArray] = useState<boolean[]>([]);

  useEffect(() => {
    const qnet = new QNetBrowserSocket();
    qnet.start().then(() => {
      qnet.enableBitsSimulation([true, true, true, true, true]);
    });

    const interval = setInterval(() => {
      qnet.getBits().then((bits) => {
        setBitArray(() => bits);
      });
    }, 1000);
    return () => {
      qnet.stop();
      clearInterval(interval);
    };
  }, []);

  return <p className="text-5xl">DATA: {bitArray.toString()}</p>;
}

```