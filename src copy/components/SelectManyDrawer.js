import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useDisableScroll } from './hooks';
import isEqual from 'lodash/isEqual';
import CheckBoxIn from './Icons/CheckboxIn';
import CheckboxOff from './Icons/CheckboxOff';

export const getIN = selected => {
  return Object.keys(selected).filter(k => selected[k]);
};

export const useSelectManyControls = initial => {
  const [selected, setSelected] = useState(initial);
  const IN = useMemo(() => getIN(selected), [selected]);
  const isFilterUsed = !isEqual(selected, initial);
  return { initial, selected, setSelected, isFilterUsed, IN };
};

export const createFilterContext = initialFilters => {
  const Context = createContext({
    initial: initialFilters,
    selected: initialFilters,
    IN: getIN(initialFilters),
    isFilterUsed: false,
    setSelected: () => console.warn('Filter Provider not initialized'),
  });
  const Provider = ({ children, initial = initialFilters }) => {
    const value = useSelectManyControls(initial);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  return {
    Provider,
    useContext: () => useContext(Context),
  };
};

const getFilters = options => {
  const obj = {};
  options.forEach(el => {
    obj[el.name] = true;
  });
  return obj;
};

export const SelectManyDrawer = ({
  id = 'select-many',
  name,
  loading,
  selected,
  setSelected,
  options,
  controls,
  open,
  initial,
}) => {
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);
  const [filters, setFilters] = useState(
    Object.keys(selected).length !== 0 ? selected : getFilters(options),
  );
  const [tempFilters, setTempFilters] = useState(selected); //it stores state when drawer just open and rewrite filters if changes was canceled

  const cancelChanges = () => {
    setFilters({ ...tempFilters });
    setSubmitLocked.setTrue();
  };

  const onChange = (name, value) => {
    const obj = { ...filters, [name]: value };
    setFilters(obj);
    lockingChange(obj);
  };

  useEffect(() => {
    setFilters(
      Object.keys(selected).length !== 0 ? selected : getFilters(options),
    );
  }, [selected]);

  const changeSelected = f => {
    controls.setFalse();
    setSelected(f);
  };

  useDisableScroll(open);

  const handleResetClick = () => {
    if (initial) setFilters({ ...initial });
    else {
      if (options) {
        const obj = {};
        options.forEach(el => {
          obj[el.name] = true;
        });
        setFilters(obj);
      }
    }
    setSubmitLocked.setFalse();
  };

  const lockingChange = obj => {
    if (objCheck(obj)) setSubmitLocked.setFalse();
    else setSubmitLocked.setTrue();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => {
        controls.setFalse();
        cancelChanges();
      }}
      onOpen={controls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'drawer-radius container h-80vh' }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <DialogTitle id="alert-dialog-title">
          <span className="drawer-notch" />
          {name}
        </DialogTitle>
        <Box>
          <a
            style={{
              paddingRight: 20,
              marginTop: 25,
              color: '#21C5C4',
              fontSize: 17,
            }}
            onClick={handleResetClick}
          >
            Reset Defaults
          </a>
        </Box>
      </Box>
      <DialogContent style={{ paddingRight: 0, paddingLeft: 0 }}>
        {loading && <LinearProgress />}
        <SelectManyList
          id={id}
          onSubmit={changeSelected}
          options={options}
          onChange={onChange}
          filters={filters}
          setSubmitLocked={setSubmitLocked}
        />
        <div style={{ paddingBottom: 120 }} />
      </DialogContent>
      <DialogActions className="bottom-actions">
        <Fab
          color="secondary"
          onClick={() => {
            controls.setFalse();
            cancelChanges();
          }}
        >
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab
          color="secondary"
          onClick={() => {
            controls.setFalse();
            setSubmitLocked.setTrue();
            setSelected({ ...filters });
            setTempFilters({ ...filters }); //update of temp state
          }}
          form={id}
          type="submit"
          disabled={isSubmitLocked}
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </SwipeableDrawer>
  );
};

export const SelectManyList = ({
  id,
  onSubmit,
  options,
  filters,
  setSubmitLocked,
  onChange,
}) => {
  return (
    <form
      id={id}
      onSubmit={ev => {
        ev.preventDefault();
        onSubmit(filters);
      }}
    >
      <List>
        {options.map(option => (
          <ListItem
            button
            key={option.name}
            style={{ paddingLeft: 24, paddingRight: 24 }}
            onClick={() => {
              onChange(
                option.value ? option.value : option.name,
                !filters[option.value ? option.value : option.name],
              );
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" flexGrow={1} alignItems="center">
                {option.icon} <Typography>{option.name}</Typography>
              </Box>
              {filters[option.value ? option.value : option.name] || false ? (
                <CheckBoxIn />
              ) : (
                <CheckboxOff />
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </form>
  );
};

export const objCheck = obj => {
  let res = false;
  for (let key in obj) {
    if (obj[key]) res = true;
  }
  return res;
};

/*
<FormControlLabel
              classes={{ root: "filter-label" }}
              control={
                <Checkbox
                  color="primary"
                  value={option.value || option.name}
                  checked={filters[option.value || option.name] || false}
                  onChange={ev =>
                    onChange(option.value || option.name, ev.target.checked)
                  }
                />
              }
              labelPlacement="start"
              label={
                <Box display="flex" flexGrow={1} alignItems="center">
                  {option.icon} <Typography>{option.name}</Typography>
                </Box>
              }
            />
*/
