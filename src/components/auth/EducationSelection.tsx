"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/hooks/useCourses";
import { Loader2 } from "lucide-react";

interface EducationSelectionProps {
  selectedEducationId: string;
  setSelectedEducationId: (value: string) => void;
}

export function EducationSelection({
  selectedEducationId,
  setSelectedEducationId,
}: EducationSelectionProps) {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return (
      <div className="space-y-2">
        <Label htmlFor="education">Katılmak İstediğiniz Eğitim</Label>
        <div className="flex items-center justify-center p-4 border border-gray-200 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Eğitimler yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Label htmlFor="education">Katılmak İstediğiniz Eğitim</Label>
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <span className="text-sm text-red-600">
            Eğitimler yüklenirken hata oluştu
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="education">Katılmak İstediğiniz Eğitim</Label>
      <Select
        value={selectedEducationId}
        onValueChange={setSelectedEducationId}
      >
        <SelectTrigger>
          <SelectValue placeholder="Eğitim seçin (opsiyonel)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Eğitim seçmek istemiyorum</SelectItem>
          {courses.map((course) => (
            <SelectItem key={course.id} value={course.id}>
              <div className="flex flex-col">
                <span className="font-medium">{course.title}</span>
                <span className="text-xs text-gray-500">
                  {course.category} • {course.level}
                  {course.price && ` • ₺${course.price}`}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
