import { getAllPostsList, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export default function Tag({ tags, posts, currentTag }) {
  return (
    <SearchLayout
      hiddenTags
      tags={tags}
      posts={posts}
      currentTag={currentTag}
    />
  )
}

export async function getStaticProps({ params }) {
  const currentTag = params.tag?.toLowerCase()
  const posts = await getAllPostsList({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  const filteredPosts = posts.filter(
    (post) =>
      post &&
      post.tags &&
      post.tags?.map((t) => t?.toLowerCase()).includes(currentTag)
  )
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const posts = await getAllPostsList({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true
  }
}
