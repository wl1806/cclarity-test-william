### Prerequisites

```
* node >= v18.17.0
* yarn >= 1.22.22
```

### Installing

```
* yarn install
```

## Running

### Local development server

```
* yarn dev
* can be accessed on localhost:3001
```

### Production build

```
* yarn build
* yarn start
```

## Directory Structure

| Directory  | Definition                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| components | Functional / class components. Free of redux. Classified in sub-folder. Use index.ts/tsx as the main entrance.                                                                             |
| constants  | Only return value. Classified by the purpose of value.                                                                                                                                     |
| interfaces | Only return interface. Prefixed with I. Classified in four types. - models for basic model - request for API request model - response for API response model - state for Redux state model |
| pages      | Files consist of pages. Classified by page name.                                                                                                                                           |
| store      | Redux setup                                                                                                                                                                                |
| utils      | Common function. Classified by the purpose of function.                                                                                                                                    |
| styles     | Common styles.                                                                                                                                                                             |
| scripts    | Bash script files                                                                                                                                                                          |

### Note for CCLarity

- I used redux reducer state management, the index can be seen here src/store/reducers/index.ts, with less css management for global css and style.css file for components
- I put error handler and character count for the challenge, but run out of time for the light/dark mode
- For error handler, can be seen on src/store/actions/magic-write.ts, there are const error in line 15 that can be changed to test the error handler
- I pushed this code on github https://github.com/wl1806/cclarity-test-william
