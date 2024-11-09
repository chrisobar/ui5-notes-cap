using { managed, cuid } from '@sap/cds/common';

namespace notes;

entity Notes : managed {
    id: Integer;
    title: String(30);
    content: String;
}
entity Users : managed {
    userName: String(20);
    password: String(20);
    emailAddress: String(40);
}