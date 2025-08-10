// src/components/profile/ProfileEdit.tsx

import { Box, Heading, Text, SimpleGrid, Divider, Input, Select, Button, HStack } from "@chakra-ui/react";
import type { Profile, Gender, Goal, ExperienceLevel, WeekDay } from "../../models/Profile";
import { useState } from "react";

type Props = {
  profile: Profile;
  user: { displayName?: string | null; email?: string | null };
  onSave: (updated: Partial<Profile>) => Promise<void>;
  onCancel: () => void;
};

const genderOptions: { value: Gender; label: string }[] = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
];

const goalOptions: { value: Goal; label: string }[] = [
  { value: "gain muscle", label: "Ganar músculo" },
  { value: "lose weight", label: "Perder peso" },
  { value: "maintain", label: "Mantener" },
];

const experienceOptions: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Principiante" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
];

const weekDaysOptions: { value: WeekDay; label: string }[] = [
  { value: "Monday", label: "Lunes" },
  { value: "Tuesday", label: "Martes" },
  { value: "Wednesday", label: "Miércoles" },
  { value: "Thursday", label: "Jueves" },
  { value: "Friday", label: "Viernes" },
  { value: "Saturday", label: "Sábado" },
  { value: "Sunday", label: "Domingo" },
];

export function ProfileEdit({ profile, user, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Profile>>({
    gender: profile.gender,
    goal: profile.goal,
    experience: profile.experience,
    trainingDays: profile.trainingDays,
    weight: profile.weight,
    height: profile.height,
    birthdate: profile.birthdate,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Control change general
  function handleChange<K extends keyof Profile>(field: K, value: Profile[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Toggle días entrenamiento
  function toggleTrainingDay(day: WeekDay) {
    setForm((f) => {
      if (!f.trainingDays) return { ...f, trainingDays: [day] };
      const exists = f.trainingDays.includes(day);
      return {
        ...f,
        trainingDays: exists
          ? f.trainingDays.filter((d) => d !== day)
          : [...f.trainingDays, day],
      };
    });
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    try {
      await onSave(form);
    } catch (e: any) {
      setError(e.message || "Error al guardar el perfil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box w="100%">
      <Heading size="lg" mb={6} textAlign="center" color="primary.900">
        Editar Perfil de {user?.displayName ?? "Sin nombre"}
      </Heading>

      {/* Datos Físicos */}
      <Heading size="md" mb={4} color="primary.700">
        Datos Físicos
      </Heading>
      <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Peso (kg)
          </Text>
          <Input
            type="number"
            value={form.weight ?? ""}
            onChange={(e) => handleChange("weight", Number(e.target.value))}
            min={0}
          />
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Altura (cm)
          </Text>
          <Input
            type="number"
            value={form.height ?? ""}
            onChange={(e) => handleChange("height", Number(e.target.value))}
            min={0}
          />
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Fecha de nacimiento
          </Text>
          <Input
            type="date"
            value={form.birthdate ?? ""}
            onChange={(e) => handleChange("birthdate", e.target.value)}
          />
        </Box>

      </SimpleGrid>

        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Días de entrenamiento
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            {weekDaysOptions.map(({ value, label }) => {
              const isSelected = form.trainingDays?.includes(value) ?? false;
              return (
                <Button
                  key={value}
                  size="sm"
                  variant={isSelected ? "solid" : "outline"}
                  colorScheme="primary"
                  onClick={() => toggleTrainingDay(value)}
                >
                  {label}
                </Button>
              );
            })}
          </HStack>
        </Box>

      <Divider my={6} />

      {/* Objetivos y Experiencia */}
      <Heading size="md" mb={4} color="primary.700">
        Objetivos y Experiencia
      </Heading>
      <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Género
          </Text>
          <Select
            value={form.gender ?? ""}
            onChange={(e) => handleChange("gender", e.target.value as Gender)}
          >
            {genderOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Objetivo
          </Text>
          <Select
            value={form.goal ?? ""}
            onChange={(e) => handleChange("goal", e.target.value as Goal)}
          >
            {goalOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Experiencia
          </Text>
          <Select
            value={form.experience ?? ""}
            onChange={(e) =>
              handleChange("experience", e.target.value as ExperienceLevel)
            }
          >
            {experienceOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>
      </SimpleGrid>

      {error && (
        <Text color="red.500" mt={4} fontWeight="semibold" textAlign="center">
          {error}
        </Text>
      )}

      <HStack justify="center" mt={8} spacing={4}>
        <Button onClick={onCancel} isDisabled={loading}>
          Cancelar
        </Button>
        <Button
          colorScheme="primary"
          onClick={handleSave}
          isLoading={loading}
          isDisabled={loading}
        >
          Guardar
        </Button>
      </HStack>
    </Box>
  );
}
