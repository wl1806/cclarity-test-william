"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const useragent_1 = __importDefault(require("useragent"));
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next_1.default({ dev });
const handle = nextApp.getRequestHandler();
const PORT = process.env.PORT || 3001;
useragent_1.default(true);
const browserList = {
    chrome: 49,
    edge: 14,
    firefox: 45,
    safari: 10
};
nextApp
    .prepare()
    .then(() => {
    const server = express_1.default();
    server.get('*', (req, res) => {
        var ua = useragent_1.default.is(req.headers['user-agent']);
        if (Object.keys(ua).find((x) => ua[x] === true && ua.version < browserList[x])) {
            // request('https://uploads.dev.evos.gg/outdated-browser.html').pipe(res)
        }
        else {
            handle(req, res);
        }
    });
    server.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`);
    });
})
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
