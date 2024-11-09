import cds from "@sap/cds";
import { Application } from "express";

cds.on("bootstrap", (app: Application) => {
	app.use();
});
export default cds.server;
