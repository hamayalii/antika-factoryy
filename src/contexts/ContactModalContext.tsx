import { createContext, useContext, useState, ReactNode } from "react";

interface ContactModalContextType {
  isContactModalOpen: boolean;
  /** Pre-written inquiry text (Kurdish) shown in the modal and attached to WhatsApp links. */
  prefillMessage: string | null;
  openContactModal: (prefilledMessage?: string) => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState<string | null>(null);

  const openContactModal = (prefilledMessage?: string) => {
    const trimmed = prefilledMessage?.trim();
    setPrefillMessage(trimmed ? trimmed : null);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setPrefillMessage(null);
    setIsContactModalOpen(false);
  };

  return (
    <ContactModalContext.Provider
      value={{ isContactModalOpen, openContactModal, closeContactModal, prefillMessage }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}
