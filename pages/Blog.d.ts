interface BlogPost {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    authorRole: string;
    authorImage: string;
    slug: string;
    content: string;
}
declare const mockBlogPosts: BlogPost[];
declare const BlogPage: () => import("react/jsx-runtime").JSX.Element;
export { mockBlogPosts };
export default BlogPage;
