import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import EntityTable from './EntityTable';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

const WideScreenList = () => {
  const temporaryData = [
    { id: 1, name: 'entity1' },
    { id: 2, name: 'entity2' },
    { id: 3, name: 'entity3' },
    { id: 4, name: 'entity4' },
    { id: 5, name: 'entity5' },
    { id: 6, name: 'entity6' },
    { id: 7, name: 'entity7' },
  ];

  const [entityList, setEntityList] = useState(temporaryData);
  const [selectedEntity, setSelectedEntity] = useState('');

  const itemClick = id => {
    setSelectedEntity(id);
  };

  const close = () => {
    setSelectedEntity('');
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" mt={1}>
      <EntityTable />
    </Box>
  );
};

export default WideScreenList;

const EntityList = ({ itemClick, entityList }) => {
  return (
    <Box width="100%">
      <List subheader={<li />}>
        {entityList.map(item => {
          return (
            <ListItem key={item.id} onClick={() => itemClick(item.id)}>
              <Box border={1} width="100%">
                <Typography align="center">{item.name}</Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const EntityDetail = ({ selectedEntity, close }) => {
  return (
    <Box width="100%">
      <Fade in={!!selectedEntity} timeout={500}>
        <Box>
          <b>Entity detail №{selectedEntity}</b>
          <Button onClick={close}>Close</Button>
        </Box>
      </Fade>
    </Box>
  );
};

/*
<EntityList itemClick={itemClick} entityList={entityList} />
      {
        !!selectedEntity ? <EntityDetail selectedEntity={selectedEntity} close={close} /> : null 
      }
*/
