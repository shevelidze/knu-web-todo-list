export default class Category {
  constructor(name, iconUrl) {
    this.name = name;
    this.iconUrl = iconUrl;
  }
  static categories = [
    new Category(
      'Task',
      '/images/shopping_cart_FILL0_wght400_GRAD0_opsz48.svg'
    ),
    new Category(
      'Random thought',
      '/images/psychology_FILL0_wght400_GRAD0_opsz48.svg'
    ),
    new Category(
      'Idea',
      '/images/emoji_objects_FILL0_wght400_GRAD0_opsz48.svg'
    ),
  ];
}
