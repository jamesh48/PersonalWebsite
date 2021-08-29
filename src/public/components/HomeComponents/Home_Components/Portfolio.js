import React, { useState, useEffect } from 'react';
import data from './portfolioData.js';

export default ({}) => {

  const [hovered, setHovered] = useState([null, null]);

  const test = data.reduce((total, item, index) => {
    if (index % 2 === 0) {
      total.push([item])
    } else {
      total[total.length - 1].push(item);
    }
    return total;
  }, []);

  return (
    <div className={'portfolioContainer'}>
      <h4 className={'portfolioTitle'}>Software Engineering Applications</h4>
      <div className={'portfolioApplicationContainer'}>
        {
          test.map((x, rowIndex) => {
            return (<div key={rowIndex} className={'portfolioApplicationRow'}> {
              x.map((appData, columnIndex) => {
                return (
                  <div key={columnIndex} className={'portfolioApplication'}>
                    <p>
                      {appData.title}
                    </p>
                    {rowIndex === hovered[0] && columnIndex === hovered[1] ?
                      <div className={'applicationImgContainer'}
                        onMouseLeave={() => { setHovered([null, null]) }}
                        style={{
                        //   backgroundPosition: 'center',
                          backgroundImage: `url(${appData.imgUrl})`,
                        //   backgroundRepeat: 'no-repeat',
                        //   backgroundSize: 'cover',
                        //   height: '500px',
                        }}
                      >

                        {
                          appData.github.map((nestedGithub, index) => {
                            return (
                              <div
                                key={index}
                                className={'nestedGithubLinks'}
                                onClick={() => { window.open(nestedGithub.link) }}
                                style={appData.cssStyles}
                              >{nestedGithub.title}</div>
                            )
                          })
                        }
                      </div>
                      :
                      <div className={'applicationImgContainer'}
                        onMouseOver={() => { setHovered([rowIndex, columnIndex]) }}
                        style={{
                          backgroundImage: `url(${appData.imgUrl})`,
                        }}
                      >
                      </div>
                    }
                  </div>
                );
              })
            }
            </div>)
          })
        }


      </div>
    </div >
  )
};