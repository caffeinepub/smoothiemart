import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";

actor {
  type Category = {
    #fruitSmoothies;
    #greenSmoothies;
    #proteinShakes;
    #classicShakes;
  };

  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    basePrice : Nat;
    category : Category;
    emoji : Text;
  };

  let menu = Map.empty<Nat, MenuItem>();

  public shared ({ caller }) func initializeMenu() : async () {
    let initialItems : [MenuItem] = [
      // Fruit Smoothies
      {
        id = 1;
        name = "Tropical Bliss";
        description = "Mango, pineapple, banana, and orange juice";
        basePrice = 599;
        category = #fruitSmoothies;
        emoji = "🥭🍍🍌🍊";
      },
      {
        id = 2;
        name = "Berry Explosion";
        description = "Strawberry, blueberry, raspberry, and apple juice";
        basePrice = 649;
        category = #fruitSmoothies;
        emoji = "🍓🫐🍏";
      },
      {
        id = 3;
        name = "Sunrise Citrus";
        description = "Orange, carrot, mango, and ginger";
        basePrice = 625;
        category = #fruitSmoothies;
        emoji = "🍊🥕🥭";
      },
      // Green Smoothies
      {
        id = 4;
        name = "Green Power";
        description = "Spinach, kale, green apple, and banana";
        basePrice = 699;
        category = #greenSmoothies;
        emoji = "🥬🍏🍌";
      },
      {
        id = 5;
        name = "Detox Delight";
        description = "Cucumber, celery, pineapple, and mint";
        basePrice = 629;
        category = #greenSmoothies;
        emoji = "🥒🍍🌱";
      },
      {
        id = 6;
        name = "Avocado Dream";
        description = "Avocado, spinach, banana, and coconut water";
        basePrice = 749;
        category = #greenSmoothies;
        emoji = "🥑🥬🍌🥥";
      },
      // Protein Shakes
      {
        id = 7;
        name = "Chocolate Power";
        description = "Chocolate protein, banana, almond milk";
        basePrice = 799;
        category = #proteinShakes;
        emoji = "🍫🍌🥛";
      },
      {
        id = 8;
        name = "Vanilla Muscle";
        description = "Vanilla protein, mixed berries, soy milk";
        basePrice = 789;
        category = #proteinShakes;
        emoji = "🍦🫐🥛";
      },
      {
        id = 9;
        name = "Peanut Butter Punch";
        description = "Peanut butter, chocolate protein, banana";
        basePrice = 829;
        category = #proteinShakes;
        emoji = "🥜🍫🍌";
      },
      // Classic Shakes
      {
        id = 10;
        name = "Classic Chocolate";
        description = "Chocolate ice cream, milk, whipped cream";
        basePrice = 599;
        category = #classicShakes;
        emoji = "🍫🍦🥛";
      },
      {
        id = 11;
        name = "Strawberry Dream";
        description = "Strawberry ice cream, milk, whipped cream";
        basePrice = 599;
        category = #classicShakes;
        emoji = "🍓🍦🥛";
      },
      {
        id = 12;
        name = "Vanilla Classic";
        description = "Vanilla ice cream, milk, whipped cream";
        basePrice = 599;
        category = #classicShakes;
        emoji = "🍦🥛";
      },
    ];

    for (item in initialItems.values()) {
      menu.add(item.id, item);
    };
  };

  public query ({ caller }) func getMenuItems() : async [MenuItem] {
    menu.values().toArray();
  };
};
