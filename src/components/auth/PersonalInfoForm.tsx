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
import { DEPARTMENTS, PROFESSIONS, UNIVERSITIES } from "@/constants";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

interface PersonalInfoFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  profession: string;
  setProfession: (value: string) => void;
  university: string;
  setUniversity: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  class: string;
  setClass: (value: string) => void;
}

export function PersonalInfoForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  profession,
  setProfession,
  university,
  setUniversity,
  department,
  setDepartment,
  class: classValue,
  setClass,
}: PersonalInfoFormProps) {
  const isStudent = profession === "Öğrenci";

  // Combobox states
  const [professionOpen, setProfessionOpen] = useState(false);
  const [universityOpen, setUniversityOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">İsim *</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Adınız"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Soyisim *</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Soyadınız"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon *</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+90 5XX XXX XX XX"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Meslek *</Label>
        <Popover open={professionOpen} onOpenChange={setProfessionOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={professionOpen}
              className="w-full justify-between"
            >
              {profession ? profession : "Mesleğinizi arayın..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full p-0 z-[100]"
            align="start"
            side="bottom"
            sideOffset={4}
            avoidCollisions={true}
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
                        setProfession(prof === profession ? "" : prof);
                        setProfessionOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          profession === prof ? "opacity-100" : "opacity-0"
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
      </div>

      {isStudent && (
        <>
          <div className="space-y-2">
            <Label htmlFor="university">Üniversite *</Label>
            <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={universityOpen}
                  className="w-full justify-between"
                >
                  {university
                    ? UNIVERSITIES.find((uni) => uni === university)
                    : "Üniversitenizi arayın..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 z-[100]"
                align="start"
                side="bottom"
                sideOffset={4}
                avoidCollisions={true}
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
                          setUniversity(uni === university ? "" : uni);
                          setUniversityOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            university === uni ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {uni}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Bölüm *</Label>
            <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={departmentOpen}
                  className="w-full justify-between"
                >
                  {department
                    ? DEPARTMENTS.find((dept) => dept === department)
                    : "Bölümünüzü arayın..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 z-[100]"
                align="start"
                side="bottom"
                sideOffset={4}
                avoidCollisions={true}
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
                          setDepartment(dept === department ? "" : dept);
                          setDepartmentOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            department === dept ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {dept}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Kaçıncı Sınıf *</Label>
            <Select value={classValue} onValueChange={setClass}>
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
          </div>
        </>
      )}
    </div>
  );
}
