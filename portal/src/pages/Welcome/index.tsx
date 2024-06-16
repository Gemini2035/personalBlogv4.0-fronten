import { FC, useEffect, useState } from "react";
import { shuffle } from "lodash";

export interface WelcomeProp {}

type ColorListItemType = {
  bgc: string;
  fc: string;
};

const colorList: ReadonlyArray<ColorListItemType> = [
  { bgc: "rgba(255, 20, 147, 1)", fc: "rgba(255, 255, 255, 0.9)" },
  { bgc: "rgba(255, 182, 193, 1)", fc: "rgba(0, 0, 0, 0.7)" },
  { bgc: "rgba(220, 20, 60, 1)", fc: "rgba(255, 255, 255, 0.9)" },
  { bgc: "rgba(255, 69, 0, 1)", fc: "rgba(255, 255, 255, 0.9)" },
  { bgc: "rgba(240, 230, 140, 1)", fc: "rgba(0, 0, 0, 0.7)" },
  { bgc: "rgba(255, 239, 213, 1)", fc: "rgba(0, 0, 0, 0.7)" },
  { bgc: "rgba(0, 100, 0, 1)", fc: "rgba(255, 255, 255, 0.9)" },
  { bgc: "rgba(152, 251, 152, 1)", fc: "rgba(0, 0, 0, 0.7)" },
  { bgc: "rgba(240, 248, 255, 1)", fc: "rgba(0, 0, 0, 0.7)" },
  { bgc: "rgba(244, 255, 255, 1)", fc: "rgba(0, 0, 0, 0.7)" },
];

export const Welcome: FC<WelcomeProp> = () => {
  const [currentColor, setCurrentColor] = useState<ColorListItemType>(
    colorList[0]
  );

  useEffect(() => {
    const Timer = window.setInterval(() => {
      setCurrentColor(shuffle([...colorList])[0]);
    }, 3000);
    return () => window.clearInterval(Timer);
  }, []);


  return (
    <div
      className="w-screen h-screen transition-colors duration-600 flex justify-center items-center"
      style={{
        backgroundColor: currentColor.bgc,
        color: currentColor.fc,
      }}
    >
      <div className="cursor-pointer" title="Click to continue">
        <h1
          style={{
            fontSize: "24vw",
          }}
        >
          Welcome
        </h1>
        <p
          className="text-right"
          style={{
            fontSize: "4vw",
          }}
        >
          to Carlose's blog!
        </p>
      </div>
    </div>
  );
};
