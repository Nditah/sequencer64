import { useHistory } from 'react-router';

export const PATHS = {
  BASE: '/sequencer/session',
  LOAD: '/sequencer/session/load',
  SAVE: '/sequencer/session/save',
  CHANGE_KIT: '/sequencer/session/kits',
  LOGIN: '/sequencer/session/login',
};

export const useGoTo = () => {
  const history = useHistory();
  const goToFunc = (path, cb) => {
    history.push(path);
    document.getElementById('root').scrollTop = 0;
    if (cb && !(cb instanceof Event)) {
      cb();
    }
  };
  const goTo = {};
  goTo.base = (cb) => goToFunc(PATHS.BASE, cb);
  goTo.load = (cb) => goToFunc(PATHS.LOAD, cb);
  goTo.save = (cb) => goToFunc(PATHS.SAVE, cb);
  goTo.changeKit = (cb) => goToFunc(PATHS.CHANGE_KIT, cb);
  goTo.login = (cb) => goToFunc(PATHS.LOGIN, cb);

  return goTo;
};
