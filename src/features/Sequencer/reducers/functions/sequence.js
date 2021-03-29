export const getNoteTally = (pattern) => {
  let noteTally = {
    '-1': { count: 0, empty: true },
    total: { count: 0, empty: true },
  };
  pattern[0].forEach((_, i) => {
    noteTally[i] = { count: 0, empty: true };
  });
  pattern.forEach((step) => {
    step.forEach((sample, i) => {
      if (sample.noteOn) {
        noteTally[i].count++;
        noteTally.total.count++;
      }
    });
  });
  for (let i = 0; i < pattern[0].length; i++) {
    if (noteTally[i].count) {
      noteTally[i].empty = false;
      noteTally.total.empty = false;
    }
  }
  return noteTally;
};

export const inc = (noteTally, sample) => {
  noteTally[sample].count++;
  noteTally[sample].empty = false;
  noteTally.total.count++;
  noteTally.total.count = false;
};

export const dec = (noteTally, sample) => {
  noteTally[sample].count--;
  if (noteTally[sample].count === 0) noteTally[sample].empty = true;
  noteTally.total.count--;
  if (noteTally.total.count === 0) noteTally.total.empty = true;
};

export const initSampleStep = (sample) => {
  sample.noteOn = false;
  sample.notes.length = 0;
  sample.notes.push(INIT_NOTE());
};

const INIT_NOTE = () =>
  Object.assign({}, { pitch: 'C2', velocity: 1, length: 1 });

const INIT_SAMPLE = () =>
  Object.assign(
    {},
    {
      noteOn: false,
      notes: [INIT_NOTE()],
    }
  );

const INIT_PATTERN = () => {
  let pattern = [];
  let samples = [];
  for (let i = 0; i < 9; i++) {
    samples.push(INIT_SAMPLE());
  }
  for (let i = 0; i < 64; i++) {
    pattern.push(Object.assign([], samples));
  }
  return Object.assign([], pattern);
};

export const deepCopyPattern = (pattern) =>
  Object.assign(
    [],
    pattern.map((step) =>
      Object.assign(
        [],
        step.map((sample) =>
          Object.assign(
            {},
            {
              noteOn: sample.noteOn,
              notes: Object.assign(
                [],
                sample.notes.map((note) => Object.assign({}, note))
              ),
            }
          )
        )
      )
    )
  );
