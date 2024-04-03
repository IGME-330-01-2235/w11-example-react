export const deleteToDo = async (id: string) => {
  console.log('Deleting:', id);
  localStorage.removeItem(id);
};
