export type PostData = {
  id: number,
  title: string,
  content: string,
  thumbnailImageKey: string,
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
  thumbnailImageKey: string;
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

export type LoginSignupFormValue = {
  email: string,
  password: string,
}

// API responce
export type ApiResponsePosts = {
  posts: PostData[]
}

export type ApiResponsePost = {
  post: PostData
}

export type ApiResponseCategories = {
  categories: CategoryData[]
}

export type ApiResponseCategory = {
  category: CategoryData
}