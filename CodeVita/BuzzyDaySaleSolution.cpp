#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int itemCount;
    cin >> itemCount;

    vector<int> itemIDs(itemCount), itemPrices(itemCount);
    for (int i = 0; i < itemCount; i++) cin >> itemIDs[i];
    for (int i = 0; i < itemCount; i++) cin >> itemPrices[i];

    int availableBudget;
    cin >> availableBudget;

    // Precompute free items for each ID
    unordered_map<int, vector<int>> freeItems;
    for (int i = 0; i < itemCount; i++) {
        for (int j = 0; j < itemCount; j++) {
            if (i != j && itemIDs[i] % itemIDs[j] == 0) {
                freeItems[itemIDs[i]].push_back(j); // Store indices of free items
            }
        }
    }

    int maxFreeItems = 0, maxWorth = 0;

    // Process each item as the one to buy
    for (int buyItem = 0; buyItem < itemCount; buyItem++) {
        int priceOfCurrentItem = itemPrices[buyItem];
        int quantityAffordable = availableBudget / priceOfCurrentItem;

        if (quantityAffordable > 0) {
            int freeItemsCount = 0;
            int freeItemsValue = 0;

            // Calculate free items and worth for this purchase
            for (int freeIndex : freeItems[itemIDs[buyItem]]) {
                freeItemsCount += quantityAffordable;
                freeItemsValue += itemPrices[freeIndex] * quantityAffordable;
            }

            // Update max values if better
            if (freeItemsCount > maxFreeItems || 
               (freeItemsCount == maxFreeItems && freeItemsValue > maxWorth)) {
                maxFreeItems = freeItemsCount;
                maxWorth = freeItemsValue;
            }
        }
    }

    cout << maxFreeItems << " " << maxWorth << endl;
    return 0;
}
