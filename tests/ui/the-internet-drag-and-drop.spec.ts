import { test } from '@playwright/test';
import { TheInternetDragAndDropPage } from '../../pages/the-internet-drag-and-drop.page';

test.describe('The Internet Drag and Drop', () => {
  let theInternetDragAndDropPage : TheInternetDragAndDropPage;

  test.beforeEach(async ({ page }, testInfo) => {
    theInternetDragAndDropPage = new TheInternetDragAndDropPage(page)
    await theInternetDragAndDropPage.navigate()
    await theInternetDragAndDropPage.assertAbeforeB()
    await theInternetDragAndDropPage.assertBafterA()
  }) 

  test('Drag A to B', async ({browserName}) => {
    await theInternetDragAndDropPage.dragAToB()
    await theInternetDragAndDropPage.assertBbeforeA()
    if(browserName != 'webkit') await theInternetDragAndDropPage.assertAafterB()
  });

  test('Drag B to A', async ({browserName}) => {
    await theInternetDragAndDropPage.dragBToA()
    if(browserName != 'webkit') await theInternetDragAndDropPage.assertBbeforeA()
    await theInternetDragAndDropPage.assertAafterB()
  });
})