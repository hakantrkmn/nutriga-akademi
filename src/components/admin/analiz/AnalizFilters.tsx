"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COURSE_CATEGORIES, PROFESSIONS } from "@/constants";
import { AnalizFilters as IAnalizFilters, SimpleUser } from "@/lib/api";
import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { MultiSelect } from "./MultiSelect";
import { Egitim } from "@/types";

interface AnalizFiltersProps {
  onSearch: (filters: IAnalizFilters) => void;
  users: SimpleUser[];
  educations: Egitim[];
  loading: boolean;
}

export default function AnalizFilters({
  onSearch,
  users,
  educations,
  loading,
}: AnalizFiltersProps) {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    userIds: [] as string[],
    educationIds: [] as string[],
    professions: [] as string[],
    categories: [] as string[],
  });

  const handleSearch = () => {
    const activeFilters: IAnalizFilters = {};
    if (filters.dateFrom) activeFilters.dateFrom = filters.dateFrom;
    if (filters.dateTo) activeFilters.dateTo = filters.dateTo;

    if (filters.userIds.length > 0) {
      activeFilters.userId = filters.userIds;
    }

    if (filters.educationIds.length > 0) {
      activeFilters.educationId = filters.educationIds;
    }

    if (filters.professions.length > 0) {
      activeFilters.profession = filters.professions;
    }

    if (filters.categories.length > 0) {
      activeFilters.category = filters.categories;
    }

    onSearch(activeFilters);
  };

  const userOptions = users.map((u) => ({
    label: `${u.firstName} ${u.lastName} (${u.email})`,
    value: u.id,
  }));

  const educationOptions = educations.map((e) => ({
    label: e.title,
    value: e.id,
  }));

  const professionOptions = PROFESSIONS.map((p) => ({
    label: p,
    value: p,
  }));

  const categoryOptions = COURSE_CATEGORIES.filter((c) => c !== "Tümü").map(
    (c) => ({
      label: c,
      value: c,
    })
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FiFilter className="text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Analiz Filtreleri</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarih Filtreleri */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Bitiş Tarihi</label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
        </div>

        {/* Kullanıcı Filtresi */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Kullanıcılar</label>
          <MultiSelect
            options={userOptions}
            selected={filters.userIds}
            onChange={(val) => setFilters({ ...filters, userIds: val })}
            placeholder="Kullanıcı Seçin"
          />
        </div>

        {/* Eğitim Filtresi */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Eğitimler</label>
          <MultiSelect
            options={educationOptions}
            selected={filters.educationIds}
            onChange={(val) => setFilters({ ...filters, educationIds: val })}
            placeholder="Eğitim Seçin"
          />
        </div>

        {/* Meslek Filtresi */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Meslekler</label>
          <MultiSelect
            options={professionOptions}
            selected={filters.professions}
            onChange={(val) => setFilters({ ...filters, professions: val })}
            placeholder="Meslek Seçin"
          />
        </div>

        {/* Kategori Filtresi */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Kategoriler</label>
          <MultiSelect
            options={categoryOptions}
            selected={filters.categories}
            onChange={(val) => setFilters({ ...filters, categories: val })}
            placeholder="Kategori Seçin"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="bg-primary-600 hover:bg-primary-700 text-white min-w-[150px]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analiz Ediliyor...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FiSearch />
              Analiz Getir
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
