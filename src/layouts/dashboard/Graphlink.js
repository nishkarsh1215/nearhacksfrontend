import "./styles.css";
import { g } from "./dfs";
import ForceGraph2D from "react-force-graph-2d";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
export default function Graphlink() {
  function genRandomTree(N = 1000, reverse = false) {
    return {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          [reverse ? "target" : "source"]: id,
          [reverse ? "source" : "target"]: Math.floor(Math.random() * (id - 1)),
        })),
    };
  }

  return (
    <div className="App">
      <ForceGraph2D
        graphData={genRandomTree(500)}
        nodeLabel="id"
        nodeRelSize={15}
        linkDirectionalArrowLength={7}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white"; // Set node color to white
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.fillStyle = "black"; // Set text color to black
          ctx.fillText(label, node.x, node.y, 10);
        }}
        // linkCurvature={0.25}
      />
    </div>
  );
}
