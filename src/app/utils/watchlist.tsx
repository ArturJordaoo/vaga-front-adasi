import React from 'react'; // Make sure React is imported for type compatibility
import { toast } from 'react-toastify';

// Utility to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Save a coin to the watchlist
export const saveItemToWatchlist = (
  e: React.MouseEvent<Element, MouseEvent>, // Use Element instead of HTMLTableCellElement
  id: string,
  setIsCoinAdded?: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  e.preventDefault();

  const watchlist: string[] = JSON.parse(
    localStorage.getItem('watchlist') || '[]',
  );

  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    toast.success(`${capitalizeFirstLetter(id)} - added to the watchlist`);

    if (setIsCoinAdded) {
      setIsCoinAdded(true); // Set to true when added
    }
  } else {
    toast.error(`${capitalizeFirstLetter(id)} - is already in the watchlist!`);
  }
};

export const removeItemToWatchlist = (
  e: React.MouseEvent<Element, MouseEvent>, // Use Element instead of HTMLTableCellElement
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
