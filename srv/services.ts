import cds, { Request } from "@sap/cds";

export default class NotesService extends cds.ApplicationService {
	init() {
		this.before("CREATE", "Notes", (req: Request) => this.incrementNotes(req));
		return super.init();
	}

	async incrementNotes(req: Request) {
		const { Notes } = this.entities;
		const getLastNote = await SELECT.one.from(Notes).orderBy("id desc");
		req.data.id = getLastNote.id + 1;
	}
}
