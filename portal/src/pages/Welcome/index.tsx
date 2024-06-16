import { FC, useEffect, useRef, useState } from "react";
import { shuffle, uniqueId } from "lodash";

export interface WelcomeProp {}

type ColorListItemType = {
  _id: string;
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
].map((item) => ({ ...item, _id: uniqueId() }));

// TODO: 加入国际化功能
const subTitle = `to Carlose's blog!`;

export const Welcome: FC<WelcomeProp> = () => {
  const [currentColor, setCurrentColor] = useState<ColorListItemType>(
    colorList[0]
  );

  const [subTitleInView, setSubTitleInView] = useState<string>("");
  const subTitleTimer = useRef<number>();

  useEffect(() => {
    const Timer = window.setInterval(() => {
      setCurrentColor(({ _id }) => {
        let count = 25;
        let newColor = shuffle([...colorList])[0];
        while (_id === newColor._id && count) {
          (newColor = shuffle([...colorList])[0]), count--;
        }
        return newColor;
      });
    }, 3000);
    return () => window.clearInterval(Timer);
  }, []);

  useEffect(() => {
    subTitleTimer.current = window.setInterval(() => {
      setSubTitleInView((prevStr) => prevStr + subTitle[prevStr.length]);
    }, 300);
    return () => window.clearInterval(subTitleTimer.current);
  }, []);

  useEffect(() => {
    if (subTitleInView.length >= subTitle.length) {
      window.clearInterval(subTitleTimer.current);
    }
  }, [subTitleInView.length])

  return (
    <div
      className="w-screen h-screen transition-colors duration-1000 flex justify-center items-center"
      style={{
        backgroundColor: currentColor.bgc,
        color: currentColor.fc,
      }}
    >
      <div className="cursor-pointer" title="Click to continue">
        <h1
          style={{
            fontSize: "21vw",
          }}
          className="font-extrabold"
        >
          Welcome
        </h1>
        <p
          className="text-right"
          style={{
            fontSize: "4vw",
          }}
        >
          {subTitleInView}
        </p>
      </div>
    </div>
  );
};
