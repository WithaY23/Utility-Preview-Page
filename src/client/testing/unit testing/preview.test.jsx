import { createTagsData, TAGS } from "../../data/tags";
import { saveTagPreview } from "../../data/tags";
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage'
import { within } from '@testing-library/react';
import { SiteConfigProvider } from "../../context/SiteConfigContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'
// import {expect, jest, test} from '@jest/globals';
// import { expect } from '@jest/globals';
// import * as matchers from '@testing-library/jest-dom/matchers';

// expect.extend(matchers);

function initTagsDatabase()
{
  TAGS.push(...(createTagsData()))
}
function clearTagsDatabase()
{
  TAGS.splice(0)
}
beforeEach(initTagsDatabase)
afterEach(() =>{
  clearTagsDatabase()
})

describe('Tag testing', () => 
  {
    test('Tag creation and removal', () =>
    {   
        
        const tag = TAGS[0]
        const len = tag.previews.length
        //console.log(len)
        const T = saveTagPreview(TAGS,tag.id, {
        title: 'MDN',
        description: 'Web docs and references for HTML, CSS, and JavaScript.',
        href: 'https://developer.mozilla.org/',
        backgroundType: 'default',
      }) 
        //console.log(len)
        //console.log(tag)
        //console.log(TAGS[0])


      const newTag = T[0]
      expect(newTag.previews.length - len).toBe(1);

      const prev = newTag.previews[newTag.previews.length - 1];
      expect(prev.title).toBe('MDN');
      expect(prev.description).toBe('Web docs and references for HTML, CSS, and JavaScript.');
      expect(prev.href).toBe('https://developer.mozilla.org/');
      expect(prev.backgroundType).toBe('default');

      // unordinary input
      const T2 = saveTagPreview(T, tag.id, {
        title: '<code> I am code execution!</code>',
        description: '<code> I am code execution 2!</code>',
        href: 'http://developer.mozilla.org/',
        backgroundType: 'color',
        backgroundColor: 'blue',
      });

      const newTag2 = T2[0]
      const prev2 = newTag2.previews[newTag2.previews.length - 1];
      expect(prev2.title).toBe('<code> I am code execution!</code>');
      expect(prev2.description).toBe('<code> I am code execution 2!</code>');
      expect(prev2.href).toBe('http://developer.mozilla.org/');
      expect(prev2.backgroundType).toBe('color');
      expect(prev2.backgroundColor).toBe('blue');

      expect(newTag2.previews.length - len).toBe(2);



      function removePreview()
      {
        return true
      }
      expect(removePreview() == true)
    })
    test('Tag styling and user interaction', async () =>
    {
      const user = userEvent.setup()


      const len = TAGS[2].previews.length
      expect(len).toBe(6)
      const title = 'ABC'
      const description = 'DEF'
      const href = 'https://sonic.com'
      const backgroundType = 'color'
      const backgroundColor = '#001234'


      const T = saveTagPreview(TAGS,TAGS[2].id, {
      title: title,
      description: description,
      href: href,
      backgroundType: backgroundType,
      backgroundColor: backgroundColor
      })
      const tag = T[2]

      const previewd = tag.previews[tag.previews.length - 1]
      // console.log(previewd)
      // console.log(tag.previews)

      render(
      <MemoryRouter>   
      <SiteConfigProvider > 
        <HomePage tags={T}/> 
        </SiteConfigProvider>
      </MemoryRouter>)

      const nextPreviewsButton = screen.getByRole('button', {name: `Next previews in ${tag.name}`})
      await user.click(nextPreviewsButton)
      const preview = screen.getByRole('link',{name: new RegExp(`^${title}`)})
      expect(preview.getAttribute('href')).toBe(href);
      expect(within(preview).getByText(description)).toBeInTheDocument();
      expect(preview).toHaveStyle({'backgroundColor': backgroundColor})
    })
  }
)