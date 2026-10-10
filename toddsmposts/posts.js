// Todd English posting room: the schedule and every post, in posting order.
// To add a post: drop its files in media/, add an entry to POSTS with a Tue or Fri date, run deploy.sh.
// status: "ready" | "posted"

window.SCHEDULE = {
  start: "2026-10-13", // first Tuesday
  days: [2, 5],        // Tuesday + Friday
  weeks: 4
};

window.POSTS = [
  {
    id: "01",
    date: "2026-10-13",
    type: "Reel · 27 s",
    title: "Yes Chef Food Fest",
    where: "VIP lounge, Citi Field, NYC",
    status: "ready",
    preview: "media/01-yes-chef-reel.mp4",
    poster: "media/01-yes-chef-cover.jpg",
    downloads: [
      { label: "Video, no music", note: "Post this one. The song is added in Instagram (step 2).", file: "media/01-yes-chef-reel-no-music.mp4", name: "Todd-YesChef-reel-no-music.mp4", size: "29 MB", main: true },
      { label: "Video, music included", note: "Backup only, if “Use audio” won't work.", file: "media/01-yes-chef-reel.mp4", name: "Todd-YesChef-reel-with-music.mp4", size: "30 MB" },
      { label: "Cover image", note: "For “Edit cover → Add from camera roll”.", file: "media/01-yes-chef-cover.jpg", name: "Todd-YesChef-cover.jpg", size: "0.3 MB" }
    ],
    fields: [
      { label: "Caption", text:
`Yes, Chef. 🔥

Spent the day at @yescheffoodfest at Citi Field — caviar bumps, chops off the grill, pies, pickles, banana bread, and a lot of people who love food as much as I do.

Thank you @jacksdiningroom for having me. New York, you never miss.

#YesChefFoodFest #ToddEnglish #NYCFood #CitiField #FoodFestival #NYCEats #ChefLife` },
      { label: "Shorter caption (use instead if you prefer)", text:
`One rule at @yescheffoodfest: taste everything. 🍴
Great day at Citi Field with @jacksdiningroom and some of the best in the business.

#YesChefFoodFest #ToddEnglish #NYCFood #CitiField`, alt: true },
      { label: "Tag people", chips: ["@jacksdiningroom", "@yescheffoodfest"] },
      { label: "Invite collaborator", chips: ["@yescheffoodfest"] },
      { label: "Location", chips: ["Citi Field"] }
    ],
    music: {
      song: "“Sultans of Swing” (live), Dire Straits",
      link: "https://www.instagram.com/reel/DTf1zGbCEP4/",
      linkLabel: "Open the song reel in Instagram"
    },
    steps: [
      "Download the <b>no-music video</b> and the <b>cover image</b>. On iPhone they land in Files → Downloads: open each one, tap Share → <b>Save Video</b> / <b>Save Image</b> so they show up in Photos.",
      "Tap <b>Open the song reel in Instagram</b> → tap the song name at the bottom → <b>Use audio</b>.",
      "Pick the no-music video from your gallery. The song is already timed to the cut from 0:00, so don't trim or move it.",
      "Tap Next → paste the <b>caption</b>.",
      "<b>Tag people</b> → add both handles. <b>Invite collaborator</b> → @yescheffoodfest.",
      "<b>Add location</b> → Citi Field.",
      "<b>Edit cover</b> → Add from camera roll → the cover image.",
      "<b>Share</b>. Play the reel once to check it has sound.",
      "Pin it to the top of the profile (⋯ → Pin to your profile). Reply to comments for the first hour."
    ],
    todo: "Four people with Todd in the group photo (at 0:14) still need their handles from Todd's team. Add them under Tag people when you have them."
  }
];
