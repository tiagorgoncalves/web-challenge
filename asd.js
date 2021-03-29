const t = ["vegan", "teste"];
let state = [
  {
    nome: 1,
    tag: ["vegan", "teste"],
  },
  {
    nome: 2,
    tag: ["reee"],
  },
  {
    nome: 3,
    tag: ["teste"],
  },
];
let array = [];

state.map((p) => {
  t.map((f) => {
    if (p.tag.includes(f)) {
      array.push(p);
    }
  });
});

const uniqueObjects = [
  ...new Map(array.map((item) => [item.nome, item])).values(),
];
