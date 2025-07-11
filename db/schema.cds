using { managed, cuid } from '@sap/cds/common';

namespace notes;

entity Notes : managed {
    key id: Integer;
    title: String(30);
    content: String;
}
entity Users : managed {
    key userName: String(20);
    password: String(20);
    emailAddress: String(40);
    role: String(10);
}