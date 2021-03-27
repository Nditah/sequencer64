import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { StopIcon, StartIcon, PauseIcon } from '../../../../icons';
import { setStatus } from '../../../../reducers/appSlice';
import { changeBpm } from '../../reducers/sequenceSlice';
import * as Tone from 'tone';
import {
  pauseSequence,
  startSequence,
  stopSequence,
} from '../../reducers/toneSlice';
import { Kit } from '../../providers/Kit';

export const TransportPanel = () => {
  const dispatch = useDispatch();

  const { kitRef } = useContext(Kit);

  const transportState = useSelector((state) => state.tone.transportState);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);
  const bufferError = useSelector((state) => state.tone.bufferError);

  const bpm = useSelector((state) => state.sequence.present.bpm);
  useEffect(() => {
    setTempBpm(bpm);
  }, [bpm]);

  const [tempBpm, setTempBpm] = useState(bpm);

  let timerRef = useRef(null);

  const [ready, setReady] = useState(true);
  useEffect(() => {
    if (!ready && buffersLoaded) {
      setReady(true);
    }
  }, [ready, buffersLoaded]);

  // const [transportState, setTransportState] = useState(null);
  // useEffect(() => {
  //   console.log(Tone.Transport.emit('start'));
  // }, [transportState]);
  // document.addEventListener('start', () => {
  //   setTransportState('start');
  // });

  // document.addEventListener('pause', () => {
  //   setTransportState('pause');
  // });
  // document.addEventListener('stop', () => {
  //   setTransportState('stop');
  // });

  const transportMemo = useMemo(() => {
    // console.log('rendering: TransportPanel');

    const onChange = ({ target: { value } }) => {
      if (value.match(/\D/)) return;
      const newTempo = value > 300 ? 300 : value;
      setTempBpm(newTempo);
      if (newTempo !== tempBpm) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          dispatch(changeBpm(newTempo));
        }, 1000);
      }
    };

    const onStop = () => {
      if (Tone.Transport.state !== 'stopped') dispatch(stopSequence());
    };
    const onStart = () => {
      // if (bufferError) dispatch(setBufferError(false));
      if (Tone.Transport.state === 'started') {
        dispatch(pauseSequence());
      } else {
        setReady(false);
        dispatch(startSequence(kitRef.current));
      }
    };

    return (
      <div className='menu-items transport'>
        <div className='transport-wrapper'>
          <Button id='stop' classes='menu-btn' onClick={onStop}>
            <StopIcon />
            <label htmlFor='stop'>stop</label>
          </Button>
          <Button
            id='start'
            classes={!ready ? 'menu-btn flashing' : 'menu-btn'}
            disabled={!ready}
            onClick={onStart}
          >
            {transportState === 'started' ? <PauseIcon /> : <StartIcon />}
            <label htmlFor='start'>start</label>
          </Button>
          <div className='input'>
            <input id='bpm' type='tel' value={tempBpm} onChange={onChange} />
            <label htmlFor='bpm' id='bpm-label'>
              bpm
            </label>
          </div>
        </div>
      </div>
    );
  }, [bufferError, dispatch, ready, tempBpm, transportState]);
  return transportMemo;
};
