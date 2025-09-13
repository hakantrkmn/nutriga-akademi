"use client";

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
  const isStudent = profession === "öğrenci";

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
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+90 5XX XXX XX XX"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Meslek *</Label>
        <Select value={profession} onValueChange={setProfession}>
          <SelectTrigger>
            <SelectValue placeholder="Mesleğinizi seçin" />
          </SelectTrigger>
          <SelectContent>
            {PROFESSIONS.map((prof) => (
              <SelectItem key={prof} value={prof}>
                {prof === "öğrenci"
                  ? "Öğrenci"
                  : prof === "diyetisyen"
                  ? "Diyetisyen"
                  : prof === "beslenme-uzmanı"
                  ? "Beslenme Uzmanı"
                  : prof === "doktor"
                  ? "Doktor"
                  : prof === "eczacı"
                  ? "Eczacı"
                  : prof === "spor-egitmeni"
                  ? "Spor Eğitmeni"
                  : prof === "psikolog"
                  ? "Psikolog"
                  : prof === "hemşire"
                  ? "Hemşire"
                  : prof === "fizyoterapist"
                  ? "Fizyoterapist"
                  : prof === "anne"
                  ? "Anne"
                  : prof === "çocuk-gelişim-uzmanı"
                  ? "Çocuk Gelişim Uzmanı"
                  : prof === "öğretmen"
                  ? "Öğretmen"
                  : prof === "mühendis"
                  ? "Mühendis"
                  : prof === "avukat"
                  ? "Avukat"
                  : prof === "muhasebeci"
                  ? "Muhasebeci"
                  : prof === "pazarlama-uzmanı"
                  ? "Pazarlama Uzmanı"
                  : prof === "grafik-tasarımcı"
                  ? "Grafik Tasarımcı"
                  : prof === "yazılımcı"
                  ? "Yazılımcı"
                  : prof === "diğer"
                  ? "Diğer"
                  : prof
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isStudent && (
        <>
          <div className="space-y-2">
            <Label htmlFor="university">Üniversite *</Label>
            <Select value={university} onValueChange={setUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="Üniversitenizi seçin" />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map((uni) => (
                  <SelectItem key={uni} value={uni}>
                    {uni}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Bölüm *</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Bölümünüzü seçin" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <SelectItem value="5">5. Sınıf</SelectItem>
                <SelectItem value="6">6. Sınıf</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}
