#include <bits/stdc++.h>
using namespace std;

int calculateMinimumWater(vector<vector<char>>& matrix, int size) {
    vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    vector<vector<int>> waterRequired(size, vector<int>(size, INT_MAX));
    queue<tuple<int, int, int>> processingQueue;

    for (int row = 0; row < size; ++row) {
        for (int col = 0; col < size; ++col) {
            if (matrix[row][col] == 'S') {
                processingQueue.push({row, col, 0});
                waterRequired[row][col] = 0;
                break;
            }
        }
    }

    while (!processingQueue.empty()) {
        auto [currentRow, currentCol, currentWater] = processingQueue.front();
        processingQueue.pop();

        for (auto [deltaRow, deltaCol] : directions) {
            int nextRow = currentRow + deltaRow;
            int nextCol = currentCol + deltaCol;

            if (nextRow >= 0 && nextRow < size && nextCol >= 0 && nextCol < size && matrix[nextRow][nextCol] != 'M') {
                int waterCost = (matrix[currentRow][currentCol] == 'T' && matrix[nextRow][nextCol] == 'T') ? currentWater : currentWater + 1;
                if (waterCost < waterRequired[nextRow][nextCol]) {
                    waterRequired[nextRow][nextCol] = waterCost;
                    processingQueue.push({nextRow, nextCol, waterCost});
                }
            }
        }
    }

    for (int row = 0; row < size; ++row) {
        for (int col = 0; col < size; ++col) {
            if (matrix[row][col] == 'E') {
                return waterRequired[row][col] == INT_MAX ? -1 : waterRequired[row][col];
            }
        }
    }

    return -1;
}

int main() {
    int size;
    cin >> size;
    vector<vector<char>> grid(size, vector<char>(size));

    for (int i = 0; i < size; ++i) {
        for (int j = 0; j < size; ++j) {
            cin >> grid[i][j];
        }
    }

    int result = calculateMinimumWater(grid, size);
    cout << result;
    return 0;
}
