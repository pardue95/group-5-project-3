export const getSavedGiftIds = () => {
  const savedGiftIds = localStorage.getItem('saved_Gifts')
    ? JSON.parse(localStorage.getItem('saved_Gifts'))
    : [];

  return savedGiftIds;
};

export const saveGiftIds = (GiftIdArr) => {
  if (GiftIdArr.length) {
    localStorage.setItem('saved_Gifts', JSON.stringify(GiftIdArr));
  } else {
    localStorage.removeItem('saved_Gifts');
  }
};

export const removeGiftId = (GiftId) => {
  const savedGiftIds = localStorage.getItem('saved_Gifts')
    ? JSON.parse(localStorage.getItem('saved_Gifts'))
    : null;

  if (!savedGiftIds) {
    return false;
  }

  const updatedSavedGiftIds = savedGiftIds?.filter((savedGiftId) => savedGiftId !== GiftId);
  localStorage.setItem('saved_Gifts', JSON.stringify(updatedSavedGiftIds));

  return true;
};
