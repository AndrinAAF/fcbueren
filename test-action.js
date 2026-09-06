const { getNewsPage } = require('./.next/server/app/actions/news.js');
async function test() {
  try {
    const res = await getNewsPage(2);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
test();
