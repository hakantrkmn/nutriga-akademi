"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DEPARTMENTS, PROFESSIONS, UNIVERSITIES } from "@/constants";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import { EditForm, UserProfile } from "@/hooks/useUserProfile";

interface ProfileEditFormProps {
  profile: UserProfile;
  editForm: EditForm;
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saving: boolean;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

export function ProfileEditForm({
  profile,
  editForm,
  setEditForm,
  isEditing,
  setIsEditing,
  saving,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  // Combobox states
  const [professionOpen, setProfessionOpen] = useState(false);
  const [universityOpen, setUniversityOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const handleSave = async () => {
    try {
      await onSave();
      setIsEditing(false);
    } catch {
      // Error is handled in the hook
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Kişisel Bilgiler
          </h3>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => {
            if (isEditing) {
              onCancel();
            } else {
              setIsEditing(true);
            }
          }}
          className="flex items-center gap-2"
        >
          <FiEdit className="h-4 w-4" />
          {isEditing ? "İptal" : "Düzenle"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Ad *</Label>
          <Input
            id="firstName"
            value={isEditing ? editForm.firstName : profile.firstName}
            onChange={(e) =>
              setEditForm({ ...editForm, firstName: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Soyad *</Label>
          <Input
            id="lastName"
            value={isEditing ? editForm.lastName : profile.lastName}
            onChange={(e) =>
              setEditForm({ ...editForm, lastName: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession">Meslek *</Label>
          {isEditing ? (
            <Popover open={professionOpen} onOpenChange={setProfessionOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={professionOpen}
                  className="w-full justify-between"
                >
                  {editForm.profession ? editForm.profession : "Mesleğinizi seçin..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 z-[100]"
                align="start"
                side="bottom"
                sideOffset={4}
                avoidCollisions={false}
              >
                <Command>
                  <CommandInput placeholder="Meslek arayın..." />
                  <CommandEmpty>Meslek bulunamadı.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {PROFESSIONS.map((prof) => {
                      return (
                        <CommandItem
                          key={prof}
                          value={prof}
                          onSelect={() => {
                            setEditForm({ ...editForm, profession: prof });
                            setProfessionOpen(false);
                            // Eğer öğrenci değilse öğrenci alanlarını temizle
                            if (prof !== "Öğrenci") {
                              setEditForm(prev => ({ ...prev, university: "", department: "", class: "" }));
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              editForm.profession === prof ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {prof}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          ) : (
            <Input
              value={profile.profession}
              disabled
              className="bg-gray-50"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            value={isEditing ? editForm.phone : profile.phone}
            onChange={(e) =>
              setEditForm({ ...editForm, phone: e.target.value })
            }
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        {(isEditing ? editForm.profession : profile.profession) === "Öğrenci" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="university">Üniversite *</Label>
              {isEditing ? (
                <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={universityOpen}
                      className="w-full justify-between"
                    >
                      {editForm.university
                        ? UNIVERSITIES.find((uni) => uni === editForm.university)
                        : "Üniversitenizi seçin..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full p-0 z-[100]"
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={false}
                  >
                    <Command>
                      <CommandInput placeholder="Üniversite arayın..." />
                      <CommandEmpty>Üniversite bulunamadı.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {UNIVERSITIES.map((uni) => (
                          <CommandItem
                            key={uni}
                            value={uni}
                            onSelect={() => {
                              setEditForm({ ...editForm, university: uni });
                              setUniversityOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                editForm.university === uni ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {uni}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : (
                <Input
                  value={profile.university || ""}
                  disabled
                  className="bg-gray-50"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Bölüm *</Label>
              {isEditing ? (
                <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={departmentOpen}
                      className="w-full justify-between"
                    >
                      {editForm.department
                        ? DEPARTMENTS.find((dept) => dept === editForm.department)
                        : "Bölümünüzü seçin..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full p-0 z-[100]"
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={false}
                  >
                    <Command>
                      <CommandInput placeholder="Bölüm arayın..." />
                      <CommandEmpty>Bölüm bulunamadı.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {DEPARTMENTS.map((dept) => (
                          <CommandItem
                            key={dept}
                            value={dept}
                            onSelect={() => {
                              setEditForm({ ...editForm, department: dept });
                              setDepartmentOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                editForm.department === dept ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {dept}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : (
                <Input
                  value={profile.department || ""}
                  disabled
                  className="bg-gray-50"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Kaçıncı Sınıf *</Label>
              {isEditing ? (
                <Select value={editForm.class} onValueChange={(value) => setEditForm({ ...editForm, class: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sınıfınızı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1. Sınıf</SelectItem>
                    <SelectItem value="2">2. Sınıf</SelectItem>
                    <SelectItem value="3">3. Sınıf</SelectItem>
                    <SelectItem value="4">4. Sınıf</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={profile.class ? `${profile.class}. Sınıf` : ""}
                  disabled
                  className="bg-gray-50"
                />
              )}
            </div>
          </>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Hesap Bilgileri</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>E-posta</Label>
            <Input
              value={profile.email}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">E-posta adresi değiştirilemez</p>
          </div>
          
          <div className="space-y-2">
            <Label>Üyelik Tarihi</Label>
            <Input
              value={formatDate(profile.createdAt)}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={saving}
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700"
          >
            <FiSave className="h-4 w-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      )}
    </div>
  );
}