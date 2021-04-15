import React, { useEffect, useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'App/Sequencer/MainSection/Grid/Grid';
import { SamplePanel } from 'App/Sequencer/SamplePanel/SamplePanel';
import { MenuBar } from 'App/Sequencer/MenuBar/MenuBar';
import { loadInitialSequence } from 'App/reducers/sequenceSlice';
// import { MobileConsole } from 'App/MobileConsole';
import { PATHS } from 'utils/hooks/useGoTo';
import { VisualPanel } from 'App/Sequencer/VisualPanel/VisualPanel';

export const SequencerPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const { shared } = useParams();
  const pathname = useLocation().pathname;
  const initialLoad = useSelector(
    (state) => state.sequence.present.initialLoad
  );
  useEffect(() => {
    if (initialLoad) {
      const path = pathname === PATHS.LOAD ? PATHS.LOAD : PATHS.BASE;
      const clearUrl = () => history.replace(path);
      dispatch(loadInitialSequence(shared, clearUrl));
    }
  }, [dispatch, history, initialLoad, pathname, shared]);

  useEffect(() => {
    if (!initialLoad)
      document.getElementById('preparingPortal').style.display = 'none';
  });

  const mainContainerHeight = useSelector(
    (state) => state.screen.dimensions.mainContainerHeight
  );

  // const initialLoad = true;
  const memo = useMemo(() => {
    const mainContainerStyle = { height: mainContainerHeight };
    const popupMenuPortalStyle = { maxHeight: mainContainerHeight };
    return initialLoad ? null : (
      <div id='sequencer'>
        <div className='mainContainer' style={mainContainerStyle}>
          <div id='main'>
            <Grid />
            {!splitSamplePanel && <VisualPanel />}
            <div id='changeKitPortal' />
            <div id='pastePatternPortal' />
            {/* <MobileConsole /> */}
          </div>
          <div id='samplePanel'>
            <SamplePanel />
          </div>
        </div>
        <div id='popupMenuPortal' style={popupMenuPortalStyle} />
        <MenuBar />
      </div>
    );
  }, [initialLoad, mainContainerHeight, splitSamplePanel]);
  return memo;
};
