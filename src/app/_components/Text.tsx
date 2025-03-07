import React from 'react';
import classes from '@/app/page.module.css'

type Props = {
  content: string
}
const Text: React.FC<Props> = ({ content }) => {
  return <div className={classes.homeBoxText} dangerouslySetInnerHTML={{__html: content}}/>
};

export default Text;