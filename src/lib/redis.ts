import { createClient } from "redis";
import { prisma } from "./prisma";

const redis = await createClient({
  url: "redis://default:EJ2bBH8Meo9TOovCqZhcCWd1vBIjJB8r@redis-19896.c73.us-east-1-2.ec2.redns.redis-cloud.com:19896",
}).connect();

export const getBlogPosts = async () => {
  const blogPosts = await redis.get("blogPosts");
  if (blogPosts) {
    return JSON.parse(blogPosts);
  } else {
    const blogPosts = await prisma.blogPost.findMany();
    await redis.set("blogPosts", JSON.stringify(blogPosts));
    return blogPosts;
  }
};

// Redis-based cart helpers
type RedisCartItem = { educationId: string; quantity: number };

const cartKey = (userId: string) => `cart:${userId}`;

export const cartGet = async (userId: string): Promise<RedisCartItem[]> => {
  const raw = await redis.get(cartKey(userId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as RedisCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const cartSet = async (userId: string, items: RedisCartItem[]) => {
  await redis.set(cartKey(userId), JSON.stringify(items));
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
  const courses = await redis.get("courses");
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
    await redis.set("courses", JSON.stringify(convertedCourses));
    return courses;
  }
  return courses;
};
