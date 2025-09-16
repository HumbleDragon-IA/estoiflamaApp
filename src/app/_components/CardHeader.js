"use client";
import CardTitle from "./CardTitle";
import MenuButton2 from "./MenuButton2";

function CardHeader({ children }) {
  return <div className="flex justify-between">{children}</div>;
}

export default CardHeader;
