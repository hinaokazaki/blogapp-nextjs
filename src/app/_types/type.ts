export type PostData = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  createdAt: Date,
  updatedAt: Date,
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
  createdAt: Date,
  updatedAt: Date,
}

export type CreateCategoryRequestBody = {
  name: string,
};

export type SelectOptionForCategories = {
  id: number,
  name: string,
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

