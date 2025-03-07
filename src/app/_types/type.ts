export type PostData = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  createdAt: string,
  updatedAt: string,
  postCategories: {
    category: {
      id: number,
      name: string,
    }
  }[],
};

export type CreatePostRequestBody = {
  title: string;
  content: string;
  categories: { id: number; name: string }[];
  thumbnailUrl: string;
};

export type CategoryData = {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
}

export type CreateCategoryRequestBody = {
  name: string,
};

export type SelectOptionForCategories = {
  value: number,
  label: string,
}

export type SelectedCategoryData = {
  category: {
    id: number,
    name: string,
  }
}
 
// Front-end Category Button
export type Category = {
  id: number,
  name: string,
}

export type CategoriesButtonProps = {
  postCategories: {
    category: {
      id: number,
      name: string,
    }
  }[]
}

// export type MicroCmsPost = {
//   id: string,
//   title: string,
//   content: string,
//   createdAt: string,
//   categories: { id: string; name: string }[],
//   thumbnail: { url: string; height: number; width: number }
// };

// export type MicroCmsCategory = {
//   categories: { 
//     id: string,
//     name: string
//   }[]
// };