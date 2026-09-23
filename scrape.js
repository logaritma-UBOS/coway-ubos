// Using native fetch

async function run() {
  try {
    const res = await fetch('https://cowayagent.id/');
    const text = await res.text();
    const regex = /https:\/\/[^"']*\.(?:jpg|png|webp)/gi;
    const matches = text.match(regex);
    if (matches) {
      const unique = Array.from(new Set(matches));
      unique.forEach(url => console.log(url));
    }
  } catch(e) {
    console.error(e);
  }
}
run();
