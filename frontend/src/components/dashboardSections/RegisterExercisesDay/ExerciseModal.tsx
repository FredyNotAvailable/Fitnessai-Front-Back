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
  Text,
  Box,
  SimpleGrid,
  useTheme,
  Badge,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useExerciseBases } from "../../../hooks/useExerciseBase";
import { useExerciseHistoriesByUserAndDate } from "../../../hooks/useExerciseHistory";

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  date: string;
  onSaved?: (data: {
    userId: string;
    exerciseBaseId: string;
    sets: number;
    reps: number;
    weight: number;
    notes: string;
  }) => void;
}


const categories = ["all", "chest", "back", "arm", "leg"] as const;
type Category = typeof categories[number];

export function ExerciseModal({ isOpen, onClose, userId, date, onSaved }: ExerciseModalProps) {
  const theme = useTheme();
  const toast = useToast();

  const { exerciseBases, loading: loadingExercises, error: errorExercises } = useExerciseBases();

  const {
    create,
    loading: saving,
    error: errorSaving,
  } = useExerciseHistoriesByUserAndDate(userId, date);

  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");

  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);
  const [notes, setNotes] = useState("");

  // Resetea inputs cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory("all");
      setSelectedExerciseId("");
      setSets(3);
      setReps(10);
      setWeight(0);
      setNotes("");
    }
  }, [isOpen]);

  const filteredExercises =
    selectedCategory === "all"
      ? exerciseBases
      : exerciseBases.filter((ex) => ex.category === selectedCategory);

const handleSubmit = async () => {
  if (!selectedExerciseId) {
    toast({
      title: "Selecciona un ejercicio",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  try {
    await create({
      userId,
      exerciseBaseId: selectedExerciseId,
      date,
      sets,
      reps,
      weight,
      notes,
    });
    if (onSaved) {
      onSaved({
        userId,
        exerciseBaseId: selectedExerciseId,
        sets,
        reps,
        weight,
        notes,
      });
    }
    onClose();
  } catch (err) {
    toast({
      title: "Error al registrar",
      description: (err instanceof Error) ? err.message : "Error inesperado",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    console.error("Error al guardar el ejercicio:", err);
  }
};


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      scrollBehavior="inside"
      motionPreset="slideInBottom"
      closeOnOverlayClick={!saving}
      closeOnEsc={!saving}
      blockScrollOnMount={false}
      returnFocusOnClose={false}
    >
      <ModalOverlay />
      <ModalContent
        maxH={{ base: "100vh", md: "770px" }}
        h={{ base: "100vh", md: "1000px" }}
        display="flex"
        flexDirection="column"
      >
        <ModalHeader>Registrar ejercicio</ModalHeader>
        <ModalCloseButton isDisabled={saving} />

        <ModalBody
          flex="1"
          display="flex"
          flexDirection="column"
          p={4}
          gap={4}
          overflow="hidden"
        >
          <Box mb={2}>
            <FormControl>
              <FormLabel>Filtrar por categoría</FormLabel>
              <Flex gap={2}>
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    cursor="pointer"
                    px={3}
                    py={1}
                    borderRadius="md"
                    colorScheme={selectedCategory === cat ? "blue" : "gray"}
                    onClick={() => setSelectedCategory(cat)}
                    textTransform="capitalize"
                    userSelect="none"
                  >
                    {cat}
                  </Badge>
                ))}
              </Flex>
            </FormControl>
          </Box>

          <Box
            flex="1"
            overflowY="auto"
            borderWidth="1px"
            borderRadius="md"
            p={3}
            mb={2}
            minHeight="300px"
          >
            {loadingExercises && <Text>Cargando ejercicios...</Text>}
            {errorExercises && <Text color="red.500">Error: {errorExercises}</Text>}

            {!loadingExercises && !errorExercises && (
              <SimpleGrid columns={2} spacing={3} minH="150px" maxH="100%">
                {filteredExercises.length === 0 && (
                  <Text>No hay ejercicios en esta categoría</Text>
                )}
                {filteredExercises.map((ex) => (
                  <Box
                    key={ex.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    cursor="pointer"
                    bg={selectedExerciseId === ex.id ? theme.colors.blue[100] : "white"}
                    _hover={{ bg: theme.colors.blue[50] }}
                    onClick={() => setSelectedExerciseId(ex.id)}
                    userSelect="none"
                  >
                    <Text fontWeight="bold" mb={1}>
                      {ex.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {ex.description}
                    </Text>
                    <Badge mt={2} colorScheme="purple" textTransform="capitalize" fontSize="xs">
                      {ex.category}
                    </Badge>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>

          <Box borderTop="1px solid" borderColor={theme.colors.gray[300]} pt={3}>
            <FormControl mb={4}>
              <Flex gap={4}>
                <Box flex="1">
                  <FormLabel>Series (sets)</FormLabel>
                  <NumberInput min={1} value={sets} onChange={(_, val) => setSets(val)}>
                    <NumberInputField />
                  </NumberInput>
                </Box>

                <Box flex="1">
                  <FormLabel>Repeticiones (reps)</FormLabel>
                  <NumberInput min={1} value={reps} onChange={(_, val) => setReps(val)}>
                    <NumberInputField />
                  </NumberInput>
                </Box>

                <Box flex="1">
                  <FormLabel>Peso (kg)</FormLabel>
                  <NumberInput min={0} value={weight} onChange={(_, val) => setWeight(val)}>
                    <NumberInputField />
                  </NumberInput>
                </Box>
              </Flex>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Notas</FormLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Comentarios adicionales"
                resize="vertical"
                rows={1}
                minHeight="40px"
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter mt={2}>
          <Button mr={3} onClick={onClose} isDisabled={saving}>
            Cancelar
          </Button>
<Button
  colorScheme="primary"
  onClick={handleSubmit}
  isDisabled={saving || !selectedExerciseId} // Simplificado para pruebas
  isLoading={saving}
>
  Guardar
</Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
