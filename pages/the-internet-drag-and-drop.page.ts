import { expect, type Locator, type Page, type Mouse } from '@playwright/test'

export class TheInternetDragAndDropPage {
  readonly page: Page;
  readonly columns: Locator
  readonly columnA: Locator;
  readonly columnB: Locator;

  constructor(page: Page) {
    this.page = page;
    this.columns = page.locator("//div[@id='columns']/div")
    this.columnA = page.locator("//div[@id='column-a']")
    this.columnB = page.locator("//div[@id='column-b']") 
  }

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop')
  }

  async dragAToB() {
    await this.columnA.dragTo(this.columnB)
  }

  async dragBToA() {
    await this.columnB.dragTo(this.columnA)
  }

  async assertAbeforeB(){
    await expect(this.columns.first()).toHaveText("A")
  }

  async assertBbeforeA(){
    await expect(this.columns.first()).toHaveText("B")
  }

  async assertAafterB(){
    await expect(this.columns.last()).toHaveText("A")
  }

  async assertBafterA(){
    await expect(this.columns.last()).toHaveText("B")
  }
}