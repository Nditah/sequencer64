import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginPage } from 'App/Login/LoginPage';
import { SequencerPage } from 'App/Sequencer/Sequencer';
import { StatusBar } from 'App/StatusBar/StatusBar';
import { ChangeKit } from './Sequencer/MainSection/ChangeKit';
import { LoadSave } from './Sequencer/LoadSave/LoadSave';
import { PATHS } from 'utils/useGoTo';
import { Preparing } from './shared/Preparing';

export const AppContent = () => {
  return (
    <>
      <Route path='/' exact render={() => <Redirect to={PATHS.BASE} />} />
      <Route path='/sequencer/:shared' component={SequencerPage} />
      <Route path={PATHS.CHANGE_KIT} component={ChangeKit} />
      <Route path={PATHS.LOAD} render={() => <LoadSave tab='load' />} />
      <Route path={PATHS.SAVE} render={() => <LoadSave tab='save' />} />
      <Route path={PATHS.LOGIN} component={LoginPage} />
      <div id='themesPortal' />
      <div id='fullScreenPortal' />
      <StatusBar />
      <Preparing />
    </>
  );
};
