import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { SleepQuality } from "../../../models/SleepHistory"; // <--- Importa el tipo común aquí

type SleepModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialDuration: number;      // en horas, ej. 7.5
  initialQuality: SleepQuality; // usa el tipo importado
  initialNotes: string;
  goalDuration: number;
  loading: boolean;
  onSave: (duration: number, quality: SleepQuality, notes: string) => Promise<void>;
};

export function SleepModal({
  isOpen,
  onClose,
  initialDuration,
  initialQuality,
  initialNotes,
  goalDuration,
  loading,
  onSave,
}: SleepModalProps) {
  const [duration, setDuration] = useState(initialDuration);
  const [quality, setQuality] = useState<SleepQuality>(initialQuality);
  const [notes, setNotes] = useState(initialNotes);
  const toast = useToast();

  useEffect(() => {
    setDuration(initialDuration);
    setQuality(initialQuality);
    setNotes(initialNotes);
  }, [initialDuration, initialQuality, initialNotes]);

  async function handleSave() {
    if (duration <= 0) {
      toast({
        title: "Duración inválida",
        description: "La duración debe ser mayor a 0 horas.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await onSave(duration, quality, notes.trim());
      onClose();
    } catch (error: any) {
      toast({
        title: "Error al guardar",
        description: error.message || "No se pudo guardar el registro",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar sueño</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Duración (horas)</FormLabel>
            <NumberInput
              min={0.1}
              max={24}
              precision={1}
              step={0.1}
              value={duration}
              onChange={(_, val) => setDuration(val)}
              isDisabled={loading}
            >
              <NumberInputField />
            </NumberInput>
            <FormLabel fontSize="sm" color="gray.500" mt={1}>
              Meta: {goalDuration} horas
            </FormLabel>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Calidad del sueño</FormLabel>
            <Select
              value={quality}
              onChange={(e) => setQuality(e.target.value as SleepQuality)}
              isDisabled={loading}
            >
              <option value="poor">Pobre</option>
              <option value="fair">Regular</option>
              <option value="good">Buena</option>
              <option value="excellent">Excelente</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Notas (opcional)</FormLabel>
            <Textarea
              placeholder="Agregar notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              isDisabled={loading}
              resize="vertical"
              rows={3}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={loading}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSave} isLoading={loading}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
