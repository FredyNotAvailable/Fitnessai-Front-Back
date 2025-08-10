import {
  Box,
  Text,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';

interface Step3Props {
  data: {
    height: number;
    weight: number;
  };
  update: (fields: Partial<any>) => void;
}

const heightOptions = Array.from({ length: 71 }, (_, i) => (140 + i).toString());
const weightOptions = Array.from({ length: 111 }, (_, i) => (40 + i).toString());

export function Step3({ data, update }: Step3Props) {
  return (
    <Box w="full" maxW="sm" mx="auto">
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={2}
        color="primary.900"
        textAlign="center"
      >
        Altura & Peso
      </Text>
      <Text fontSize="md" mb={6} color="gray.600" textAlign="center">
        Esto se usará para calibrar tu plan personalizado
      </Text>

      <HStack
        spacing={6}
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        align="center"
      >
        {/* Selector Altura */}
        <VStack spacing={1} align="start" maxW="120px" w="full">
          <Text fontWeight="bold" color="primary.900">
            Altura (cm)
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.400"
              textAlign="left"
              color={data.height ? 'black' : 'gray.400'}
            >
              {data.height ? `${data.height} cm` : 'Selecciona'}
            </MenuButton>
            <MenuList maxH="160px" overflowY="auto" w="full" minW="120px">
              {heightOptions.map((h) => (
                <MenuItem key={h} onClick={() => update({ height: h })}>
                  {h} cm
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>

        {/* Selector Peso */}
        <VStack spacing={1} align="start" maxW="120px" w="full">
          <Text fontWeight="bold" color="primary.900">
            Peso (kg)
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.400"
              textAlign="left"
              color={data.weight ? 'black' : 'gray.400'}
            >
              {data.weight ? `${data.weight} kg` : 'Selecciona'}
            </MenuButton>
            <MenuList maxH="160px" overflowY="auto" w="full" minW="120px">
              {weightOptions.map((w) => (
                <MenuItem key={w} onClick={() => update({ weight: w })}>
                  {w} kg
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>
      </HStack>
    </Box>
  );
}
