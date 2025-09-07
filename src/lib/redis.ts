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
