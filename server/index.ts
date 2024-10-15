// import express, { Request, Response } from 'express'
// import next from 'next'
// import useragent from 'useragent'

// const dev = process.env.NODE_ENV !== 'production'
// const nextApp = next({ dev })
// const handle = nextApp.getRequestHandler()

// const PORT = process.env.PORT || 3001
// useragent(true)

// const browserList = {
//   chrome: 49,
//   edge: 14,
//   firefox: 45,
//   safari: 10
// }

// nextApp
//   .prepare()
//   .then(() => {
//     const server = express()

//     server.get('*', (req: Request, res: Response) => {
//       var ua = useragent.is(req.headers['user-agent'])
//       if (
//         Object.keys(ua).find(
//           (x) => ua[x] === true && ua.version < browserList[x]
//         )
//       ) {
//         // request('https://uploads.dev.evos.gg/outdated-browser.html').pipe(res)
//       } else {
//         handle(req, res)
//       }
//     })

//     server.listen(PORT, () => {
//       console.log(`> Ready on http://localhost:${PORT}`)
//     })
//   })
//   .catch((ex) => {
//     console.error(ex.stack)
//     process.exit(1)
//   })
