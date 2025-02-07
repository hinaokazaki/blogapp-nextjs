import React from 'react';

type Props = {
  content: string
}
const Text: React.FC<Props> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{__html: content}}/>
};

export default Text;