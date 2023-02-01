import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = () => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement;

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById('newItem') as HTMLInputElement;
    const errorMessage = document.getElementById(
      'errorMsg'
    ) as HTMLParagraphElement;

    const newEntryText = input.value.trim();

    if (!newEntryText) return;
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new ListItem(itemId.toString(), newEntryText);
    let alreadyExists = fullList.list.find(
      (item) => item.item === newEntryText
    );

    if (alreadyExists) {
      errorMessage.style.color = '#fff';
      errorMessage.style.display = 'block';
      return;
    } else {
      fullList.addItem(newItem);
      input.value = '';
      template.render(fullList);
      errorMessage.style.display = 'none';
    }
  });

  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;
  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
