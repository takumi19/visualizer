const displayWidth = 800; // window.innerWidth - 500;
const displayHeight = 450;
const dataSetSize = 250;
var types = ["A", "B"];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randCoord(width, height, cx, cy) {
  const rho = Math.sqrt(Math.random());
  const phi = Math.random() * Math.PI * 2;
  const rands = {
    x: rand(-width / 2, width / 2), //random x coordinate
    y: rand(-height / 2, height / 2),
  }; // random y coordinate
  const x = (rho * Math.cos(phi) * width) / 2 + cx + rands.x;
  const y = (rho * Math.sin(phi) * height) / 2 + cy + rands.y;
  return { x, y };
}
function gen() {
  const typeOptions = {
    A: {
      width: displayWidth / 3,
      height: displayWidth / 3,
      cx: displayWidth / 3,
      cy: displayHeight / 3,
    },
    B: {
      width: displayWidth / 2.5,
      height: displayWidth / 2.5,
      cx: displayWidth * 0.663,
      cy: displayHeight * 0.66,
    },
  };

  const generatedData = [];
  for (let i = 0; i < dataSetSize; i++) {
    const type = Math.random() > 0.5 ? types[0] : types[1];
    const { width, height, cx, cy } = typeOptions[type];
    const { x, y } = randCoord(width, height, cx, cy);
    generatedData.push({ x, y, type });
  }

  return generatedData;
}

const generateData = (req, res) => {
  console.log("Data is being generated...");
  const data = gen();
  console.log("Data has been generated");
  res.json(data);
};

module.exports = {
  generateData,
};
