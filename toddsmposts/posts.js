// Todd English posting room: the schedule and every post, in posting order.
// To add a post: drop its files in media/, add an entry to POSTS with a Tue or Fri date, run deploy.sh.
// status: "ready" | "posted". wide: true = a 16:9 film (laid out wider, widescreen posting steps).
// Files starting with "/" are served from another page on the site (the Concepts showcase).

window.SCHEDULE = {
  start: "2026-10-13", // first Tuesday
  days: [2, 5],        // Tuesday + Friday
  weeks: 4
};

function wideSteps(cover) {
  return [
    "Tap <b>Download video</b>. On iPhone it lands in Files → Downloads: open it, tap Share → <b>Save Video</b> so it shows up in Photos.",
    "In Instagram tap <b>+</b> → <b>Reel</b> → pick the video. It's widescreen, so leave it as it is: don't zoom or crop.",
    "Tap Next → paste the <b>caption</b>.",
    "<b>Edit cover</b> → slide to " + cover + ".",
    "<b>Share</b>. Play it once to check it has sound.",
    "Reply to comments for the first hour."
  ];
}

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
  },
  {
    id: "02",
    date: "2026-10-20",
    type: "Film · 90 s · widescreen",
    title: "The English",
    where: "The English Hotel & Residences · The English Sanctuary",
    status: "ready",
    wide: true,
    preview: "media/03-english-teaser.mp4",
    poster: "media/03-english-teaser.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "media/03-english-teaser.mp4", name: "Todd-TheEnglish-film.mp4", size: "52 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`A first look at The English. 🌿

By day, The English Sanctuary: wellness and longevity by the sea. By night, The English Hotel & Residences. One vision of hospitality, from the morning swim to the last dinner seating.

#TheEnglish #ToddEnglish #Hospitality` }
    ],
    steps: wideSteps("the candlelit dinner on the terrace (0:40)")
  },
  {
    id: "03",
    date: "2026-10-27",
    type: "Film · 1 min 33 s · widescreen",
    title: "A World of Dining Concepts",
    where: "Eight Todd English restaurant concepts",
    status: "ready",
    wide: true,
    preview: "/Conceptshowcase/film/Todd-English-Concepts-Film-web.mp4",
    poster: "media/05-concepts-film.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "/Conceptshowcase/film/Todd-English-Concepts-Film-web.mp4", name: "Todd-Concepts-film.mp4", size: "38 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`Eight concepts. One kitchen family. 🍽️

Tokyo Rocks Food Hall, The English Cut, Zapata's Tapas, Jade, Figs, Roast Beast, The Blue Kitchen and The English Hotel & Spa. Give us the space, and we'll make it a destination.

#ToddEnglish #Restaurants #Hospitality` }
    ],
    steps: wideSteps("Todd in his chef's whites (1:19)")
  }
];
