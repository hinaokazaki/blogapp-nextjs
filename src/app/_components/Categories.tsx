import React from 'react';
import classes from '@/app/_styles/Categories.module.css'
import { CategoriesButtonProps } from '../_types/type';

const Categories: React.FC<CategoriesButtonProps> = ({ postCategories }) => {
  return (
    <div>
      {postCategories.map((item, index) => 
        <button key={index} type='button' className={classes.categoriesButton}>{item.category.name}</button>
      )}
    </div>
  )
};

export default Categories;