var http = require('http'),
    fs = require('fs'),
    request = require('request'),
    parsePage = require('./parse');

var url = 'http://www.nrldc.org/DOOld_Format.aspx';

var get_page = function(date, cb) {
    var post = request.post(url, function(err, res, body) {
            cb(body);
            });
    var form = post.form();
    form.append('txtStartDate',date);
    form.append('Button1','Get Report of Previous Days');
    form.append('__VIEWSTATE','/wEPDwUKMTMwNzQ4MDE0Mw9kFgICAQ9kFgICBw8PFgIeB1Zpc2libGVnZBY4AgEPDxYCHgRUZXh0BQgwNS0wMi0xNGRkAgUPDxYCHwEFBgozNTYyMmRkAgcPDxYCHwEFBDE2NTFkZAIJDw8WAh8BBQUzNzI3M2RkAgsPDxYCHwEFBTQ5LjkxZGQCDQ8PFgIfAQUFMjY4NDZkZAIPDw8WAh8BBQEwZGQCEQ8PFgIfAQUFMjY4NDZkZAITDw8WAh8BBQU1MC4yNmRkAhUPDxYCHwEFBTc2Mi45ZGQCFw8PFgIfAQUFMjguODBkZAIZDw8WCh4LQ2VsbFNwYWNpbmdmHgtDZWxsUGFkZGluZwIEHgpGb250X05hbWVzFQEFQXJpYWweCUZvbnRfU2l6ZSgqIlN5c3RlbS5XZWIuVUkuV2ViQ29udHJvbHMuRm9udFVuaXQEMTBwdB4EXyFTQgKAjBhkZAIbDw8WCh8CZh8DAgQfBBUBBUFyaWFsHwUoKwQEMTBwdB8GAoCMGGRkAh0PDxYKHwJmHwMCBB8EFQEFQXJpYWwfBSgrBAQxMHB0HwYCgIwYZGQCHw8PFgofAmYfAwIEHwQVAQVBcmlhbB8FKCsEBDEwcHQfBgKAjBhkZAIhDw8WCh8CZh8DAgQfBBUBBUFyaWFsHwUoKwQEMTBwdB8GAoCMGGRkAiMPDxYKHwJmHwMCBB8EFQEFQXJpYWwfBSgrBAQxMHB0HwYCgIwYZGQCJQ8PFgofAmYfAwIEHwQVAQVBcmlhbB8FKCsEBDEwcHQfBgKAjBhkZAInDw8WCh8CZh8DAgQfBBUBBUFyaWFsHwUoKwQEMTBwdB8GAoCMGGRkAikPDxYKHwJmHwMCBB8EFQEFQXJpYWwfBSgrBAQxMHB0HwYCgIwYZGQCKw8PFgofAmYfAwIEHwQVAQVBcmlhbB8FKCsEBDEwcHQfBgKAjBhkZAItDw8WCh8CZh8DAgQfBBUBBUFyaWFsHwUoKwQEMTBwdB8GAoCMGGRkAi8PDxYKHwJmHwMCBB8EFQEFQXJpYWwfBSgrBAQxMXB0HwYCgIwYZGQCMQ8PFgofAmYfAwIEHwQVAQVBcmlhbB8FKCsEBDEycHQfBgKAjBhkZAIzDw8WCh8CZh8DAgQfBBUBBUFyaWFsHwUoKwQEMTRwdB8GAoCMGGRkAjUPDxYKHwJmHwMCBB8EFQEFQXJpYWwfBSgrBAQxNXB0HwYCgIwYZGQCNw8PFgofAmYfAwIEHwQVAQVBcmlhbB8FKCsEBDE2cHQfBgKAjBhkZAI5Dw8WCh8CZh8DAgQfBBUBBUFyaWFsHwUoKwQEMTdwdB8GAoCMGGRkZFXWf2AWXqU+0f0UXLaT9i9uL7g+');
    form.append('__EVENTVALIDATION','/wEWAwK479OyCQLg2ZN+AoznisYGSIiZKACTF3KSG0I3H50YrujmY0M=');
    return post;
};

var write = fs.createWriteStream('test.html');
get_page('02-02-2014', function(body) {
    parsePage(body, function(res) {
        console.log(res);
    });
});
