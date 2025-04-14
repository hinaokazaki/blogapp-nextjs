import React from 'react';
import { CategoriesButtonProps } from '../_types/type';

const Categories: React.FC<CategoriesButtonProps> = ({ postCategories }) => {
  return (
    <div>
      {postCategories.map((item, index) => 
        <button key={index} type='button' className='text-[#06c] border-[1px] border-solid border-[#06c] rounded-sm p-2 ml-1 bg-white'>{item.category.name}</button>
      )}
    </div>
  )
};

export default Categories;