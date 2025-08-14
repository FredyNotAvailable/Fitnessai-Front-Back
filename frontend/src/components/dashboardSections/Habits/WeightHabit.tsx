import { useState, useEffect } from "react";
import {
  VStack,
  Box,
  Icon,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaWeight } from "react-icons/fa";
import { useWeightHistory, useWeightHistoriesByUser } from "../../../hooks/useWeightHistory";

type WeightHabitProps = {
  userId: string;
  goalWeight?: number;
};

export function WeightHabit({ userId }: WeightHabitProps) {
  const toast = useToast();
  const today = new Date().toISOString().slice(0, 10);

  const { create, loading: isSaving, error: errorCreate } = useWeightHistory();
  const { histories } = useWeightHistoriesByUser(userId);

  const [currentWeight, setCurrentWeight] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [lastWeight, setLastWeight] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Obtener el último peso registrado cuando cambian los histories
  useEffect(() => {
    if (histories.length > 0) {
      const sorted = [...histories].sort((a, b) => (a.date > b.date ? 1 : -1));
      setLastWeight(sorted[sorted.length - 1].weight);
    }
  }, [histories]);

  async function handleSave() {
    if (currentWeight === "" || isNaN(Number(currentWeight))) return;

    try {
      const newHistory = await create({
        userId,
        date: today,
        weight: Number(currentWeight),
        notes: notes || "",
      });
      setLastWeight(newHistory.weight);
      setCurrentWeight("");
      setNotes("");
      toast({
        title: "Peso guardado",
        description: "Tu peso se guardó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    } catch (err: any) {
      toast({
        title: "Error al guardar",
        description: err?.message || "Ocurrió un error guardando tu peso.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <>
      <VStack
        spacing={1}
        w="80px"
        cursor="pointer"
        onClick={onOpen}
        userSelect="none"
      >
        <Box position="relative" w="64px" h="64px">
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color="blue.500"
            fontSize="28px"
            pointerEvents="none"
          >
            <Icon as={FaWeight} />
          </Box>
        </Box>

        <Text fontSize="sm" color="blue.600">
          Peso
        </Text>

        {lastWeight !== null && (
          <Text fontSize="xs" color="gray.500" userSelect="none">
            {lastWeight}Kg
          </Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar peso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="number"
              step="0.1"
              placeholder="Peso en Kg"
              value={currentWeight}
              onChange={(e) =>
                setCurrentWeight(e.target.value === "" ? "" : Number(e.target.value))
              }
              mb={3}
              isDisabled={isSaving}
            />
            <Textarea
              placeholder="Notas (opcional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              size="sm"
              resize="none"
              rows={3}
              isDisabled={isSaving}
            />
            {errorCreate && (
              <Text fontSize="xs" color="red.500" mt={2}>
                {/* {errorCreate} */}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
              isDisabled={currentWeight === ""}
            >
              Guardar
            </Button>
            <Button onClick={onClose} isDisabled={isSaving}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
