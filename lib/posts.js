export async function getAllPostsData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Blog/`)
    );
    const posts = await res.json();
    const filteredPosts = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    return filteredPosts;
};

export async function getAllPostsIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Blog/`)
    );
    const posts = await res.json();

    return posts.map((post) => {
        return {
            params: {
                id: String(post.id),
            },
        };
    });
}

export async function getPostData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Blog/${id}`)
    );
    const post = await res.json();
    return post;
}

export async function getAllServicesData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}app/Service/`)
    );
    const posts = await res.json();
    return posts;
};