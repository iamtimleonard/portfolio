import { Feed } from "feed"
import entries from "../../lib/blog.json"

export async function GET() {
  const feed = new Feed({
    title: "Tim Leonard's Blog",
    description: "personal musings of a guy",
    id: "https://timleonard.dev/",
    link: "https://timleonard.dev/",
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date("2025-01-02"),
    feedLinks: {
      atom: `https://timleonard.dev/feed.atom`
    }
  })

  entries.forEach((entry) => {
    feed.addItem({
      title: entry.title,
      content: entry.text,
      author: [{ name: "Tim Leonard"}],
      id: `https://timleonard.dev/blog/${entry.id}`,
      link: `https://timleonard.dev/blog/${entry.id}`,
      date: new Date(entry.date),
      category: entry.tags.map((term) => ({ term }))
    })
  })
  
  return new Response(
    feed.atom1(),
    {
      headers: {
        "Content-Type": "application/atom+xml",
        "Cache-Control": "max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
}
