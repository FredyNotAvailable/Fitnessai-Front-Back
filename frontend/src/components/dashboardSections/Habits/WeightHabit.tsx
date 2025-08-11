import { useState } from "react";
import {
  Box,
  Icon,
  CircularProgress,
  Spinner,
  useTheme,
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
import { useWeightHistory } from "../../../hooks/useWeightHistory"; // Solo para create()

type WeightHabitProps = {
  userId: string;
  goalWeight?: number;
};

export function WeightHabit({ userId, goalWeight }: WeightHabitProps) {
  const theme = useTheme();
  const toast = useToast();
  const today = new Date().toISOString().slice(0, 10);

  // Solo obtenemos create desde el hook para crear nuevo registro
  const { create, loading: loadingCreate, error: errorCreate } = useWeightHistory();

  const [currentWeight, setCurrentWeight] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const progress = goalWeight
    ? Math.min(((currentWeight as number) / goalWeight) * 100, 100)
    : 0;

  async function handleSave() {
    if (currentWeight === "" || isNaN(Number(currentWeight))) return;

    setIsSaving(true);
    try {
      await create({
        userId,
        date: today,
        weight: Number(currentWeight),
        notes: notes || "",
      });
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
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Box
        position="relative"
        w="64px"
        h="64px"
        cursor="pointer"
        onClick={onOpen}
        userSelect="none"
      >
        {isSaving ? (
          <Spinner size="lg" color="blue.500" />
        ) : (
          <CircularProgress
            value={progress}
            size="64px"
            thickness="6px"
            color="blue.500"
            trackColor={theme.colors.gray[200]}
            capIsRound
          />
        )}
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
        <Text
          position="absolute"
          bottom="-20px"
          left="50%"
          transform="translateX(-50%)"
          fontSize="sm"
          color="blue.600"
        >
          Peso
        </Text>
      </Box>

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
                {errorCreate}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
              isLoading={isSaving}
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
