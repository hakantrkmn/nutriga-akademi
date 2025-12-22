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
    const blogPosts = await prisma.blogPost.findMany({
      where: { isActive: true },
    });
    await (await getRedisClient()).set("blogPosts", JSON.stringify(blogPosts));
    return blogPosts;
  }
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
  const blogPosts = await prisma.blogPost.findMany({
    where: { isActive: true },
  });
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
