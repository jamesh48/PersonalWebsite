import React from "react";
import  Portfolio from "../Portfolio";
import "./carousel-styles.scss";

const ProfileCarousel = (props) => {
  const [portfolioCards, setPortfolioCards] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const [direction, setDirection] = React.useState("neutral");

  const changeImage = (event) => {
    const nextResult = /next-button/g.test(event.target.id);
    nextResult ? setDirection("forward") : setDirection("backward");
  };
  const compilePortfolioCards = (portfolioJSON) => {
    const compiledPortfolioCards = portfolioJSON.reduce(
      (allCards, card, index) => {
        if (index % 4 === 0) {
          allCards.push([card]);
        } else {
          allCards[allCards.length - 1].push(card);
        }

        return allCards;
      },
      []
    );
    setPortfolioCards(compiledPortfolioCards);
  };

  React.useEffect(() => {
    compilePortfolioCards(props.portfolioJSON);
  }, []);

  React.useEffect(() => {
    if (direction !== "neutral") {
      let counter = Number(position);
      const wholeNumber = setInterval(() => {
        setPosition(
          direction === "forward"
            ? (counter += 0.1).toFixed(1)
            : (counter -= 0.1).toFixed(1)
        );
        if (counter.toFixed(1) % 1 === 0) {
          clearInterval(wholeNumber);
          setDirection("neutral");
        }
      }, 35);
      return () => {
        clearInterval(wholeNumber);
      };
    }
  }, [direction]);

  return (
    <div className="portfolio-slider">
      <div className="outer-slider">
        <div
          className="inner-slider"
          style={{ transform: `translateX(${position * -100}%)` }}
        >
          {portfolioCards.map((portfolioCard, index, arr) => <Portfolio portfolioJSON={arr[arr.length - 1 - index]} key={index} index={Math.abs(1 - index)}/>)}
        </div>

        <button
          className={`arrow-button prev-next-button`}
          id="prev-button"
          disabled={Number(position) - 1 < 0 ? true : false}
          onClick={changeImage}
        >
          <svg className="arrow-button-icon" viewBox="0 0 100 100">
            <path
              className="arrow"
              d="M33.8352105,100 C31.4906934,99.997936 29.2429547,99.0649124 27.5861629,97.4060557 C24.1379457,93.9535448 24.1379457,88.3604714 27.5861629,84.9079605 L62.6044109,49.8897124 L27.5861629,14.8714644 C24.3395013,11.3872106 24.4353002,5.95761395 27.8028539,2.59006023 C31.1704076,-0.777493487 36.6000043,-0.873292384 40.0842581,2.37336919 L87.6006014,49.8897124 L40.0842581,97.4060557 C38.4274663,99.0649124 36.1797276,99.997936 33.8352105,100 L33.8352105,100 Z"
            ></path>
          </svg>
        </button>
        <button
          className={`arrow-button prev-next-button`}
          id="next-button"
          disabled={
            Number(position) + 1 > portfolioCards.length - 1 ? true : false
          }
          onClick={changeImage}
        >
          <svg className="arrow-button-icon" viewBox="0 0 100 100">
            <path
              className="arrow"
              d="M33.8352105,100 C31.4906934,99.997936 29.2429547,99.0649124 27.5861629,97.4060557 C24.1379457,93.9535448 24.1379457,88.3604714 27.5861629,84.9079605 L62.6044109,49.8897124 L27.5861629,14.8714644 C24.3395013,11.3872106 24.4353002,5.95761395 27.8028539,2.59006023 C31.1704076,-0.777493487 36.6000043,-0.873292384 40.0842581,2.37336919 L87.6006014,49.8897124 L40.0842581,97.4060557 C38.4274663,99.0649124 36.1797276,99.997936 33.8352105,100 L33.8352105,100 Z"
              transform="translate(100, 100) rotate(180)"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileCarousel;
