const displayWidth = window.innerWidth - 500;
const displayHeight = 450;
const dataSetSize = 250;
const options = {
  rootNode: "#knn",
  width: displayWidth,
  height: displayHeight,
  backgroundColor: "black",
  circleFill: "#3fe4h2",
  circleStroke: "white",
};
var types = ["A", "B"];

const hideshow = async () => {
  try {
    // console.log("hideshow entered");
    const response = await fetch("http://localhost:3001/api/randomdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: ,
      mode: "cors",
    });
    const data = await response.json();
    // console.log(data);
    const k = 3;
    const vis = new d3ml.KNNVisualization(data, options, types, k);
    vis.draw();
    button.style.display = "none";
    document.getElementById("frm").style.display = "none";
  } catch (error) {
    console.error("Failed to fetch the data", error);
  }
};

function updateImageDisplay() {
  // const file = input.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    var result = JSON.parse(reader.result); // Parse the result into an object
    const k = 3;
    var tps = [];
    var flag = 0;
    for (item of result) {
      if (
        !Object.hasOwn(item, "x") ||
        !Object.hasOwn(item, "y") ||
        !Object.hasOwn(item, "type")
      ) {
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
    const vis = new d3ml.KNNVisualization(result, options, tps, k);
    vis.draw();
  });
  reader.readAsText(input.files[0]);
  button.style.display = "none";
  document.getElementById("frm").style.display = "none";
}

var button = document.getElementById("btn");
button.addEventListener("click", hideshow);

var input = document.getElementById("upload");
input.addEventListener("change", updateImageDisplay);

//
// try {
//   console.log(JSON.stringify({ workoutData }));
//   const response = await fetch("http://localhost:3001/api/workouts/instance", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(workoutData),
//     mode: "cors",
//   });
//
//   if (response.ok) {
//     alert("Workout saved successfully");
//     onBack();
//   } else {
//     alert("FAiled to save workout");
//   }
// } catch (error) {
//   console.error("Failed to save workout", error);
//   alert("Failed to save workouT");
// }
