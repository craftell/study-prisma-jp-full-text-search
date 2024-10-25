import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

export async function searchArticles(
  keyword1: string,
  keyword2: string,
  keyword3: string,
  keyword4: string,
  keyword5: string
) {
  await prisma.$queryRawUnsafe('SET enable_bitmapscan TO off;');
  console.time('searchArticles');
  const articles = await prisma.article.findMany({
    where: {
      AND: [
        { body: { contains: keyword1 } },
        { body: { contains: keyword2 } },
        { body: { contains: keyword3 } },
        { body: { contains: keyword4 } },
        { body: { contains: keyword5 } },
      ],
    },
  });
  console.timeEnd('searchArticles');
  await prisma.$queryRawUnsafe('SET enable_bitmapscan TO on;');

  console.log(`Found ${articles.length} articles`);
  return articles;
}

searchArticles('めいしょ', '騎兵', 'せいめい', '誇張', '栄誉');
