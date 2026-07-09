# +81 Bar Makati Mockup

Standalone website mockup for +81 Bar / speakingof81.

## Local Preview

```powershell
python -m http.server 5193 --bind 127.0.0.1
```

Open `http://127.0.0.1:5193/`.

## Notes

- Uses public venue imagery referenced by Philippine Primer and stored locally in `assets/plus81`.
- Mounts the downloaded Instagram MP4s from `D:\New AI Directory\Plus 81 bar` into `assets/plus81/instagram` as `ig-01.mp4` through `ig-05.mp4`, with poster frames for the hero and reel wall.
- Keeps the generated local MP4 loop, `assets/plus81/plus81-neon-loop.mp4`, as an unused fallback motion asset.
- Public listing details used in copy: Makati Square, G-1 Fernando, Makati City; `0962-969-2794`; 5:00 p.m. to 5:00 a.m.; Japanese, 80s-inspired speakeasy bar.
- The booking form is a front-end mockup and can later route to Instagram DM, Messenger, WhatsApp, or a reservations CRM.
