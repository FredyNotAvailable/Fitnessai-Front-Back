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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

type WaterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialLiters: number;
  initialNotes: string;
  goalAmount: number;
  loading: boolean;
  onSave: (liters: number, notes: string) => Promise<void>;
};

export function WaterModal({
  isOpen,
  onClose,
  initialLiters,
  initialNotes,
  goalAmount,
  loading,
  onSave,
}: WaterModalProps) {
  // Ahora aceptamos string para poder manejar input vacío y borrar libremente
  const [litersInput, setLitersInput] = useState<string>(initialLiters.toString());
  const [notesInput, setNotesInput] = useState(initialNotes);
  const toast = useToast();

  useEffect(() => {
    setLitersInput(initialLiters.toString());
    setNotesInput(initialNotes);
  }, [initialLiters, initialNotes]);

  async function handleSave() {
    const liters = parseFloat(litersInput);

    // Validamos que no esté vacío y sea número válido
    if (litersInput.trim() === "" || isNaN(liters)) {
      toast({
        title: "Valor inválido",
        description: "Debes ingresar un número válido de litros.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validamos que sea mayor a 0.25
    if (liters < 0.25) {
      toast({
        title: "Valor inválido",
        description: "Debes ingresar al menos 0.25 litros para guardar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // // Validamos que no pase el goalAmount
    // if (liters > goalAmount) {
    //   toast({
    //     title: "Valor inválido",
    //     description: `El valor debe ser menor o igual a ${goalAmount} litros.`,
    //     status: "warning",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }

    try {
      await onSave(liters, notesInput.trim() || "");
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
        <ModalHeader>Registrar consumo de agua</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Litros consumidos</FormLabel>
            <NumberInput
              min={0.25}
              // max={goalAmount}
              precision={2}
              step={0.25}
              value={litersInput}
              onChange={(valueString) => {
                // Permitimos que pueda borrar todo (input vacío)
                // Solo validamos que no permita valores negativos
                if (valueString === "" || parseFloat(valueString) >= 0) {
                  setLitersInput(valueString);
                }
              }}
              isDisabled={loading}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Notas</FormLabel>
            <Textarea
              placeholder="Agregar notas (opcional)"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              isDisabled={loading}
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
