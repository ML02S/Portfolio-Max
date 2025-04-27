"use client";

import Image from "next/image";
import { worksReversed } from "../data/works";
import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { RightArrow, UpRightArrow } from "./arrows";
import { CardsContext } from "../cardsContext";

export default function Cards() {
  const [screen, setScreen] = useState<Window | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const positionsRef = useRef<{ [key: number]: { x: string; y: string } }>({});
  const [zIndices, setZIndices] = useState<{
    [key: number]: number;
  }>({});
  const { focusedCard } = useContext(CardsContext);

  useEffect(() => {
    setScreen(window);
    setLoading(false);

    let initialZIndices: { [key: number]: number } = {};
    for (let i = 0; i < 19; i++) {
      let newZIndex = i;
      initialZIndices[i] = newZIndex;
    }
    initialZIndices[-1] = 19;
    setZIndices(initialZIndices);
  }, []);

  const handleImageClick = (index: number) => {
    const newZIndices = { ...zIndices };
    newZIndices[-1] += 1;
    newZIndices[index] = newZIndices[-1];
    setZIndices(newZIndices);
  };

  const getRandomPosition = (index: number) => {
    if (!positionsRef.current[index] && screen !== undefined) {
      const cardWidth = worksReversed[index].width;
      const cardHeight = worksReversed[index].height;
  
      const maxX = screen.innerWidth - cardWidth;
      const maxY = screen.innerHeight - cardHeight - 200; // Houd rekening met de header (200px)
  
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
  
      positionsRef.current[index] = { x: `${randomX}px`, y: `${randomY}px` };
    }
    return positionsRef.current[index];
  };

  return !loading
    ? (<div className="cards-container">{worksReversed.map((item, index) => {
        if (screen === undefined) return null;
        const { x, y } = getRandomPosition(index);
        const zIndex = zIndices[index];
        const cardInFocus =
          focusedCard !== null ? (focusedCard === item.id ? true : false) : true;

        return (
          <motion.div
            key={typeof item.img_url === 'string' ? item.img_url : item.img_url.src}
            className="card-container"
            drag
            dragMomentum={false}
            style={{zIndex: zIndex}}
            onMouseDown={() => handleImageClick(index)}
            onTouchStart={() => handleImageClick(index)}
            whileHover={{ translateY: -4 }}
          >
            <div
              className={`card-${index} card`}
              style={{
                left: x,
                top: y,
                filter: cardInFocus ? "unset" : "(12px)",
                opacity: cardInFocus ? 1 : 0.02, // Changed to 0.2
                backgroundColor: "white"
              }}
            >
              <div className="card-header">
                <a className="card-name card-link" href={item.url}>
                  <span>{item.id}</span>
                  {item.external ? <UpRightArrow /> : <RightArrow />}
                </a>
                <span className="card-name" style={{ opacity: 0.2 }}>
                  {item.year}
                </span>
              </div>
              <Image
                src={item.img_url}
                 alt={typeof item.img_url === 'string' ? item.img_url : item.img_url.src}
                width={item.width}
                height={item.height}
                draggable={false}
                priority={true}
                style={{ borderRadius: 6 }}
              />
            </div>
          </motion.div>
        );
      })}
      </div>
    ): null;
}