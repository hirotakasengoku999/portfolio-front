import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import { marked } from "marked";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res)=>res.json());

export default function Post({ staticPost, id }) {
    const router = useRouter();
    const {data: post, mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Blog/${id}`,
        fetcher,
        {
            fallbackData: staticPost
        }
    );
    useEffect(()=>{
        mutate();
    }, []);
    if (router.isFallback || !post) {
        return <div>Loading...</div>
    }
    return (
        <Layout title={post.title}>
            <div className="container prose m-1 p-5">
                <p><u>{post.title}</u><br></br>{post.created_at}</p>
                <div dangerouslySetInnerHTML={{ __html: `${marked(`${post.text}`)}` }} className="detail-content"></div>
                <Link href="/blog-pages">
                    <div className="flex cursor-pointer mt-12">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                        <span>Back to Blog page</span>
                    </div>
                </Link>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getAllPostsIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const staticPost = await getPostData(params.id);
    return {
        props: {
            id: staticPost.id,
            staticPost,
        },
        revalidate: 3,
    };
}