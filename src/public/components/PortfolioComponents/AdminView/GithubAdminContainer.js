import React, { useState, useEffect } from 'react';

export default ({ handleSubmit, github }) => {
  const [localGithubLinks, setLocalGithubLinks] = useState(
    [
      { title: '', link: '' },
      { title: '', link: '' },
      { title: '', link: '' },
      { title: '', link: '' }
    ]
  );

  useEffect(() => {
    if (github?.length) {
      setLocalGithubLinks((prev) => {
        prev[0] = { link: github[0].link, title: github[0].title };
        prev[1] = { link: github[1]?.link || '', title: github[1]?.title || '' };
        prev[2] = { link: github[2]?.link || '', title: github[2]?.title || '' };
        prev[3] = { link: github[3]?.link || '', title: github[3]?.title || '' };
        return [...prev];
      })
    }
  }, [github]);

  const handleChange = () => {

  };

  return (
    <div className='githubAdminContainer'>
      <label className='labelDiv'>Github Links</label>

      <div className='nestedAdminGithubContainer'>
        <div className='titleAndLinkContainer'>
          <input
            onChange={handleChange}
            value={localGithubLinks[0].title}
            placeholder='github title 1'>
          </input>
          <input
            onChange={handleChange}
            value={localGithubLinks[0].link} placeholder='github 1'>
          </input>
        </div>
        <div className='titleAndLinkContainer'>
          <input
            onChange={handleChange}
            value={localGithubLinks[1].title}
            placeholder='github title 2'>
          </input>
          <input
            onChange={handleChange}
            value={localGithubLinks[1].link} placeholder='github 2'>
          </input>
        </div>
      </div>

      <div className='nestedAdminGithubContainer'>
        <div className='titleAndLinkContainer'>
          <input
            onChange={handleChange}
            value={localGithubLinks[2].title}
            placeholder='github title 3'>
          </input>
          <input
            onChange={handleChange}
            value={localGithubLinks[2].link} placeholder='github 3'>
          </input>
        </div>
        <div className='titleAndLinkContainer'>
          <input
            onChange={handleChange}
            value={localGithubLinks[3].title}
            placeholder='github title 4'>
          </input>
          <input
            onChange={handleChange}
            value={localGithubLinks[3].link}
            placeholder='github 4'>
          </input>
        </div>
      </div>

    </div>
  );
}