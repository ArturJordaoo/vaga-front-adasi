import { toast } from 'react-toastify';

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const removeItemToWatchlist = (
  e: React.MouseEvent<HTMLTableCellElement>, // Alterado para o tipo correto e atualizado
  id: string,
  setIsCoinAdded: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  e.preventDefault();

  if (window.confirm('Are you sure you want to remove this coin?')) {
    const watchlist: string[] = JSON.parse(
      localStorage.getItem('watchlist') || '[]',
    );
    const newList = watchlist.filter((coin) => coin !== id);

    setIsCoinAdded(false);
    localStorage.setItem('watchlist', JSON.stringify(newList));

    toast.success(`${capitalizeFirstLetter(id)} - has been removed!`);
  } else {
    toast.error(`${capitalizeFirstLetter(id)} - could not be removed!`);
    setIsCoinAdded(true);
  }
};
