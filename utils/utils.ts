export function sortByDate(a, b) {
  const splittedA = a.frontmatter.date.replace("'", '').split('/');
  const splittedB = b.frontmatter.date.replace("'", '').split('/');

  return (
    new Date(splittedB[2], splittedB[1], splittedB[0]).getTime() -
    new Date(splittedA[2], splittedA[1], splittedA[0]).getTime()
  );
}
