import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Box,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type UserReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  report: {
    aiSummary: string;
  };
};

export const UserReportModal: React.FC<UserReportModalProps> = ({ isOpen, onClose, report }) => {
  const { aiSummary } = report;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent height="90vh" display="flex" flexDirection="column">
        <ModalHeader>Resumen AI</ModalHeader>
        <ModalCloseButton />
        <ModalBody flex="1" p={0} display="flex" flexDirection="column">
          <VStack spacing={4} align="stretch" flex="1" p={4} overflowY="auto">
            <Box
              as="div"
              flex="1"
              width="100%"
              overflowX="auto"
              overflowY="auto"
              whiteSpace="pre-wrap"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ node, ...props }) => (
                    <div style={{ overflowX: "auto" }}>
                      <table {...props} style={{ width: "100%", borderCollapse: "collapse" }} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th style={{ border: "1px solid #ccc", padding: "4px" }} {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td style={{ border: "1px solid #ccc", padding: "4px" }} {...props} />
                  ),
                }}
              >
                {aiSummary}
              </ReactMarkdown>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
