import {
  Box,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';
import { InitialProfileWizard } from '../components/onboarding/InitialProfileWizard';

const Register = () => {
  return (
    <Flex h="100vh" align="center" justify="center">
      {/* Izquierda: imagen */}
      <Box flex="1" display={{ base: 'none', md: 'block' }}>
        <Image
          src="https://i.pinimg.com/1200x/f5/51/48/f55148ad2ef92de8597008b60bcd29a8.jpg"
          alt="Imagen de bienvenida"
          objectFit="cover"
          height="100vh"
          width="100%"
        />
      </Box>

      {/* Derecha: columna con título y wizard */}
      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="center"
        p={{ base: 4, md: 8 }}
        bg="white"
        h="100vh"
        overflow="hidden"
      >
        <Heading size="xl" color="primary.900" mb={10} textAlign="center">
          Fitness Started
        </Heading>

        {/* Contenedor con ancho responsivo y scroll interno */}
        <Box
          maxW={{ base: '90vw', md: '500px' }}
          w="full"
          overflowY="auto"
          maxHeight="100%"
        >
          <InitialProfileWizard />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
