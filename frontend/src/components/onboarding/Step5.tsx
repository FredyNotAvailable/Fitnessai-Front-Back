import { Box, Button, Text, Stack } from '@chakra-ui/react';

interface Step5Props {
  data: {
    goal: string;
  };
  update: (fields: Partial<any>) => void;
}

// Mapeo valor interno => etiqueta en español
const goalsMap: Record<string, string> = {
  'lose weight': 'Bajar de peso',
  'maintain': 'Mantener',
  'gain muscle': 'Subir de peso',
};

export function Step5({ data, update }: Step5Props) {
  const selectedGoal = data.goal || '';

  return (
    <Box display="flex" flexDirection="column" height="100%" w="full" maxW="sm" mx="auto">
      <Box>
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={2}
          color="primary.900"
          textAlign="center"
        >
          ¿Cuál es tu objetivo?
        </Text>
        <Text fontSize="md" mb={6} color="gray.600" textAlign="center">
          Esto se usará para calibrar tu plan personalizado
        </Text>
      </Box>

      <Stack
        direction="column"
        spacing={4}
        align="center"
        flexGrow={1}
        justifyContent="center"
      >
        {Object.entries(goalsMap).map(([value, label]) => {
          const isSelected = selectedGoal === value;
          return (
            <Button
              key={value}
              onClick={() => update({ goal: value })}
              bg={isSelected ? 'primary.900' : 'white'}
              color={isSelected ? 'white' : 'black'}
              border="1px solid"
              borderColor={isSelected ? 'primary.900' : 'gray.400'}
              _hover={{
                bg: isSelected ? 'primary.800' : 'gray.100',
              }}
              w="full"
              px={8}
            >
              {label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
