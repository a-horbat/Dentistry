import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '@material-ui/core/Fab';
import CheckboxIn from '../../../components/Icons/CheckboxIn';
import CheckboxOff from '../../../components/Icons/CheckboxOff';

const AddUnit = ({ addUnit, addUnitOpenControls }) => {
  const [unit, setUnit] = useState({
    unitType: [
      { _id: 1, name: 'Weight', value: false },
      { _id: 2, name: 'Volume', value: false },
      { _id: 3, name: 'Other', value: false },
    ],
    unitName: [
      { _id: 1, name: 'Bottles', value: false },
      { _id: 2, name: 'Pieces', value: false },
      { _id: 4, name: 'Cans', value: false },
    ],
    quantity: 1,
  });

  const [sliderValue, setSliderValue] = useState(1);

  const sliderChange = (event, newValue) => {
    let settingValue = newValue;
    if (newValue > 10 && newValue <= 20) settingValue = (newValue - 9) * 10;
    if (newValue > 19 && newValue <= 28) settingValue = (newValue - 18) * 100;
    if (newValue > 28 && newValue <= 40) settingValue = (newValue - 27) * 1000;

    setSliderValue(newValue);
    setUnit({ ...unit, ['quantity']: settingValue });
  };

  const getSliderValue = quantity => {
    //console.log(quantity);
    if (quantity <= 10) return quantity;
    if (quantity > 10 && quantity < 100)
      return (quantity - (quantity % 10)) / 10 + 9;
    if (quantity > 100 && quantity < 1000)
      return (quantity - (quantity % 100)) / 100 + 18;
    if (quantity > 1000 && quantity < 10000)
      return (quantity - (quantity % 1000)) / 1000 + 27;

    return quantity;
  };

  const unitChange = (section, name) => {
    const obj = unit;
    obj[section].forEach(el => {
      if (el.name === name) el.value = true;
      else el.value = false;
    });
    setUnit({ ...obj });
  };

  const closeUnit = () => {
    addUnitOpenControls.setFalse();
  };

  const submit = () => {
    let unitType = '';
    let unitName = '';

    unit.unitType.forEach(el => {
      if (el.value === true) unitType = el.name;
    });

    unit.unitName.forEach(el => {
      if (el.value === true) unitName = el.name;
    });

    const obj = {
      unitType: unitType,
      unitName: unitName,
      quantity: unit.quantity,
    };

    addUnit(obj);
    addUnitOpenControls.setFalse();
  };

  const quantityChange = event => {
    const inputValue = event.target.value;
    const lastChar = inputValue.substr(inputValue.length - 1);
    const regex = /^[0-9]+$/;

    let dotCount = 0;
    if (inputValue) {
      inputValue.split('').forEach(el => {
        if (el === '.') dotCount++;
      });
    }

    if (
      lastChar.match(regex) ||
      inputValue === '' ||
      (lastChar === '.' && dotCount < 2)
    ) {
      setUnit({ ...unit, ['quantity']: inputValue });
      const sliderNewValue = getSliderValue(parseInt(inputValue));
      setSliderValue(sliderNewValue);
    }
  };

  return (
    <>
      <DialogContent>
        <span className="drawer-notch" />
        <Box flexGrow={1}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: 22,
            }}
          >
            Add unit
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Unit Type
          </Typography>
        </Box>
        <List>
          {unit
            ? unit.unitType.map(item => (
                <UnitItem
                  section="unitType"
                  itemName={item.name}
                  itemValue={item.value}
                  key={item._id}
                  unitChange={unitChange}
                />
              ))
            : null}
        </List>
        <Divider />
        <Box mt={2}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Unit
          </Typography>
        </Box>
        <List disablePadding>
          {unit
            ? unit.unitName.map(item => (
                <UnitItem
                  section="unitName"
                  itemName={item.name}
                  itemValue={item.value}
                  key={item._id}
                  unitChange={unitChange}
                />
              ))
            : null}
        </List>
        <Box mt={2} />
        <Divider />
        <Box mt={2}>
          <Typography
            style={{
              color: '#BDBDBD',
              fontSize: 13,
            }}
          >
            Quantity
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          style={{ width: '100%' }}
        >
          <Box
            style={{ width: '30%' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <List>
              <ListItem divider>
                <InputBase
                  value={unit.quantity}
                  inputProps={{ 'aria-label': 'naked' }}
                  onChange={quantityChange}
                />
              </ListItem>
            </List>
          </Box>
          <Box my={5} px={2} style={{ width: '70%' }}>
            <Slider
              name="defaultThreshold"
              defaultValue={1}
              onChange={sliderChange}
              value={sliderValue}
              min={1}
              max={37}
              aria-labelledby="continuous-slider"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="bottom-actions">
        <Fab color="secondary" onClick={closeUnit}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab color="secondary" onClick={submit}>
          <CheckIcon />
        </Fab>
      </DialogActions>
      <Box mb={4} />
    </>
  );
};

export const UnitItem = ({ itemName, itemValue, unitChange, section }) => {
  return (
    <ListItem
      onClick={() => unitChange(section, itemName)}
      style={{ padding: 8 }}
    >
      <Box
        style={{ width: '100%' }}
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography>{itemName}</Typography>
        {itemValue ? <CheckboxIn /> : <CheckboxOff />}
      </Box>
    </ListItem>
  );
};

export default AddUnit;
