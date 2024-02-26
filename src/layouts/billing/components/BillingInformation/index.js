import { useState, useEffect } from "react";
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Billing page compone
import Bill from "layouts/billing/components/Bill";
import axios from "axios";

function BillingInformation() {
  const [sample, setSample] = useState([]);
  const fetchTheBlock = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blocks");
      console.log(response.data);
      setSample(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTheBlock();
  }, []);

  fetchTheBlock();

  return (
    <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Block Transactions
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        {sample.map((block) => (
          <Bill name={block.index} company={block.className} email={block.data} val="2" />
        ))}
      </VuiBox>
    </Card>
  );
}

export default BillingInformation;
