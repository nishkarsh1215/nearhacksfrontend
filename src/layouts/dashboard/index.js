import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import VuiInput from "components/VuiInput";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import { CodeBlock } from "./CodeBlock";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { orange } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import Graphlink from "./Graphlink";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: red[300],
  "&:hover": {
    backgroundColor: orange[700],
  },
}));

const formatCode = (data) => {
  const codeBlockRegex = /```(?:\s*\w+\s*\n)?([\s\S]*?)```/g; // Regex to match code blocks

  return data
    .replace(codeBlockRegex, (match, codeBlock) => {
      return `\`\`\`${codeBlock}\`\`\``; // Wrap code blocks with ```
    })
    .replace(/(^|\n)(?!```)/g, (match) => {
      return match.replace(/./g, "#"); // Comment out non-code lines
    });
};

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const codeSample = `
  const add = (a, b) => {
    //You will get your solution here
    return semantic web;
    return happiness;
    return innovation;
  }`;

  const [inputText, setInputText] = useState("");
  const [code, setCode] = useState(codeSample);
  const [hi, setHi] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    console.log(event.target.value);
  };

  const solveButton = async () => {
    console.log("button");
    try {
      setHi(true);
      setIsDisabled(true);
      // Send the POST request with inputText as the value of 'text' field
      const response = await axios.post("http://localhost:5000/data", { text: inputText });
      const formattedData = formatCode(response.data);
      setHi(false);
      setIsDisabled(false);
      setCode(formattedData);
      // Handle response if needed
      console.log("Response:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (hi) {
      interval = setInterval(() => {
        setCode((prevText) => {
          switch (prevText) {
            case ".":
              return "..";
            case "..":
              return "...";
            case "...":
              return ".";
            default:
              return ".";
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hi]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={6}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={6}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}></Grid>
          </Grid>
        </VuiBox>

        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={12} lg={12}>
              <Grid container alignItems="center">
                {" "}
                {/* Nested grid container */}
                <Grid item xs={12} sm={8} md={9} lg={10}>
                  {" "}
                  {/* Input bar */}
                  <VuiBox pr={2}>
                    <VuiInput
                      placeholder="Type here your problem...."
                      icon={{ component: "search", direction: "left" }}
                      value={inputText}
                      onChange={handleInputChange}
                      sx={({ breakpoints }) => ({
                        [breakpoints.down("sm")]: {
                          maxWidth: "80px",
                          maxHeight: "60px", // Increase the maxHeight for small screens
                        },
                        [breakpoints.only("sm")]: {
                          maxWidth: "140px",
                          maxHeight: "60px", // Increase the maxHeight for small screens
                        },
                        backgroundColor: "info.main !important",
                      })}
                    />
                  </VuiBox>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  {" "}
                  {/* Button */}
                  <ColorButton onClick={solveButton} disabled={isDisabled} variant="contained">
                    Solve
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}></Grid>
          <div
            style={{
              width: "90%",
              height: "100%",
              border: "4px solid #ccc",
              borderRadius: "10px",
              padding: "3px",
            }}
          >
            <CodeBlock code={code} language="javascript" />
          </div>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
