import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { CardioHistory, Category } from "../../../models/CardioHistory";

type CardioHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<CardioHistory>; // duración, distancia, notas, categoría opcional
  onSave: (data: Omit<CardioHistory, "id" | "userId" | "date">) => Promise<void>;
};

const categoryOptions: { label: string; value: Category }[] = [
  { label: "Correr", value: "run" },
  { label: "Caminar", value: "walk" },
  { label: "Bicicleta", value: "bike" },
];

export function CardioHistoryModal({
  isOpen,
  onClose,
  initialData = {},
  onSave,
}: CardioHistoryModalProps) {
  const [duration, setDuration] = useState(initialData.duration ?? 0);
  const [distance, setDistance] = useState(initialData.distance ?? 0);
  const [notes, setNotes] = useState(initialData.notes ?? "");
  const [category, setCategory] = useState<Category>(initialData.category ?? "run");
  const [isSaving, setIsSaving] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      setDuration(initialData.duration ?? 0);
      setDistance(initialData.distance ?? 0);
      setNotes(initialData.notes ?? "");
      setCategory(initialData.category ?? "run");
    }
  }, [initialData, isOpen]);

  function validate(): boolean {
    if (duration <= 0) {
      toast({
        title: "Duración debe ser mayor a 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (distance <= 0) {
      toast({
        title: "Distancia debe ser mayor a 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!category) {
      toast({
        title: "Categoría requerida",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  }

  async function handleSave() {
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSave({
        duration,
        distance,
        notes: notes.trim() || "",
        category,
      });
      toast({
        title: "Guardado exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch {
      toast({
        title: "Error al guardar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData.duration ? "Editar Cardio" : "Nuevo Cardio"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3} isRequired>
            <FormLabel>Duración (minutos)</FormLabel>
            <NumberInput
              min={1}
              value={duration}
              onChange={(_, val) => setDuration(val)}
              isDisabled={isSaving}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl mb={3} isRequired>
            <FormLabel>Distancia (km)</FormLabel>
            <NumberInput
              min={0.1}
              precision={2}
              step={0.1}
              value={distance}
              onChange={(_, val) => setDistance(val)}
              isDisabled={isSaving}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl mb={3} isRequired>
            <FormLabel>Categoría</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              isDisabled={isSaving}
            >
              {categoryOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Notas (opcional)</FormLabel>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas adicionales"
              resize="vertical"
              rows={3}
              isDisabled={isSaving}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} isDisabled={isSaving}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleSave} isLoading={isSaving}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
