import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileCard } from './profile/ProfileCard';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Sesión cerrada correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      toast({
        title: 'No se pudo cerrar sesión. Intenta nuevamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        as="nav"
        bg="primary.900"
        px={4}
        py={2}
        justify="flex-end"
        align="center"
        boxShadow="md"
      >
        <Button
          colorScheme="primary"
          variant="solid"
          mr={4}
          onClick={onOpen}
          _hover={{ bg: 'primary.700' }}
          color="white"
        >
          Mi Perfil
        </Button>

        <Button
          colorScheme="primary"
          variant="solid"
          onClick={handleLogout}
          _hover={{ bg: 'primary.700' }}
          color="white"
        >
          Cerrar sesión
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        // size={{ base: "full", md: "md" }}  // full en móvil, md en desktop
      >
        <ModalOverlay />
        <ModalContent
          mx={0}
          w={{ base: "100vw", md: "600px" }}      // <-- ancho: 100% móvil, 700px desktop
          maxW="100vw"
          h={{ base: "100vh", md: "auto" }}      // 100vh en móvil, auto en desktop
          maxH={{ base: "100vh", md: "none" }}
          bg="white"
          p={6}
          rounded={{ base: 0, md: "xl" }}        // sin bordes redondeados en móvil
          shadow={{ base: "none", md: "lg" }}    // sin sombra en móvil
          borderWidth="1px"
          borderColor="gray.200"
        >
          <ModalCloseButton />
          <ModalBody p={0} h="100%">
            <ProfileCard />
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};

export default Navbar;
