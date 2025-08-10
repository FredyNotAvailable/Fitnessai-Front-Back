import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Flex,
  Text,
  Link,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { login } from '../services/authService'; // <-- importar la función login centralizada
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async () => {
    try {
      await login(email, password); // <-- usar la función login del service
      toast({ title: "Sesión iniciada", status: "success", duration: 3000 });
      // Aquí puedes redirigir al usuario o hacer algo más
    } catch (error: any) {
      toast({ title: "Error", description: error.message, status: "error", duration: 5000 });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      {/* Izquierda: imagen que ocupa 50% */}
      <Box flex="1" display={{ base: 'none', md: 'block' }}>
        <Image
          src="https://i.pinimg.com/736x/23/57/40/235740a8d88f2799045babccbdb16879.jpg"
          alt="Imagen de bienvenida"
          objectFit="cover"
          height="100vh"
          width="100%"
        />
      </Box>

      {/* Derecha: columna con título y formulario */}
      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="center"
        p={8}
        bg="white"
      >
        <Heading size="xl" color="primary.900" mb={10} textAlign="center">
          Fitness Started
        </Heading>

        <Box maxW="sm" w="full" boxShadow="md" p={6} rounded="md">
          <Stack spacing={4}>
            <Heading size="md" textAlign="center" mb={4}>
              Iniciar sesión
            </Heading>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              bg="primary.900"
              _hover={{ bg: 'primary.700' }}
              color="white"
              w="full"
              onClick={handleLogin}
            >
              Iniciar sesión
            </Button>

            <Text fontSize="sm" textAlign="center">
              ¿No tienes cuenta?{' '}
              <Link as={RouterLink} to="/register" color="blue.500" fontWeight="bold">
                Regístrate
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
