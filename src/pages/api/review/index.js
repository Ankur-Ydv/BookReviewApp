import dbConnect from "@/dbConnect";
import Reviews from "@/models/reviewModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { userId, title, author, description } = req.body;

    const feedPost = await Reviews.create({
      userId,
      title,
      author,
      description,
    });

    if (!feedPost) {
      return res.status(400).json({ msg: "Not Posted" });
    }

    return res.status(200).json({ feedPost, msg: "Posted Successfully" });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
