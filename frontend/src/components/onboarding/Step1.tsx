import { Box, Button, Text, Stack } from '@chakra-ui/react';

interface Step1Props {
  data: {
    gender: string;
  };
  update: (fields: Partial<any>) => void;
}

// Mapeo de valor interno -> texto visible
const genderLabels: Record<string, string> = {
  male: "Hombre",
  female: "Mujer",
};

export function Step1({ data, update }: Step1Props) {
  const isSelected = (val: string) => data.gender === val;

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
          Elige tu género
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
        {Object.entries(genderLabels).map(([value, label]) => (
          <Button
            key={value}
            onClick={() => update({ gender: value })}
            bg={isSelected(value) ? 'primary.900' : 'white'}
            color={isSelected(value) ? 'white' : 'black'}
            border="1px solid"
            borderColor={isSelected(value) ? 'primary.900' : 'gray.400'}
            _hover={{
              bg: isSelected(value) ? 'primary.800' : 'gray.100',
            }}
            w="full"
            px={8}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
