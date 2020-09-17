import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useMutation } from '@apollo/react-hooks';

const UpdateMultipleContext = createContext({
  isEditingMultiple: false,
  multipleUpdates: {},
  isUpdating: false,
  error: '',
  setIsEditingMultiple: (u) => {
    console.warn('UpdateMultipleProvider not found');
  },
  setMultipleUpdates: (u) => {
    console.warn('UpdateMultipleProvider not found');
  },
  setMultipleUpdate: (id, key, value) => {
    console.warn('UpdateMultipleProvider not found');
  },
  onSaveMultiple: () => {},
  onCancelMultiple: () => {},
});

export const useUpdateMultiple = () => useContext(UpdateMultipleContext);

export const UpdateMultipleProvider = React.memo(
  ({ children, updateMultipleDocument, verifyUpdate }) => {
    const [isEditingMultiple, setIsEditingMultiple] = useState(false);
    const [multipleUpdates, setMultipleUpdates] = useState({});
    const [localError, setLocalError] = useState('');
    const [update, { loading: isUpdating, error }] = useMutation(
      updateMultipleDocument,
    );
    const value = useMemo(
      () => ({
        error: localError ?? error?.message ?? '',
        isUpdating,
        multipleUpdates,
        isEditingMultiple,
        setIsEditingMultiple,
        setMultipleUpdates,
        setMultipleUpdate: (id, key, value) => {
          setMultipleUpdates((u) => ({
            ...u,
            [id]: { ...u?.[id], [key]: value },
          }));
        },
        onSaveMultiple: async () => {
          try {
            setLocalError('');
            const options = await verifyUpdate(multipleUpdates);
            await update(options);
            setIsEditingMultiple(false);
          } catch (e) {
            setLocalError(e.message);
          }
        },
        onCancelMultiple: () => {
          setLocalError('');
          setIsEditingMultiple(false);
          setMultipleUpdates({});
        },
      }),
      [
        isEditingMultiple,
        setIsEditingMultiple,
        multipleUpdates,
        setMultipleUpdates,
        localError,
        setLocalError,
        update,
        isUpdating,
        error,
      ],
    );
    useEffect(() => {
      if (isEditingMultiple) {
        const saveOnEnter = onEnterPress(value.onSaveMultiple);
        window.addEventListener('keypress', saveOnEnter);
        return () => window.removeEventListener('keypress', saveOnEnter);
      }
    }, [isEditingMultiple, multipleUpdates]);
    return (
      <UpdateMultipleContext.Provider value={value}>
        {children}
      </UpdateMultipleContext.Provider>
    );
  },
);

const onEnterPress = (fn) => (ev) => {
  if (ev.which === 13) {
    fn();
  }
};
