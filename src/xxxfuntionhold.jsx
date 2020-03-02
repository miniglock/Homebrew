export const getListFromDatabase = async collection => {
  const list = [];
  const listRef = await firebase.database.collection(`${collection}`);
  const querySnapshot = await listRef.get();
  querySnapshot.forEach(doc => {
    list.push(doc.data());
  });
  return list;
};

getUser(users, email, inputField.value);

export const getOneDoc = async (collection, key, value) => {
  const doc = {};
  const userRef = await firebase.database
    .collection(`${collection}`)
    .where(`${key}`, "==", `${value}`);
  const querySnapshot = await userRef.get();
};
