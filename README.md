# PaaS-Based-API

## How to run locally
```
git clone https://github.com/jamesbarrett95/PaaS-Based-API.git
cd PaaS-Based-API
sh index.sh
```

## Deploy to gcloud
git clone https://github.com/jamesbarrett95/PaaS-Based-API.git
cd PaaS-Based-API
sh deploy.sh
```

## Example use of API
#### We can have two named registers, "james" and "foo":

```
GET    /api/james    -> 0    register "james" doesn't exist so 0
POST   /api/james 32 -> 32   creates register "james" as 0 and adds 32
POST   /api/james  4 -> 36   adds 4 to register "james"
GET    /api/james    -> 36   shows value of register "james"
GET    /api/foo     -> 0    register "foo" doesn't exist so 0
POST   /api/foo   4 -> 4    creates register "foo" as 0 and adds 2
GET    /api/foo     -> 4    shows value of register "foo"
PUT    /api/james  0 -> 0    resets register "james" to 0
GET    /api/james    -> 0    shows value of register "james"
GET    /api/foo     -> 4    shows independent value of register "foo"
DELETE /api/foo     -> ok   deletes register "foo"
GET    /api/foo     -> 0    register "foo" doesn't exist so 0
```
