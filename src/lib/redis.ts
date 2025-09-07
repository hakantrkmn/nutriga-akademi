import { createClient } from 'redis';

const redis =  await createClient({ url: "redis://default:EJ2bBH8Meo9TOovCqZhcCWd1vBIjJB8r@redis-19896.c73.us-east-1-2.ec2.redns.redis-cloud.com:19896" }).connect();

export default redis;