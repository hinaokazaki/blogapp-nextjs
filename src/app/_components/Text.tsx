import React from 'react';

type Props = {
  content: string
}
const Text: React.FC<Props> = ({ content }) => {
  return <div className='max-w-[70%]' dangerouslySetInnerHTML={{__html: content}}/>
};

export default Text;