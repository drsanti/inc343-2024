

# Development Workflow

## Docker

1) Run Docker daemon
2) Delete the previous image
3) Run the new image
    ```
    docker run --name opc-ua-server -p 9999:9999 -p 9990:9990 drsanti/opc-ua-server
    ```


## Next.js Application

1) Install dependencies
    ```
    npm install
    ```

2) Run the application in development mode
    ```
    npm run dev
    ```

3) Learn the `React` & `Next` 


