import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Step4Props {
  data: {
    birthdate: string; // Formato ISO: yyyy-mm-dd
  };
  update: (fields: Partial<any>) => void;
}

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

export function Step4({ data, update }: Step4Props) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (data.birthdate) {
      const [y, m, d] = data.birthdate.split('-');
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [data.birthdate]);

  useEffect(() => {
    if (year && month && day) {
      const mm = month.padStart(2, '0');
      const dd = day.padStart(2, '0');
      const newBirthdate = `${year}-${mm}-${dd}`;
      if (newBirthdate !== data.birthdate) {
        update({ birthdate: newBirthdate });
      }
    }
  }, [year, month, day, update, data.birthdate]);

  const displayDay = day ? String(parseInt(day, 10)) : 'Día';
  const displayMonth = month ? months[parseInt(month, 10) - 1] : 'Mes';
  const displayYear = year || 'Año';

  return (
    <Box w="full" maxW="sm" mx="auto">
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={2}
        color="primary.900"
        textAlign="center"
      >
        ¿Cuándo naciste?
      </Text>
      <Text fontSize="md" mb={6} color="gray.600" textAlign="center">
        Esto se usará para calibrar tu plan personalizado
      </Text>

      <HStack
        justify="center"
        spacing={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
      >
        {/* Día */}
        <VStack spacing={1} align="start" maxW="100px" w="full">
          <Text fontWeight="bold" color="primary.900">
            Día
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.400"
              textAlign="left"
            >
              {displayDay}
            </MenuButton>
            <MenuList maxH="160px" overflowY="auto" w="full" minW="0">
              {days.map(d => (
                <MenuItem key={d} onClick={() => setDay(d.padStart(2, '0'))}>
                  {d}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>

        {/* Mes */}
        <VStack spacing={1} align="start" maxW="130px" w="full">
          <Text fontWeight="bold" color="primary.900">
            Mes
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.400"
              textAlign="left"
            >
              {displayMonth}
            </MenuButton>
            <MenuList maxH="160px" overflowY="auto" w="full" minW="0">
              {months.map((m, i) => (
                <MenuItem key={m} onClick={() => setMonth(String(i + 1).padStart(2, '0'))}>
                  {m}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>

        {/* Año */}
        <VStack spacing={1} align="start" maxW="100px" w="full">
          <Text fontWeight="bold" color="primary.900">
            Año
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.400"
              textAlign="left"
            >
              {displayYear}
            </MenuButton>
            <MenuList maxH="160px" overflowY="auto" w="full" minW="0">
              {years.map(y => (
                <MenuItem key={y} onClick={() => setYear(y)}>
                  {y}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>
      </HStack>
    </Box>
  );
}
