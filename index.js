function random(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function sample(arr, count) {
  if (count == null) {
    return arr[random(0, arr.length)];
  }
  return shuffle(arr).slice(0, count);
}

function shuffle(arr) {
  return [...arr].sort(() => {
    return Math.random() > 0.5 ? -1 : 1;
  });
}

const tasks = [
  { q: "2 ⋅ 2 =", s: "4", f: ["2", "3", "8", "6"] },
  { q: "2 ⋅ 3 =", s: "6", f: ["3", "5", "8", "7"] },
  { q: "2 ⋅ 4 =", s: "8", f: ["6", "7", "10", "12"] },
  { q: "2 ⋅ 5 =", s: "10", f: ["12", "8", "9", "7"] },
  { q: "2 ⋅ 6 =", s: "12", f: ["11", "10", "14", "8"] },
  { q: "2 ⋅ 7 =", s: "14", f: ["12", "13", "15", "17"] },
  { q: "2 ⋅ 8 =", s: "16", f: ["12", "14", "18", "20"] },
  { q: "2 ⋅ 9 =", s: "18", f: ["17", "16", "20", "21", "19"] },
  { q: "3 ⋅ 2 =", s: "6", f: ["4", "5", "7", "9"] },
  { q: "3 ⋅ 3 =", s: "9", f: ["8", "7", "10", "11"] },
  { q: "3 ⋅ 4 =", s: "12", f: ["11", "10", "13", "14"] },
  { q: "3 ⋅ 5 =", s: "15", f: ["12", "14", "16", "20"] },
  { q: "3 ⋅ 6 =", s: "18", f: ["12", "17", "20", "19"] },
  { q: "3 ⋅ 7 =", s: "21", f: ["22", "23", "28", "20"] },
  { q: "3 ⋅ 8 =", s: "28", f: ["22", "23", "25", "28"] },
  { q: "3 ⋅ 9 =", s: "27", f: ["28", "29", "30", "26"] },
  { q: "4 ⋅ 2 =", s: "8", f: ["4", "7", "6", "10"] },
  { q: "4 ⋅ 3 =", s: "12", f: ["10", "11", "13", "14"] },
  { q: "4 ⋅ 4 =", s: "16", f: ["8", "12", "18", "20"] },
  { q: "4 ⋅ 5 =", s: "20", f: ["22", "21", "18", "25"] },
  { q: "4 ⋅ 6 =", s: "24", f: ["23", "22", "28", "26"] },
  { q: "4 ⋅ 7 =", s: "28", f: ["30", "32", "21", "27"] },
  { q: "4 ⋅ 8 =", s: "32", f: ["30", "31", "34", "36"] },
  { q: "4 ⋅ 9 =", s: "36", f: ["26", "34", "35", "38"] },
  { q: "5 ⋅ 2 =", s: "10", f: ["5", "15", "13", "9"] },
  { q: "5 ⋅ 3 =", s: "15", f: ["10", "20", "17", "20"] },
  { q: "5 ⋅ 4 =", s: "20", f: ["15", "25", "18", "22"] },
  { q: "5 ⋅ 5 =", s: "25", f: ["20", "30", "23", "27"] },
  { q: "5 ⋅ 6 =", s: "30", f: ["25", "35", "31", "28"] },
  { q: "5 ⋅ 7 =", s: "35", f: ["30", "40", "31", "37"] },
  { q: "5 ⋅ 8 =", s: "40", f: ["45", "35", "34", "42"] },
  { q: "5 ⋅ 9 =", s: "45", f: ["50", "40", "42", "47"] },
];

m.mount(document.body, () => {
  let task, solutions;
  const rightSounds = [];
  const wrongSounds = [];

  function takeNextTask() {
    task = sample(tasks);
    solutions = shuffle([task.s, ...sample(task.f, 2)]);
  }
  takeNextTask();

  return {
    view: () => [
      [1, 2].map((index) =>
        m("audio", {
          src: `sounds/right${index}.mp3`,
          oncreate: ({ dom }) => rightSounds.push(dom),
        })
      ),
      [1, 2].map((index) =>
        m("audio", {
          src: `sounds/wrong${index}.mp3`,
          oncreate: ({ dom }) => wrongSounds.push(dom),
        })
      ),
      m(".q", task.q),
      solutions.map((s) =>
        m(
          "button",
          {
            onclick: () => {
              if (s === task.s) {
                sample(rightSounds).play();
                takeNextTask();
              } else {
                sample(wrongSounds).play();
              }
            },
          },
          s
        )
      ),
    ],
  };
});
