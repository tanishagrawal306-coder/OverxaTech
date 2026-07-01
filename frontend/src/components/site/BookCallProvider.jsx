import { createContext, useContext, useState, useCallback } from "react";

const BookCallContext = createContext({ open: false, openModal: () => {}, closeModal: () => {} });

export const BookCallProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <BookCallContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </BookCallContext.Provider>
  );
};

export const useBookCall = () => useContext(BookCallContext);
