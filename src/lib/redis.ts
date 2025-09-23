import { createClient } from "redis";
import { prisma } from "./prisma";

// Global redis connection pool
let redisClient: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    await redisClient.connect();
  }
  return redisClient;
};

export const getBlogPosts = async () => {
  const blogPosts = await (await getRedisClient()).get("blogPosts");
  if (blogPosts) {
    return JSON.parse(blogPosts);
  } else {
    const blogPosts = await prisma.blogPost.findMany();
    await (await getRedisClient()).set("blogPosts", JSON.stringify(blogPosts));
    return blogPosts;
  }
};

// Redis-based cart helpers
type RedisCartItem = { educationId: string; quantity: number };

const cartKey = (userId: string) => `cart:${userId}`;

export const cartGet = async (userId: string): Promise<RedisCartItem[]> => {
  const raw = await (await getRedisClient()).get(cartKey(userId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as RedisCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const cartSet = async (userId: string, items: RedisCartItem[]) => {
  await (await getRedisClient()).set(cartKey(userId), JSON.stringify(items));
};

export const cartAdd = async (
  userId: string,
  educationId: string,
  quantity = 1
) => {
  const items = await cartGet(userId);
  const idx = items.findIndex((i) => i.educationId === educationId);
  if (idx >= 0) items[idx].quantity += quantity;
  else items.push({ educationId, quantity });
  await cartSet(userId, items);
  return items;
};

export const cartUpdateQty = async (
  userId: string,
  educationId: string,
  quantity: number
) => {
  let items = await cartGet(userId);
  if (quantity <= 0) items = items.filter((i) => i.educationId !== educationId);
  else {
    const idx = items.findIndex((i) => i.educationId === educationId);
    if (idx >= 0) items[idx].quantity = quantity;
    else items.push({ educationId, quantity });
  }
  await cartSet(userId, items);
  return items;
};

export const cartRemove = async (userId: string, educationId: string) => {
  const items = await cartGet(userId);
  const next = items.filter((i) => i.educationId !== educationId);
  await cartSet(userId, next);
};
export const getCourses = async () => {
  const courses = await (await getRedisClient()).get("courses");
  if (courses) {
    return JSON.parse(courses);
  } else {
    const courses = await prisma.egitim.findMany();
    const convertedCourses = courses.map((course) => {
      return {
        ...course,
        price: parseFloat(course.price?.toString() || "0"),
      };
    });
    await (
      await getRedisClient()
    ).set("courses", JSON.stringify(convertedCourses));
    return courses;
  }
  return courses;
};

export const updateBlogPosts = async () => {
  const blogPosts = await prisma.blogPost.findMany();
  await (await getRedisClient()).set("blogPosts", JSON.stringify(blogPosts));
};

export const updateCourses = async () => {
  const courses = await prisma.egitim.findMany();
  const convertedCourses = courses.map((course) => {
    return {
      ...course,
      price: parseFloat(course.price?.toString() || "0"),
    };
  });
  await (
    await getRedisClient()
  ).set("courses", JSON.stringify(convertedCourses));
};
