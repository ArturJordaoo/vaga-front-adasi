import { toast } from 'react-toastify';

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const saveItemToWatchlist = (
  e: React.MouseEvent<HTMLTableCellElement>, // Alterado para o tipo correto e atualizado
  id: string,
): void => {
  e.preventDefault();

  let watchlist: string[] = JSON.parse(
    localStorage.getItem('watchlist') || '[]',
  );

  if (watchlist) {
    if (!watchlist.includes(id)) {
      watchlist.push(id);
      toast.success(`${capitalizeFirstLetter(id)} - added to the watchlist`);
    } else {
      toast.error(
        `${capitalizeFirstLetter(id)} - is already in the watchlist!`,
      );
    }
  } else {
    watchlist = [id];
    toast.success(`${capitalizeFirstLetter(id)} - added to the watchlist`);
  }

  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};
