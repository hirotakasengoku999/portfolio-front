import Link from "next/link";

const Post = ({ post }) => {
    return (
        <tr className="border-b">
            <td className="px-2 py-1"> 
                {post.category}
            </td>
            <td className="px-2 py-1">
                <Link href={`/posts/${post.id}`}>
                    <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:bg-gray-200">
                        {post.title}
                    </span>
                </Link>
            </td>
            <td className="px-2 py-1">{post.created_at.split(' ')[0]}</td>
        </tr>
    );
};

export default Post;