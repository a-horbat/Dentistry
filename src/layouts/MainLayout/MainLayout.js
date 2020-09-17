import React from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import cn from 'classnames';
import { Grid } from '@material-ui/core';
import Sidebar from '../../components/Sidebar';
import { SidebarProvider } from '../../utils/sidebarContext';
import MainLayoutStyles from './MainLayoutStyles';
import Navigation from '../../components/Navigation';
import NavigationSearch from '../../components/NavigationSearch';

export const MainLayoutHeader = React.memo((props) => {
  const {
    editMode,
    title,
    titleStyles,
    titleComponent = null,
    add,
    edit,
    searchText,
    setSearchText,
    filterOpen,
    filterControls,
    viewExpand,
    changeView,
    changeViewValue,
    placeholder,
    addButtonText,
    filter,
  } = props;
  return (
    <Navigation
      title={title}
      titleStyles={titleStyles}
      titleComponent={titleComponent}
      add={add}
      edit={edit}
      shortVersion={false}
      editMode={editMode}
      viewExpand={viewExpand}
      changeView={changeView}
      changeViewValue={changeViewValue}
      placeholder={placeholder}
      addButtonText={addButtonText}
      filter={filter}
      // filterControls={filterControls}
    />
  );
});

const MainLayout = React.memo(({ children }) => {
  const classes = MainLayoutStyles();

  const [open, mainController] = useBooleanControls(true);

  return (
    <SidebarProvider value={open}>
      <Box
        className={cn(classes.container, { [classes.container_open]: open })}
      >
        <Sidebar mainController={mainController} openMenu={open} />

        {children}
      </Box>
    </SidebarProvider>
  );
});

export default MainLayout;
