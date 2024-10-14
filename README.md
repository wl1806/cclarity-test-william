# fe-template

fe-template Web App

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
* node >= 12
* yarn
```
 
### Installing

```
* yarn install
```

## Running

### Local development server

```
* yarn dev
```

#### Using particles

```
* make sure you have set up your BitBucket account [SSH key](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/)
* install all necessary particles. dont forget to yarn link.
* yarn link '{{particle-name}}'
```

### Production build

```
* yarn build
* yarn start
```

## Build Docker Image on local

```
yarn build:docker:dev
docker run -d -p 3004:3004 fe-web
```

## Deployment

- Development Branch: for development source of branching etc
- Staging: Merge to this branch will trigger deployment pipeline to [Staging server]
- Master: Merge to this branch will trigger deployment pipeline to Master server(incoming)

## Built With

- [NEXT](https://nextjs.org/) - The web FE framework

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

### Name Convention

#### File / Folder

- Use lower case string separated by dash(-) knows as kebab-case
- Start refactor when a file is more than 400 lines

#### Function / Variable / ClassName

- Use pascal-case for function and class name
- Use camel-case for variable name
- Use kebab-case for style class name
