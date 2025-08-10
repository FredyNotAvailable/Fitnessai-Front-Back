import { Box, Button, Text, Stack } from '@chakra-ui/react';

interface Step6Props {
  data: {
    experience: string;
  };
  update: (fields: Partial<any>) => void;
}

const experienceOptions = [
  { value: 'beginner', label: 'Estoy empezando' },
  { value: 'intermediate', label: 'Tengo algo de experiencia' },
  { value: 'advanced', label: 'Llevo entrenando mucho tiempo' },
];

export function Step6({ data, update }: Step6Props) {
  const selectedExperience = data.experience || '';

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
          ¿Cuál es tu nivel de experiencia?
        </Text>
        <Text fontSize="md" mb={6} color="gray.600" textAlign="center">
          Esto nos ayudará a crear el plan perfecto para ti
        </Text>
      </Box>

      <Stack
        direction="column"   // vertical
        spacing={4}
        align="center"
        flexGrow={1}
        justifyContent="center"
        w="full"
      >
        {experienceOptions.map((option) => {
          const isSelected = selectedExperience === option.value;
          return (
            <Button
              key={option.value}
              onClick={() => update({ experience: option.value })}
              bg={isSelected ? 'primary.900' : 'white'}
              color={isSelected ? 'white' : 'black'}
              border="1px solid"
              borderColor={isSelected ? 'primary.900' : 'gray.400'}
              _hover={{
                bg: isSelected ? 'primary.800' : 'gray.100',
              }}
              w="full"
              px={8}
              whiteSpace="nowrap"   // evita salto de línea
              textAlign="center"
            >
              {option.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
