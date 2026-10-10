// Todd English posting room: the schedule and every post, in posting order.
// To add a post: drop its files in media/, add an entry to POSTS with a Tue or Fri date, run deploy.sh.
// status: "ready" | "posted". wide: true = a 16:9 film (laid out wider, widescreen posting steps).
// Files starting with "/" are served from another page on the site (Tokyo Rocks media room, Concepts showcase).

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
    date: "2026-10-16",
    type: "Film · 30 s · widescreen",
    title: "Tokyo Rocks: the teaser",
    where: "Tokyo Rocks × Chef Todd English Sake Spritz",
    status: "ready",
    wide: true,
    preview: "/SakeSpritz/downloads/Tokyo-Rocks-Teaser-v3-16x9.mp4",
    poster: "media/02-tokyo-rocks-teaser.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "/SakeSpritz/downloads/Tokyo-Rocks-Teaser-v3-16x9.mp4", name: "Todd-TokyoRocks-teaser.mp4", size: "23 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`Japanese soul. Tokyo attitude. 乾杯 🥂

Introducing Tokyo Rocks × Chef Todd English Sake Spritz: a sparkling sake spritz in four flavors. Yuzu, White Peach, Lychee and Shiso Grapefruit.

#TokyoRocks #SakeSpritz #ToddEnglish` }
    ],
    steps: wideSteps("the exploding-cans frame with 乾杯 (0:07)")
  },
  {
    id: "03",
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
    id: "04",
    date: "2026-10-23",
    type: "Film · 60 s · widescreen",
    title: "Tokyo Rocks: the summer film",
    where: "Tokyo Rocks × Chef Todd English Sake Spritz",
    status: "ready",
    wide: true,
    preview: "media/04-tokyo-rocks-summer-film.mp4",
    poster: "media/04-tokyo-rocks-summer-film.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "media/04-tokyo-rocks-summer-film.mp4", name: "Todd-TokyoRocks-summer-film.mp4", size: "51 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`Summer, in a can. 🍑

Rooftops, pool days, long lunches with friends. Tokyo Rocks Sake Spritz was made for all of it. Four flavors, one rule: spritz differently.

#TokyoRocks #SakeSpritz #ToddEnglish` }
    ],
    steps: wideSteps("the couple by the pool (0:45)")
  },
  {
    id: "05",
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
  },
  {
    id: "06",
    date: "2026-10-30",
    type: "Film · 60 s · widescreen",
    title: "Tokyo Rocks: golden hour",
    where: "Tokyo Rocks × Chef Todd English Sake Spritz",
    status: "ready",
    wide: true,
    preview: "media/06-tokyo-rocks-mika-60s.mp4",
    poster: "media/06-tokyo-rocks-mika-60s.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "media/06-tokyo-rocks-mika-60s.mp4", name: "Todd-TokyoRocks-golden-hour.mp4", size: "49 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`Golden hour, cold can. ✨

Yuzu, White Peach, Lychee or Shiso Grapefruit: which one are you reaching for?

#TokyoRocks #SakeSpritz #ToddEnglish` }
    ],
    steps: wideSteps("the café terrace shot with the can (0:39)")
  },
  {
    id: "07",
    date: "2026-11-03",
    type: "Film · 60 s · widescreen",
    title: "Tokyo Rocks: the weekend",
    where: "Tokyo Rocks × Chef Todd English Sake Spritz",
    status: "ready",
    wide: true,
    preview: "media/07-tokyo-rocks-rafa-60s-v5.mp4",
    poster: "media/07-tokyo-rocks-rafa-60s-v5.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "media/07-tokyo-rocks-rafa-60s-v5.mp4", name: "Todd-TokyoRocks-weekend.mp4", size: "51 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`Cheers to the weekend. 🥂

Tokyo Rocks Sake Spritz: Japanese soul, Tokyo attitude, and a little Todd English in every can.

#TokyoRocks #SakeSpritz #ToddEnglish` }
    ],
    steps: wideSteps("the opening shot, can raised beside his face (0:05)")
  },
  {
    id: "08",
    date: "2026-11-06",
    type: "Film · 30 s · widescreen",
    title: "Tokyo Rocks: cherry blossom",
    where: "Tokyo Rocks × Chef Todd English Sake Spritz",
    status: "ready",
    wide: true,
    preview: "media/08-tokyo-rocks-mika-30s.mp4",
    poster: "media/08-tokyo-rocks-mika-30s.jpg",
    downloads: [
      { label: "Download video", note: "Widescreen film, music included.", file: "media/08-tokyo-rocks-mika-30s.mp4", name: "Todd-TokyoRocks-cherry-blossom.mp4", size: "23 MB", main: true }
    ],
    fields: [
      { label: "Caption", text:
`Spring in Tokyo, in a can. 🌸

White Peach, Yuzu, Lychee or Shiso Grapefruit. Pick yours.

#TokyoRocks #SakeSpritz #ToddEnglish` }
    ],
    steps: wideSteps("her under the cherry blossoms (0:18)")
  }
];
