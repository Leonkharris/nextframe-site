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
      { label: "Download video", note: "The finished reel, music included.", file: "media/01-yes-chef-reel.mp4", name: "Todd-YesChef-reel.mp4", size: "30 MB", main: true }
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
    steps: [
      "Tap <b>Download video</b>. On iPhone it lands in Files → Downloads: open it, tap Share → <b>Save Video</b> so it shows up in Photos.",
      "In Instagram tap <b>+</b> → <b>Reel</b> → pick the video.",
      "Tap Next → paste the <b>caption</b>.",
      "<b>Tag people</b> → add both handles. <b>Invite collaborator</b> → @yescheffoodfest.",
      "<b>Add location</b> → Citi Field.",
      "<b>Edit cover</b> → slide to the frame with the “YES CHEF FOOD FEST” title (0:03).",
      "<b>Share</b>. Play the reel once to check it has sound.",
      "Pin it to the top of the profile (⋯ → Pin to your profile). Reply to comments for the first hour."
    ],
    todo: "Four people with Todd in the group photo (at 0:14) still need their handles from Todd's team. Add them under Tag people when you have them."
  }
];
