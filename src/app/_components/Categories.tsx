import React from 'react';
import classes from '@/app/_styles/Categories.module.css'
import { MicroCmsCategory } from '../_types/type';

const Categories: React.FC<MicroCmsCategory> = ({ categories }) => {
  return (
    <div>
      {categories.map((item, index) => 
        <button key={index} type='button' className={classes.categoriesButton}>{item.name}</button>
      )}
    </div>
  )
};

export default Categories;