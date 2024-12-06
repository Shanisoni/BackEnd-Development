#include <iostream>
#include <vector>
using namespace std;

int main() {
    int itemCount;
    cin >> itemCount;

    vector<int> itemIDs(itemCount), itemPrices(itemCount);
    for (int i = 0; i < itemCount; i++) cin >> itemIDs[i];
    for (int i = 0; i < itemCount; i++) cin >> itemPrices[i];

    int availableBudget;
    cin >> availableBudget;

    int maxFreeItems = 0, maxWorth = 0;

    for (int buyItem = 0; buyItem < itemCount; buyItem++) {
        int priceOfCurrentItem = itemPrices[buyItem];
        int quantityAffordable = availableBudget / priceOfCurrentItem;

        if (quantityAffordable > 0) {
            int freeItemsCount = 0;
            int freeItemsValue = 0;

            for (int otherItem = 0; otherItem < itemCount; otherItem++) {
                if (buyItem != otherItem && itemIDs[buyItem] % itemIDs[otherItem] == 0) {
                    freeItemsCount += quantityAffordable;
                    freeItemsValue += itemPrices[otherItem] * quantityAffordable;
                }
            }

            if (freeItemsCount > maxFreeItems || 
               (freeItemsCount == maxFreeItems && freeItemsValue > maxWorth)) {
                maxFreeItems = freeItemsCount;
                maxWorth = freeItemsValue;
            }
        }
    }

    cout << maxFreeItems << " " << maxWorth;
    return 0;
}

