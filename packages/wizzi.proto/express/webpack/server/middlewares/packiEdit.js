const parseUrl = require('parseurl');
const packiEditPath = '/~/';

app.use(function (req, res, next) {
    const parsedUrl = parseUrl(req);
    const pathname = parsedUrl.pathname;
    console.log('request: pathname', pathname);
    if (pathname.startsWith(packiEditPath)) {
        const parts = req.path.split('/');
        api.getPackiItem_Object_By_Owner_Name(parts[1], parts.slice(2).join('/')).then(result => {
            renderPackiEditor(req, res, result);
        }).catch(err => {
            console.log("renderBy_owner_name.err", err)
            return res.json(err) 
        })
    }
    else
        next();
});