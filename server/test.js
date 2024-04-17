const redis = require("redis");
let client = redis.createClient();
(async () => {
    await client.connect();
})();
 
(async () => {
    await client.set('mykey', 'Hello from node redis');
})();

let myKeyValue;
(async () => {
    myKeyValue = await client.get('mykey');
})();
console.log(myKeyValue)
