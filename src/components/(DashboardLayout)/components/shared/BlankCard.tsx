import React from "react";
import { Card } from "@mui/material";

type Props = {
  className?: string;
  children: React.ReactNode;  // ✅ Use React.ReactNode instead of JSX.Element
};

const BlankCard = ({ children, className }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative" }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
