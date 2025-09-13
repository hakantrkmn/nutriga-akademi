"use client";

import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  category: string;
  level: string;
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/courses");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch courses");
        }

        setCourses(result.data || []);
      } catch (err) {
        console.error("Eğitimler yüklenirken hata:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Eğitimler yüklenirken hata oluştu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
