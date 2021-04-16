import { setFlashInfo } from 'App/reducers/appSlice';
import { MODES } from 'App/reducers/editorSlice';
import { startAnalyzer, stopAnalyzer } from 'App/reducers/functions/animations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Display = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const transportStarted = useSelector((state) => state.tone.transportState === 'started');
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const mode = useSelector((state) => state.editor.mode);

  const tapping = mode === MODES.TAP || mode === MODES.TAP_RECORD;

  useEffect(() => {
    const spBorder = document.getElementById('sampleBtnsBorder');
    if (!spBorder) return;
    if (tapping) spBorder.classList.add('highlight');
    if (!tapping) spBorder.classList.remove('highlight');
  }, [tapping]);

  useEffect(() => {
    if (splitSamplePanel || !analyzerOn) return;
    const analyzer = document.getElementById('analyzer');
    if (!analyzer) return;
    if (mode === MODES.INIT || tapping) analyzer.style.opacity = 1;
    if (mode !== MODES.INIT && !tapping) analyzer.style.opacity = 0;
  });

  useEffect(() => {
    if (!analyzerOn) return;
    if (transportStarted) startAnalyzer();
    else if (!transportStarted && !tapping) stopAnalyzer();
  }, [analyzerOn, tapping, transportStarted]);

  useEffect(() => {
    if (!transportStarted) {
      dispatch(setFlashInfo(true));
      setTimeout(() => dispatch(setFlashInfo(false)), 0);
    }
  }, [dispatch, transportStarted]);

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);

  return null;
};
