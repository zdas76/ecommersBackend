import { Server } from "http";

import config from "./app/config";
import app from "./app";



async function main() {
    const server:Server = app.listen(config.PORT, () => {
        console.log(`Example app listening on port ${config.PORT}`)
      })
}

main()