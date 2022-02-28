var stepNum;
var network; // TODO: change `network`'s visibility after debugging

// Draw the diagram using `vis-network`
function startNetwork() {
  const options = {
    // Appearances for different groups of nodes
    groups: {
      trackers: {
        shape: "icon",
        icon: {
          face: "'Font Awesome 5 Free'",
          weight: "900", // Font Awesome 5 doesn't work properly unless bold.
          code: "\uf233", // Server icon
          size: 25,
          color: "salmon",
        },
      },
      peers: {
        shape: "icon",
        icon: {
          face: "'Font Awesome 5 Free'",
          weight: "900", // Font Awesome 5 doesn't work properly unless bold.
          code: "\uf109", // Laptop icon
          size: 25,
          color: "skyblue",
        },
      },
    },
    // Less fancy but less messy
    nodes: {
      physics: false,
      // fixed: {
      //   x: false,
      //   y: false,
      // }
    },
    // Default apperance of edges
    edges: {
      color: "black",
      arrows: {
        middle: {
          enabled: true,
          type: "triangle",
        },
      },
    },
  };

  // create an array with nodes
  nodesArray = [
    { id: 0, label: "tracker", group: "trackers", x:    0, y: -150 },
    { id: 1, label: "peer1",   group: "peers",    x: -200, y:  -50 },
    { id: 2, label: "peer2",   group: "peers",    x: -120, y:  120 },
    { id: 3, label: "peer3",   group: "peers",    x:  120, y:  120 },
    { id: 4, label: "peer4",   group: "peers",    x:  200, y:  -50 },
  ];
  nodes = new vis.DataSet(nodesArray);

  // create an array with edges
  edgesArray = [];
  edges = new vis.DataSet(edgesArray);

  // create a network
  var container = document.getElementById("fig");
  var data = {
    nodes: nodes,
    edges: edges,
  };

  // var options = {};

  if (document.fonts) {
    // Decent browsers: Make sure the fonts are loaded.
    document.fonts
      .load('normal normal 900 24px/1 "Font Awesome 5 Free"')
      .catch(
        console.error.bind(console, "Failed to load Font Awesome 5.")
      )
      .then(function () {
        // create a network
        // const network = new vis.Network(container, data, options);
        network = new vis.Network(container, data, options);
      })
      .catch(
        console.error.bind(
          console,
          "Failed to render the network with Font Awesome 5."
        )
      );
  } else {
    // IE: Let's just hope the fonts are loaded (they're probably not,
    // hence the timeout).
    window.addEventListener("load", function () {
      setTimeout(function () {
        // create a network
        // const network = new vis.Network(container, data, options);
        network = new vis.Network(container, data, options);
      }, 500);
    });
  }

  // network = new vis.Network(container, data, options);

  stepNum = 0;
}

// Step through the animation
function singleStep() {
  if (stepNum < 4) {
    stepNum++;
    switch (stepNum) {
    case 1:
      // By default a UUID is assigned to each edge as its ID and no intervention is needed.
      // Here we give certain edges deterministic names in order to change their properties later.
      edges.add({ from: 1, to: 0, id: "would-be-green1" });
      edges.add({ from: 2, to: 0, id: "would-be-red1"   });
      edges.add({ from: 3, to: 0, id: "would-be-red2"   });
      edges.add({ from: 4, to: 0, id: "would-be-green2" });
      break;
    case 2:
      edges.add({ from: 0, to: 1, color: "green", label: "可连接：是" });
      edges.add({ from: 0, to: 4, color: "green", label: "可连接：是" });
      edges.add({ from: 0, to: 2, color: "red",   label: "可连接：否", dashes: true });
      edges.add({ from: 0, to: 3, color: "red",   label: "可连接：否", dashes: true });
      edges.update([{ id: "would-be-green1", color: "green" }]);
      edges.update([{ id: "would-be-green2", color: "green" }]);
      edges.update([{ id: "would-be-red1"  , color: "red"   }]);
      edges.update([{ id: "would-be-red2"  , color: "red"   }]);
      break;
    case 3:
      edges.add({ from: 2, to: 1, id: "would-be-file-transfer-link1" });
      edges.add({ from: 3, to: 1, id: "would-be-file-transfer-link2" });
      edges.add({ from: 4, to: 1, id: "would-be-file-transfer-link3" });
      edges.add({ from: 3, to: 4, id: "would-be-file-transfer-link4" });
      break;
    case 4:
      [1, 2, 3, 4].forEach(i => {
        edges.update([{
          id: "would-be-file-transfer-link"+i,
          color: "skyblue",
          arrows: {
            middle: {
              type: "circle",
            },
          },
        }]);
      });
      break;
    }
  }
}

function reset() {
  edges.clear();
  stepNum = 0;
}

function debug() {
  console.log("Hello");
  alert("Hello");
}

startNetwork();

