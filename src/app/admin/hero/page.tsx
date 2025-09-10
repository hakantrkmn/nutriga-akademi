"use client";

import HeroForm from "@/components/admin/hero/HeroForm";
import HeroList from "@/components/admin/hero/HeroList";
import { useState } from "react";

interface HeroSlide {
  id: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminHeroPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState<
    HeroSlide | undefined
  >();

  const handleCreateNew = () => {
    setEditingHeroSlide(undefined);
    setShowForm(true);
  };

  const handleEdit = (heroSlide: HeroSlide) => {
    setEditingHeroSlide(heroSlide);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingHeroSlide(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingHeroSlide(undefined);
  };

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <HeroForm
          heroSlide={editingHeroSlide}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroList onEdit={handleEdit} onCreateNew={handleCreateNew} />
    </div>
  );
}
