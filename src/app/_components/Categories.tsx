import React from 'react';
import classes from '@/app/_styles/Categories.module.css'

type Props = {
  categories: string[] 
};

const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <div>
      {categories.map((item, index) => 
        <button key={index} type='button' className={classes.categoriesButton}>{item}</button>
      )}
    </div>
  )
};

export default Categories;