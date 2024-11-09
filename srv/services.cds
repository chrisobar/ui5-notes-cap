using { notes as ns } from '../db/schema';

service NoteService {
    entity Notes as projection on ns.Notes;
    entity Users as projection on ns.Users;
}