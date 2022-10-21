import { useEffect } from "react";
import Layout from "../components/Layout";
import { getAllPostsData } from "../lib/posts";
import Post from "../components/Post";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Blog/`

const Blog = ({ staticPosts }) => {
    const {data: posts, mutate} = useSWR(apiUrl, fetcher, {
        fallbackData: staticPosts
    });
    const filteredPosts = posts?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    useEffect(() => {
        mutate();
    }, []);
    return (
        <Layout title="Blog">
            <table className="m-10 table-auto">
                <tbody>
                    {filteredPosts && filteredPosts.map((post) => <Post key={post.id} post={post} />)}
                </tbody>
            </table>
        </Layout>
  )
}

export default Blog;

export async function getStaticProps() {
    const staticPosts = await getAllPostsData();
    return {
        props: { staticPosts },
        revalidate: 3,
    };
}