import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import EntityTable from './EntityTable';
import Navigation from './Navigation';
import NavigationSearch from './NavigationSearch';

const WideScreenList = ({
  headCells,
  rows,
  editModeControls,
  editMode,
  //---------------------
  SplitDetail,
  Detail,
  //-------------------
  title,
  add,
  edit,
  filterOpen,
  filterControls,
}) => {
  const [showSplit, setShowSplit] = useState(false);
  const [showOnlyDetail, setShowOnlyDetail] = useState(false);
  const handleSplit = () => setShowSplit(true);
  const handleCancelSplit = () => setShowSplit(false);
  const handleShowOnlyDetail = () => setShowOnlyDetail(true);
  const handleShowSplitScreen = () => setShowOnlyDetail(false);

  const split = showSplit ? true : false;

  const header = () => {
    return (
      <Navigation
        title={title}
        add={add}
        edit={edit}
        shortVersion={showSplit}
        editMode={editMode}
        handleCancelSplit={handleCancelSplit}
      >
        <NavigationSearch
          filterOpen={filterOpen}
          filterControls={filterControls}
          shortVersion={showSplit}
          editMode={editMode}
        />
      </Navigation>
    );
  };

  return (
    <>
      {!showOnlyDetail ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Box
            width={`${split ? '1%' : '100%'}`}
            display="flex"
            justifyContent="flex-start"
            mt={2}
            style={{
              flex: 1,
              flexDirection: 'column',
              transition: 'width 225ms',
            }}
          >
            <Box>{header}</Box>
            <EntityTable
              handleSplit={handleSplit}
              headCells={headCells}
              rows={rows}
              editModeControls={editModeControls}
              editMode={editMode}
              test={'asd'}
            />
          </Box>
          {showSplit && (
            <SplitDetail
              handleShowOnlyDetail={handleShowOnlyDetail}
              handleShowSplitScreen={handleCancelSplit}
            />
          )}
        </Box>
      ) : (
        <Detail
          showOnlyDetail={showOnlyDetail}
          handleShowSplitScreen={handleShowSplitScreen}
        />
      )}
    </>
  );
};

export default WideScreenList;
