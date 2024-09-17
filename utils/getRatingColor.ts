const ratingColorKey = {
  20: 'text-red-700',
  40: 'text-red-500',
  60: 'text-yellow-500',
  80: 'text-green-500',
  100: 'text-green-700',
};

export default function (rating: number) {
  if (rating === -1) {
    return 'text-gray-700 dark:text-gray-200';
  }
  return Object.entries(ratingColorKey)
    .find(([key]) => Math.floor(rating) <= parseInt(key))
    ?.[1];
}
