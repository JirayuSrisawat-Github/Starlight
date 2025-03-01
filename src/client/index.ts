import { Logger } from "seyfert";
import { Starlight } from "./structures/Starlight";
import { customLogger } from "./structures/utils/Logger";

export const client = new Starlight();
Logger.customize(customLogger);
client.start().then(() => {
    client.services.watchServices()
        .then(() => client.logger.info("Watching services for changes"))
        .catch(error => client.logger.error("Failed to watch services:", error));
    client.uploadCommands().then(() => {
        client.logger.info("Commands uploaded");
    }).catch((err: Error) => {
        client.logger.error(err.message);
    });
}).catch((err) => {
    client.logger.error(err);
});
process.on("unhandledRejection", (reason, promise) => {
    (async () => {
        const result = await promise;
        client.logger.error(`Unhandled Rejection at: ${JSON.stringify(result)} reason: ${JSON.stringify(reason)}`);
    })().catch((err: Error) => {
        client.logger.error(`Error in unhandledRejection handler: ${err}`);
    });
});

process.on("uncaughtException", (err: Error) => {
    client.logger.error(`Uncaught Exception: ${err.message}`);
});