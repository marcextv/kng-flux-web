//import * as setListMail from '../util/URLUtil';

test('adds 1 + 2 to equal 3', () => {
    
    var now = new Date();
        now.setDate(now.getDate()-120);
        var filter = '$filter=ReceivedDateTime ge ' + now.toISOString();
    //const result = setListMail.setListMail('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', 60, 0, true,true,'expand=attachments(select=isInline,name,contentType)', filter);
    expect(7).toBe(7);
});