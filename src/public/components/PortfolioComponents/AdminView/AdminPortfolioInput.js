import React, { useState, useEffect } from 'react';
import GithubAdminContainer from './GithubAdminContainer'
export default ({ dataindex, portfolioItemProps, handleSubmit }) => {
  const [localInputs, setLocalInputs] = useState({
    index: '',
    title: '',
    imgUrl: '',
    cssStyles: {
      backgroundColor: '',
      color: ''
    },
    github: []
  });

  useEffect(() => {
    setLocalInputs({
      index: dataindex,
      title: portfolioItemProps.title,
      imgUrl: portfolioItemProps.imgUrl,
      cssStyles: {
        backgroundColor: portfolioItemProps.cssStyles.backgroundColor,
        color: portfolioItemProps.cssStyles.color
      },
      github: portfolioItemProps.github
    })
  }, [portfolioItemProps]);

  const handleChange = ({ target: { value, previousSibling: { dataset: { name } } } }) => {
    setLocalInputs((prevLocalInputs) => {
      const splitTest = name.split('-');
      if (splitTest.length > 1) {
        prevLocalInputs[splitTest[0]][splitTest[1]] = value
      } else {
        prevLocalInputs[name] = value;
      }
      return { ...prevLocalInputs }
    })
  }

  return (
    <form onSubmit={() => { handleSubmit(localInputs) }}>
      <div className='innerInputForm'>
        <div className='adminPortfolioInput' >
          <div className='labelDiv' data-name='title'>
            <label>Title</label>
          </div>
          <input onChange={handleChange} value={localInputs.title}></input>
        </div >
        <div className='adminPortfolioInput'>
          <div className='labelDiv' data-name='imgUrl'>
            <label>Image Url</label>
          </div>
          <input onChange={handleChange} value={localInputs.imgUrl}></input>
        </div>
        <div className='adminPortfolioInput'>
          <div className='labelDiv'>
            <label>CSS Styles</label>
          </div>

          <div className='nestedStylesContainer' style={{ display: 'flex' }}>
            <div className='adminPortfolioInput'>
              <div className='labelDiv' data-name='cssStyles-backgroundColor'>
                <label>Background Color</label>
              </div>
              <input onChange={handleChange} value={localInputs.cssStyles?.backgroundColor}></input>
            </div>

            <div className='adminPortfolioInput'>
              <div className='labelDiv' data-name='cssStyles-color'>
                <label>Font Color</label>
              </div>
              <input onChange={handleChange} value={localInputs.cssStyles?.color}></input>
            </div>
          </div>
          <GithubAdminContainer github={localInputs.github} />
        </div>
      </div>
      <div>
        <button className='portfolioSubmitButton' type="submit">Submit</button>
      </div>
    </form >
  )
}