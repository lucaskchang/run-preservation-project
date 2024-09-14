export default function (ratings) {
  const avg = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  if (avg === 0) return 0;
  return avg ? avg : -1;
}
