const displayWidth = window.innerWidth - 500;
const displayHeight = 450;
const dataSetSize = 250;
const options = {
  rootNode: '#knn',
  width: displayWidth,
  height: displayHeight,
  backgroundColor: 'black',
  circleFill: '#3fe4h2',
  circleStroke: 'white'
};
var types = ['A', 'B'];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randCoord(width, height, cx, cy) {
  const rho = Math.sqrt(Math.random())
  const phi = Math.random() * Math.PI * 2
  const rands = { x: rand(-width / 2, width / 2), //random x coordinate
                  y: rand(-height / 2, height / 2) } // random y coordinate
  const x = (rho * Math.cos(phi) * width / 2) + cx + rands.x
  const y = (rho * Math.sin(phi) * height / 2) + cy + rands.y
  return { x, y }
}
function gen() {
  const typeOptions = {
    'A': {
      width: displayWidth / 3,
      height: displayWidth / 3,
      cx: displayWidth / 3,
      cy: displayHeight / 3
    },
    'B': {
      width: displayWidth / 2.5,
      height: displayWidth / 2.5,
      cx: displayWidth * 0.663,
      cy: displayHeight * 0.66
    }
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

var button = document.getElementById('btn');
button.addEventListener('click', hideshow);

var input = document.getElementById('upload');
input.addEventListener('change', updateImageDisplay);

function hideshow() {
  const data = gen();
  const k = 3;
  const vis = new d3ml.KNNVisualization(data,
    options,
    types,
    k);
  vis.draw();
  button.style.display = 'none';
  document.getElementById('frm').style.display = 'none';
}

function updateImageDisplay() {
  const file = input.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', function() {
    var result = JSON.parse(reader.result); // Parse the result into an object
    const k = 3;
    var tps = [];
    var flag = 0;
    for (item of result) {
      if (!Object.hasOwn(item, 'x') || !Object.hasOwn(item, 'y') || !Object.hasOwn(item, 'type')) {
        var p = document.getElementById("frm");
        p.appendChild(document.createTextNode("Incorrect file"));
        return;
      }
      for (tp in types) {
        if (tp === item.type) {
          flag = 1;
          break;
        }
        if (!flag) {
          tps.push(item.type);
        }
        flag = 0;
      }
    }
    const vis = new d3ml.KNNVisualization(result,
      options,
      tps,
      k);
    vis.draw();
  });
  reader.readAsText(input.files[0]);
  button.style.display = 'none';
  document.getElementById('frm').style.display = 'none';
}